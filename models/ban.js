const { DataTypes } = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize) => {
const Ban = sequelize.define('Ban', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => {
      return uuid.v4();
    }
  },
});

return Ban;
};