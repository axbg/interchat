const { DataTypes } = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize) => {
const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => {
      return uuid.v4();
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  audio: {
    type: DataTypes.BOOLEAN,
    default: false
  }
});

return Message;
};