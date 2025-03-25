import { Request, Response } from 'express';
import { Disciplina } from '../models/Disciplina';

export const listarDisciplinas = async (req: Request, res: Response) => {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
}

export const cadastrarDisciplina = async (req: Request, res: Response) => {
    const { nome } = req.body;

    if (nome) {
        let disciplinaExiste = await Disciplina.findOne({ where: { nome } });
        if (!disciplinaExiste) {
            let novoDisciplina = await Disciplina.create({ nome });
            res.status(201).json({
                message: "Disciplina cadastrado com sucesso",
                novoDisciplina
            });
        } else{
            res.status(400).json({ error: "Nome da disciplina já existe." });
        }
    }
    res.status(400).json({ error: "Nome da disciplina não enviado." });
}