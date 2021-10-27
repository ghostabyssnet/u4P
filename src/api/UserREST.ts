import { CanLogin, ClientRegister } from "./User";

// cria uma ponte entre as funções internas de login e a API REST

export async function RestClientRegister(_email: string, _senha: string, _nome: string, _cpf: number, _rg: string) : Promise<string> {
    let result: string;
    try {
        await ClientRegister(_email, _senha, _nome, _cpf, _rg);
        result = 'Credenciais OK!';
    }
    catch (error) {
        result = (error as Error).message;
    }
    return result;
}

export async function RestClientLogin(_email: string, _senha: string) : Promise<string> {
    let result : string;
    try {
        if (await CanLogin(_email, _senha) == true) result = 'Credenciais OK!';
        else result = 'Credenciais inválidas!';
    }
    catch (error) {
        result = (error as Error).message;
    }
    return result;
}