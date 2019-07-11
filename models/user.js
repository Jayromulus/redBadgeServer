module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define ('user', {
        username: {
            type: DataTypes.STRING,
            allownull: false
        },
        fName: {
            type: DataTypes.STRING,
            allownull: false
        },
        lName: {
            type: DataTypes.STRING,
            allownull: false
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
    User.associate = function(models) {
        User.belongsTo(models.League, {foreignKey: 'leagueId'})
    }
    return User;
}