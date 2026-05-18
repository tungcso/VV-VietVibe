import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ListeningSessionQueryDto {
  @ApiProperty({
    type: String,
    description: 'Learner user id',
    example: '6a0062476ba452f577db7e70',
  })
  @IsMongoId()
  userId: string;
}
