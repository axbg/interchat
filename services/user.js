const UserModel = require('../models').UserModel;
const MembershipModel = require('../models').MembershipModel;

const getUserById = async (id) => {
  return await UserModel.findByPk(id);
};

const getUserByTag = async (tag) => {
  return await UserModel.findOne({ where: { tag: tag } });
}

const createUser = async (profile) => {
  return await UserModel.create(profile);
}

const logout = async (id) => {
  MembershipModel.update({ active: false }, {
    where: {
      userId: id
    }
  });
}

module.exports = {
  getUserById,
  getUserByTag,
  createUser,
  logout
};
