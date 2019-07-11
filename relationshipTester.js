const models = require('./models')
const User = models.User
const Portfolio = models.Portfolio
const Leagues = models.Leagues

Leagues.create({
    wLeague: ['james'],
    qLeague: ['jason', 'jon']
})
.then((newLeagues) => {
    console.log(newLeague.get())
})
.catch((err) => {
    console.log("Error while creating: ", err)
})

User.bulkCreate([
    {username: 'jeremy', fName: 'name', lName: 'name', email: 'e@mail.com', password: 'password'}
    {username: 'jeremy', fName: 'name', lName: 'name', email: 'e@mail.com', password: 'password'}
    {username: 'jeremy', fName: 'name', lName: 'name', email: 'e@mail.com', password: 'password'}
])
.then((newUsers) => {
    console.log(newUsers)
})
.catch((err) => {
    console.log("error while making them: ", err)
})

