const authController = require('../controllers/authController');
const recordController = require('../controllers/recordController');
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
    });

    app.post('/auth/register', ensureLoggedOut, authController.register);
    app.post('/auth/login', ensureLoggedOut, authController.login);

    app.get('/records', recordController.index);
    app.post('/records', recordController.create);
    app.get('/records/:id', recordController.show);
    app.put('/records/:id', recordController.edit);
    app.delete('/records/:id/edit', recordController.destroy);

    app.get('*', (req, res) =>
        res.status(404).send({
            error: 'Endpoint does not exist'
        })
    );
};
