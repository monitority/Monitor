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
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idTotem} 
                    order by id desc limit 1`;
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
}
