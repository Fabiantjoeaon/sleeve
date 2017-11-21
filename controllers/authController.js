const User = require('../models/User');
const validate = require('validate.js');

/**
*
* @param {Object} req 
* @param {Object} res 
* @returns {}
*/
const register = async (req, res) => {
    req.body.username = req.sanitize(req.body.username);
    const { username, password } = req.body;

    const errors = validate(req.body, User.getInitialConstraints());

    if (errors) {
        req.flash('error', errors);
        return res.redirect('back');
    }
};
