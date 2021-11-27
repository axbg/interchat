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
    allowNull: "en-US"

  },
  output_lang: {
    type: DataTypes.STRING,
    allowNull: false,
    default: "en-US"
  }
});

return User;
};