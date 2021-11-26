const service = require('../services').room;
const messageService = require('../services').message;

const respondWith = require('../services').utils.respondWith;

const listPublicRooms = async (ctx) => {
  return respondWith(ctx, 200, await service.listPublicRooms(ctx.request.body));
}

const listMembership = async (ctx) => {
  return respondWith(ctx, 200, await service.listMembership(ctx.session.passport.user));
}
 
const createRoom = async (ctx) => {
  return respondWith(ctx, 201, await service.createRoom(ctx.session.passport.user, ctx.request.body));
}

const editRoom = async (ctx) => {
  return respondWith(ctx, 200, await service.editRoom(ctx.session.passport.user, ctx.request.body));
}

const removeRoom = async (ctx) => {
  return respondWith(ctx, 200, await service.removeRoom(ctx.session.passport.user, ctx.request.body));
}

const joinRoom = async (ctx) => {
  return respondWith(ctx, 200, await service.joinRoom(ctx.session.passport.user, ctx.request.body));
}

const getLastMessages = async (ctx) => {
  return respondWith(ctx, 200, await messageService.getLastMessages(ctx.session.passport.user, ctx.request.query));
}

const leaveRoom = async (ctx) => {
  return respondWith(ctx, 200, await service.leaveRoom(ctx.session.passport.user, ctx.request.body));
}

module.exports = {
  listPublicRooms,
  listMembership,
  createRoom,
  editRoom,
  removeRoom,
  joinRoom,
  getLastMessages,
  leaveRoom
};
