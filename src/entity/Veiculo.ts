import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
@Entity()
export class Veiculo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    placa: string;

    // deixei descrição aqui para evitar de criar bilhões de campos
    // representando cor, marca, tipo e etc. não sei como funcionaria
    // em uma empresa real, mas na pior das hipoteses podemos fazer uma
    // query de % LIKE "vermelho" para achar a cor vermelha, ou algo assim
    @Column()
    descricao: string;
}