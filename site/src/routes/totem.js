var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController");

router.get("/", function (req, res) {
    totemController.testar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    totemController.listar(req, res);
});

router.delete("/excluir/:idTotem", function (req, res) {
    totemController.excluirTotem(req, res);
});

router.put("/update/:tabela/:idUpdate/:novoDado/:coluna", function (req, res) {
    totemController.atualizar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de totemController.js
router.post("/cadastrarTotem", function (req, res) {
    totemController.cadastrarTotem(req, res);
});

router.get("/listarEstabelecimentos/:idEmpresa", function(req, res){
    console.log("estou na listarEstabelecimento")
    totemController.buscarDadosEstabelecimentos(req, res);
});



module.exports = router;