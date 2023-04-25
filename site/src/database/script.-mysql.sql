CREATE DATABASE `Monitority`;
-- drop database `Monitority`;
USE `Monitority` ;

-- Uma empresa e estabelecimento podem só um endereco;
-- -----------------------------------------------------
-- Table `endereco`;
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `endereco`(
  `idEndereco` INT NOT NULL AUTO_INCREMENT,
  `logradouro` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(45) NOT NULL,
  `numero` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEndereco`)
);


-- Empresa >= Usuários && Totens, Totens >= Estabelecimentos;
-- Uma empresa ela pode ter vários totens e vários usuários;
-- -----------------------------------------------------
-- Table `empresa`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `nomeUsuario` VARCHAR(45) NOT NULL,
  `nomeEmpresa` VARCHAR(45) NOT NULL,
  `cnpj` CHAR(14) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `contato` VARCHAR(45) NOT NULL,
  `fkEndereco` INT NOT NULL,
  PRIMARY KEY (`idEmpresa`),
  
  FOREIGN KEY (`fkEndereco`)
  REFERENCES `endereco`(`idEndereco`)
  );
  

-- Vários usuários podem ter só uma empresa;
-- -----------------------------------------------------
-- Table `usuario`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` INT NOT NULL  AUTO_INCREMENT,
  `nomeUsuario` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `tel` VARCHAR(45) NOT NULL,
  `cargo` VARCHAR(10) NOT NULL,
  `permissao` VARCHAR(15) NOT NULL,
  `fkEmpresa` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  FOREIGN KEY (`fkEmpresa`) REFERENCES `empresa`(`idEmpresa`)
  );

select * from usuario;
drop table usuario;
-- Um totem tem somente uma configuração;
-- -----------------------------------------------------
-- Table `confiPC`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `configPC` (
  `idConfigPC` INT NOT NULL  AUTO_INCREMENT,
  `processadorModelo` VARCHAR(45) NOT NULL,
  `placaMaeModelo` VARCHAR(45) NOT NULL,
  `memoriaRAMModelo` VARCHAR(45) NOT NULL,
  `armazenamentoModelo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idConfigPC`)
);


-- Um estabelecimento tem apenas uma métrica aviso máximo;
-- -----------------------------------------------------
-- Table `metricaAviso`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `metricaAviso`(
  `idMetricaAviso` INT NOT NULL AUTO_INCREMENT,
  `memoriaRAMPorcMax` FLOAT NOT NULL,
  `cpuPorcMax` FLOAT NOT NULL,
  `armazenamentoPorcMax` FLOAT NOT NULL,
  `redePorcMax` FLOAT NOT NULL,
  PRIMARY KEY (`idMetricaAviso`)
);


-- Um estabelecimento pode ter vários totens;
-- -----------------------------------------------------
-- Table `estabelecimento`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estabelecimento` (
  `idEstabelecimento` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `fkEmpresa` INT NOT NULL,
  `fkEndereco` INT NOT NULL,
  `fkMetricaAviso` INT NOT NULL,
  PRIMARY KEY (`idestabelecimento`),
  
  FOREIGN KEY (`fkEmpresa`)
  REFERENCES `empresa` (`idEmpresa`),
  FOREIGN KEY (`fkEndereco`)
  REFERENCES `endereco`(`idEndereco`),
  FOREIGN KEY (`fkMetricaAviso`)
  REFERENCES `metricaAviso`(`idMetricaAviso`)
  );
  
-- Um totem tem só um estabelecimento;
-- -----------------------------------------------------
-- Table `totem`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `totem` (
  `idTotem` INT NOT NULL  AUTO_INCREMENT,
  `modelo` VARCHAR(45) NOT NULL,
  `fkEstabelecimento` INT NOT NULL,
  `fkConfigPC` INT NOT NULL,
  PRIMARY KEY (`idTotem`),
  
    FOREIGN KEY (`fkEstabelecimento`)
    REFERENCES `estabelecimento` (`idEstabelecimento`),
    FOREIGN KEY (`fkConfigPC`)
    REFERENCES `configPC`(`idConfigPC`)
    );

-- Um totem tem vários dados;
-- -----------------------------------------------------
-- Table `dado`;
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dado` (
  `idDado` INT NOT NULL  AUTO_INCREMENT,
  `memoriaRAMPorc` FLOAT NOT NULL,
  `cpuPorc` FLOAT NOT NULL,
  `armazenamentoPorc` FLOAT NOT NULL,
  `redePorc` FLOAT NOT NULL,
  `fkTotem` INT NOT NULL,
  `fkEstabelecimento` INT NOT NULL,
  `fkConfigPC` INT NOT NULL,
  `fkMetricaAviso` INT NOT NULL,
  PRIMARY KEY (`idDado`),
  
  FOREIGN KEY (`fkTotem`)
  REFERENCES `totem`(`idTotem`),
  FOREIGN KEY (`fkEstabelecimento`)
  REFERENCES `estabelecimento`(`idEstabelecimento`),
  FOREIGN KEY (`fkConfigPC`)
  REFERENCES `configPC`(`idConfigPC`),
  FOREIGN KEY (`fkMetricaAviso`)
  REFERENCES `metricaAviso`(`idMetricaAviso`)
);



