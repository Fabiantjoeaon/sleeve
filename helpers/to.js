const to = promise =>
    promise
        .then(data => ({
            err: null,
            data
        }))
        .catch(err => {
            err;
        });

export default to;
