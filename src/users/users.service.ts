import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordMatchDto } from './dto/password-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { GoodResDto } from '../common/dto/good-res.dto';
import { EmailManagementFactory } from 'src/common/services/email/email-management.factory';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './strategies/types';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokensDto } from './dto/tokens.dto';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';
import { SignInDto } from './dto/singin.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<GoodResDto> {
    const passwordHash: string = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const randomCode: string = String(
      Math.floor(Math.random() * 90000) + 100000,
    );

    if (!createUserDto.privacy) {
      throw new BadRequestException('Privacy not accepted');
    }

    const user: User = new User({
      ...createUserDto,
      password: passwordHash,
      emailVer: randomCode,
      privacy: new Date(),
    });

    await this.sendVerificationEmail(user.email, randomCode);
    await this.userRepository.save(user);
    return {
      statusCode: 200,
      message: 'User created successfully',
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: { requests: true } });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<GoodResDto> {
    const user: User = await this.userRepository.findOneBy({ id });
    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);
    return {
      statusCode: 200,
      message: 'User updated successfully',
    };
  }

  async remove(id: number): Promise<GoodResDto> {
    const user: User = await this.userRepository.findOneBy({ id });
    await this.userRepository.remove(user);

    return {
      statusCode: 200,
      message: 'User removed successfully',
    };
  }

  async logIn(body: SignInDto): Promise<TokensDto> {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (!user) {
      throw new BadRequestException('auth.USER_NOT_FOUND');
    }

    if (user.emailVer !== 'true') {
      throw new BadRequestException(
        'You must verify your email before logging in',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('auth.INVALID_PASSWORD');
    }

    user.hashedRt = (await this.getTokens(user.id, user.email)).refreshToken;

    await this.userRepository.save(user);

    return await this.getTokens(user.id, user.email);
  }

  async logout(userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user.hashedRt) {
        return {
          success: false,
          message: 'auth.YOU_MUST_LOG_IN_BEFORE_LOGGING_OUT',
        };
      }

      user.hashedRt = null;

      await this.userRepository.save(user);

      return {
        success: true,
        message: 'auth.LOGOUT_SUCCESSFUL',
      };
    } catch (error) {
      return {
        success: false,
        message: 'auth.REFRESH_TOKEN_ERROR',
      };
    }
  }

  async verifyEmailCode(
    verifyEmailCodeDto: VerifyEmailCodeDto,
  ): Promise<GoodResDto> {
    const { email } = verifyEmailCodeDto;
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('auth.USER_NOT_FOUND');
    }

    if (
      user.emailVer !== verifyEmailCodeDto.code &&
      (user.emailVer = 'false')
    ) {
      throw new BadRequestException('auth.INVALID_EMAIL_VERIFICATION_CODE');
    }

    user.emailVer = 'true';
    await this.userRepository.update(user.id, user);

    return {
      statusCode: 200,
      message: 'Correct verCode',
    };
  }

  async resetPasswordEmailLink(email: string): Promise<GoodResDto> {
    const user: User = await this.userRepository.findOneBy({ email });
    const token: string = uuidv4();

    if (!user) {
      throw new NotFoundException(`User with email:${email}`);
    }

    await this.userRepository.update(user.id, {
      resetPassToken: token,
    });

    const link: string = `${process.env.RESET_PASSWORD_LINK}/${token}?email=${encodeURIComponent(user.email)}`;

    const txt: string = `Hi,
               We received a password reset request for your account. You can reset your password by clicking on the link below:
               ${link}
               If you did not request a password reset, please ignore this email.
               Thank you,
               The Support Team of New-Era`;

    const html: string = `<h1>Password Reset Request</h1>
                <p>Hi,</p>
                <p>We received a password reset request for your account. You can reset your password by clicking on the link below:</p>
                <p><a href='${link}' style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p><strong>Note:</strong> This link will expire in 15 minutes.</p>
                <p>Thank you,</p>
                <p>The Support Team of New-Era</p>`;

    await new EmailManagementFactory().createEmailService('SMTP').sendMail({
      from: process.env.SMTP_ADMIN,
      to: user.email,
      subject: 'Password Reset Request',
      text: txt,
      html: html,
    });

    return {
      statusCode: 200,
      message: 'Email with reset link sent successfully',
    };
  }

  async resetPassword(passwordMatchDto: PasswordMatchDto): Promise<GoodResDto> {
    const email: string = passwordMatchDto.email;
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user.email) {
      throw new NotFoundException(`User with email:${email}`);
    }

    const isValidToken: boolean = await this.validateToken(
      passwordMatchDto.token,
      passwordMatchDto.email,
    );

    if (!isValidToken) {
      throw new BadRequestException('Invalid Reset Token');
    }

    if (passwordMatchDto.password === passwordMatchDto.passwordConfirm) {
      const hashedPassword: string = await bcrypt.hash(
        passwordMatchDto.password,
        parseInt(process.env.SALT_ROUNDS),
      );

      await this.userRepository.update(user.id, {
        password: hashedPassword,
        resetPassToken: null,
      });
    }

    return {
      statusCode: 200,
      message: 'Password reset succeffuly ',
    };
  }

  async changePassword(userId: number, changePassword: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const isOldPasswordValid = await bcrypt.compare(
      changePassword.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('La vecchia password non è corretta');
    }

    if (changePassword.newPassword === changePassword.newPasswordConfirm) {
      const hashedPassword = await this.hashPassword(
        changePassword.newPassword,
      );
      user.password = hashedPassword;
    } else {
      throw new BadRequestException('Le nuove password non corrispondono');
    }

    await this.userRepository.save(user);

    return {
      Status: 200,
      Message: 'La tua password è stata cambiata con successo',
    };
  }

  async refresh(body: RefreshTokenDto, userId: number): Promise<TokensDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('auth.USER_NOT_FOUND');
    }

    return await this.getTokens(user.id, user.email);
  }

  // Functionality functions
  async sendVerificationEmail(email: string, verCode: string) {
    const txt: string = `Hi,
             Thank you for registering. This email contains a verification code to verify your email address.
             Verification Code: ${verCode}
             If you did not request this email, please ignore it.
             Thank you,
             The Team of New-Era`;

    const html: string = `<h1>Email Verification</h1>
            <p>Hi,</p>
            <p>Thank you for registering. This email contains a verification code to verify your email address.</p>
            <p>Verification Code:<strong> ${verCode}</strong></p>
            <p>If you did not request this email, please ignore it.</p>
            <p>Thank you,<br>The Team of New-Era</p>`;

    await new EmailManagementFactory().createEmailService('SMTP').sendMail({
      from: process.env.SMTP_ADMIN,
      to: email,
      subject: 'Verify your email',
      text: txt,
      html: html,
    });
  }

  private async validateToken(token: string, email: string) {
    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`User with email:${email}`);
    }

    if (token !== user.resetPassToken) {
      throw new UnauthorizedException('unauthorized');
    }

    const currentTime: Date = new Date();
    if (
      user.resetPassTokenExpires &&
      currentTime > user.resetPassTokenExpires
    ) {
      throw new UnauthorizedException('unauthorized');
    }

    return true;
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const accessTokenExpTimeSeconds = parseInt(
      process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      10,
    );
    const refreshTokenExpTimeSeconds = parseInt(
      process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      10,
    );

    const accessToken = await this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        expiresIn: accessTokenExpTimeSeconds,
        secret: process.env.AT_SECRET_JWT,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        expiresIn: refreshTokenExpTimeSeconds,
        secret: process.env.RT_SECRET_JWT,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashPassword(
    password: string,
    rounds = parseInt(process.env.SALT_ROUNDS, 10),
  ): Promise<string> {
    return await bcrypt.hash(password, rounds);
  }
}
