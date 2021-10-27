import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Usuario} from './Usuario'
@Entity()
export class Terceiro extends Usuario {
    @Column()
    seg_externa: string;
    // se o terceiro tem uma seguradora externa, colocar aqui...?
    // isso de proteção veicular definitivamente é novo pra mim
    // vou deixar aqui pela ideia
}