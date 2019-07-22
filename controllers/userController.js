const router = require('express').Router();
var sequelize = require('../db')
var User = sequelize.User;
var Portfolio = sequelize.Portfolio;


router.get('/:id',(req, res) => { 
    User.findAll({ where: { id: req.params.id }, returning: true,
      include: [{
        model: Portfolio,
        attributes: ['id','coins', 'quantity', 'funds']
      }],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(user);
    })
    .catch((error) => res.status(400).json(error));
});

router.post('/userWithPortfolio', async (req, res) => {
  try {
    const myUser = await User.create({
      username: req.body.username,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });

    const myPortfolio = await Portfolio.create({
      coins: [],
      quantity: [],
      funds: 100000
    })

    await myPortfolio.setUser(myUser);

    res.send({
      userCreated: myUser.id,
      portfolioCreated: myPortfolio.id
    })

  } catch (err) {

    res.send(err.message)
  }
})


router.put('/:id', (req, res) => {
    User.findAll({ where: { id: req.params.id }})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return User
      .update(req.body, { where: { id: req.params.id },
          username: req.body.username || user.username,
          password: req.body.password || user.password,
        })
        .then(() => res.status(200).send(user))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
})

router.delete('/deleteUser', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
})
module.exports= router
