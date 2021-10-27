import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Usuario} from './Usuario'
// colaboradores podem editar informações de usuários, cadastrar pessoas e etc
// o que seria a parte de secretaria ou "office" da empresa
@Entity()
export class Colaborador extends Usuario {
    @Column()
    cargo: string;
}