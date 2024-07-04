import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { IsUnique } from '../../common/validator/isUnique';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsUnique({
    tableName: 'user',
    column: 'email',
  })
  email: string;

  @IsString()
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
  @Matches(/^\S+$/, { message: 'Password must not contain spaces' })
  password: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsBoolean()
  privacy: boolean;
}
