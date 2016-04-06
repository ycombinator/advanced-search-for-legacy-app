const connection = require('./mysql_connection');

module.exports = function(request, reply) {

  var query = "\
    SELECT   * \
    FROM     authors \
    ORDER BY first_name, last_name ASC";

  connection.query(query, [ request.query.email ])
  .then(function(rows) {
    reply({
      authors: rows
    });
  });

};
