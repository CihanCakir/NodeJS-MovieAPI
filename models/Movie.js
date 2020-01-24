const moongose = require('mongoose')
const Schema = moongose.Schema
const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    title: {
        type: String,
        require: true,
        unique: true
    },
    category: String,
    country: String,
    imdb_score: Number,
    year: Number,
    date : {
        type: Date,
        default : Date.now  
    }
});

module.exports = moongose.model('movie', MovieSchema);