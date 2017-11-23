require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');

const app = express();

app.get('/', (req, res) => {
    return res.send('hey it works!');
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(expressSanitizer({}));

require('./routes')(app);

module.exports = app;
