var express = require("express");
var router = express.Router();

var ocorrenciasController = require("../controllers/ocorrenciasController");

router.get("/", function (req, res) {
    console.log("estou na raiz")
    ocorrenciasController.testar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    ocorrenciasController.listar(req, res);
});


router.delete("/excluir/:idTotem", function (req, res) {
    ocorrenciasController.excluirTotem(req, res);
});

router.put("/atualizar/:idTotem", function (req, res) {
    ocorrenciasController.atualizarTotem(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de ocorrenciaController.js
router.post("/cadastrarTotem", function (req, res) {
    ocorrenciasController.cadastrarTotem(req, res);
});




module.exports = router;