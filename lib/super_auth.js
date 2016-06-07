// 'use strict';
//
// const jwt = require('jsonwebtoken');
// const User = require('../model/user');
// const secret = process.env.SECRET;
//
// module.exports = function(req, res, next) {
//   let superuser = req.body.user || req.headers.user;
//   let userErr = new Error('Unauthorized access');
//
//   if(!superuser) return next(userErr);
//
//   User.findOne({_id:}, (err, user) => {
//     if (!user || err) return next(userErr);
//     req.user = user;
//     next();
//   });
// };
