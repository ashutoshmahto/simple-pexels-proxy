import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private apiUrl = '';
  private apiKey = '';

  public constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get('API_URL');
    this.apiKey = this.configService.get('API_KEY');
  }

  public async getSearchResults(queryTerm: string, pageOffset = 1, pageSize = 10): Promise<any> {
    console.log(`${this.apiUrl}/search`)
    const response = await firstValueFrom(this.httpService.get(`${this.apiUrl}/search`, {
      params: {
        query:queryTerm,
        page: pageOffset,
        per_page: pageSize
      },
      headers: {
        Authorization: this.apiKey
      }
    }));

    return response.data;
  }
}
