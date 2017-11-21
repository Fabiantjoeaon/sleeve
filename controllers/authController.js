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

    // const errors = validate(req.body, User.getInitialConstraints());

    // if (errors) res.status(400).send({ errors });

    if (
        await User.findOne({
            username
        })
    ) {
        res.status(400).send({ error: 'Username is already taken' });
    }

    const user = new User({
        username,
        password,
        isAdmin: 0
    });
    await user.save();

    return res.status(200).send({
        user,
        message: `Succesfully signed up, ${username}!`
    });
};

module.exports = { register };
