import { Router } from 'express';

import * as ApiController from '../controllers/apiController';
import * as AlunoController from '../controllers/AlunoController';
import * as DisciplinaController from '../controllers/DisciplinaController';
import * as AlunoDisciplinaController from '../controllers/AlunoDisciplinaController';

const router = Router();

router.get('/ping', ApiController.ping);

router.get('/listarTodosAlunos', AlunoController.listarAlunos);
router.post('/cadastrarAluno', AlunoController.cadastrarAluno);

router.get('/listarTodosDisciplinas', DisciplinaController.listarDisciplinas);
router.post('/cadastrarDisciplina', DisciplinaController.cadastrarDisciplina);

router.get('/listarDisciplinaDoAluno/:alunoId', AlunoDisciplinaController.listarDisciplinaDoAluno);
router.post('/vincularDisciplinasDoAluno', AlunoDisciplinaController.vincularDisciplinasDoAluno);

router


export default router;
