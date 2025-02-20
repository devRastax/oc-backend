import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import user from './routes/user';
import company from './routes/company';
import profile from './routes/profile';
// import format from './routes/format';
// import workplace from './routes/workplace';
// import section from './routes/section';
// import option from './routes/option';
// import optvalue from './routes/option-value';
// import question from './routes/question';
// import condition from './routes/condition';
// import dependency from './routes/dependency';
// import reg_format from './routes/reg-format';
import permission from './routes/permission';
// import compformat from './routes/comp-format';
// import formsection from './routes/format-section';
import permisrol from './routes/permis-rol';
// import dynamicform from './routes/dynamic-form';
// import version from './routes/version';
// import versec from './routes/ver-section';
// import verques from './routes/ver-question';
// import collaborator from './routes/collaborator';

import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
import cors = require('cors');

const app: express.Express = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/public', express.static('public'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/api/v1/user', user);
app.use('/api/v1/company', company);
app.use('/api/v1/profile', profile);
// app.use('/api/v1/format', format);
// app.use('/api/v1/workplace', workplace);
// app.use('/api/v1/section', section);
// app.use('/api/v1/optvalue', optvalue);
// app.use('/api/v1/question', question);
// app.use('/api/v1/condition', condition);
// app.use('/api/v1/dependency', dependency);
// app.use('/api/v1/regformat', reg_format);
app.use('/api/v1/permission', permission);
// app.use('/api/v1/compformat', compformat);
// app.use('/api/v1/formsection', formsection);
app.use('/api/v1/permisrol', permisrol);
// app.use('/api/v1/dynamicform', dynamicform);
// app.use('/api/v1/version', version);
// app.use('/api/v1/versec', versec);
// app.use('/api/v1/verques', verques);
// app.use('/api/v1/collaborator', collaborator);

// app.use('/api/v1/option', option);

app.get(/.*/, function (req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.render('error', {
      message: error.message,
      error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  res.render('error', {
    message: error.message,
    error: {}
  });
  return null;
});


export default app;