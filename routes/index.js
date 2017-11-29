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

router.options('/records', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Allow', 'GET');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set(
        'Access-Control-Allow-Methods',
        'HEAD, GET, POST, PUT, DELETE, OPTIONS'
    );
    res.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    res.sendStatus(200);
    // res.end();

    next();
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
