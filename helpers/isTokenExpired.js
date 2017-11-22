const differenceInSeconds = require('date-fns/difference_in_seconds');
const { newDateNow } = require('./dateHelpers');

/**
 * @private
 * Checks if token is expired 
 * @param {DateTime} [signed_at] Timestamp token was signed
 * @param {Integer} [lifetime] Maximum token lifetime
 * @returns {Boolean}
 */
const isTokenExpired = (signed_at, lifetime) => {
    const currentLifeTime = differenceInSeconds(newDateNow(), signed_at);
    return parseInt(lifetime) > currentLifeTime;
};

module.exports = isTokenExpired;
