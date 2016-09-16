var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var route = require('./routes/route');
var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/myDB');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'flybird',
  cookie:{maxAge:80000},
  resave:false,
  saveUninitialized:true
}));

app.use(flash());

app.use(function(req,res,next){
  res.locals.user=req.session.user;
  var err = req.flash('error');
  var succ = req.flash('success');
  res.locals.error = err.length?err:null;
  res.locals.success = succ.length?succ:null;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/login',routes);
app.use('/reg',routes);
app.post('/reg',routes.doReg);
app.use('/logout',routes);
app.post('/login',routes.doLogin);
app.use('/u',routes);
app.use('/history',routes);
app.use('/recommend',routes);
app.use('/newjour',routes);
app.post('/newjour',routes.doSave);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
