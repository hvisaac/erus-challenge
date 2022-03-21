const { json, response } = require('express');
const dnaModel = require('../models/dna');

const helloworld = (req, res) => {
    res.json({"Tittle": "Hello World"});
}

const hasMutation = async (req, res) => {
    var dnaArray = req.body;
    var horizontalmutation = false;
    var verticalmutation   = false;
    var diagonal           = false;
    var invdiagonal        = false;
    var mutation           = false;
    var validNB            = 0;
    var response           = "Se encontraron valores que no corresponden a una base nitrogenada"

    var matriz = new Array();

    //fill matriz
    for (var i = 0; i < dnaArray.dna.length; i++){
        var nitrogenBase = Array.from(dnaArray.dna[i])
        matriz.push(nitrogenBase);
    }

    //Validate nitrogen base
    for (var y = 0; y < matriz.length; y++){
        for (var x = 0; x < matriz[y].length; x++){
            if (matriz[y][x] != 'T' && matriz[y][x] != 'A' && matriz[y][x] != 'C' && matriz[y][x] != 'G'){
                console.log(matriz[y][x]);
                validNB++;
            }
        }
    }

    if(validNB < 1){
        for (var y = 0; y < matriz.length; y++){
            var countHorizontal  = 1;
            var countVertical    = 1;

            //horizontal logic 
            if (mutation === false){
                for (var x = 0; x < matriz[y].length; x++){
                    if (matriz[y][x] === matriz[y][x+1]){
                        countHorizontal++;
                        if(countHorizontal === 4){
                            mutation = true;
                            let date  = new Date();
                            let dnaRecord = new dnaModel({
                                date        : date.toDateString(),
                                dna         : dnaArray.dna,
                                hasMutation : mutation
                            });
                            await dnaRecord.save();
                        }
                    } else { countHorizontal = 1 }
                }
            }

            //vertical logic
            if (mutation === false){
                for (var x = 0; x < matriz[y].length; x++){
                    for (var vertical = 0; vertical < matriz.length-1; vertical++){
                            if (matriz[vertical][x] === matriz [vertical+1][x]){
                                countVertical++;
                                if (countVertical === 4){
                                    mutation = true;
                                    let date  = new Date();
                                    let dnaRecord = new dnaModel({
                                        date        : date.toDateString(),
                                        dna         : dnaArray.dna,
                                        hasMutation : mutation
                                    });
                                    await dnaRecord.save();
                            }
                        } else { countVertical = 1 }
                    }
                }
            }

            //diagonal logic
            if (mutation === false){
                if (y<matriz.length-3){
                    for (var x = 0; x < matriz[y].length; x++){
                        var countDiagonal = 1;
                        for (var i = 1; i < matriz.length-(matriz.length-4); i++) {
                            //console.log("y:"+y+",x:"+x+"="+matriz[y][x]);
                            //console.log("dy:"+(y+i)+",dx:"+(x+i)+"="+matriz[y+i][x+i]);
                            if (matriz[y][x] === matriz[y+i][x+i]){
                                countDiagonal++;
                                //console.log(countDiagonal);
                                if (countDiagonal === 4){
                                    mutation = true;
                                    let date  = new Date();
                                    let dnaRecord = new dnaModel({
                                        date        : date.toDateString(),
                                        dna         : dnaArray.dna,
                                        hasMutation : mutation
                                    });
                                    await dnaRecord.save();
                                }
                            } else { countDiagonal = 1 }
                        }
                    }
                }
            }

            //inverted diagonal
            if (mutation === false){
                if (y<matriz.length-3){
                    for (var x = matriz[y].length; x > 1; x--){
                        var countDiagonal = 1;
                        for (var i = 1; i < matriz.length-(matriz.length-4); i++) {
                            //console.log("y:"+y+",x:"+x+"="+matriz[y][x]);
                            //console.log("dy:"+(y+i)+",dx:"+(x-i)+"="+matriz[y+i][x-i]);
                            if (matriz[y][x] === matriz[y+i][x-i]){
                                countDiagonal++;
                                //console.log(countDiagonal);
                                if (countDiagonal === 4){
                                    mutation = true;
                                    let date  = new Date();
                                    let dnaRecord = new dnaModel({
                                        date        : date.toDateString(),
                                        dna         : dnaArray.dna,
                                        hasMutation : mutation
                                    });
                                    await dnaRecord.save();
                                }
                            } else { countDiagonal = 1 }
                        }
                    }
                }
            }
        }
        if (mutation){
            return res.status(403).json({"status":"Forbidden"})
        }
    }

    if (mutation === false && validNB < 1){
        let date  = new Date();
        let dnaRecord = new dnaModel({
            date        : date.toDateString(),
            dna         : dnaArray.dna,
            hasMutation : mutation
        });
        await dnaRecord.save();
        return res.status(200).json({"status":"OK"})
    }

    return res.status(406).json({"status":"Invalid"})      

}

const getStats = async (req, res) => {
    const count_mutations    = await dnaModel.find({ hasMutation: true }).count();
    const count_no_mutations = await dnaModel.find({ hasMutation: false }).count();
    const ratio              = count_mutations/count_no_mutations; 

    let mutations = {
        count_mutations: count_mutations,
        count_no_mutations: count_no_mutations,
        ratio: ratio
    }

    res.json(mutations);
}

const getList = async (req, res) => {
    const list = await dnaModel.find()

    res.json(list)
}

module.exports = {
    helloworld,
    hasMutation,
    getStats,
    getList
}