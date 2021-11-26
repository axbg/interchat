const Router = require('koa-router');
const passport = require('../configurations/security');

const userRouter = require('./user');
const roomRouter = require('./room');

const router = new Router({ prefix: '/api' });

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = { message: 'koa starter - hello endpoint' };
});

router.use('/user', userRouter.routes());
router.use('/room', passport.authenticate('jwt'), roomRouter.routes());

module.exports = router;
