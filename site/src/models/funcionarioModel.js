var database = require("../database/config");
function cadastrarFuncionario(nome, senha, cargo, email, contato, permisao, idEmpresa) {
    console.log("ACESSEI O Funcionario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    insert into usuario (nomeUsuario, senha, email, tel, cargo, permissao, fkEmpresa) values 
    ('${nome}', '${senha}', '${email}', '${contato}', '${cargo}','${permisao}',${idEmpresa});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listar(idEmpresa, filtro) {
    console.log("ACESSEI O funcionario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (filtro == 1) {
        var instrucao = `
            SELECT nomeUsuario, email, senha, cargo, permissao, tel FROM usuario where fkEmpresa = ${idEmpresa};
            `
    }else if (filtro == 2) {
        var instrucao = `
        SELECT u.nomeUsuario AS nome_usuario, COUNT(o.idOcorrencias) AS numero_ocorrencias
        FROM empresa e
        JOIN usuario u ON u.fkEmpresa = e.idEmpresa
        JOIN ocorrencias o ON o.fkUsuario = u.idUsuario
        WHERE u.permissao = 'Técnico' AND o.statusOcorrencia = 'Aberto' AND e.idEmpresa = ${idEmpresa}
        GROUP BY u.idUsuario, u.nomeUsuario    
        `
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarFuncionario,
    listar,
}