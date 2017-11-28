require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');
const {
    notFound,
    developmentErrors,
    productionErrors
} = require('./helpers/errorHandlers');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(developmentErrors);

// app.use(notFound);
app.use(productionErrors);

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
