const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Rute
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

// Inicijalizacija aplikacije
const app = express();

// Povezivanje na MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projectsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// View engine (Jade)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method')); // Za podršku PUT i DELETE metodama preko HTML formi
app.use(express.static(path.join(__dirname, 'public')));

// Definiranje ruta
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
