const jwt = require('jwt');
const to = require('../helpers/to');

/**
 * @private
 * @param {*} [token]
 * @param {} [user]
 */
const checkSessionToken = async token => {
    const { data: decoded, err } = await to(
        jwt.verify(token, process.env.JWT_SECRET)
    );

    if (!decoded || err) return false;

    // HINT: Convert to milliseconds
    return isTokenExpired(decoded.iat * 1000, process.env.JWT_TOKEN_LIFETIME);
};
