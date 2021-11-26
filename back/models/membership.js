const { DataTypes } = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize) => {
const Membership = sequelize.define('Membership', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => {
      return uuid.v4();
    }
  },
  admin: {
    type: DataTypes.BOOLEAN,
    default: false,
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    default: false,
    allowNull: false
  },
  ban: {
    type: DataTypes.BOOLEAN,
    default: false,
    allowNull: false
  }
});

return Membership;
};