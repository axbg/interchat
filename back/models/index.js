const db = require('./db');

const UserModel = require('./user')(db);
const RoomModel = require('./room')(db);
const MembershipModel = require('./membership')(db);

RoomModel.belongsToMany(UserModel, { through: MembershipModel });
UserModel.belongsToMany(RoomModel, { through: MembershipModel });

const connect = () => {
  db.sync();
};

module.exports = {
  connect,
  UserModel,
  RoomModel,
  MembershipModel
};
