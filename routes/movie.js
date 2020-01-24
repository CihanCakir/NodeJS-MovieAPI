const express = require('express');
const router = express.Router();
// Movie Model Entity
const Movie = require('../models/Movie');


// [POST] NEW MOVİE 
router.post('/new', (req, res, next) => {

    const movie = new Movie(req.body);
    const promise = movie.save();

    promise.then((data) => {
        res.json({ status: 1 });
    }).catch((err) => {
        res.json(err);
    })

    /**
   const {title, imdb_score, category, country, year} = req.body;
   const movie = new Movie({
       title: title,
       imdb_score: imdb_score,
       category: category,
       country: country,
       year: year
   });
  */
});

// [GET] MOVİE LİST
router.get('/', (req, res, next) => {
    const promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: {
                path: '$directors',
                preserveNullAndEmptyArrays: true
            }
        }
    ]);




    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
    /*
    Movie.find({}, (err, data) => {
        res.json(data);
    });
    */
});

// [UPDATE] Movie

router.put('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new: true
        }
    );
    promise.then((data) => {
        if (!data)
            next({ message: 'This movie not found', code: res.statusCode });
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
})

// [DELETE] Movie
router.delete('/:movie_id', (req, res, next) => {
    const promise = Movie.findByIdAndDelete(req.params.movie_id);
    promise.then((data) => {
        if (!data)
            next({ message: 'This movie not found', code: res.statusCode });
        res.json({ message: 'This movie succesfull delete', code: res.statusCode });
    }).catch((err) => {
        res.json(err);
    });
})

// [GET] MOVİE İNFO BY ONE 
router.get('/:movie_id', (req, res, next) => {
    const promise = Movie.findById(
        req.params.movie_id,
    );
    promise.then((data) => {
        if (!data)
            next({ message: 'This movie not found', code: res.statusCode });
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// [Get] Top :Value  list by tip
router.get('/top/:value', (req, res, next) => {
    const promise = Movie.aggregate([
        {
            $sort: {
                imdb_score: -1
            }
        },
        {
            $limit: Number(req.params.value)
        }
    ]);

    const moviecount = Movie.find({}).count()

    promise.then((data) => {
        if (Number(req.params.value) > moviecount)
            next({ message: 'we havent yet count ' + moviecount + ' ' + req.params.value + ' of movie', code: res.statusCode });
        if (!data)
            next({ message: 'This movie not found', code: res.statusCode });
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
})

// [GET] Between  Date

router.get('/between/:start_year/:end_year', (req, res) => {
    // $gte büyük ve eşit demektir  küçük veya eşit demektir
    const { start_year, end_year } = req.params;
    const promise = Movie.find(
        {
            year: { "$gte": parseInt(start_year), "$lte": parseInt(end_year) }
        }
    );
    promise.then((data) => {
        if (!data)
            next({ message: 'This movie not found', code: res.statusCode });
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});



router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;