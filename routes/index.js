const authController = require('../controllers/authController');
const recordController = require('../controllers/recordController');
const { catchErrors } = require('../helpers/errorHandlers');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('../middleware/authMiddleware');

module.exports = app => {
    app.options('/*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,OPTIONS'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, Content-Length, X-Requested-With'
        );
        res.send(200);

        next();
    });

    app.post(
        '/auth/register',
        ensureLoggedOut,
        catchErrors(authController.register)
    );
    app.post('/auth/login', ensureLoggedOut, catchErrors(authController.login));

    app.get('/records', catchErrors(recordController.index));
    app.post('/records', catchErrors(recordController.create));
    app.get('/records/:id', catchErrors(recordController.show));
    app.put('/records/:id', catchErrors(recordController.edit));
    app.delete('/records/:id/edit', catchErrors(recordController.destroy));

    app.get('*', (req, res) =>
        res.status(404).send({
            error: 'Endpoint does not exist'
        })
    );
};
