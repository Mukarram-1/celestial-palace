var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookingRouter = require('./routes/booking');
var getbookingRouter = require('./routes/getbookings');
var employeesRouter = require('./routes/employees');
var getemployeesRouter = require('./routes/getemployees');
var updateemployeesRouter = require('./routes/updateemployee');
var deleteemployeeRouter = require('./routes/deleteemployee');
const deleteBookingRoute = require('./routes/deletebooking');
const approvedBookingRoute = require('./routes/approvedbookings');
const getapprovedBookingRoute = require('./routes/getapprovedbookings');
const database=require('./database/sql');
const reviewRouter=require('./routes/reviews');
const getreviewRouter=require('./routes/getreviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods','GET','POST','PUT','DELETE');
  res.setHeader('Access-Control-Allow-Headers','Content-Types');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);
app.use('/getbookings', getbookingRouter);
app.use('/deletebooking', deleteBookingRoute);
app.use('/approvedbookings', approvedBookingRoute);
app.use('/getapprovedbookings', getapprovedBookingRoute);
app.use('/employees', employeesRouter);
app.use('/getemployees', getemployeesRouter);
app.use('/deleteemployee', deleteemployeeRouter);
app.use('/updateemployee', updateemployeesRouter);
app.use('/reviews', reviewRouter);
app.use('/getreviews', getreviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
