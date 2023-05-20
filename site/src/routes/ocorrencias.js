var express = require("express");
var router = express.Router();

var ocorrenciaController = require("../controllers/ocorrenciasController");

router.get("/", function (req, res) {
    ocorrenciaController.testar(req, res);
});

router.get("/listar/:idEmpresa/:filtro", function (req, res) {
    ocorrenciaController.listar(req, res);
});

router.delete("/excluir/:idTotem", function (req, res) {
    ocorrenciaController.excluirTotem(req, res);
});

router.put("/atualizar/:idTotem", function (req, res) {
    ocorrenciaController.atualizarTotem(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de ocorrenciaController.js
router.post("/cadastrarTotem", function (req, res) {
    ocorrenciaController.cadastrarTotem(req, res);
});

router.get("/listarEstabelecimentos/:idEmpresa", function(req, res){
    console.log("estou na listarEstabelecimento")
    ocorrenciaController.buscarDadosEstabelecimentos(req, res);
});



module.exports = router;