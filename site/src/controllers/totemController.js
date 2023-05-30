var totemModel = require("../models/totemModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA totemController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    var fkEmpresa = req.params.idEmpresa;
    totemModel.listar(fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function excluirTotem(req, res) {
    var idtotem = req.body.idtotemServer;
    totemModel.excluirtotem(idtotem)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarTotem(req, res) {
    var idtotem = req.body.idtotemServer;
    var nome = req.body.nomeServer;
    var fkEndereco = req.body.fkEnderecoServer;
    var fkMetricaAviso = req.body.fkMetricaAvisoServer;

    totemModel.atualizartotem(idtotem, nome, fkEndereco, fkMetricaAviso)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarTotem(req, res) {
    console.log("to na totem controller")
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html;
    var modelo = req.body.modeloServer;
    var processador = req.body.processadorServer;
    var placaMae = req.body.placaMaeServer;
    var ram = req.body.ramServer;
    var disco = req.body.armazenamentoServer;
    var so = req.body.soServer;
    var fkEstabelecimento = req.body.fkEstabelecimento;
    var idSerial = req.body.serialServer
    console.log(modelo, processador, placaMae, ram, disco, so, fkEstabelecimento, idSerial)
    // Faça as validações dos valores
    if (modelo == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (processador == undefined) {
        res.status(400).send("A Empresa está undefined!");
    } else if (placaMae == undefined) {
        res.status(400).send("O Endereço está undefined!");
    } else if(ram == undefined){
        res.status(400).send("A métrica está undefined!");
    } else if(disco == undefined){
        res.status(400).send("A métrica está undefined!");
    }else if(so == undefined){
        res.status(400).send("A métrica está undefined!");
    }else if(fkEstabelecimento == undefined){
        res.status(400).send("A métrica está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo totemModel.js
        totemModel.cadastrarTotem(modelo, processador, placaMae, ram, disco, so, fkEstabelecimento, idSerial)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarDadosEstabelecimentos(req, res) {
    var fkEmpresa = req.params.idEmpresa;
    totemModel.buscarDadosEstabelecimentos(fkEmpresa)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
module.exports = {
    listar,
    testar,
    excluirTotem,
    atualizarTotem,
    cadastrarTotem,
    buscarDadosEstabelecimentos,
}