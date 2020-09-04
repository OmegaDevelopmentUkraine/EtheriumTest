import { AppService } from './app.service';
import { Block } from './entity/block';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getLastBlock(): Promise<Block>;
    getGroupIds(): string[];
    getGroup(groupId: any): Promise<any>;
    getIndex(indexId: any): Promise<any>;
}