-- Criação da procedure para a junção de mais de duas tabelas
DELIMITER 
CREATE DEFINER=`root`@`localhost` PROCEDURE `inserirEmpresa`(
in NomeUsuario VARCHAR(100),
in NomeEmpresa VARCHAR(30),
in Cnpj VARCHAR(14),
in Email VARCHAR(50),
in Senha VARCHAR(60),
in Contato VARCHAR(15),
in Cidade VARCHAR(60),
in Logradouro VARCHAR(70),
in Bairro VARCHAR(70), 
in Numero INT,
in Cep CHAR(9),
in Estado VARCHAR(45)
)
BEGIN
START TRANSACTION;
	 INSERT INTO endereco(`logradouro`,`cep`,`numero`,`cidade`,`bairro`,`estado`)values
     (Logradouro,Cep,Numero,Cidade,Bairro,Estado);
	select LAST_INSERT_ID() into @idEnd;
    Insert Into Empresa(`nomeUsuario`,`nomeEmpresa`,`cnpj`,`email`,`senha`,`contato`,`fkEndereco`)
    values(NomeUsuario,NomeEmpresa,Cnpj,Email,Senha,Contato, @idEnd);
COMMIT;
END
DELIMITER ;
-- CALL inserirEmpresa('asdfasd asdf', 'testepf', '12312312312312',  'thiago@sptech.com', 'U2VuaGFAMTIz', '11949849509','sao paulo','asdfasdf','123','asdfasdf','04144000','PI');
 
 -- Como chamar a procedure e inserir os dados para as tabelas indicadas
 -- CALL inserirEmpresa('nomeUsuario','nomeEmpresa','cnpj','email','senha','contato','cidade','logradouro','bairro',12,'cep','estado');

 DELIMITER 
CREATE DEFINER=`aluno`@`localhost` PROCEDURE `inserirEstabelecimento`(
	in NomeEstabelecimento VARCHAR(100),
	in Cidade VARCHAR(60),
	in Logradouro VARCHAR(70),
	in Bairro VARCHAR(70), 
	in Numero INT,
	in Cep CHAR(9),
	in Estado VARCHAR(45),
	in memoriaRAMPorcMax FLOAT,
	in cpuPorcMax FLOAT,
	in armazenamentoPorcMax FLOAT,
	in redePorcMax FLOAT,
	in fkEmpresa INT
)
BEGIN
	START TRANSACTION;
	INSERT INTO endereco(`logradouro`,`cep`, `numero`,`cidade`,`bairro`,`estado`)
	VALUES(Logradouro, Cep, Numero, Cidade, Bairro, Estado);
	SELECT LAST_INSERT_ID() INTO @idEnd;
	INSERT INTO metricaAviso (`memoriaRAMPorcMax`,`cpuPorcMax`,`armazenamentoPorcMax`,`redePorcMax`)
	VALUES (memoriaRAMPorcMax, cpuPorcMax, armazenamentoPorcMax, redePorcMax);
	SELECT LAST_INSERT_ID() INTO @idMetrica;
	INSERT INTO Estabelecimento(`nome`,`fkEmpresa`,`fkEndereco`,`fkMetricaAviso`)
	VALUES(NomeEstabelecimento, fkEmpresa, @idEnd, @idMetrica);
	COMMIT;
END
DELIMITER ;
-- CALL inserirEmpresa('Giovanna B', 'teste1', '12312312312312',  'gi@gmail.com', 'U2VuaGFAMTIz', '11949849509','Criciuma','asafds','asdv', '173','04144000','AL');
-- CALL inserirEstabelecimento('${nome}', '${Cidade}', '${lougradouro}',  '${bairro','${Numero}' ,'${cep}', '${estado}','${memoriaRAMPorcMin}','${cpuPorcMax}','${armazenamentoPorcMin}','${redePorcMin}','${fkEmpresa}');

DELIMITER 
CREATE DEFINER=`root`@`localhost` PROCEDURE `inserirTotem`(
in modelo VARCHAR(100),
in processadorModelo VARCHAR(30),
in placaMaeModelo VARCHAR(14),
in memoriaRAMModelo VARCHAR(50),
in armazenamentoModelo VARCHAR(60),
in nomeEstabelecimento VARCHAR(15),
)
BEGIN
START TRANSACTION;
	 SELECT id FROM estabelecimento WHERE 
	select LAST_INSERT_ID() into @idEnd;
    Insert Into Empresa(`nomeUsuario`,`nomeEmpresa`,`cnpj`,`email`,`senha`,`contato`,`fkEndereco`)
    values(NomeUsuario,NomeEmpresa,Cnpj,Email,Senha,Contato, @idEnd);
COMMIT;
END
DELIMITER ;