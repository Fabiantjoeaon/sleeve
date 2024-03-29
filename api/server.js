const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.DATABASE, {
    useMongoClient: true
});
mongoose.promise = global.Promise;
mongoose.connection.on('error', err => {
    console.error(err, err.message);
});

// require('./models/User');
// require('./models/Record');

app.set('port', process.env.API_PORT);
const server = app.listen(app.get('port'), () => {
    console.log(`Server running → PORT ${server.address().port}`);
});
