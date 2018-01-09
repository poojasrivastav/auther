const router = require('express').Router();

const HttpError = require('../utils/HttpError');
const { Story, User } = require('../db/models');

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) throw HttpError(404);
      req.requestedUser = user;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  req.requestedUser.reload(User.options.scopes.populated())
    .then(requestedUser => res.json(requestedUser))
    .catch(next);
});
/*debounce-
Useful for implementing behavior that should only happen after a repeated action has completed i.e 
debounce is a technique to make sure a function cannot be invoked repeatedly within a short period. */
router.put('/:id', (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(user => res.json(user))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.requestedUser.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
