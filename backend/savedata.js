const express = require('express');
const router = express.Router();
router.use(express.json());
const jsonUsers = require('./users.json');
const fs = require('fs');

router.post('/savedata', function (req, res) {
    let dataFromClient = req.body;
    console.log(dataFromClient);

    dataFromClient.id = (jsonUsers.length + 1);
    jsonUsers.push(dataFromClient);

    fs.writeFile('users.json', JSON.stringify(jsonUsers), function (err) {
        if (err) throw err;
        res.json(dataFromClient);
    });
});

module.exports = router