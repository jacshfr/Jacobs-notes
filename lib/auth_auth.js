'use strict';

var User = require('../models/user');

module.exports = function() {
  return function(req, res, next) {
    console.log(req.user);
    if (req.decoded.expire < Date.now()) res.status(403).send('please relogin');

    if (req.user.basic.admin) {
      console.log('user is admin');
    } else {
      console.log('user is not admin');
    }
    next();
  };

};
