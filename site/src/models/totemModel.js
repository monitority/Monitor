var database = require("../database/config")

function listar(fkEmpresa) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT t.*, e.nome from totem t inner join estabelecimento e on t.fkEstabelecimento = e.idEstabelecimento where e.fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirTotem(idTotem) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirTotem()");
    var instrucao = `
        DELETE FROM totem where idTotem = ${idTotem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idUpdate, novoDado, tabela, coluna) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar() QUE ATUALIZA TODOS AS TABELAS" + ` idUpadate: ${idUpdate}, Novo dado ${novoDado}, tabela ${tabela} coluna${coluna}`);
    
    if(tabela == 'totem'){
        var instrucao = `
        UPDATE ${tabela} SET ${coluna} = ${novoDado} WHERE idTotem = ${idUpdate};
        `;
        
    }else if(tabela == 'usuario'){
        var instrucao = `
        UPDATE ${tabela} SET ${coluna} = ${novoDado} WHERE idUsuario = ${idUpdate};
        `
    }else if(tabela == 'estabelecimento'){
        var instrucao = `
        UPDATE ${tabela} SET ${coluna} = ${novoDado} WHERE idEstabelecimento = ${idUpdate};
        `
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarTotem(modelo, processador, placaMae, ram, disco, so, fkEstabelecimento, idSerial) {
    console.log("ACESSEI O Totem MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", modelo, processador, placaMae, ram, disco, so, fkEstabelecimento);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao =  `INSERT INTO totem (modelo, fkEstabelecimento, serialTotem, processadorModelo, placaMaeModelo, memoriaRAMModelo, armazenamentoModelo, sistemaOperacional)
    VALUES ('${modelo}', '${fkEstabelecimento}',  '${idSerial}', '${processador}', '${placaMae}', '${ram}', '${disco}', '${so}')
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
    atualizar,
    cadastrarTotem,
    buscarDadosEstabelecimentos,
};