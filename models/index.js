const db = require('./db');

const UserModel = require('./user')(db);
const RoomModel = require('./room')(db);
const BanModel = require('./ban')(db);
const MembershipModel = require('./membership')(db);

RoomModel.belongsToMany(UserModel, { through: BanModel });
RoomModel.belongsToMany(UserModel, { through: MembershipModel });

const connect = () => {
  db.sync();
};

module.exports = {
  connect,
  UserModel,
  RoomModel,
  BanModel,
  MembershipModel
};
