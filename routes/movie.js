const express = require('express');
const router = express.Router();
// Movie Model Entity
const Movie = require('../models/Movie');


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


router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;