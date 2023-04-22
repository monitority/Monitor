var usuarioModel = require("../models/funcionarioModel");

var sessoes = [];

function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var senha = req.body.senhaServer;
    var cargo = req.body.cargoServer;
    var email = req.body.emailServer;
    var contato = req.body.contatoServer;
    var funcao = req.body.funcaoServer;
    var idEmpresa = req.body.idEmpresa;

    funcionarioModel.cadastrarFuncionario(nome, senha,  cargo, email, contato, funcao, idEmpresa)
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
    cadastrarFuncionario,
}