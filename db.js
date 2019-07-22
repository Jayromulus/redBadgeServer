const Sequelize = require('sequelize');
const db = {};


const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/redx`,{
  username: "postgres",
  password: process.env.PASS,
  database: process.env.NAME,
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
    targetKey: 'id'
  })
  db.User.hasOne(db.Portfolio)
  db.League.belongsToMany(db.User, {
    through: 'userLeague',
    foreignKey: 'leagueId',
    targetKey: 'userId'
  });
  db.User.belongsToMany(db.League, {
    through: 'userLeague',
    foreignKey: 'userId',
    targetKey: 'leagueId'
  });

  
  
  
  
  module.exports = db;
      