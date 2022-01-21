const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const branch = require('./branch');
const birthday = require('./birthday');
const sector = require('./sector');

app.use(cors());
app.use('/employees', branch);
app.use('/employees', birthday);
app.use('/employees', sector);

app.listen(port, () => console.log(`listening on port: ${port}`));
//app.get('/', (req, res) => res.send("Hello World!!!"));