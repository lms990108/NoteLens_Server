import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ description: 'URL of the image associated with the question' })
  readonly image_url: string;

  @ApiProperty({
    description: 'Content of the question, can be any format',
    type: 'json',
  })
  readonly content: any;

  @ApiProperty({ description: 'Subject or category of the question' })
  readonly subject: string;
}
