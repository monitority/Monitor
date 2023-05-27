var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idTotem", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idTotem", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/listarDadosTotem/:idEstabelecimento", function (req, res) {
    medidaController.listarDadosTotem(req, res);
});

module.exports = router;