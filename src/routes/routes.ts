import { Router } from 'express';

import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';
// import * as ApiController from '../controllers/apiController';

export const router = Router();

// router.get('/saudacao', ApiController.api);

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);
router.put('atualizarAluno/:alunoId', AlunoController.atualizarAluno);
router.delete('/deletarAluno/:alunoId', AlunoController.deletarAluno);
router.get('/listarTodosAlunosDeletados', AlunoController.listarAlunosDeletados);
router.put('/recuperarAluno/:alunoId', AlunoController.recuperarAluno);
router.get('/buscarAluno/:alunoId', AlunoController.buscarAluno);

router.get('/listarTodasDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);
router.put('/atualizarDisciplina/:disciplinaId', DisciplinaController.atualizarDisciplina);
router.delete('/deletarDisciplina/:disciplinaId', DisciplinaController.deletarDisciplina);
router.get('/buscarDisciplina/:disciplinaId', DisciplinaController.buscarDisciplina);


router.get('/listarDisciplinaDoAluno/:alunoId', AlunoDisciplinaController.listarDisciplinaDoAluno);
router.post('/vincularDisciplinasDoAluno', AlunoDisciplinaController.vincularDisciplinasDoAluno);




export default router;
