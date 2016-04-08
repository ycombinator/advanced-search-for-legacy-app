const connection = require('./mysql_connection');

module.exports = function(request, reply) {

  var query = "\
    DELETE FROM contact \
    WHERE id = ?";

  connection.query(query, [ request.params.contact_id ])
  .then(function(result) {
    reply()
    .code(204);
  });

};
