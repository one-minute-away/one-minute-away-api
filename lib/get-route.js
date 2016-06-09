<<<<<<< HEAD
// 'use strict';
//
// const User = require('./../model/user');
//
// module.exports = exports = function(req, res, next) {
//
// };
=======
'use strict';

const User = require('./../model/user');

module.exports = exports = function(req, res, next) {
  let userId = req.params.id;
  let savedId = req.body.savedRouteId;
  if (!savedId || !userId) return next(new Error('no saved id on request'));
  User.findOne({_id: userId}, (err, user) => {
    let happyRoute = user.routes.id(savedId);
    req.route_id = happyRoute.route_id;
    req.stop_id = happyRoute.stop_id;
    next();
  });
};
>>>>>>> 3afae072e87ae76f47f85412e9caf1838dcdad55
