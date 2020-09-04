import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { Block } from './entity/block';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("last-block")
  async getLastBlock(): Promise<Block> {
    return await AppService.getLastBlock();
  }

  @Get("group-ids")
  getGroupIds(): string[] {
    return AppService.getGroupIds();
  }

  @Get("group/:groupId")
  async getGroup(@Param('groupId', new ParseIntPipe()) groupId):Promise<any>{
    return await AppService.getGroup(groupId);
  }

  @Get("index/:indexId")
  async getIndex(@Param('indexId', new ParseIntPipe()) indexId): Promise<any> {
    return await AppService.getIndex(indexId);
  }
}
