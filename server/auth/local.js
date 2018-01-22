const router = require('express').Router();
const { User } =  require('../db/models');

router.put('/login', (req, res, next) => {
	const { email, password } = req.body;
	User.findOne(({
		where: {
			email,
			password	
		}
	}))
	.then(user => {
		if(!user) {
			const err = {status: 404, message: 'that user does not exist'};
			return next(err);
		}
		else {
			//login and log out route to work with serialize and deserialize the user  appropiately i.e. to hook this into passport. 
			//req.session.userId = user.id;
            req.login(user, err => {
            	if (err) return next(err);
            	res.send(user);
            })	
			
		}
	})
	.catch(next);

})

//router.post('/signup', )

roter.delete('/logout', (req, res, next) => {
	//req.session.destroy();
	req.logout();
	res.sendStatus(204);
})

router.get('/me', (req, res, next) => {
	res.send(req.user);
})

module.exports = router;
