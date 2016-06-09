'use strict';

const User = require('./../model/user');

module.exports = exports = function(req, res, next) {
  let userId = req.params.id;
  let savedId = req.body.savedRouteId;
  if (!savedId || !userId) return next(new Error('no saved id on request'));
  User.findOne({_id: userId}, (err, user) => {
    if (err) return next(err);
    let happyRoute = user.routes.id(savedId);
    if (!happyRoute) return next(new Error('no route found for user'));
    req.route_id = happyRoute.route_id;
    req.stop_id = happyRoute.stop_id;
    next();
  });
};
