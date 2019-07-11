module.exports = function(sequelize, DataTypes){
    return sequelize.define('league', {
        wLeague: DataTypes.Array(DataTypes.STRING),
        qLeague:DataTypes.Array(DataTypes.STRING)
    })
}