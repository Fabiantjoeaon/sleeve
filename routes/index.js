const authController = require('../controllers/authController');

module.exports = app => {
    app.get('*', (req, res) =>
        res.status(404).send({
            error: 'Endpoint does not exist'
        })
    );

    app.use('/api', () => {
        app.post('/register', authController.register);
    });
};
