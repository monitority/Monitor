var kpiModel = require("../models/kpiModel");

var sessoes = [];

function kpiPercentualCpu(req, res){
    var idTotem = req.params.idTotem

    kpiModel.kpiPercentualCpu(idTotem).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiPercentualRam(req, res){
    var idTotem = req.params.idTotem

    kpiModel.kpiPercentualRam(idTotem).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    kpiPercentualCpu,
    kpiPercentualRam,
}