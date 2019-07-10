module.exports = (sequelize, DataTypes) => {
    return sequelize.define('portfolio', {
        stocks: DataTypes.Array(DataTypes.STRING),
        owner: DataTypes.STRING,
        league: DataTypes.STRING,
        funds: DataTypes.REAL
    })
}