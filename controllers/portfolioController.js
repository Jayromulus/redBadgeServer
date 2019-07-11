let router = require('express').Router();
let Portfolio = require('../db').import('../models/portfolio');

router.post('/new', (req, res) => {
    Portfolio.create({
        stocks: req.body.portfolio.stocks,
        owner: req.body.portfolio.owner,
        league: req.body.portfolio.league,
        funds: req.body.portfolio.funds
    }).then(createSucess = (portfolio) => {
        res.status(200).json({
            portfolio: portfolio,
            message: 'Portfolio Created'
        })
    },
    createError = err => res.send(500, err)
    )
})

router.get('/', (req, res) => {
    Portfolio.findAll({where: {owner: 'Keve'}})
    .then(createSuccess = (portfolio) => {
        res.status(200).json({
            portfolio: portfolio,
            message: 'found them'
        })
    },
    createError = err => res.status(500, err)
    )
})

router.put('/update/:id', (req, res) => {
    Portfolio.update(req.body.portfolio, {
        where: {id: req.params.id},
        returning: true
    }).then(
        portfolio => res.status(200).json(portfolio)
    ).catch(
        err => res.status(500).json({ error: err })
    )
})

router.delete('/delete/:id', (req, res) => {
    Portfolio.destroy({where: {id: req.params.id}}).then(
        portfolio => res.status(200).json(portfolio)
    ).catch(
        err => res.status(500).json({error: err })
    )
})

module.exports = router