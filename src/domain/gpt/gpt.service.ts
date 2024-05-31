import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GptService {
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  private formatPrompt(prompt: string): string {
    return `${prompt}에 대해 설명해줘`;
  }

  async getChatGptResponse(prompt: string): Promise<string> {
    const formattedPrompt = this.formatPrompt(prompt);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: formattedPrompt }],
          max_tokens: 100, // 테스트할때는 100, 유의미한 결과를 뽑으려면 크게
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // 응답 데이터에서 대화 내용을 추출하고 반환
      const message = response.data.choices[0].message.content;
      return message;
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error body:', error.response.data);
        const openAiErrorCode = error.response.data.error?.code;
        switch (openAiErrorCode) {
          case 'AuthenticationError':
            console.error('Authentication failed: Check the API key');
            break;
          case 'RateLimitError':
            console.error('Rate limit exceeded: Try again later');
            break;
          case 'InvalidRequestError':
            console.error('Invalid request: Check request parameters');
            break;
          default:
            console.error('Unhandled error', openAiErrorCode);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }

      throw new Error('Failed to fetch ChatGPT response');
    }
  }
}
