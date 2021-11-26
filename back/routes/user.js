const Router = require('koa-router');
const controller = require('../controllers').user;
const passport = require('../configurations/security');

const router = new Router();

router.post('/', controller.login);
router.put('/', passport.authenticate('jwt'), controller.updatePreferences);
router.delete('/', passport.authenticate('jwt'), controller.logout);

module.exports = router;
