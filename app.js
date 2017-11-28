require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');
const errorHandlers = require('./helpers/errorHandlers');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(expressSanitizer({}));

app.use(routes);

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
