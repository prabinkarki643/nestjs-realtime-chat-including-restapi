import { ApiProperty } from '@nestjs/swagger';
export class Chat {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  createdAt?: Date;
}
