module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('portfolio', {
        stocks: DataTypes.ARRAY(DataTypes.STRING),
        owner: DataTypes.STRING,
        league: DataTypes.STRING,
        funds: DataTypes.FLOAT
    })
    Portfolio.associate = function(models) {
        Portfolio.belongsTo(models.User, {foreignKey: 'userId'})
    }
    return Portfolio
}

// reference for association
// https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554