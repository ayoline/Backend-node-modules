const express = require('express');
const router = express.Router();
const jsonUsers = require('./users.json');

router.get('/birthday', function (req, res) {
    const month = req.query.value;
    console.log(month);

    const filteredEmployees = jsonUsers.filter((element) => {
        return element.nascimento.includes('/' + month + '/');
    });

    filteredEmployees.sort(
        (a, b) => Number(a.line) > Number(b.line) ? 1 : -1
    );
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