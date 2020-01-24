const moongose = require('mongoose')
const Schema = moongose.Schema
const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        require: [true, '`{PATH}` alanı zorunludur '],
        unique: [true, '`{PATH}` alanı benzersiz olmalıdır'],
        maxlength: [15, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [4, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],

    },
    category: String,
    country: String,
    imdb_score: Number,
    year: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = moongose.model('movie', MovieSchema);