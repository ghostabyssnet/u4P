import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    cpf: number;

    @Column()
    rg: string;

    // talvez colocar o pdf do documento aqui...?
}
