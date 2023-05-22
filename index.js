const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/web'));
app.use(cors());

app.get("/", (req, res) =>{
    res.sendFile("web/index.html");
});

app.get("/editDevice", (req, res) =>{
    console.log(req.params.ID);
    res.sendFile(__dirname + "/web/edit.html");
});

app.post("/editDevice", (req, res) =>{
    console.log(req.params.plant);
    res.sendFile(__dirname + "/web/index.html");
});

app.get("/api/plants/waterTime/:ID", (req, res) => {
    res.json(true);
});

app.get("/api/plants/sunTime/:ID", (req, res) => {
    res.json(true);
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

