import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import {Group} from "./group";

@Entity()
export class Index {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    ethPriceInWei: bigint;

    @Column('decimal')
    usdPriceInCents: bigint;

    @Column('decimal')
    usdCapitalization: bigint;

    @Column('decimal')
    percentageChange: bigint;

    @ManyToOne(type => Group, group => group.indexes, {primary: true})
    group : Group
}
