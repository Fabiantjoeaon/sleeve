require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');
const errorHandlers = require('./helpers/errorHandlers');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(expressSanitizer({}));

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Accept', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    if (!req.accepts('application/json')) {
        return res.status(400).send({ error: 'Wrong type' });
    }
    return next();
});

app.use(routes);

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
