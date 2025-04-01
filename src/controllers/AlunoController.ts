import { Request, Response } from 'express';
import { Aluno } from '../models/Aluno';
import { Op, where } from 'sequelize';
import { AlunoDisciplina } from '../models/AlunoDisciplina';


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

export const buscarAluno = async (req: Request, res: Response) => {

    try {
        const { alunoId } = req.params;
        
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado' });    
        }

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
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
        
        const aluno = await Aluno.findByPk(alunoId);
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado' });    
        }
        const alunoDisciplina = await AlunoDisciplina.findOne({where: {alunoId: alunoId}});
        if (!alunoDisciplina) {
            await aluno?.destroy();
        }
        // const alunoDisciplina = await AlunoDisciplina.findAll({
        //     where: {
        //         alunoId:{
        //             [Op.eq]: alunoId
        //         }
        //     },
        //     paranoid:false
    
        // });

        res.status(400).json({ error: 'Aluno ainda cadastrado em uma disciplina, não pode ser excluido' });
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

    res.status(200).json(alunos);
}

export const recuperarAluno = async (req: Request, res: Response) => {
    try {
        const { alunoId } = req.params;
        
        const aluno = await Aluno.findByPk(alunoId, {
            paranoid: false
        });
        if (!aluno) {
            res.status(404).json({ error: 'Aluno não encontrado' });    
        }
        await aluno?.restore();

        res.status(200).json(aluno);
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}