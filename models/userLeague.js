'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLeague = sequelize.define('UserLeague', {
    userId: DataTypes.INTEGER,
    leagueId: DataTypes.INTEGER
  }, {});
  // UserRole.associate = function(models) {
    
  // };
  return UserLeague;
};