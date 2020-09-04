import "reflect-metadata";
import { Connection } from "typeorm";
import { Block } from './entity/block';
export declare class AppService {
    static superCreateConnection(): Promise<Connection>;
    static getLastBlock(): Promise<Block>;
    static getGroupIds(): string[];
    static getGroup(id: any): Promise<any>;
    static getIndex(id: any): Promise<any>;
}
