const jwt = require('jsonwebtoken');
const to = require('../helpers/to');
const User = require('../models/User');
const getIdFromToken = require('../helpers/getIdFromToken');
const isTokenExpired = require('../helpers/isTokenExpired');

/**
 * @private
 * @param {*} [token]
 * @param {} [user]
 */
const checkSessionToken = async token => {
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return false;
    }

    // HINT: Convert to milliseconds
    return isTokenExpired(decoded.iat * 1000, process.env.JWT_TOKEN_LIFETIME);
};

/**
*
* @param {Object} req 
* @param {Object} res 
* @param {Function} next 
* @returns {Function}
*/
const ensureLoggedOut = async (req, res, next) => {
    if (req.session.user)
        return res.status(400).json({ error: 'You are already logged in.' });

    return next();
};

/**
*
* @param {Object} req 
* @param {Object} res 
* @param {Function} next 
* @returns {Function}
*/
const ensureLoggedIn = async (req, res, next) => {
    const authHeaderToken = req.get('authorization');

    if (!authHeaderToken)
        return res.status(400).json({ message: 'No authorization header.' });

    const id = await getIdFromToken(authHeaderToken);
    const user = await User.findOne({ _id: id });

    const isLegitToken = await checkSessionToken(authHeaderToken);
    console.log(isLegitToken);
    if (!isLegitToken || !(id == user._id)) {
        req.session.user = null;
        return res.status(400).json({ message: 'Wrong or expired token.' });
    }

    return next();
};

module.exports = {
    ensureLoggedIn,
    ensureLoggedOut
};
