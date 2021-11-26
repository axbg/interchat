const MessageModel = require('../models').MessageModel;
const KoaError = require('../types/error');

const userService = require('./user');

const addMessage = async (userId, roomId, message) => {
    const user = await userService.getUserById(userId);
    const rooms = user.getRooms({ where: { id: roomId } });

    if (!rooms[0]) {
        throw new KoaError('You are not member of this room', 403);
    }

    return await MessageModel.create({
        userId: userId,
        roomId: roomId,
        message: message
    })
}

const getLastMessages = async (userId, data) => {
    if(!data.roomId || !data.limit || (!data.skip && data.skip !== 0)) {
        throw new KoaError('Missing one or more parameters: roomId, limit, skip', 400);
    }

    const user = await userService.getUserById(userId);
    const rooms = await user.getRooms({ where: { id: data.roomId } });

    if (!rooms[0]) {
        throw new KoaError('You are not member of this room', 403);
    }

    return await MessageModel.findAll({
        where: {
            userId: userId,
            roomId: data.roomId
        }, 
        order: [
            'createdAt'
        ],
        limit: parseInt(data.limit),
        offset: (data.limit * data.skip),
        attributes: ['message', 'audio', 'createdAt']
    })
}

module.exports = {
    addMessage,
    getLastMessages
}