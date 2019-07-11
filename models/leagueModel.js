
module.exports = function(sequelize, DataTypes){
    const League = sequelize.define('league', {
        wLeague: DataTypes.ARRAY(DataTypes.STRING),
        qLeague:DataTypes.ARRAY(DataTypes.STRING)
    })
    League.associate = function(models) {
        League.hasMany(models.User, {foreignKey: 'leagueId', as: 'members'})
    }
    return League
}