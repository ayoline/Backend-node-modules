const express = require('express');
const router = express.Router();
router.use(express.json());
const jsonUsers = require('./users.json');
const fs = require('fs');

router.post('/savedata', function (req, res) {
    let dataFromClient = req.body;
    console.log(dataFromClient);

    var max = Math.max(...jsonUsers.id);

    console.log(max);
    dataFromClient.id = max;
    console.log(dataFromClient);
    // jsonUsers.push(dataFromClient);

    // fs.writeFile('users.json', JSON.stringify(jsonUsers), function (err) {
    //     if (err) throw err;
    //     console.log('Replaced!');
    // });
});

module.exports = router