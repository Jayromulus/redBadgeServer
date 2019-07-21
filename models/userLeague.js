module.exports = (sequelize, DataTypes) => {
  const UserLeague = sequelize.define('UserLeague', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    },
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //  references: {
      //  model: 'League',
      //  key: 'id'
      // }
    }
  });
  return UserLeague;
};