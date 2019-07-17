let express = require('express');
let router = express.Router();
let League = require('../db').import('../Models/leagueModel')
const validateSession = require('../middleware/validateSession')

router.post("/weekly", (req,res)=> {
    const league= {
        players: req.body.players,
        isCurrent: req.body.isCurrent
    }
    League.create(league)
    .then(league=> res.status(200).json(league))
    .catch(err => res.status(500).json({error: err}));
})


router.get('/weekly', validateSession, (req,res)=>{
    League.findAll({where: {isCurrent: true}})
    .then(user=> res.status(200).json(user))
    .catch( err=> res.status(500).json({error: err}));
})

router.get('/archive', validateSession, (req,res)=>{
    League.findAll({where: {isCurrent: false}})
    .then(user=> res.status(200).json(user))
    .catch( err=> res.status(500).json({error: err}));
})

router.put('/:id', (req, res) => {
    League.update(req.body, { where: { id: req.params.id }, returning: true, })
      .then(league => res.status(200).json(league))
      .catch(err => res.status(500).json({ error: err}))
  })
router.delete('/weekly/user', validateSession, (req,res)=> {
    League.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(user=> res.status(200).json(user))
    .catch(err=> res.status(500).json({error:err}))
})



module.exports = router