const bcrypt = require('bcryptjs');

/**
 * @public
 * Runs salt rounds to hash string
 * @param {String} [stringToHash] String to be hashed
 * @returns {String} Generated token
 */
const encrypt = async stringToHash => {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hash(stringToHash, salt);
};

/**
 * @public
 * Compares string with hash to check if 
 * it is indeed previously hashed
 * @param {String} [stringToHash]
 * @param {String} [hash]  
 * @returns {Boolean} 
 */
const isHashMatching = async (stringToHash, hash) => {
    return bcrypt.compare(stringToHash, hash);
};

module.exports = { encrypt, isHashMatching };
