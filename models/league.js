
  module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    isCurrent: DataTypes.BOOLEAN
  }, {});
  
  return League;
};
