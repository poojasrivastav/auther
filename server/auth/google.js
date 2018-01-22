const router = require('express').Router();
const passport = require('passport');
const { User } = require('../db/models');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
	new GoogleStrategy({
		clientId: 'YOUR_APP_ID',
		clientSecret: 'YOUR_APP_SECRET',
		callbackURL: 'YOUR_CALLBACK_URL'
	},
    /* The following callback will be used when passport successfully 
    authenticate with Google(the provider) for us, using our 'clientId', 'clientSecret',
    and the temporary token from the client.
    Google sends the 'token', 'refreshToken' and 'profile'
    passport provides the 'done' function.
    */

    function (token, refreshToken, profile, done) {
    	/* the callback will pass back user profile information
    	each service(Facebook, Twitter, Google) will pass it back a different way.
    	Passport standardizes the data that comes back in its profile object.
        __
       
       Now that will have Google profile information for the client  what should we do?
        __
        */
        const info = {

        	name: profile.displayName,
        	//one user can have many email id so pick first one
        	email: profile.emails[0].value,
        	photo: profile.photo ? profile.photo[0].value : undefined

        }
       
        User.findOrCreate({
        	where: {googleId: profile.id},
        	defaults: info
        })//findOrCreate gives array//user=> created User and created => whether user is created or not.
        //.then(([user, created]) => done(null, user)) // we dont need created here so removed
        .then(([user, created]) => done(null, user)) // done first argument is error which is null here.
    	done();

    })
	);

//'google' is strategy i.e. through which medium user is going to login, here it's a Google.
router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/verify', passport.authenticate('google', {
	sucessRedirect: '/',
	failureRedirect: '/'
}))

module.exports = router;