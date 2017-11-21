const authController = require('../controllers/authController');

module.exports = app => {
    app.get('*', (req, res) =>
        res.status(404).send({
            error: 'Endpoint does not exist'
        })
    );

    app.post('/auth/register', authController.register);
};
