const express = require('express');
const router = express.Router();
const jsonUsers = require('./users.json');

router.get('/birthday', function (req, res) {
    let month = req.query.value;

    if (month > 0 && month < 10) {
        month = '0' + month;
    }

    const filteredEmployees = jsonUsers.filter((element) => {
        return element.birthday.includes('/' + month + '/');
    });

    filteredResponse(filteredEmployees, res);
});

function filteredResponse(filteredJSON, res) {
    if (filteredJSON.length > 0) {
        res.json(filteredJSON);
    } else {
        res.send({ error: true, msg: "NENHUM RESULTADO ENCONTRADO" });
    }
}

module.exports = router