var express = require('express');
var router = express.Router();
var wLeague = require('../db').import('../Models/leagueModel')

router.post("/weekly", (req,res)=> {
    const wLeague= {
        user: username
    }
    wLeague.create(wLeague)
    .then(wLeague=> res.status(200).json(wLeague))
    .catch(err => res.status(500).json({error: err}));
})
router.post("/quarterly", (req, res)=> {
    const qLeague ={
        user: username
    }
    qLeague.create(qLeague)
    .then(qLeague => res.status(200).json(qLeague))
    .catch(err => res.status(500).json({error:err}));
})

router.get('/weekly', (req,res)=>{
    wLeague.findAll({where: {owner: req.user}})
    .then(user=> res.status(200).json(user))
    .catch( err=> res.status(500).json({error: err}));
})
router.get('/quarterly', (req,res)=>{
    qLeague.findAll({where: {owner: req.user}})
    .then(user=> res.status(200).json(user))
    .catch( err=> res.status(500).json({error: err}));
})
router.delete('/weekly/user', (req,res)=> {
    wLeague.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(user=> res.status(200).json(user))
    .catch(err=> res.status(500).json({error:err}))
})
router.delete('/quarterly/user', (req,res)=> {
    qLeague.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(user=> res.status(200).json(user))
    .catch(err=> res.status(500).json({error:err}))
})