var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movie = require('./routes/movie');

var director = require('./routes/director');

var app = express();
/** 
mongoose.connect('mongodb://localhost/movieapi', { useMongoClient: true})
 mongoose.connection.on('open', () => {
   console.log('MongoDb: Connected');
 });
 mongoose.connection.on('error', (err) =>{
  console.log('MongoDB: Error',err);
 });
*/
// DB connection
const db = require('./db/Connection')();
const config = require('./config');

const verifyToken = require('./middleware/VerifyToken');


app.set('api_secret_key', config.api_secret_key);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//#region [APİ]

// İndex Api
app.use('/', indexRouter);
// Middleware kontolünde geçiyor
app.use('/api', verifyToken);
// User api
app.use('/api/users', usersRouter);
// Movie APİ  
app.use('/api/movie', movie);
// Director APi
app.use('/api/director', director);

//#endregion

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message, status: err.code }, status: err.status });
});

module.exports = app;
