import request from 'supertest';
import server from '../server';

describe("Teste de cadastro de Aluno", () => {
    it("Deve cadastrar um aluno na rota /cadastrarAluno", async () => {
        const novoAluno = {
            nome: "Teste 274 Testando Silva", 
            email: "teste2745silva@email.com",
            matricula: "192168232745"

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
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("Teste de atualizar Aluno", () => {
    it("Deve atualizar um aluno na rota /atualizarAluno/:alunoId", async () => {
        const alunoId = 5;
        const dadosAtualizados = {
            nome: "Kayure23 Lindu alan2 Teste 27 Testando Silva", 
            email: "alan23.teste27silva@email.com",
        };
        const response = await request(server).put(`/atualizarAluno/${alunoId}`).send(dadosAtualizados);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno atualizado com sucesso");
        expect(response.body.aluno).toHaveProperty("nome", dadosAtualizados.nome);
        expect(response.body.aluno).toHaveProperty("email", dadosAtualizados.email);
    });
});

describe("Teste de deletar Aluno", () => {
    it("Deve deletar um aluno na rota /deletarAluno/:alunoId", async () => {
        const alunoId = 13;
    
        const response = await request(server).delete(`/deletarAluno/${alunoId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aluno deletado com sucesso");
    });
});