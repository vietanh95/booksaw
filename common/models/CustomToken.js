/*jslint node:true*/
/*jslint nomen:true*/
/*jslint esversion:6*/
'use strict';

var uuid = require('uuid/v4');

module.exports = function(Customtoken) {

  Customtoken.createCustomAccessTokenId = function (callback) {

    return callback(null, uuid());
  };

  Customtoken.observe('before save', function(ctx, next) {
    return Customtoken.createCustomAccessTokenId(function(err, id) {
      if (err)
        return next(err);
      ctx.instance.id = id;
      return next();
    });
  });
};