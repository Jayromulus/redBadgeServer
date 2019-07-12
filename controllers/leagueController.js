let express = require('express');
let router = express.Router();
let League = require('../db').import('../Models/leagueModel')
const validateSession = require('../middleware/validateSession')

router.post("/weekly", (req,res)=> {
    const wLeague= {
        user: username
    }
    League.create(wLeague)
    .then(wLeague=> res.status(200).json(wLeague))
    .catch(err => res.status(500).json({error: err}));
})
router.post("/quarterly", validateSession, (req, res)=> {
    const qLeague ={
        user: username
    }
    League.create(qLeague)
    .then(qLeague => res.status(200).json(qLeague))
    .catch(err => res.status(500).json({error:err}));
})

router.get('/weekly', validateSession, (req,res)=>{
    League.findAll({where: {owner: req.user}})
    .then(user=> res.status(200).json(user))
    .catch( err=> res.status(500).json({error: err}));
})
router.get('/quarterly', validateSession, (req,res)=>{
    League.findAll({where: {owner: req.user}})
    .then(user=> res.status(200).json(user))
    .catch( err=> res.status(500).json({error: err}));
})
router.delete('/weekly/user', validateSession, (req,res)=> {
    League.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(user=> res.status(200).json(user))
    .catch(err=> res.status(500).json({error:err}))
})
router.delete('/quarterly/user', validateSession, (req,res)=> {
    League.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(user=> res.status(200).json(user))
    .catch(err=> res.status(500).json({error:err}))
})

module.exports = router