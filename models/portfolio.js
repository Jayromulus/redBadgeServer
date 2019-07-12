module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('portfolio', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        stocks: DataTypes.ARRAY(DataTypes.STRING),
        owner: DataTypes.STRING,
        league: DataTypes.STRING,
        funds: DataTypes.FLOAT
    })
    return Portfolio
}

// reference for association
// https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554