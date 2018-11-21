module.exports = function(app) {
  /*var ds = app.dataSources.mysqlDs;
  var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
  ds.automigrate(lbTables, function(er) {
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    ds.disconnect();
  });*/

  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create([{
      name: 'Bel Cafe',
      city: 'Vancouver',
    }, {
      name: 'Three Bees Coffee House',
      city: 'San Mateo',
    }, {
      name: 'Caffe Artigiano',
      city: 'Vancouver',
    }], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
