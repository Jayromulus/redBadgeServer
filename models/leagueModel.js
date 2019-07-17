
module.exports = function(sequelize, DataTypes){
    const League = sequelize.define('league', {
        
        players : DataTypes.ARRAY(DataTypes.STRING),
        isCurrent: DataTypes.BOOLEAN
        
    })
    return League
}