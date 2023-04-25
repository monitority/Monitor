var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/", function (req, res) {
    funcionarioController.testar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    console.log("estou na listar funcionario Router")
    funcionarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.post("/cadastrarfuncionario", function (req, res) {
    funcionarioController.cadastrarFuncionario(req, res);
})


module.exports = router;