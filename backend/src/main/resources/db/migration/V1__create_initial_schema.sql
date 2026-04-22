CREATE TABLE IF NOT EXISTS veiculo (
    id BIGINT NOT NULL AUTO_INCREMENT,
    placa VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    capacidade_kg DOUBLE NOT NULL,
    status VARCHAR(255) NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_veiculo_placa UNIQUE (placa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('CHEFE', 'COMERCIAL', 'MANUTENCAO') NOT NULL,
    ativo BIT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_usuario_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS manutencao (
    id BIGINT NOT NULL AUTO_INCREMENT,
    veiculo_id BIGINT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data_abertura DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    observacao VARCHAR(255),
    ativo BIT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_manutencao_veiculo
        FOREIGN KEY (veiculo_id)
        REFERENCES veiculo (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
