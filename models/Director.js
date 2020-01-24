const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: [15, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],
    },
    surname: {
        type: String,
        required: true,
        maxlength: [15, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],

    },
    age: {
        type: Number,
        required: true,
        maxlength: [10, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [100, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);