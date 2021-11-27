const UserModel = require('../models').UserModel;
const MembershipModel = require('../models').MembershipModel;
const RoomModel = require('../models').RoomModel;
const KoaError = require('../types/error');
const curateInstance = require('./utils').curateInstance;
const Op = require('sequelize').Op;

const userService = require('./user');
const messageService = require('./message');

const getRoomById = async (id) => {
  return await RoomModel.findOne({ where: { id: id } })
}

const listPublicRooms = async (ctx) => {
  return await RoomModel.findAll({ where: { public: true } });
}

const listMembership = async (userId) => {
  const user = await userService.getUserById(userId);
  return await user.getRooms();
}

const createRoom = async (userId, data) => {
  const user = await userService.getUserById(userId);

  if (!data.name || !data.description || !data.public || !data.tags || !data.picture) {
    throw new KoaError('One or more required fields are missing: name, description, tags, picture', 400);
  }

  const existingRoom = await RoomModel.findOne({where: { name: data.name}});
  if(existingRoom) {
    throw new KoaError('A room with this name already exists!', 400);
  }

  const room = await RoomModel.create(curateInstance(data));
  return await user.addRoom(room, { through: { admin: true, active: true, ban: false } });
}

const editRoom = async (userId, data) => {
  const user = await userService.getUserById(userId);

  const roomId = data.id;
  const rooms = await user.getRooms({ where: { id: roomId } });
  if (!rooms[0] || !rooms[0].Membership.admin) {
    throw new KoaError('You are not the admin of this room!', 403);
  }

  return await RoomModel.update(curateInstance(data), { where: { id: roomId } });
}

const removeRoom = async (userId, data) => {
  const user = await userService.getUserById(userId);

  const rooms = await user.getRooms({ where: { id: data.id } });
  if (!rooms[0] || !rooms[0].Membership.admin) {
    throw new KoaError('You are not the admin of this room!', 403);
  }

  return await RoomModel.delete({ where: { id: data.id } });
}

const joinRoom = async (userId, data) => {
  const user = await userService.getUserById(userId);
  const rooms = await user.getRooms({ where: { id: data.id } });
  const allocatedRoom = rooms[0];

  if (allocatedRoom) {
    await user.addRoom(allocatedRoom, { through: { active: true } });
  } else {
    const room = await RoomModel.findOne({ where: { id: data.id } });
    await user.addRoom(room, { through: { active: true, admin: false, ban: false } });
  }

  const roomDetails = await RoomModel.findAll({ where: { id: data.id }, include: [{ model: UserModel, attributes: ['id', 'tag'], through: { attributes: ['admin', 'active', 'ban'] } }] });
  const lastMessages = await messageService.getLastMessages(userId, { roomId: data.id, limit: 5, skip: 0 });
  return { roomDetails: roomDetails, messages: lastMessages };
}

const leaveRoom = async (userId, data) => {
  const user = await userService.getUserById(userId);
  const room = await RoomModel.findOne({ where: { id: data.id } });
  return await user.removeRoom(room);
}

const banUser = async (userId, data) => {
  const user = await userService.getUserById(userId);

  const ownedRooms = await user.getRooms({ where: { id: data.roomId } });
  if (!ownedRooms[0] || !ownedRooms[0].Membership.admin) {
    throw new KoaError('You are not the admin of this room!', 403);
  }

  const bannedUser = await userService.getUserByTag(data.userTag);
  const rooms = await bannedUser.getRooms({ where: { id: data.roomId } });
  const allocatedRoom = rooms[0];

  if (allocatedRoom) {
    await bannedUser.addRoom(allocatedRoom, { through: { active: false, ban: true } });
  }

  return true;
}

module.exports = {
  listPublicRooms,
  listMembership,
  createRoom,
  editRoom,
  removeRoom,
  joinRoom,
  leaveRoom,
  banUser
};
