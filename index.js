require('dotenv').config()

const express = require('express')
const app = express()
const sequelize  = require('./db')
const bodyparser = require('body-parser')

sequelize.sync()

app.use(require('./middleware/headers'));
app.use(bodyparser.json());

app.listen(process.env.PORT, () => {console.log(`app is listening on port ${process.env.PORT}`)})