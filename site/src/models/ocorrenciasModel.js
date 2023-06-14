var database = require("../database/config")

function listar(fkEmpresa, filtro) {
    console.log("ACESSEI O OCORRENCIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");
    console.log(filtro)

    if (filtro == 'todos') {
        var instrucao = `SELECT e.nome, o.problema, o.statusOcorrencia, u.nomeUsuario FROM ocorrencias o
        JOIN estabelecimento e ON o.fkEstabelecimento = e.idEstabelecimento
        JOIN usuario u ON o.fkUsuario = u.idUsuario
        WHERE o.fkEmpresa = ${fkEmpresa}`;
    } else if (filtro == 'Concluído') {
        var instrucao = `SELECT e.nome, o.problema, o.statusOcorrencia, u.nomeUsuario FROM ocorrencias o
        JOIN estabelecimento e ON o.fkEstabelecimento = e.idEstabelecimento
        JOIN usuario u ON o.fkUsuario = u.idUsuario
        WHERE o.fkEmpresa = ${fkEmpresa} AND o.statusOcorrencia = '${filtro}'`;
    } else if (filtro == 'Aberto') {
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
                                                 WHERE e.fkEmpresa = 9
                                             ) AS d
                                             JOIN metricaAviso ma ON d.fkMetricaAviso = ma.idMetricaAviso
                                             WHERE d.row_num <= 10
                                             GROUP BY d.fkTotem
                                         ) AS counts
                                         JOIN totem t ON counts.fkTotem = t.idTotem
                                         JOIN estabelecimento e ON t.fkEstabelecimento = e.idEstabelecimento
                                         WHERE (counts.memoriaRAMPorc_count >= 7
                                             OR counts.cpuPorc_count >= 7)
                                             AND t.idTotem NOT IN (
                                                                         SELECT o.fkTotem
                                                                         FROM ocorrencias o
                                                                         JOIN totem t ON o.fkTotem = t.idTotem
                                                                         JOIN estabelecimento e ON o.fkEstabelecimento = e.idEstabelecimento
                                                                         JOIN empresa em ON e.fkEmpresa = em.idEmpresa
                                                                         WHERE o.statusOcorrencia = 'Aberto' AND em.idEmpresa = 9
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

    if (prioridade == 'Vip') {
        var instrucao = `SELECT * FROM usuario WHERE fkEmpresa = ${fkEmpresa} ORDER BY cargo DESC`;
    } else {
        var instrucao = `SELECT * FROM usuario WHERE fkEmpresa = ${fkEmpresa} AND cargo <> 'gerente' ORDER BY cargo asc`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function count(fkEstabelecimento) {
    console.log("TO PEGANDO A QTD DE OCORRENCIA")
    var instrucaoQtd = `select count(*) from ocorrencias where fkEstabelecimento  = ${fkEstabelecimento}`
    console.log("TO FAZENDO A INSTRUCAO PRA PEGAR O QTD OCORRECIA " + instrucaoQtd)

    return database.executar(instrucaoQtd);
}

module.exports = {
    listar,
    excluirEstabelecimento,
    atualizarEstabelecimento,
    listarEstabelecimentosProblema,
    cadastrarOcorrencia,
    listarFunc,
    count
};
