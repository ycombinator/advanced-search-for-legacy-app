const async = require('async');
const connection = require('./mysql_connection');

module.exports = function(request, reply) {
  const selectContactsFromDb = function(next) {
    const query = ' \
      SELECT      c.*, a.*, c.id AS id \
      FROM        contact AS c \
      INNER JOIN  address AS a ON c.address_id = a.id \
      ORDER BY    c.last_name ASC \
      ';
    connection.query(query)
    .then(function(rows) {
      next(null, rows);
    });
  };

  const sendReply = function(err, contacts) {
    reply({
      contacts: contacts
    });
  };

  async.waterfall([
    selectContactsFromDb
  ], sendReply)

};
