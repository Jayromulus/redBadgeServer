const router = require('express').Router();
var sequelize = require('../db')
var League = sequelize.League;
var User = sequelize.User;
var Portfolio = sequelize.Portfolio;


router.get('/getOldLeague', (req, res) => {
  League.findAll({
    // where : { isCurrent: false },
    include: [{
      model: User,
      required: false,
      attributes: ['id', 'username']
    }]
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
      include: [{
        model: Portfolio,
        required: false,
        attributes: ['coins', 'quantity', 'funds'],
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

router.put('/:id', (req, res) => {
  League.findAll({ where: { id: req.params.id }})
  .then(league => {
    if (!league) {
      return res.status(404).send({
        message: 'User Not Found',
      });
    }
    return League
    .update(req.body, { where: { id: req.params.id },
        isCurrent: req.body.isCurrent || league.isCurrent
      })
      .then(() => res.status(200).send(league))
      .catch((error) => res.status(400).send(error));
  })
  .catch((error) => res.status(400).send(error));
})

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
