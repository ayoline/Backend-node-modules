const express = require('express');
const router = express.Router();
const jsonUsers = require('./users.json');

router.get('/sector', function (req, res) {
    const sector = req.query.value;
    console.log(sector);

    const filteredEmployees = jsonUsers.filter((element) => {
        return element.setor.includes(sector);
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