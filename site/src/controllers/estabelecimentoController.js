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

function listarEstabelecimentosPorUsuario(req, res){
    let fkUsuario = req.params.fkUsuario;
    estabelecimentoModel.listarEstabelecimentosPorUsuario(fkUsuario)
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

function cadastrarEstabelecimento(req, res) {
    console.log("to na estabelecimento controller")
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkEmpresa = req.body.fkEmpresa;
    var nome = req.body.empresaNomeServer;
    var lougradouro = req.body.logradouroServer;
    var bairro = req.body.bairroServer;
    var cep = req.body.cepServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;
    var numero = req.body.numeroServer;
    var cpuMax = req.body.metricaCpuServer;
    var ramMax = req.body.metricaRamServer;
    var discoMax = req.body.metricaDiscoServer;
    console.log(fkEmpresa, nome, lougradouro, bairro, cep, cidade, estado, numero, cpuMax, ramMax, discoMax)
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("A Empresa está undefined!");
    } else if (cpuMax == undefined) {
        res.status(400).send("O Endereço está undefined!");
    } else if(ramMax == undefined){
        res.status(400).send("A métrica está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo EstabelecimentoModel.js
        estabelecimentoModel.cadastrarEstabelecimento( fkEmpresa, nome, lougradouro, bairro, cep, cidade, estado, numero, cpuMax, ramMax, discoMax)
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
    listarEstabelecimentosPorUsuario,
    testar,
    excluirEstabelecimento,
    atualizarEstabelecimento,
    cadastrarEstabelecimento,
}