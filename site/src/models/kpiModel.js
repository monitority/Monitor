var database = require("../database/config")

function kpiPercentualCpu(idTotem) {
    console.log("ACESSEI O KPI MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiPercentualCpu()", idTotem);

    var instrucao = `
    SELECT maior_valor, m.*
        FROM (
    SELECT MAX(processadorPorc) AS maior_valor
    FROM (
        SELECT TOP 10 processadorPorc
        FROM [dbo].[Dados] d
        JOIN [dbo].[totem] ON idTotem = d.fkTotem
        WHERE idTotem = ${idTotem}
        ORDER BY id DESC
    ) AS subquery
    ) AS subquery_resultado
    JOIN [dbo].[Dados] d ON d.processadorPorc = subquery_resultado.maior_valor
    JOIN [dbo].[totem] ON idTotem = d.fkTotem
    join [dbo].[metricaAviso] m on d.fkMetricaAviso = m.idMetricaAviso 
    WHERE idTotem = ${idTotem}
    ORDER BY d.id DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function kpiPercentualRam(idTotem) {
    console.log("ACESSEI O KPI MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiPercentualRam()", idTotem);

    var instrucao = `
    SELECT maior_valor, m.*
        FROM (
    SELECT MAX(memoriaPorc) AS maior_valor
    FROM (
        SELECT TOP 10 memoriaPorc
        FROM [dbo].[Dados] d
        JOIN [dbo].[totem] ON idTotem = d.fkTotem
        WHERE idTotem = ${idTotem}
        ORDER BY id DESC
    ) AS subquery
    ) AS subquery_resultado
    JOIN [dbo].[Dados] d ON d.memoriaPorc = subquery_resultado.maior_valor
    JOIN [dbo].[totem] ON idTotem = d.fkTotem
    join [dbo].[metricaAviso] m on d.fkMetricaAviso = m.idMetricaAviso 
    WHERE idTotem = ${idTotem}
    ORDER BY d.id DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    kpiPercentualCpu,
    kpiPercentualRam,
};