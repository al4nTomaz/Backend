import { Request, Response } from 'express';
import { Aluno } from '../models/Aluno';
import { where } from 'sequelize';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

import { DeletedAt } from 'sequelize-typescript';



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

export const atualizarAluno = async (req: Request, res: Response) => {

    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;
        
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado' });    
        }
        await aluno?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const deletarAluno = async (req: Request, res: Response) => {

    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;
        
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado' });    
        }
        await aluno?.destroy();

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const listarAlunosDeletados = async (req: Request, res: Response) => {
    const alunos = await Aluno.findAll({
        where: {
          deletedAt:  {
            [Op.not]: null 
          }
        },
        paranoid:false

      });
    console.log(alunos);
    res.status(200).json(alunos);
}