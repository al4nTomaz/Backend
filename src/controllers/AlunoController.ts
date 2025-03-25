import { Request, Response } from 'express';
import { Aluno } from '../models/Aluno';



export const listarAlunos = async (req: Request, res: Response) => {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
}

export const cadastrarAluno = async (req: Request, res: Response) => {
    const { nome, email, matricula } = req.body;

    let novoAluno = await Aluno.create({ nome, email, matricula });
    res.status(201).json({
        message: "Aluno cadastrado com sucesso", 
        novoAluno
    });
}
// export const listarAlunos = async (req: Request, res: Response) => {
//     try {
//         const alunos = await Aluno.findAll();

//         res.status(200).json(alunos);
//     } catch (error) {
//         console.error('Deu erro ai tio', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
