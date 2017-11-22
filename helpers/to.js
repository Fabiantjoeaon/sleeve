const to = promise => {
    console.log(promise);
    console.log(typeof promise);
    return promise
        .then(data => ({
            err: null,
            data
        }))
        .catch(err => {
            err;
        });
};

module.exports = to;
