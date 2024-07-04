import { Expose } from 'class-transformer';

export class RefreshTokenDto {
  @Expose()
  refreshToken: string;
}
