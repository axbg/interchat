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

const app = new Koa();

properties.ALLOW_CORS && app.use(cors());

app.keys = properties.COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(properties.SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

connectDatabase();

app.use(require('koa-static')(__dirname, {}));

const IO = require('koa-socket-2');
const io = new IO();
io.attach(app);

io.on('connection', (socket, data) => {
  console.log('socket initialization completed');
  socket.emit("hello", "world");
});

io.on('message', (ctx, data) => {
  console.log(ctx.socket.id);
  ctx.socket.broadcast.emit("response", "event")
});

app.listen(properties.PORT, () => {
  console.log('koa starter - running on http://localhost:' + properties.PORT);
});
