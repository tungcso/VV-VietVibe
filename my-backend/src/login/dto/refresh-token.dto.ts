import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token',
  })
  @IsNotEmpty({ message: 'Refresh token が必要です' })
  @IsString({ message: 'Refresh token は文字列である必要があります' })
  refresh_token!: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'New access token',
  })
  access_token!: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'New refresh token (rotated)',
  })
  refresh_token!: string;

  @ApiProperty({
    example: 86400,
    description: 'Access token expiration time in seconds',
  })
  expires_in!: number;
}
