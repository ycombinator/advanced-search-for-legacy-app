const connection = require('./mysql_connection');

module.exports = function(request, reply) {

  var query = "\
    DELETE FROM posts \
    WHERE id = ?";

  connection.query(query, [ request.params.post_id ])
  .then(function(result) {
    reply()
    .code(204);
  });

};
