
module.exports = function(sequelize, DataTypes){
    const League = sequelize.define('league', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
        user: DataTypes.UUID,
        league: DataTypes.STRING
    })
    return League
}