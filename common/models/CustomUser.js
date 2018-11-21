/*jslint node:true*/
/*jslint nomen:true*/
/*jslint esversion:6*/
'use strict';
var disableAllMethods = require('./../ultils/disable_method.js').disableAllMethods;
module.exports = function(Customuser) {
  disableAllMethods(Customuser, '');
  Customuser.addToLogin = function (email, password, credentials, include, callback) {
    //console.log(credentials, email, password, 3333333333);
    credentials = {email, password};
    console.log(credentials);
    return Customuser.login(credentials, include, function (loginErr, loginToken) {
      credentials = {email, password};
      if (loginErr)
      return callback(loginErr);
      return Customuser.findById(loginToken.userId, function (findErr, userData) {
        if (findErr)
        return callback(findErr);
        return callback(null, loginToken.toObject());
      });
    });
  };

  Customuser.remoteMethod('addToLogin', {
    'http': {
      'path': '/add_to_login',
      'verb': 'post'
    },
    'accepts': [
      /*{
        'arg': 'credentials',
        'type': 'object',
        'description': 'Login credentials',
        'required': true,
        'http': {
          'source': 'body'
        }
      },*/
      {
        'arg': 'email',
        'type': 'string',
      },
      {
        'arg': 'password',
        'type': 'string',
      },
      /*{
        'arg': 'include',
        'type': 'string',
        'description': 'Related objects to include in the response. See the description of return value for more details.',
        'http': {
          'source': 'query'
        }
      }*/
    ],
    'returns': [
      {
        'arg': 'token',
        'type': 'object',
        'root': true
      }
    ]
  });
};