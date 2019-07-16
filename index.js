require('dotenv').config()

const express = require('express')
const app = express()
const sequelize  = require('./db')
const bodyparser = require('body-parser')
const portfolio = require('./controllers/portfolioController')
const leagues = require('./controllers/leagueController')
const user = require('./controllers/userController');


sequelize.sync({force:true})


app.use(require('./middleware/headers'));
app.use(bodyparser.json());
app.use('/portfolio', portfolio)
app.use("/user", user)
app.use('/league', leagues)


//app.use('/q', q)
//app.use('/w', w)

app.listen(process.env.PORT, () => {console.log(`app is listening on port ${process.env.PORT}`)})