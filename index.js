var LivePg = require('pg-live-select');

// Database connection

// Update this connection string to match your configuration!
// When using an externally configured PostgreSQL server, the default port
// is 5432.

// TODO Use envoronment variables and proper defaults

var PG_URL = 'postgres://' + process.env.USER + ':numtel@127.0.0.1:5438/postgres';
var PG_CHANNEL = 'default_channel';

var liveDb = new LivePg(PG_URL, PG_CHANNEL);

var closeAndExit = function() {
  // Cleanup removes triggers and functions used to transmit updates
  liveDb.cleanup(process.exit);
};

// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);

// PgSelect function

function PgSelect(publishThis, clientTable, query, params, triggers) {
  var players = [
    { name: 'Kepler', score: 40 },
    { name: 'Leibniz', score: 50 },
    { name: 'Maxwell', score: 60 },
    { name: 'Planck', score: 70 },
  ];

  _.each(players, function(player) {
    publishThis.added('players', Random.id(), player);
  });

  publishThis.ready();
}

// Exports

module.exports = PgSelect;
