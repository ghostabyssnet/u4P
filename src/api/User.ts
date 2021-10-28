import { getConnection, getRepository } from "typeorm";
import { Cliente } from "../entity/Cliente";

// checar se user já existe
export async function ClientExists(_email: string) : Promise<boolean> {
    const user = await getRepository(Cliente)
    .createQueryBuilder("cliente")
    .where("cliente.email = :email", { email: _email })
    .getOneOrFail();
    if (user) return true;
    return false;
}

// registrar-se. checa se já existe um user, também
export async function ClientRegister(_email: string, _senha: string, _nome: string, _cpf: number, _rg: string) {
    if (ClientExists(_email)) {
        throw new Error("Um cliente com esse e-mail já existe.");
    }
    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Cliente)
    .values([
        { email: _email, senha: _senha, nome: _nome, cpf: _cpf, rg: _rg }
     ])
    .execute();
}

// aqui colocamos coisas lindas como bCrypt e etc
// como não é um projeto de produção, vou deixar as senhas
// em plaintext, mas vamos deixar isso aqui para demonstração
function ValidatePassword(_senha: string) : boolean { // Promise<Boolean>?
    let _senhaPosCrypt = _senha; // seria a senha com todos os salts
    // e hashes e etc aplicados, guardados na DB (fariamos uma query)
    if (_senha == _senhaPosCrypt) return true;
    return false;
}

async function ValidateLogin(_email: string, _senha: string) : Promise<Boolean> {
    const _acc = await getConnection()
    .createQueryBuilder()
    .select("cliente")
    .from(Cliente, "cliente")
    .where("cliente.email = :email", { email: _email })
    .getOne();
    if (_acc.senha == _senha) return true;
    return false;
}

// login
// retorna boolean, se o usuário conseguir logar outra função
// lida com o POST
export async function CanLogin(_email: string, _senha: string) {
    if (!ClientExists(_email)) {
        throw new Error("Nenhum cliente com este e-mail cadastrado.");
    }
    if (!ValidatePassword(_senha)) {
        throw new Error("Senha inválida.");
    }
    if (ValidateLogin(_email, _senha)) return true;
    return false; 
}
