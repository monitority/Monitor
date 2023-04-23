var funcionarioModel = require("../models/funcionarioModel");

var sessoes = [];

function listar(req, res) {
    console.log("estou na listarFuncionario controller")
    var idEmpresa = req.params.idEmpresa;
    funcionarioModel.listar(idEmpresa)
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

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var senha = req.body.senhaServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var contato = req.body.contatoServer;
    var permisao = req.body.permissaoServer;
    var idEmpresa = req.body.idEmpresa;

    funcionarioModel.cadastrarFuncionario(nome, senha,  cargo, email, contato, permisao, idEmpresa)
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

module.exports = {
    listar,
    cadastrarFuncionario,
}