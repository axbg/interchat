require('dotenv').config();

const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');

const properties = require('./properties');
const passport = require('./configurations/security');
const middleware = require('./middlewares');
const router = require('./routes');
const connectDatabase = require('./models').connect;
const bindWebSocket = require('./socket').bindWebSocket;

const app = new Koa();

properties.ALLOW_CORS && app.use(cors());

app.keys = properties.COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(properties.SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

connectDatabase();

app.use(router.routes());
app.use(router.allowedMethods());

bindWebSocket(app);

app.listen(properties.PORT, () => {
  console.log('koa starter - running on http://localhost:' + properties.PORT);
});
