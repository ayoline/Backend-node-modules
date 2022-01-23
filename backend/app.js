const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const branch = require('./branch');
const birthday = require('./birthday');
const sector = require('./sector');
const savedata = require('./savedata');

app.use(cors());
app.use('/employees', branch);
app.use('/employees', birthday);
app.use('/employees', sector);
app.use('/save', savedata);

app.listen(port, () => console.log(`listening on port: ${port}`));