const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { User } = require('./db/models');

/* "Enhancing" middleware (does not send response, server-side effects only) */
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	//this mandatory configuration ensures that session IDs are not predictable
	secret: 'tongiscool',
	//this option says if you haven't changed anything, dont resave. It is recommended and reduce 
	//session concurrency issues
	resave: false,
	//this option says if I am new but not modified still save
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//deserializeUser will not be called during login via Google. It will be called when user is 
//redirected to homePage and every other request after that coming thru our application.

//id is being held in our session store.

//passport behind the scene is making connection i.e taking user id from session and passing to deserializeUser function.
passport.deserializeUser((id, done) => {
	User.findById(id)
	//done will attach user obj to req.
	.then(user => done(null, user))
	.catch(done)
})
//serializeUser called when user login thru Google.
passport.serializeUser((user, done) => {
	done(null, user.id)
});


app.use(function(req, res, next) {
	console.log('session', req.session);
	next();
});
app.use(function(req, res, next) {
	console.log('session', req.user);
	next();
});
// app.post('/login', function (req, res, next) {
// 	User.findOne({
// 		where: req.body
// 	})
// 	.then(function(user){
// 		if(!user){
// 			res.sendStatus(401);
// 		}else{
// 			req.session.userId = user.id;
// 			res.sendStatus(200);
// 		}
// 	})
// 	.catch(next);
// });


// app.use('/api', function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });


/* "Responding" middleware (may send a response back to client) */
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

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