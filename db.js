const Sequelize = require('sequelize');
const db = {};


const sequelize = new Sequelize({
  username: "postgres",
  password: "123trees",
  database: "redx",
  host: 'localhost',
  dialect: 'postgres'
});


sequelize.authenticate()
  .then(() => console.log('Postgres db is connected'))
  .catch(err => console.log(err))


  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.User = require('./models/user')(sequelize, Sequelize);
  db.Portfolio = require('./models/portfolio')(sequelize, Sequelize);
  db.League = require('./models/league')(sequelize, Sequelize);
  db.UserLeague= require('./models/userLeague')(sequelize, Sequelize);

  db.Portfolio.belongsTo(db.User, {
    foreignKey: 'userId',
    targetKey: 'id'
  })
  db.User.hasOne(db.Portfolio)
  db.League.belongsToMany(db.User, {
    through: 'userLeague',
    foreignKey: 'userId',
    targetKey: 'leagueId'
  });
  db.User.belongsToMany(db.League, {
    through: 'userLeague',
    foreignKey: 'leagueId',
    targetKey: 'userId'
  });

  
  
  
  
  module.exports = db;
      