var database = require("../database/config");

function buscarUltimasMedidas(idTotem, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        console.log("aqui no Azure")
        instrucaoSql = `select top ${limite_linhas} processadorPorc as processador, 
        memoriaPorc as memoria,
        format(dataHora, 'HH:mm:ss') as momento_grafico 
        from Dados where fkTotem = ${idTotem}
        order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select top ${limite_linhas} processadorPorc as processador, 
        memoriaPorc as memoria,
        format(dataHora, 'HH:mm:ss') as momento_grafico 
        from Dados where fkTotem = ${idTotem}
        order by id desc`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        processadorPorc as processador, 
        memoriaPorc as memoria,  
        CONVERT(varchar, dataHora, 108) as momento_grafico, 
        from Dados where fkTotem = ${idTotem}
        order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select
        processadorPorc as processador, 
        memoriaPorc as memoria,  
        DATE_FORMAT( dataHora,'%H:%i:%s') as momento_grafico, 
        from Dados where fkTotem = ${idTotem}
        order by id desc limit 1
       `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasBarra(fkEstabelecimento) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        console.log("aqui no Azure")
        instrucaoSql = `SELECT TOP 5 
        DATEPART(ISO_WEEK, dataOcorrencia) AS semana, COUNT(idOcorrencias) AS numero_ocorrencias, problema
        FROM ocorrencias
        WHERE fkEstabelecimento = ${fkEstabelecimento}
        GROUP BY DATEPART(ISO_WEEK, dataOcorrencia), problema
        ORDER BY semana`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATEPART(ISO_WEEK, dataOcorrencia) AS semana, COUNT(idOcorrencias) AS numero_ocorrencias, problema
        FROM ocorrencias
        WHERE fkEmpresa = ${fkEstabelecimento}
        GROUP BY DATEPART(ISO_WEEK, dataOcorrencia), problema
        ORDER BY semana`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function dadosMonitoramento(idTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        processadorPorc as processador, 
        cpuhz as cpuVelocidade,
        totalProcessos as processos,
        threadsCpu as threads,
        memoriaTotal as memTotal,
        memoriaDisponivel as menDisp,
        memoriaEmUso as menUso,
        TamanhoDisco as tamDisco,
        LeituraDisco as leiDisco,
        EscritaDisco as escDisco,
        TempoTransferencia as tempoTrans,
        NomeRede as nomRede,
        Hostname as hostNameRede,
        NomeDeDominio as NomeDominio 
        from Dados where fkTotem = ${idTotem}
        order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select
        processadorPorc as processador, 
        cpuhz as cpuVelocidade,
        totalProcessos as processos,
        threadsCpu as threads,
        memoriaTotal as memTotal,
        memoriaDisponivel as menDisp,
        memoriaEmUso as menUso,
        TamanhoDisco as tamDisco,
        LeituraDisco as leiDisco,
        EscritaDisco as escDisco,
        TempoTransferencia as tempoTrans,
        NomeRede as nomRede,
        Hostname as hostNameRede,
        NomeDeDominio as NomeDominio  
        DATE_FORMAT( dataHora,'%H:%i:%s') as momento_grafico, 
        from Dados where fkTotem = ${idTotem}
        order by id desc limit 1
       `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarDadosTotem(idEstabelecimento) {
    console.log("banco")
    let instrucao = `
    select idTotem, serialTotem from totem where fkEstabelecimento = ${idEstabelecimento};
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}



module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    listarDadosTotem,
    dadosMonitoramento,
    buscarUltimasMedidasBarra,

}

