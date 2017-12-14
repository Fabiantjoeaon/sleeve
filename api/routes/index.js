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

const detailHeaderMiddleware = (req, res, next) => {
    return next();
};

router.options('/records', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Allow', 'GET,POST,OPTIONS');
    return res.sendStatus(200);
});

router.options('/records/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,GET, DELETE, OPTIONS');
    res.header('Allow', 'PUT,GET, DELETE, OPTIONS');
    return res.sendStatus(200);
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
