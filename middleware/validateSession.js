const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
   const token  = req.headers.authorization;
   jwt.verify(token, process.env.JWT_SECRET, (err,decodeToken) => {
       if(!err && decodeToken){
           console.log('searching for user')
           User.findOne({where : {id: decodeToken.id}})
           .then(user => {
               if(!user) throw err;
               req.user = user;
               console.log('user validated')
               return next();
           })
           .catch(err => next(err));
       } else {
           req.errors = err;
           return res.status(500).send('Not Authorized');
       }
   });
};
module.exports = validateSession;