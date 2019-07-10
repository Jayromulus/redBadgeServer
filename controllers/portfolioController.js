let router = require('express').Router();
let Portfolio = require('../db').import('../models/portfolio');

router.get('/get', (req, res) => {
    console.log('you have accessed the get route')
})