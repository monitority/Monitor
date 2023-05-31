var express = require("express");
var router = express.Router();

var ocorrenciasController = require("../controllers/ocorrenciasController");

router.get("/", function (req, res) {
    ocorrenciasController.testar(req, res);
});

router.get("/listar/:idEmpresa/:filtro", function (req, res) {
    console.log("to na rota de listar ocorrencia")
    ocorrenciasController.listar(req, res);
});

router.get("/listarEstabelecimentos/:idEmpresa", function (req, res) {
    console.log("to na rota de listar ocorrencia")
    ocorrenciasController.listarEstabelecimentosProblema(req, res);
});

router.get("/count/:idEstabelecimento", function (req, res) {
    console.log("to na rota de count ocorrencia")
    ocorrenciasController.count(req, res);
});


router.delete("/excluir/:idTotem", function (req, res) {
    ocorrenciasController.excluirTotem(req, res);
});

router.put("/atualizar/:idTotem", function (req, res) {
    ocorrenciasController.atualizarTotem(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de ocorrenciaController.js
router.post("/cadastrarOcorrencia", function (req, res) {
    console.log("estou na rota para cadastrar ocorrência")
    ocorrenciasController.cadastrarOcorrencia(req, res);
});

router.get("/listarFunc/:idEmpresa/:idEstabelecimento/:prioridade", function (req, res) {
    console.log("to na rota de listar ocorrencia")
    ocorrenciasController.listarFunc(req, res);
});



module.exports = router;