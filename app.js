require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');

const app = express();

app.get('/', (req, res) => {
    return res.send('hey it works!');
});
// app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(expressSanitizer({}));

require('./routes')(app);

module.exports = app;
