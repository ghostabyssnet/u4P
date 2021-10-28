import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne} from "typeorm";
import { Acidente } from "./Acidente";
import { Cliente } from "./Cliente";
import { Terceiro } from "./Terceiro";
import { Veiculo } from "./Veiculo";
@Entity()
export class EventoAcidente { // aka acidente_envolvidos 
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Acidente)
    @JoinTable()
    acidente: Acidente;

    @ManyToMany(() => Cliente)
    @JoinTable()
    clientes: Cliente[];

    @ManyToMany(() => Veiculo)
    @JoinTable()
    veiculos: Veiculo[];

    @ManyToMany(() => Terceiro)
    @JoinTable()
    terceiros: Terceiro[];
}