
module.exports = function(sequelize, DataTypes){
    const League = sequelize.define('league', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
          
        wLeague: DataTypes.ARRAY(DataTypes.STRING),
        qLeague:DataTypes.ARRAY(DataTypes.STRING)
    })
    return League
}