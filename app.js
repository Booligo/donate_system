
var createError = require('http-errors'); // подкл в перемен module http-errors (состоние стр овтет стр = ошибка)
var express = require('express'); // подкл в перемен moodule 'express' ( framework for web app)
var path = require('path'); //подкл в перемен moodule 'path' (предоставляет утилиты для работы с путями к файлам или директориям)
var cookieParser = require('cookie-parser'); //подкл в перемен moodule 'cookie-parser' (промежуточное ПО для анализа куки-файлов)
var logger = require('morgan'); //подкл в перемен moodule 'morgan' (промежуточное ПО для типизации ответов http и для логирования ошибок)

var indexRouter = require('./routes/index'); // маршрут на создание
var usersRouter = require('./routes/users');// маршрут на создание
var contactsRouter = require('./routes/contact');// маршрут на создание
var donateRouter = require('./routes/Donate');

var app = express(); // cоздание оbъекта которое представляет приложение

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
    
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);

app.use('/Donate', donateRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// contacts


module.exports = app;
