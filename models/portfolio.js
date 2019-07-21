
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    coins: DataTypes.ARRAY(DataTypes.STRING),
    quantity: DataTypes.ARRAY(DataTypes.FLOAT),
    funds: DataTypes.FLOAT
  }, {});
  return Portfolio;
};
