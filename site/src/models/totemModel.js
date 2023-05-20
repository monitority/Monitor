var database = require("../database/config")

function listar(fkEmpresa) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT t.idTotem, t.modelo, t.processadorModelo, t.placaMaeModelo, t.memoriaRAMModelo, t.armazenamentoModelo, t.sistemaOperacional, e.nome from totem t inner join estabelecimento e on t.fkEstabelecimento = e.idEstabelecimento where e.fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirTotem(idTotem) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirTotem()");
    var instrucao = `
        DELETE FROM Totem where idTotem = '${idTotem}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarTotem(idTotem, nome, fkEndereco, fkMetricaAviso) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarTotem()");
    var instrucao = `
        UPDATE Totem SET nome = '${nome}', fkEndereco = '${fkEndereco}', fkMetricaAviso = '${fkMetricaAviso}' WHERE idTotem = '${idTotem}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarTotem(modelo, processador, placaMae, ram, disco, so, fkEstabelecimento, idSerial) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", modelo, processador, placaMae, ram, disco, so, fkEstabelecimento);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao =  `INSERT INTO totem (modelo, processadorModelo, placaMaeModelo, memoriaRAMModelo, armazenamentoModelo, sistemaOperacional, fkEstabelecimento, serialTotem)
    VALUES ('${modelo}', '${processador}', '${placaMae}', '${ram}', '${disco}', '${so}', '${fkEstabelecimento}', '${idSerial}');
    ;

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosEstabelecimentos(fkEmpresa) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosEstabelecimentos()");
    var instrucao = `
    SELECT idEstabelecimento, nome FROM estabelecimento where fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    listar,
    excluirTotem,
    atualizarTotem,
    cadastrarTotem,
    buscarDadosEstabelecimentos,
};