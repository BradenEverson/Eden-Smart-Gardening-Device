const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const cors = require('cors');
const { json } = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.sendFile("")
});

app.get("/api/plants/:PlantId", (req, res) => {
    console.log(req.params.PlantId);
    fs.readFile('Data/plantSystems.json', (err, data) => {
        if(err) throw err;
        let jsonData = JSON.parse(data);
        try{
            jsonData.systems = jsonData.systems.filter((elem) => {
                return parseInt(elem.PlantId) == parseInt(req.params.ID);
            });
            if(jsonData == null || jsonData.systems.length == 0){
                let ID = crypto.randomUUID();
                let newSystem = {
                    "ID": ID,
                    "PLANT" : "",
                    "WATER_TIMES" : "",
                    "SUN_TIMES" : ""
                };
                jsonData.systems.push(newSystem);
                fs.writeFileSync("Data/plantSystems.json", JSON.stringify(jsonData));
                res.json(newSystem);
            }
        }catch{
                let ID = crypto.randomUUID();
                let newSystem = {
                    "ID": ID,
                    "PLANT" : "",
                    "WATER_TIMES" : "",
                    "SUN_TIMES" : ""
                };
                jsonData.systems.push(newSystem);
                fs.writeFileSync("Data/plantSystems.json", JSON.stringify(jsonData));
                res.json(newSystem);
        }
        res.json(jsonData);
    });
});


app.get("/api/plants/setPlant/:PlantId", (req, res) => {
    console.log(req.params.PlantId);
    console.log(req.params.water);
    console.log(req.params.sun);
    fs.readFile('Data/plantSystems.json', (err, data) => {
        if(err) throw err;
        let jsonData = JSON.parse(data);
        try{
            jsonData.systems = jsonData.systems.filter((elem) => {
                return parseInt(elem.PlantId) == parseInt(req.params.ID);
            });
            if(jsonData == null || jsonData.systems.length == 0){
                let ID = crypto.randomUUID();
                let newSystem = {
                    "ID": ID,
                    "PLANT" : "",
                    "WATER_TIMES" : "",
                    "SUN_TIMES" : ""
                };
                jsonData.systems.push(newSystem);
                fs.writeFileSync("Data/plantSystems.json", JSON.stringify(jsonData));
                res.json(newSystem);
            }
        }catch{
                let ID = crypto.randomUUID();
                let newSystem = {
                    "ID": ID,
                    "PLANT" : "",
                    "WATER_TIMES" : "",
                    "SUN_TIMES" : ""
                };
                jsonData.systems.push(newSystem);
                fs.writeFileSync("Data/plantSystems.json", JSON.stringify(jsonData));
                res.json(newSystem);
        }
        res.json(jsonData);
    });
});

app.get("/api/plants/waterTime/:PlantID", (req, res) => {
    fs.readFile('Data/plantSystems.json', (err, data) => {
        if(err) throw err;
        res.json(true);
    });
});

app.get("/api/plants/sunTime/:PlantID", (req, res) => {
    fs.readFile('Data/plantSystems.json', (err, data) => {
        if(err) throw err;
        res.json(true);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

