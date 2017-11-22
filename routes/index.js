const authController = require('../controllers/authController');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('../middleware/authMiddleware');

module.exports = app => {
    app.get('/auth/logout', ensureLoggedIn, authController.logout);
    app.post('/auth/register', ensureLoggedOut, authController.register);
    app.post('/auth/login', ensureLoggedOut, authController.login);

    app.get('*', (req, res) =>
        res.status(404).send({
            error: 'Endpoint does not exist'
        })
    );
};
