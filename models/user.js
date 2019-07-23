
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
  },
  fName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  lName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
  }
  }, {});
  
  return User;
};