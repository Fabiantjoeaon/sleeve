const createUrl = (req, id = null) =>
    `${req.protocol}://${req.get('host')}${req.originalUrl}${
        id ? '/' + id : ''
    }`;

module.exports = createUrl;
