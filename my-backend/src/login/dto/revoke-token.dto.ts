import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RevokeTokenDto {
  @ApiProperty({
    example: 'logout',
    description: 'Reason for revocation: logout, password_changed, security_issue, etc.',
    default: 'logout',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  reason?: string;
}
