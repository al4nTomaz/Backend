import request from 'supertest';
import server from '../server';

describe("Testes da API", ()=> {
    it("Deve retornar uma saudação na rota /saudacao", async () => {
        const respose = await request(server).get("/saudacao");

        expect(respose.status).toBe(200);
        expect(respose.body).toEqual({mensagem: "Olá, bem vindo!"});
    })
})
