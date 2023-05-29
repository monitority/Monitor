var database = require("../database/config")

function listar(fkEmpresa) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT nome, logradouro, bairro, cep, cidade, estado, numero FROM estabelecimento 
    join endereco on fkendereco = idEndereco where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarEstabelecimentosPorUsuario(fkUsuario, selectFiltro) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarEstabelecimentosPorUsuario()");
    if (selectFiltro == "select-todos") {
        var instrucao = `
    select o.statusOcorrencia,
        o.problema,
        o.fkEstabelecimento,
        o.fkUsuario,
        o.idOcorrencias,
        e.nome,
        e.idEstabelecimento,
        en.logradouro,
        en.numero from [dbo].[ocorrencias] as o
        join [dbo].[estabelecimento] as e 
        on o.fkEstabelecimento = e.idEstabelecimento
        join [dbo].[endereco] as en on en.idEndereco = e.fkEndereco
        join [dbo].[usuario] as u on o.fkUsuario = u.idUsuario where o.fkUsuario = ${fkUsuario};
    `
    } else if (selectFiltro == "select-aberto") {
        var instrucao = `
        select o.statusOcorrencia,
            o.problema,
            o.fkEstabelecimento,
            o.fkUsuario,
            o.idOcorrencias,
            e.nome,
            e.idEstabelecimento,
            en.logradouro,
            en.numero from [dbo].[ocorrencias] as o
            join [dbo].[estabelecimento] as e 
            on o.fkEstabelecimento = e.idEstabelecimento
            join [dbo].[endereco] as en on en.idEndereco = e.fkEndereco
            join [dbo].[usuario] as u on o.fkUsuario = u.idUsuario where o.fkUsuario = ${fkUsuario} AND o.statusOcorrencia = 'Aberto';
        `
    }else if(selectFiltro == "select-concluido"){
        var instrucao = `
        select o.statusOcorrencia,
            o.problema,
            o.fkEstabelecimento,
            o.fkUsuario,
            o.idOcorrencias,
            e.nome,
            e.idEstabelecimento,
            en.logradouro,
            en.numero from [dbo].[ocorrencias] as o
            join [dbo].[estabelecimento] as e 
            on o.fkEstabelecimento = e.idEstabelecimento
            join [dbo].[endereco] as en on en.idEndereco = e.fkEndereco
            join [dbo].[usuario] as u on o.fkUsuario = u.idUsuario where o.fkUsuario = ${fkUsuario} AND o.statusOcorrencia = 'Concluído';
        `
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateStatusConcluido(idOcorrencias) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarEstabelecimentosPorUsuario()");
    let instrucao = `
    update ocorrencias set statusOcorrencia = 'Concluído' where idOcorrencias = ${idOcorrencias};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateStatusAberto(idOcorrencias) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarEstabelecimentosPorUsuario()");
    let instrucao = `
    update ocorrencias set statusOcorrencia = 'Aberto' where idOcorrencias = ${idOcorrencias};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtdTotens(fkEstabelecimento) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarEstabelecimentosPorUsuario()");
    let instrucao = `
    select COUNT(idTotem) AS quantidadeTotems from totem where fkEstabelecimento = ${fkEstabelecimento};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtdOcorrencias(fkEstabelecimento) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarEstabelecimentosPorUsuario()");
    let instrucao = `
    select COUNT(idOcorrencias) AS quantidadeOcorrencias from ocorrencias where fkEstabelecimento = ${fkEstabelecimento};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirEstabelecimento(idEstabelecimento) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirEstabelecimento()");
    var instrucao = `
        DELETE FROM estabelecimento where idEstabelecimento = '${idEstabelecimento}';
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
function cadastrarEstabelecimento(fkEmpresa, nome, lougradouro, bairro, cep, cidade, estado, numero, cpuMax, ramMax, discoMax) {
    console.log("ACESSEI O ESTABELECIMENTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa, nome, lougradouro, bairro, cep, cidade, estado, numero, cpuMax, ramMax, discoMax);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `EXEC inserirEstabelecimento'${nome}', '${cidade}', '${lougradouro}',  '${bairro}', ${numero}, '${cep}', '${estado}', ${cpuMax},${ramMax},${discoMax},70,${fkEmpresa};

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    qtdTotens,
    listarEstabelecimentosPorUsuario,
    excluirEstabelecimento,
    atualizarEstabelecimento,
    cadastrarEstabelecimento,
    qtdOcorrencias,
    updateStatusConcluido,
    updateStatusAberto,
};