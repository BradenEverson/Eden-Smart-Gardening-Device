const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Plants :)")
});

app.get('/plants', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'plants.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading the plants file');
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData.systems);
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send('Error parsing the plants data');
        }
    });
});

app.get('/plants/rand', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'plants.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading the plants file');
        }
        try {
            const jsonData = JSON.parse(data);
            if (jsonData.systems && Array.isArray(jsonData.systems) && jsonData.systems.length > 0) {
                // Select a random item from the 'systems' array
                const randomSystem = jsonData.systems[Math.floor(Math.random() * jsonData.systems.length)];
                res.json(randomSystem);
            } else {
                res.status(500).send('The "systems" data is not an array, is empty, or does not exist');
            }
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send('Error parsing the plants data');
        }
    });
});

app.post('/plant/update', (req, res) => {
    const { ID, newWater } = req.body;

    if (typeof ID === 'undefined' || newWater === undefined) {
        return res.status(400).send('Missing ID or newWater in request body');
    }

    const filePath = path.join(__dirname, 'data', 'plants.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading the plants file');
        }

        try {
            const jsonData = JSON.parse(data);
            const systemIndex = jsonData.systems.findIndex(system => system.ID === ID);

            if (systemIndex === -1) {
                return res.status(404).send('System with the specified ID not found');
            }

            jsonData.systems[systemIndex].water = newWater;

            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    return res.status(500).send('Error updating the plants file');
                }
                res.send('Water value updated successfully');
            });
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send('Error parsing the plants data');
        }
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

