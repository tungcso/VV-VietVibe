import { ApiProperty } from '@nestjs/swagger';

export class RevokeTokenResponseDto {
  @ApiProperty({
    example: true,
    description: 'Success status',
  })
  success!: boolean;

  @ApiProperty({
    example: 'Token successfully revoked',
    description: 'Success message',
  })
  message!: string;

  @ApiProperty({
    example: '2026-05-17T10:30:00Z',
    description: 'Time when token was revoked',
  })
  revoked_at!: Date;
}

export class RevokeAllTokensResponseDto {
  @ApiProperty({
    example: true,
    description: 'Success status',
  })
  success!: boolean;

  @ApiProperty({
    example: 'All tokens revoked successfully',
    description: 'Success message',
  })
  message!: string;

  @ApiProperty({
    example: 5,
    description: 'Number of tokens revoked',
  })
  tokens_revoked!: number;

  @ApiProperty({
    example: '2026-05-17T10:30:00Z',
    description: 'Time when operation was performed',
  })
  revoked_at!: Date;
}

export class LogoutResponseDto {
  @ApiProperty({
    example: true,
    description: 'Success status',
  })
  success!: boolean;

  @ApiProperty({
    example: 'ログアウトしました',
    description: 'Logout message',
  })
  message!: string;
}
