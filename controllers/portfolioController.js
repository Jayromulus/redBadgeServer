const router = require('express').Router();
var sequelize = require('../db')
var Portfolio = sequelize.Portfolio;
var validateSession = require('../middleware/validateSession');



router.put('/:id', validateSession, (req, res) => {
  Portfolio.findAll({ where: { id: req.params.id }})
  .then(portfolio => {
    if (!portfolio) {
      return res.status(404).send({
        message: 'Portfolio Not Found',
      });
    }
    return Portfolio
    .update(req.body, { where: { id: req.params.id },
        coins: req.body.coins || portfolio.username,
        quantity: req.body.quantity || portfolio.password,
        funds: req.body.funds || portfolio.funds,
        assets: req.body.assets || portfolio.assets
      })
      .then(() => res.status(200).send(user))
      .catch((error) => res.status(400).send(error));
  })
  .catch((error) => res.status(400).send(error));
})


module.exports= router
