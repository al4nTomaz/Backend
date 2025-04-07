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
        
        const resultado = await pegarAluno(alunoId);
        if (resultado.error) {
            res.status(404).json({ error: resultado.error });    
        }

        const aluno = resultado.aluno;

        res.status(200).json({message: resultado.menssage, aluno});
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const atualizarAluno = async (req: Request, res: Response) => {

    try {
        const { alunoId } = req.params;
        const dadosAtualizados = req.body;
        
        const resultado = await pegarAluno(alunoId);
        if (resultado.error) {
            res.status(404).json({ error: resultado.error });    
        }
        const aluno = resultado.aluno;

        await aluno?.update(dadosAtualizados, {fields: Object.keys(dadosAtualizados)});

        res.status(200).json({ message: "Aluno atualizado com sucesso", aluno});
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const deletarAluno = async (req: Request, res: Response) => {

    try {
        const { alunoId } = req.params;
        
        const resultado = await pegarAluno(alunoId);
        if (resultado.error) {
            res.status(404).json({ error: resultado.error });    
        }

        const aluno = resultado.aluno;
        const alunoDisciplina = await AlunoDisciplina.findOne({where: {alunoId: aluno?.id}});
        
        if (!alunoDisciplina) {
            await aluno?.destroy();
            res.status(200).json({message: "Aluno deletado com sucesso", aluno});
        }

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
        
        const resultado = await pegarAluno(alunoId);
        if (resultado.error) {
            res.status(404).json({ error: resultado.error });    
        }
        const aluno = resultado.aluno;
        await aluno?.restore();

        res.status(200).json({menssage: resultado.menssage, aluno});
    } catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(400).json({ error: 'Internal server error' });
    }
}

export const pegarAluno = async (alunoId: string) => {
    try {
        const aluno = await Aluno.findByPk(alunoId, {paranoid: false});
        if (!aluno) {
            return { error: 'Aluno não encontrado' }; 
        }
        return { menssage: "Aluno encontrado com sucesso", aluno }; 
    } catch (error) {
        console.error('Erro ao buscar aluno', error);
        return { error: 'Erro interno ao buscar aluno' }; 
    }
}