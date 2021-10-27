import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Usuario} from './Usuario'
@Entity()
export class Cliente extends Usuario {
    @Column()
    email: string;

    @Column()
    senha: string;
}