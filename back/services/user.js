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

const updatePreferences = async (id, input_lang, output_lang) => {
  const user = await getUserById(id);

  if(user) {
    user.input_lang = input_lang || user.input_lang;
    user.output_lang = output_lang || user.output_lang;
    await user.save();
  }

  return true;
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
