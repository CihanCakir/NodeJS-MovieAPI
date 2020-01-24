const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://movie_user:movieuser123.@ds227808.mlab.com:27808/heroku_382dbqmg', { useMongoClient: true});
    mongoose.connection.on('open', () => {
        console.log('MongoDb: connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('mongoDb: Error', err);
    });

    mongoose.Promise = global.Promise;
}