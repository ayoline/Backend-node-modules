const express = require('express');
const router = express.Router();
const jsonUsers = require('./users.json');

router.get('/branch', function (req, res) {
    const line = req.query.value;
    console.log(line);

    const filteredEmployees = jsonUsers.filter((element) => {
        return element.ramal.includes(line);
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
