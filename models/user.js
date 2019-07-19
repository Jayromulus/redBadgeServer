
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      defaultValue: true
  }
  }, {});
  
  return User;
};
