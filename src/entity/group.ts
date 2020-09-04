import {Index} from "./index";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Group {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Index, index => index.group)
    indexes : Index[];
}
