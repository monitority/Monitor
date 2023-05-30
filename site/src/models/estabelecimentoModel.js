var database = require("../database/config")

function listar(fkEmpresa) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT idEstabelecimento, nome, logradouro, bairro, cep, cidade, estado, numero, prioridade FROM estabelecimento 
    join endereco on fkendereco = idEndereco where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirEstabelecimento(idEstabelecimento) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirEstabelecimento()");
    var instrucao = `
        DELETE FROM estabelecimento where idEstabelecimento = ${idEstabelecimento};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEstabelecimento(idEstabelecimento, nome, fkEndereco, fkMetricaAviso) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEstabelecimento()");
    var instrucao = `
        UPDATE estabelecimento SET nome = '${nome}', fkEndereco = '${fkEndereco}', fkMetricaAviso = '${fkMetricaAviso}' WHERE idEstabelecimento = '${idEstabelecimento}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarEstabelecimento(fkEmpresa, nome, lougradouro, bairro, cep, cidade, estado, numero, cpuMax, ramMax, prioridade) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, nome, lougradouro, bairro, cep, cidade, estado, numero, cpuMax, ramMax, );
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao =  `EXEC inserirEstabelecimento'${nome}', '${cidade}', '${lougradouro}',  '${bairro}', ${numero}, '${cep}', '${estado}', ${cpuMax},${ramMax},${fkEmpresa},${prioridade};

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    excluirEstabelecimento,
    atualizarEstabelecimento,
    cadastrarEstabelecimento,
};
