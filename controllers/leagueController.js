const router = require('express').Router();
var sequelize = require('../db')
var League = sequelize.League;
var User = sequelize.User;
var Portfolio = sequelize.Portfolio;


router.get('/getOldLeague', (req, res) => {
  League.findAll({
    include: [{
      model: User,
    }],
    // where : { isCurrent: false }
  })
    .then((league) => res.status(200).send(league))
    .catch((error) => { res.status(400).send(error); });
});

router.get('/getCurrentLeague', (req, res) => {
  League.findAll({
    include: [{
      model: User,
      where: { isActive: true },
      required: false,
      attributes: ['id', 'username'],
      // through: { attributes: [] },
      include: [{
        model: Portfolio,
        // as: 'userPortfolio',
        required: false,
        attributes: ['coins', 'quantity', 'funds'],
        // through: { attributes: [] }
      }]
    }
    ],
    where: { isCurrent: true }
  })
    .then((league) => {
      if (!league) {
        return res.status(404).send({
          message: 'League Not Found',
        });
      }
      return res.status(200).send(league);
    })
    .catch((error) => {
      res.status(400).send(error);
      console.log(error)
    })
});


router.post('/leagueWithUsers', async (req, res) => {
  try {
    const newLeague = await League.create({
      isCurrent: true
    });

    const roster = await User.findAll({
      where: { isActive: true },
      required: false,
      attributes: ['id', 'username'],
      through: { attributes: [] }

    });

    await newLeague.setUsers(roster);
    res.send({
      leagueCreated: newLeague.id,
    });

  } catch (err) {

    res.send(err.message)
  }
});

router.put('/updateLeague', (req, res) => {
  League.findById(req.params.id)
    .then(league => {
      if (!league) {
        return res.status(404).send({
          message: 'League Not Found',
        });
      }
      return league
        .update({
          isCurrent: false
        })
        .then(() => res.status(200).send(role))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
});

router.delete('/deleteLeague', (req, res) => {
  League.findById(req.params.id)
    .then(league => {
      if (!league) {
        return res.status(400).send({
          message: 'League Not Found',
        });
      }
      return league
        .destroy()
        .then(() => res.status(204).send())
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
);
module.exports = router
