'use strict';
import "reflect-metadata";
import {createConnection} from "typeorm";
import { RestClientLogin, RestClientRegister } from "./api/UserREST";
const Hapi = require('@hapi/hapi');

createConnection().then(async connection => {

    console.log("Ligando servidor...");

    const init = async () => {
        const server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Hello World!';
            }
        });

        server.route({
            method: 'POST',
            path: '/register',
            handler: async (request, h) => {
                let req = request.payload;
                let response: string;
                response = await RestClientRegister(req.email, req.senha, req.nome, req.cpf, req.rg);
                return h.response(response);
            }
        });

        server.route({
            method: 'POST',
            path: '/login',
            handler: async (request, h) => {
                let req = request.payload;
                let response: string;
                response = await RestClientLogin(req.email, req.senha);
                return h.response(response);
            }
        });

        
        
        await server.start();
        console.log('Server rodando em %s', server.info.uri);
    };

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });

    init();

}).catch(error => console.log(error));
