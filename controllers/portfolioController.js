const router = require('express').Router();
var sequelize = require('../db')
var Portfolio = sequelize.Portfolio;
var User = sequelize.User;

  router.get('/portfoliolist', (req, res) => {
      Portfolio.findAll({
        include: [{
          model: User,
          as: 'owner'
        }],
      })
      .then((portfolios) => res.status(200).send(portfolios))
      .catch((error) => { res.status(400).send(error); });
  });

  router.get('/portfolioId', (req, res) => {
      Portfolio.findById(req.params.id, {
        include: [{
          model: User,
          as: 'owner'
        }],
      })
      .then((portfolio) => {
        if (!portfolio) {
          return res.status(404).send({
            message: 'Portfolio Not Found',
          });
        }
        return res.status(200).send(portfolio);
      })
      .catch((error) => res.status(400).send(error));
  });

  router.post('/addPortfolio', (req, res) => {
      Portfolio.create({
        coins: [],
        quantity: [],
        funds: 100000,
        
      })
      .then((portfolio) => res.status(201).send(portfolio))
      .catch((error) => res.status(400).send(error));
  });

  router.put('/updatePortfolio', (req, res) => {
      Portfolio.findById(req.User.id)
        .then(portfolio => {
        if (!portfolio) {
          return res.status(404).send({
            message: 'Portfolio Not Found',
          });
        }
        return Portfolio
          .update({
            coins: req.body.coins,
            quantity: req.body.quantity,
            funds: req.body.funds
          })
          .then(() => res.status(200).send(portfolio))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  });

  router.delete('/deletePortfolio', (req, res) => {
      Portfolio.findById(req.user.id)
      .then(portfolio => {
        if (!portfolio) {
          return res.status(400).send({
            message: 'Portfolio Not Found',
          });
        }
        return portfolio
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  })
module.exports= router
