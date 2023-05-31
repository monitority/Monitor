var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController") 

router.get("/kpiPercentualCpu/:idTotem",function(req, res){
    kpiController.kpiPercentualCpu(req, res);
});

router.get("/kpiPercentualRam/:idTotem",function(req, res){
    kpiController.kpiPercentualRam(req, res);
});

module.exports = router;