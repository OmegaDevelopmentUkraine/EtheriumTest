import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Index} from "./index";
import json from "cli-ux/lib/styled/json";
import {type} from "os";

@Entity()
export class Block {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    difficulty: string;

    @Column()
    extraData: string;

    @Column()
    gasLimit: number;

    @Column()
    gasUsed: number;

    @Column()
    hash: string;

    @Column()
    logsBloom: string;

    @Column()
    miner: string;

    @Column()
    mixHash: string;

    @Column()
    nonce: string;

    @Column()
    number: number;

    @Column()
    parentHash: string;

    @Column()
    receiptsRoot: string;

    @Column()
    sha3Uncles: string;

    @Column()
    size: number;

    @Column()
    stateRoot: string;

    @Column()
    timestamp: number;

    @Column()
    totalDifficulty: string;
    @Column()
    transactionsRoot : string

    @Column('json')
    transactions : string[];

    @Column('json')
    uncles: string[];
}
