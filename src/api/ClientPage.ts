import { getConnection, getRepository } from "typeorm";
import { Acidente } from "../entity/Acidente";
import { Cliente } from "../entity/Cliente";
import { EventoAcidente } from "../entity/EventoAcidente";
import { Terceiro } from "../entity/Terceiro";
import { Veiculo } from "../entity/Veiculo";

// funções da página de cliente logado 
// elas supoem que o cliente está já está logado (...!)

export async function VehicleExists(_placa: string) : Promise<boolean> {
    const user = await getRepository(Veiculo)
    .createQueryBuilder("veiculo")
    .where("veiculo.placa = :placa", { email: _placa })
    .getOneOrFail();
    if (user) return true;
    return false;
}

export async function VehicleRegister(_dono: Cliente, _placa: string, _descricao: string) {
    if (VehicleExists(_placa)) {
        throw new Error("Um veículo com esta placa já existe.");
    }
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Veiculo)
    .values([
        { dono: _dono, placa: _placa, descricao: _descricao }
     ])
    .execute();
}

// registrar um novo acidente
export async function AccidentRegister(_causa: string, _data: Date) {
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Acidente)
    .values([
        { causa: _causa, data: _data }
     ])
    .execute();
}

export async function EventExists(_acidente: Acidente) : Promise<Boolean> {
    const user = await getRepository(EventoAcidente)
    .createQueryBuilder("evento")
    .where("evento.acidente = :acidente", { acidente: _acidente })
    .getOneOrFail();
    if (user) return true;
    return false;
}

export async function ClientNewEvent(_clientes: Cliente[], _acidente: Acidente, _veiculos: Veiculo[], _terceiros: Terceiro[]) {
    if (EventExists(_acidente)) {
        throw new Error("Um evento já está registrado para este acidente.");
    }
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(EventoAcidente)
    .values([
        { clientes: _clientes, acidente: _acidente, veiculos: _veiculos, terceiros: _terceiros }
     ])
    .execute();
}