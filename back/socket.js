const IO = require('koa-socket-2');
const io = new IO();

const bindWebSocket = (app) => {
    io.attach(app);

    io.on('connection', (socket, data) => {
        console.log('socket initialization completed');
        socket.emit("hello", "world");
    });

    io.on('message', (ctx, data) => {
        console.log(ctx.socket.id);
        ctx.socket.broadcast.emit("response", "event")
    });
}

module.exports = {
    bindWebSocket
}