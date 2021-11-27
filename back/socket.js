const IO = require('koa-socket-2');
const io = new IO({
    ioOptions: {
        cors: {},
        pingInterval: 5000,
        pingTimeout: 10000
    },
});

const properties = require('./properties');

const roomService = require('./services').room;
const messageService = require('./services').message;
const userService = require('./services').user;
const jwt = require('jsonwebtoken');

const parseInitialJwt = (token) => {
    try {
        const decoded = jwt.verify(token, properties.JWT_SECRET);
        return decoded.id;
    } catch (e) {
        return null;
    }
};

const bindWebSocket = (app) => {
    io.attach(app);

    io.on('connection', (socket, data) => {
        console.log('new client connected');
    });

    io.on('user_joined', async (ctx, data) => {
        //extract data from jwt
        const userId = parseInitialJwt(data.jwt);
        console.log(userId);
        if (userId) {
            ctx.socket['userId'] = userId;

            //check that user has access to requested camera
            const hasAccessToRoom = roomService.hasAccessToRoom(userId, data.roomId);

            if (hasAccessToRoom) {
                ctx.socket['roomId'] = data.roomId;

                io.to(ctx.socket.id).emit("authentication", "ok");

                ctx.socket.join(data.roomId)

                const user = await userService.getUserById(userId);
                const userData = { 'tag': user.tag, 'id': userId };
                ctx.socket.broadcast.to(data.roomId).emit("b_user_joined", userData);
            } else {
                ctx.socket.to(data.token).emit("authentication", null);
            }
        }
    });

    io.on('new_message', async (ctx, data) => {
        await messageService.addMessage(ctx.socket['userId'], ctx.socket['roomId'], data.message, data.audio);
        // check to see if user is banned
        const banned = await roomService.isBanned(ctx.socket['userId'], ctx.socket['roomId']);
        console.log(banned);

        if (!banned) {
            const user = await userService.getUserById(ctx.socket['userId']);
            ctx.socket.broadcast.to(ctx.socket['roomId']).emit("b_new_message", { message: data.message, audio: data.audio, userId: ctx.socket['userId'], lang: user.input_lang });
        }
    });

    io.on('user_left', (ctx, data) => {
        roomService.disconnect(ctx.socket['userId'], ctx.socket['roomId']);
        ctx.socket.broadcast.to(ctx.socket['roomId']).emit("b_user_left", { id: ctx.socket['userId'] });
    });

    io.on('ban', (ctx, data) => {
        roomService.banUser(ctx.socket['userId'], ctx.socket['roomId'], data.bannedUser);
    });

    io.on('disconnect', (ctx, data) => {
        console.log('unexpected disconnection');

        if (ctx.socket['userId']) {
            roomService.disconnect(ctx.socket['userId'], ctx.socket['roomId']);
            ctx.socket.broadcast.to(ctx.socket['roomId']).emit("b_user_left", { userId: ctx.socket['userId'] });
        }
    });
}

module.exports = {
    bindWebSocket
}