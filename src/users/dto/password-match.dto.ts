import {
  IsNotEmpty,
  IsStrongPassword,
  Matches,
  IsString,
} from 'class-validator';

export class PasswordMatchDto {
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one symbol.',
    },
  )
  @Matches(/^[^\s]+$/, { message: 'Password must not contain spaces' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must have at least 8 characters, one lowercase letter, one uppercase letter, one number, and one symbol.',
    },
  )
  @Matches(/^[^\s]+$/, { message: 'Password must not contain spaces' })
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
