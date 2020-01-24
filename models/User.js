const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '`{PATH}`alanı boş olmamalıdır'],
        maxlength: [15, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],
        unique: [true, '`{PATH}`alanı benzersiz olmalıdır']
    },
    name: {
        type: String,
        required: [true, '`{PATH}`alanı boş olmamalıdır'],
        maxlength: [15, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],
    },
    surname: {
        type: String,
        required: [true, '`{PATH}`alanı boş olmamalıdır'],
        maxlength: [15, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],

    },
    age: {
        type: Number,
        required: [true, '`{PATH}`alanı boş olmamalıdır'],
        maxlength: [100, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],
    },
    password: {
        type: String,
        required: [true, '`{PATH}`alanı boş olmamalıdır'],
        maxlength: [100, '`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden KÜÇÜK olmalıdır'],
        minlength: [1, '`{PATH} alanı (`{VALUE}`), ({MINLENGTH}) karakterden BÜYÜK olmalıdır'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);