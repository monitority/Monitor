var ocorrenciaModel = require("../models/ocorrenciasModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA ocorrenciaController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    console.log("estou na listar de ocorrenciasController")
    var fkEmpresa = req.params.idEmpresa;
    var filtro = req.params.filtro;
    ocorrenciaModel.listar(fkEmpresa, filtro)
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

function listarEstabelecimentosProblema(req, res){
    console.log("estou na listar de ocorrenciasController, na listarEstabelecimentosProblema() ")
    var fkEmpresa = req.params.idEmpresa;
    ocorrenciaModel.listarEstabelecimentosProblema(fkEmpresa)
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

function cadastrarOcorrencia(req, res) {
    console.log("to na ocorrencia controller")
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var problema = req.body.problema;
    var fkEmpresa = req.body.fkEmpresa;
    var fkFunc = req.body.fkFunc;
    var fkEstabelecimento = req.body.fkEstabelecimento;
    var fkTotem = req.body.fkTotem;
    console.log(problema + fkFunc + fkEmpresa + fkEstabelecimento + fkTotem)
    // Faça as validações dos valores
    if (problema == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("A Empresa está undefined!");
    } else if (fkFunc == undefined) {
        res.status(400).send("O Endereço está undefined!");
    } else if(fkEstabelecimento == undefined){
        res.status(400).send("A métrica está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo EstabelecimentoModel.js
        ocorrenciaModel.cadastrarOcorrencia(problema, fkFunc, fkEmpresa, fkEstabelecimento, fkTotem)
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

    function listarFunc(req, res){
        console.log("estou na listar de ocorrenciasController, na listarFunc() ")
        var fkEmpresa = req.params.idEmpresa;
        var fkEstabelecimento = req.params.idEstabelecimento
        var prioridade = req.params.prioridade
        ocorrenciaModel.listarFunc(fkEmpresa, fkEstabelecimento, prioridade)
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
    listarEstabelecimentosProblema,
    cadastrarOcorrencia,
    listarFunc,
}