const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Plants :)")
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

