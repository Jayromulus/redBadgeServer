module.exports = (sequelize, DataTypes) => {
    return sequelize.define('portfolio', {
        stocks: DataTypes.ARRAY(DataTypes.STRING),
        owner: DataTypes.STRING,
        league: DataTypes.STRING,
        funds: DataTypes.FLOAT
    })
}