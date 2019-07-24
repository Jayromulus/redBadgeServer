const router = require('express').Router();
var sequelize = require('../db')
var User = sequelize.User;
var Portfolio = sequelize.Portfolio;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var validateSession = require('../middleware/validateSession');


router.get('/:id', validateSession, (req, res) => { 
    User.findAll({ where: { id: req.params.id }, returning: true,
      include: [{
        model: Portfolio,
        attributes: ['id','coins', 'quantity', 'funds', 'assets']
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

router.post('/signup', async (req, res) => {
  try {
    const myUser = await User.create({
      username: req.body.user.username,
      fName: req.body.user.fName,
      lName: req.body.user.lName,
      email: req.body.user.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    const myPortfolio = await Portfolio.create({
      coins: [],
      quantity: [],
      funds: 100000,
      assets: 0
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

router.post('/signin', (req,res) => {
  User.findOne({where : {username: req.body.user.username}})
  .then(user => {
      if(user){
        bcrypt.compare(req.body.user.password, user.password, (err,matches)=>{
          if(matches) {
                  let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                  res.json({
                      user: user,
                      message: "successfully authenticated",
                      sessionToken: token
                  })
              } else {
                  res.status(502).send({error : err + ' bad gateway'});
              }
          })
      } else {
          res.status(500).send({error: 'failed to authenticate'});
      }
  })
  .catch(() => res.status(501).send({error: 'failed to process'}))
});


router.put('/:id', validateSession, (req, res) => {
    User.findAll({ where: { id: req.params.id }})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return User
      .update(req.body, { where: { id: req.params.id },
          username: req.body.user.username || user.username,
          password: req.body.user.password || user.password,
        })
        .then(() => res.status(200).send(user))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
})

router.delete('/:id', validateSession, (req, res) => {
    User.findAll({ where: { id: req.params.id }})
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
