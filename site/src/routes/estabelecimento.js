var express = require("express");
var router = express.Router();

var estabelecimentoController = require("../controllers/estabelecimentoController");

router.get("/", function (req, res) {
    estabelecimentoController.testar(req, res);
});

router.get("/estabelecimento/listar/:fkEmpresa", function (req, res) {
    estabelecimentoController.listar(req, res);
});

router.delete("/estabelecimento/excluir/:idEstabelecimento", function (req, res) {
    estabelecimentoController.excluirEstabelecimento(req, res);
});

router.put("/estabelecimento/atualizar/:idEstabelecimento", function (req, res) {
    estabelecimentoController.atualizarEstabelecimento(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de estabelecimentoController.js
router.post("/estabelecimento/cadastrar/:idEmpresa", function (req, res) {
    estabelecimentoController.cadastrar(req, res);
});




module.exports = router;