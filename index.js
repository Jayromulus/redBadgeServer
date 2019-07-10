require('dotenv').config()

const express = require('express')
const app = express()
const sequelize  = require('./db')
const bodyparser = require('body-parser')
const portfolio = require('./controllers/portfolioController')

sequelize.sync()

app.use(require('./middleware/headers'));
app.use(bodyparser.json());
app.use('/portfolio', portfolio)

app.listen(process.env.PORT, () => {console.log(`app is listening on port ${process.env.PORT}`)})