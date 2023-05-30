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

function listarEstabelecimentosProblema(fkEmpresa) {
    console.log("ACESSEI O OCORRENCIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `SELECT t.idTotem, t.serialTotem, t.modelo, e.nome, e.idEstabelecimento, e.prioridade,
                            CASE WHEN memoriaRAMPorc_count >= 7 THEN 'Ram' ELSE NULL END AS tipo_excedido_RAM,
                            CASE WHEN cpuPorc_count >= 7 THEN 'CPU' ELSE NULL END AS tipo_excedido_CPU
                        FROM (
                            SELECT d.fkTotem,
                                SUM(CASE WHEN d.memoriaPorc > ma.memoriaRAMPorcMax THEN 1 ELSE 0 END) AS memoriaRAMPorc_count,
                                SUM(CASE WHEN d.processadorPorc > ma.cpuPorcMax THEN 1 ELSE 0 END) AS cpuPorc_count
                            FROM (
                                SELECT d.*,
                                    ROW_NUMBER() OVER (PARTITION BY d.fkTotem ORDER BY d.dataHora DESC) AS row_num
                                FROM dados d
                                INNER JOIN totem t ON d.fkTotem = t.idTotem
                                INNER JOIN estabelecimento e ON t.fkEstabelecimento = e.idEstabelecimento
                                WHERE e.fkEmpresa = ${fkEmpresa}
                            ) AS d
                            JOIN metricaAviso ma ON d.fkMetricaAviso = ma.idMetricaAviso
                            WHERE d.row_num <= 10
                            GROUP BY d.fkTotem
                        ) AS counts
                        JOIN totem t ON counts.fkTotem = t.idTotem
                        JOIN estabelecimento e ON t.fkEstabelecimento = e.idEstabelecimento
                        WHERE (counts.memoriaRAMPorc_count >= 7
                            OR counts.cpuPorc_count >= 7)
                            AND NOT EXISTS (
                                SELECT 1
                                FROM ocorrencias o
                                join totem t on o.fkTotem = t.idTotem 
                                join dados d on d.fkTotem = t.idTotem
                                WHERE  o.statusOcorrencia = 'Aberto'
                            )
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
function cadastrarOcorrencia(problema, fkFunc, fkEmpresa, fkEstabelecimento, fkTotem) {
    console.log("ACESSEI O OCORRÊNCIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", problema, fkFunc, fkEmpresa, fkEstabelecimento, fkTotem);
    console.log("kd o console porra")
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO ocorrencias (statusOcorrencia, problema, fkEstabelecimento, fkUsuario, fkEmpresa, fkTotem) 
            VALUES('Aberto', '${problema}', ${fkEstabelecimento}, ${fkFunc}, ${fkEmpresa}, ${fkTotem});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFunc(fkEmpresa, fkEstabelecimento, prioridade) {
    console.log("ACESSEI O OCORRENCIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listarFunc()" + fkEmpresa, fkEstabelecimento, prioridade);

    var qtdOcorrencias = pegarQtdOcorrencia(fkEstabelecimento);

    if (qtdOcorrencias >= 10) {
        var instrucao = `SELECT u.nomeUsuario, COUNT(*) AS totalOcorrenciasConcluidas
        FROM ocorrencias o
        JOIN usuario u ON o.fkUsuario = u.idUsuario
        WHERE o.fkEstabelecimento = ${fkEstabelecimento}
        GROUP BY u.nomeUsuario
        order by totalOcorrenciasConcluidas desc`;
    } else if (prioridade == 'Vip') {
        var instrucao = `SELECT * from usuario where fkEmpresa = ${fkEmpresa} order by cargo desc`;
    } else {
        var instrucao = `SELECT * from usuario where fkEmpresa = ${fkEmpresa} order by cargo asc`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarQtdOcorrencia(fkEstabelecimento) {
    var instrucaoQtd = `select count(*) from ocorrencias where fkEstabelecimento  = ${fkEstabelecimento}`
    return database.executar(instrucaoQtd);
}

module.exports = {
    listar,
    excluirEstabelecimento,
    atualizarEstabelecimento,
    listarEstabelecimentosProblema,
    cadastrarOcorrencia,
    listarFunc,
};
