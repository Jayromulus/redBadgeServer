require('dotenv').config()

const express = require('express')
const app = express()
const db  = require('./db')
const bodyparser = require('body-parser')
const user = require('./controllers/userController')
const league= require('./controllers/leagueController')
const portfolio= require('./controllers/portfolioController')


db.sequelize.sync()


app.use(require('./middleware/headers'));
app.use(bodyparser.json());
app.use('/portfolio', portfolio);
app.use('/user', user);
app.use('/league', league)


//app.use('/q', q)
//app.use('/w', w)

app.listen(process.env.PORT, () => {console.log(`app is listening on port ${process.env.PORT}`)})