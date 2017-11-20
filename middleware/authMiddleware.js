const jwt = require('jwt');

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
        console.log('error', e);
        return false;
    }

    if (!decoded) return false;

    // Convert to milliseconds
    return isTokenExpired(decoded.iat * 1000, process.env.JWT_TOKEN_LIFETIME);
};
