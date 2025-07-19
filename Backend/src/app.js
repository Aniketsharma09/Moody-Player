const express = require('express');
const cors = require('cors');
const songRoute = require('./routes/song.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', songRoute);

module.exports = app;