const router = require('express').Router();
var sequelize = require('../db')
var League = sequelize.League;
var User = sequelize.User;

  router.get('/leagueList', (req, res) => {
      League.findAll({
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((league) => res.status(200).send(league))
      .catch((error) => { res.status(400).send(error); });
  });

  router.get('/getLeague', (req, res) => {
      League.findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((league) => {
        if (!league) {
          return res.status(404).send({
            message: 'League Not Found',
          });
        }
        return res.status(200).send(role);
      })
      .catch((error) => res.status(400).send(error));
  });

  router.post('/createLeague', (req, res) => {
      League.create({
        isCurrent: true,
      })
      .then((league) => res.status(201).send(league))
      .catch((error) => res.status(400).send(error));
  });

  router.post('/userLeague', (req, res) => {
      League.findById(req.body.leagueId, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
      .then((league) => {
        if (!league) {
          return res.status(404).send({
            message: 'League Not Found',
          });
        }
        User.findById(req.body.leagueId).then((roster) => {
          if (!roster) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          league.addUser(roster);
          return res.status(200).send(league);
        })
      })
      .catch((error) => res.status(400).send(error));
  });

  router.put('/updateLeague', (req, res) => {
      League.findById(req.params.id, {
        include: [{
          model: User,
          as: 'users'
        }],
      })
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
            message: 'Role Not Found',
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
module.exports= router
