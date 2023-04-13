var estabelecimentoModel = require("../models/estabelecimentoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA estabelecimentoController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    estabelecimentoModel.listar(fkEmpresa)
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

function excluirEstabelecimento(req, res) {
    var idEstabelecimento = req.body.idEstabelecimentoServer;
    estabelecimentoModel.excluirEstabelecimento(idEstabelecimento)
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

function atualizarEstabelecimento(req, res) {
    var idEstabelecimento = req.body.idEstabelecimentoServer;
    var nome = req.body.nomeServer;
    var fkEndereco = req.body.fkEnderecoServer;
    var fkMetricaAviso = req.body.fkMetricaAvisoServer;

    estabelecimentoModel.atualizarEstabelecimento(idEstabelecimento, nome, fkEndereco, fkMetricaAviso)
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

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var fkEndereco = req.body.fkEnderecoServer;
    var fkMetricaAviso = req.body.fkMetricaAvisoServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A Empresa está undefined!");
    } else if (fkEndereco == undefined) {
        res.status(400).send("O Endereço está undefined!");
    } else if(fkMetricaAviso == undefined){
        res.status(400).send("A métrica está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo EstabelecimentoModel.js
        estabelecimentoModel.cadastrar(nome, fkEmpresa, fkEndereco, fkMetricaAviso)
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

module.exports = {
    listar,
    testar,
    excluirEstabelecimento,
    atualizarEstabelecimento,
    cadastrar,
}