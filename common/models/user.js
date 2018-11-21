'use strict';
var app = require("../../server/server");

var disableAllMethods = require('./../ultils/disable_method.js').disableAllMethods;
module.exports = function(Useradmin) {
  disableAllMethods(Useradmin, '');
   Useradmin.login =  async (email, password) => {
     console.log(email, password);
     let dataUser = await Useradmin.findOne({where: {email: email}});
    console.log(email, dataUser);
     //let dataUser = await app.models.CoffeeShop.getNameDataCoffe();
    return [200, 'success', [dataUser]];
  };
  Useradmin.remoteMethod(
    'login',
    {
      http: {path: '/login', verb: 'post'},
      accepts: [
        {arg: 'email', type: 'string', required: false,},
        {arg: 'password', type: 'string', required: false,},
      ],
      returns: [
        {arg: 'response_code', type: 'number'},
        {arg: 'message', type: 'string'},
        {arg: 'data', type: 'object'},
      ],
    }
  );
};
