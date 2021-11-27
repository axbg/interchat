const UserModel = require('../models').UserModel;
const MembershipModel = require('../models').MembershipModel;

const curateInstance = require('./utils').curateInstance;

const getUserById = async (id) => {
  return await UserModel.findByPk(id);
};

const getUserByTag = async (tag) => {
  return await UserModel.findOne({ where: { tag: tag } });
}

const createUser = async (profile) => {
  return await UserModel.create(curateInstance(profile));
}

const updatePreferences = async (id, updatedData) => {
  const data = curateInstance(updatedData);
  delete data.tag;
  return await UserModel.update(data, { where: { id: id}});
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
  updatePreferences,
  logout
};
