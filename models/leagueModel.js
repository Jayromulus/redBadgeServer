module.exports = function(sequelize, DataTypes){
    return sequelize.define('league', {
        wLeague: DataTypes.ARRAY(DataTypes.STRING),
        qLeague:DataTypes.ARRAY(DataTypes.STRING)
    })
}