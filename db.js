const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize.authenticate().then(
    () => { console.log('connected to postgres database') },
    (err) => { console.log(err) }
)

const Models = {
    //IMPORT ALL YOUR MODELS HERE WITH THE NAMES YOU RETURNED THEM AS IN YOUR MODELS. EXAMPLE BELOW
    User: sequelize.import('./models/user'),
    Portfolio: sequelize.import('./models/portfolio'),
    League: sequelize.import('./models/leagueModel')
}
Object.keys(Models).forEach((modelName) => {
    if ('associate' in Models[modelName]) {
        Models[modelName].associate(Models);
    }
})
module.exports = sequelize;