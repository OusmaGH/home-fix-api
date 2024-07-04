import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordMatchDto } from './dto/password-match.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/get-current-user.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokensDto } from './dto/tokens.dto';
import { VerifyEmailCodeDto } from './dto/verify-email-code.dto';
import { SignInDto } from './dto/singin.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/login')
  async signin(@Body() signInDto: SignInDto) {
    return this.usersService.logIn(signInDto);
  }

  @Post('/req-reset')
  reqReset(@Body('email') email: string) {
    return this.usersService.resetPasswordEmailLink(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() passwordMatchDto: PasswordMatchDto) {
    return await this.usersService.resetPassword(passwordMatchDto);
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('/refresh')
  async refresh(
    @CurrentUser('userId') userId: any,
    @Body() body: RefreshTokenDto,
  ): Promise<TokensDto> {
    return this.usersService.refresh(body, userId);
  }

  @Post('verifyEmailCode')
  async verifyEmailCode(@Body() verifyEmailCode: VerifyEmailCodeDto) {
    return await this.usersService.verifyEmailCode(verifyEmailCode);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('changePassword')
  changePassword(
    @CurrentUser('userId') userId: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(+userId, changePasswordDto);
  }
}
