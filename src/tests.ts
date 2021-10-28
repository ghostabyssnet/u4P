// testes CRUD

import { RestClientLogin, RestClientRegister } from "./api/UserREST";

class TesteCliente {
    nome: string;
    cpf: number;
    rg: string;
    email: string;
    senha: string;
}

test('register -> cria uma conta com user teste:123456', async () => {
    let user = new TesteCliente();
    user.nome = 'Teste da Silva';
    user.cpf = 12345678900;
    user.rg = 'MG-99.000.111';
    user.email = 'teste@u4c.com';
    user.senha = '123456';
    let result : string = await RestClientRegister(user.email, user.senha, user.nome, user.cpf, user.rg);
    expect(result).toBe('Credenciais OK!');
});

test('login -> faz login como o user teste:123456', async () => {
    let user = new TesteCliente();
    user.email = 'teste@u4c.com';
    user.senha = '123456';
    let result: string = await RestClientLogin(user.email, user.senha);
    expect(result).toBe('Credenciais OK!');
});
