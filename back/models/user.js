const { DataTypes } = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize) => {
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => {
      return uuid.v4();
    }
  },
  secret: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => {
      return uuid.v4();
    }
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  input_lang: {
    type: DataTypes.STRING,
    allowNull: false
  },
  input_lang_voice: {
    type: DataTypes.STRING,
    allowNull: false
  },
  output_lang: {
    type: DataTypes.STRING,
    allowNull: false
  },
  output_lang_voice: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

return User;
};