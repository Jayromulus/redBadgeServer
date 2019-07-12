const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate().then(
    () => { console.log('connected to postgres database') },
    (err) => { console.log(err) }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./models/user.js')(sequelize, Sequelize);
db.portfolio = require('./models/portfolio.js')(sequelize, Sequelize);
db.league = require('./models/leagueModel.js')(sequelize, Sequelize);


db.portfolio.belongsTo(db.user);
db.league.hasMany(db.user);
db.user.belongsTo(db.league);

module.exports = sequelize;