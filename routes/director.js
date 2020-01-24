const express = require('express');
const router = express.Router();
const moongose = require('mongoose');

const Director = require('../models/Director');

// [POST] Director
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})
// [GET] Director All
router.get('/', (req, res, next) => {
    const promise = Director.aggregate([
        {
            // inner join işlemi için
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            // Preserve özelliği kendisinin içi boş olsan bile innerjoin ile yapılan arasında  eşleşme olmadığı için boş gösterilmesi yerine direk olarak hepsini çek demek için geçilir
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    age: '$age'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                age: '$_id.age',
                movies: '$movies'
            }
        }
    ])

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});
// [GET] Director İNFO BY ONE
router.get('/:director_id', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $match: {
                _id: moongose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            },


        },
        {
            $unwind: {
                path: '$movies',
            },


        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    age: '$age'
                },
                movies: {
                    $push: '$movies',
                }


            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                age: '$_id.age',
                movies: '$movies'
            }
        },
        {
            $sort: {
                'movies.imdb_score': -1
            }
        },



    ])
    promise.then((data) => {
        if (!data)
            next({ message: 'This Director not found', code: res.statusCode });
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// [DELETE] DİRECTOR BY ONE
router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndDelete(req.params.director_id);
    promise.then((data) => {
        if (!data)
            next({ message: 'This director not found', code: res.statusCode });
        res.json({ message: 'This director succesfull delete', code: res.statusCode });
    }).catch((err) => {
        res.json(err);
    });
})
// [UPDATE] DİRECTOR BY ONE
router.put('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new: true
        }
    );
    promise.then((data) => {
        if (!data)
            next({ message: 'This Director not found', code: res.statusCode });
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
})




router.get('/search', (res, req, next) => {

});
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;