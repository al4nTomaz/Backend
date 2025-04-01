CREATE database Backend;

CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    matricula VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO alunos (nome, email, matricula) 
VALUES 
('João Silva', 'joao.silva@example.com', '2023001'),
('Maria Oliveira', 'maria.oliveira@example.com', '2023002'),
('Carlos Souza', 'carlos.souza@example.com', '2023003'),
('Ana Costa', 'ana.costa@example.com', '2023004'),
('Pedro Santos', 'pedro.santos@example.com', '2023005');


    -- createdAt TIMESTAMP NULL
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO disciplinas (nome) 
VALUES 
('Matemática'),
('Física'),
('Química'),
('História'),
('Geografia');

CREATE TABLE aluno_disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alunoId INT NOT NULL,
    disciplinaId INT NOT NULL,
    FOREIGN KEY (alunoId) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplinaId) REFERENCES disciplinas(id) ON DELETE CASCADE
);

INSERT INTO aluno_disciplinas (alunoId, disciplinaId) 
VALUES 
(1, 1),  -- João Silva está na disciplina Matemática
(1, 2),  -- João Silva está na disciplina Física
(2, 3),  -- Maria Oliveira está na disciplina Química
(3, 4),  -- Carlos Souza está na disciplina História
(4, 5);  -- Ana Costa está na disciplina Geografia
