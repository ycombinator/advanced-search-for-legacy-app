const async = require('async');
const connection = require('./mysql_connection');

module.exports = function(request, reply) {
  const selectContactFromDb = function(next) {
    const query = ' \
      SELECT      c.*, a.*, c.id AS id \
      FROM        contact AS c \
      INNER JOIN  address AS a ON c.address_id = a.id \
      WHERE       c.id = ? \
      ';
    connection.query(query, [ request.params.contact_id ])
    .then(function(rows) {
      if (rows.length === 1) {
        next(null, rows[0]);
      } else {
        next('Contact not found');
      }
    });
  };

  const sendReply = function(err, contact) {
    if (err) {
      reply({
        message: err
      })
      .code(404);
    } else {
      reply(contact);
    }
  };

  async.waterfall([
    selectContactFromDb
  ], sendReply)

};
