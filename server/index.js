const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const session = require('express-session');
const User = require('./db/models/user');


/* "Enhancing" middleware (does not send response, server-side effects only) */
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	//this mandatory configuration ensures that session IDs are not predictable
	secret: 'tongiscool',
	//this option is recommended and reduces session concurrency issues
	resave: false,
	saveUninitialized: true
}));

app.post('/login', function (req, res, next) {
	User.findOne({
		where: req.body
	})
	.then(function(user){
		if(!user){
			res.sendStatus(401);
		}else{
			req.session.userId = user.id;
			res.sendStatus(200);
		}
	})
	.catch(next);
});
// app.use(function(req, res, next) {
// 	console.log('session', req.session);
// 	next();
// });

// app.use('/api', function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });


/* "Responding" middleware (may send a response back to client) */
app.use('/api', require('./api'));


const validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
const indexPath = path.join(__dirname, '../public/index.html');
validFrontendRoutes.forEach(stateRoute => {
  app.get(stateRoute, (req, res, next) => {
    res.sendFile(indexPath);
  });
});

/* Static middleware */
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../node_modules')))

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal Error');
});

module.exports = app;