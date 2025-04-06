import request from 'supertest';
import server from '../server';

describe("Teste de cadastro de Aluno", () => {
    it("Deve cadastrar um aluno na rota /cadastrarAluno", async () => {
        const novoAluno = {
            nome: "Teste 4 Testando Silva", 
            email: "teste4silva@email.com",
            matricula: "192168234"

        };
        const response = await request(server).post("/cadastrarAluno").send(novoAluno);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Aluno cadastrado com sucesso");
        expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
        expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
        expect(response.body.novoAluno).toHaveProperty("matricula", novoAluno.matricula);
    });
});

describe("Teste de Listagem de Alunos", () => {
    it("Deve listar todos os alunos na rota /listarTodosAlunos", async () => {
        const response = await request(server).get("/listarTodosAlunos");

        expect(response.status).toBe(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.lenght).toBeGreaterThan(0);
    });
});

