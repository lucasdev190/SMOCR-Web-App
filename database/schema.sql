-- ESQUEMA DO BANCO DE DADOS - SMOCR (Parelhas/RN)

-- 1. Tabela de Usuários
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Rotas de Coleta
CREATE TABLE rotas_coleta (
    id_rota SERIAL PRIMARY KEY,
    nome_rua VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    dias_semana VARCHAR(50) NOT NULL,
    horario_coleta TIME NOT NULL
);

-- 3. Tabela de Lixeiras Residenciais
CREATE TABLE lixeiras_residenciais (
    id_lixeira SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_rota INT REFERENCES rotas_coleta(id_rota) ON DELETE CASCADE,
    nivel_porcentagem INT CHECK (nivel_porcentagem BETWEEN 0 AND 100),
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Denúncias Ambientais
CREATE TABLE denuncias (
    id_denuncia SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_rota INT REFERENCES rotas_coleta(id_rota) ON DELETE CASCADE,
    tipo_ocorrencia VARCHAR(50) NOT NULL,
    status_denuncia VARCHAR(20) DEFAULT 'Pendente',
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERÇÃO DE DADOS INICIAIS (DML)
INSERT INTO usuarios (nome, email) VALUES 
('João', 'joao.parelhas@email.com'),
('Lucas Barros', 'lucas.macedo@email.com');

INSERT INTO rotas_coleta (nome_rua, bairro, dias_semana, horario_coleta) VALUES 
('Centro', 'Centro', 'Terça e Sexta', '07:00:00'),
('Comendador José Gomes', 'Centro', 'Terça e Sexta', '07:00:00');

INSERT INTO lixeiras_residenciais (id_usuario, id_rota, nivel_porcentagem) VALUES 
(1, 1, 65),
(2, 2, 85);

INSERT INTO denuncias (id_usuario, id_rota, tipo_ocorrencia, status_denuncia) VALUES 
(1, 1, 'Acúmulo Crônico de Lixo', 'Pendente'),
(2, 2, 'Descarte Irregular de Entulho', 'Em Análise');
