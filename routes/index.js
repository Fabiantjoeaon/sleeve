const express = require('express');
const mongoose = require('mongoose');
const authController = require('../controllers/authController');
const recordController = require('../controllers/recordController');
const { catchErrors } = require('../helpers/errorHandlers');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('../middleware/authMiddleware');
const router = express.Router();

const checkId = (req, res, next) => {
    if (req.params.id) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ message: 'Wrong id' });
    }
    return next();
};

router.options('/records', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Allow', 'GET,POST,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    res.sendStatus(200);
});

router.use('/records', (req, res, next) => {
    res.header('Content-Type', 'application/json');
    req.accepts('application/json');
    return next();
});
router.post(
    '/auth/register',
    ensureLoggedOut,
    catchErrors(authController.register)
);
router.post('/auth/login', ensureLoggedOut, catchErrors(authController.login));

router.get('/records', catchErrors(recordController.index));
router.post('/records', catchErrors(recordController.create));
router.get('/records/:id', checkId, catchErrors(recordController.show));
router.put('/records/:id', checkId, catchErrors(recordController.edit));
router.delete('/records/:id', checkId, catchErrors(recordController.destroy));

router.use('*', (req, res) =>
    res.status(404).json({
        error: 'Endpoint does not exist'
    })
);
module.exports = router;
