import {Entity, PrimaryGeneratedColumn, Column, Timestamp} from "typeorm";
@Entity()
export class Acidente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    causa: string;

    @Column()
    data: Timestamp;
}