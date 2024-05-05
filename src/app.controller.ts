import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/search')
  async getSearchResults(@Query('query') query, @Query('per_page') pageSize?, @Query('page') pageOffset?): Promise<string> {

    const searchResults = await this.appService.getSearchResults(query, pageOffset, pageSize);
    return searchResults;
  }
}
