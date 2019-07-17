module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define ('user', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
          },
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
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
        
    });
    return User;
}