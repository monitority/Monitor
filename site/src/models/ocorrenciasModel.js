var database = require("../database/config")

function listar(fkEmpresa, filtro) {
    console.log("ACESSEI O OCORRENCIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");
    console.log(filtro)

    if (filtro == 'todos') {
        var instrucao = `SELECT e.nome, o.problema, o.statusOcorrencia, u.nomeUsuario FROM ocorrencias o
        JOIN estabelecimento e ON o.fkEstabelecimento = e.idEstabelecimento
        JOIN usuario u ON o.fkUsuario = u.idUsuario
        WHERE o.fkEmpresa = ${fkEmpresa}`;
    } else if (filtro == 'concluído') {
        var instrucao = `SELECT e.nome, o.problema, o.statusOcorrencia, u.nomeUsuario FROM ocorrencias o
        JOIN estabelecimento e ON o.fkEstabelecimento = e.idEstabelecimento
        JOIN usuario u ON o.fkUsuario = u.idUsuario
        WHERE o.fkEmpresa = ${fkEmpresa} AND o.statusOcorrencia = '${filtro}'`;
    } else if (filtro == 'aberto') {
        var instrucao = `SELECT e.nome, o.problema, o.statusOcorrencia, u.nomeUsuario FROM ocorrencias o
        JOIN estabelecimento e ON o.fkEstabelecimento = e.idEstabelecimento
        JOIN usuario u ON o.fkUsuario = u.idUsuario
        WHERE o.fkEmpresa = ${fkEmpresa} AND o.statusOcorrencia = '${filtro}'`;
    }
    
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
    function cadastrarOcorrencia(problema, fkFunc, fkEmpresa, fkEstabelecimento) {
        console.log("ACESSEI O OCORRÊNCIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", problema, fkFunc, fkEmpresa, fkEstabelecimento);
        console.log("kd o console porra")
        // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        //  e na ordem de inserção dos dados.
        var instrucao = `
        INSERT INTO ocorrencias (statusOcorrencia, problema, fkEstabelecimento, fkUsuario, fkEmpresa) 
            VALUES('aberto', '${problema}', ${fkEstabelecimento}, ${fkFunc}, ${fkEmpresa});
    `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

    module.exports = {
        listar,
        excluirEstabelecimento,
        atualizarEstabelecimento,
        cadastrarOcorrencia,
    };
