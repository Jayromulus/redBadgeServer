let router = require('express').Router();
let Portfolio = require('../db').import('../models/portfolio');
let validateSession = require('../middleware/validateSession')

router.post('/new', validateSession, (req, res) => {
    Portfolio.create({
        coins: req.body.portfolio.coins,
        quantity: req.body.portfolio.quantity,
        owner: req.user.username,
        league: req.body.portfolio.league,
        funds: req.body.portfolio.funds,
        // userId: req.user.userId
    }).then(createSucess = (portfolio) => {
        res.status(200).json({
            portfolio: portfolio,
            message: 'Portfolio Created'
        })
    },
    createError = err => res.send(500, err)
    )
})

router.get('/:page', validateSession, (req, res) => {
    let limit = 10;
    let offset = 0;
    Portfolio.findAndCountAll()
    .then((data) => {
        let page = req.params.page;
        let pages = Math.ceil(data.count / limit);
                    offset = limit * (page - 1)
        Portfolio.findAll({
            attributes: ['id', 'coins', 'quantity', 'owner', 'league', 'funds'],
            limit: limit,
            offset: offset,
            $sort: {id: 1}
        })
        .then((users) => {
            res.status(200).json({'result': users, 'count': data.count, 'pages': pages})
        })
    })
    createError = err => res.status(500, err)
})

router.put('/update/:id', validateSession, (req, res) => {
    Portfolio.update(req.body.portfolio, {
        where: {id: req.params.id},
        returning: true
    }).then(
        portfolio => res.status(200).json(portfolio)
    ).catch(
        err => res.status(500).json({ error: err })
    )
})

router.delete('/delete/:id', validateSession, (req, res) => {
    Portfolio.destroy({where: {id: req.params.id}}).then(
        portfolio => res.status(200).json(portfolio)
    ).catch(
        err => res.status(500).json({error: err })
    )
})

module.exports = router