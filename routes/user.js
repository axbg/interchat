const Router = require('koa-router');
const controller = require('../controllers').user;
const passport = require('../configurations/security');

const router = new Router();

router.post('/login', controller.login);
router.delete('/logout', passport.authenticate('jwt'), controller.logout);

module.exports = router;
