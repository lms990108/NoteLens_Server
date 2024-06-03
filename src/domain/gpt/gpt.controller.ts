import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('gpt')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('/prompt')
  @ApiOperation({ summary: 'Get response from ChatGPT' })
  @ApiResponse({
    status: 200,
    description: 'Successfully received response from ChatGPT',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: { type: 'object', properties: { prompt: { type: 'string' } } },
  })
  async getGPTResponse(@Body('prompt') prompt: string): Promise<string> {
    return this.gptService.getChatGptResponse(prompt);
  }

  @Post('/img')
  @ApiOperation({ summary: 'Get response from ChatGPT' })
  @ApiResponse({
    status: 200,
    description: 'Successfully received response from ChatGPT',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: { type: 'object', properties: { img: { type: 'string' } } },
  })
  async getIMGResponse(@Body('img') img: string): Promise<string> {
    return this.gptService.getChatGptResponse(img);
  }
}
