const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validate = require('validate.js');
const { isHashMatching, encrypt } = require('../helpers/hashing');

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const register = async (req, res) => {
    const errors = validate(req.body, User.getInitialConstraints());
    if (errors) res.status(400).json({ errors });

    const { username, password } = req.body;
    req.body.username = req.sanitize(req.body.username);

    const existingUser = await User.findOne({
        username
    });
    if (existingUser)
        return res.status(400).json({ error: 'Username is already taken' });

    const user = new User({
        username,
        password
    });
    await user.save();

    return res.status(200).json({
        user,
        message: `Succesfully signed up, ${username}!`
    });
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {}
 */
const login = async (req, res) => {
    if (!req.body.username || !req.body.password)
        return res
            .status(422)
            .json({ error: 'Please fill in all the fields.' });

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Wrong credentials.' });

    const isPasswordMatching = await isHashMatching(password, user.password);
    if (!isPasswordMatching)
        return res.status(400).json({ error: 'Wrong credentials.' });

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            audience: req.get('host'),
            issuer: req.get('host'),
            algorithm: 'HS256'
        }
    );

    return res.status(200).json({ token, user });
};

module.exports = { register, login };
