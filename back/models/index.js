const db = require('./db');

const UserModel = require('./user')(db);
const RoomModel = require('./room')(db);
const MessageModel = require('./message')(db);
const MembershipModel = require('./membership')(db);

RoomModel.hasMany(MessageModel);
UserModel.hasMany(MessageModel);

RoomModel.belongsToMany(UserModel, { through: MembershipModel });
UserModel.belongsToMany(RoomModel, { through: MembershipModel });

const connect = () => {
  db.sync();
};

module.exports = {
  connect,
  UserModel,
  RoomModel,
  MessageModel,
  MembershipModel
};
