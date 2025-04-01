import { Request, Response } from 'express';

export const api = (res: Response) => {
    return res.json({ mensagem: "Olá, bem vindo!" });
}

