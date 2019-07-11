module.exports = (sequelize, DataTypes) => {
    const portfolio = sequelize.define('portfolio', {
        stocks: DataTypes.ARRAY(DataTypes.STRING),
        owner: DataTypes.STRING,
        league: DataTypes.STRING,
        funds: DataTypes.FLOAT
    })
    portfolio.belongsTo(models.User, {foreignKey: 'portfolioId', as: 'portfolio'})
    return portfolio
}

// reference for association
// https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554