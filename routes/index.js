const Router = require('koa-router');
const properties = require('../properties');
const passport = require('../configurations/security');

const userRouter = require('./user');

const router = new Router({ prefix: '/api' });

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = { message: 'koa starter - hello endpoint' };
});

router.use('/user', userRouter.routes());


module.exports = router;
