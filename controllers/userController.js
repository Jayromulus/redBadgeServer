var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/signin', (req,res) => {
    User.findOne({where : {username: req.body.user.username}})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, (err,matches)=>{
                if(matches){
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


router.post('/signup', (req,res) => {
    User.create({
        username: req.body.user.username,
        fName: req.body.user.fName,
        lName: req.body.user.lName,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10),
    })
    .then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            res.json({
                        user: user,
                        message: "user created",
                        sessionToken: token
                    });
        },
        function createError (err) {
         res.send(500,err)
        }
    );
});

router.get("/", (req, res) => {
    User.findAll()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({error: err}))
  });

router.put('/:id',(req, res) => {
    User.update(req.body.user, { where: { id: req.params.id }, returning: true, })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({ error: err}))
  });

  router.delete('/:id', (req, res) => {
      User.destroy({where: {id: req.params.id}})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({error: err}))
  });

module.exports = router;