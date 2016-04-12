const async = require('async');
const connection = require('./mysql_connection');
const elasticsearch = require('./elasticsearch_connection');

module.exports = function(request, reply) {

  const deleteContactFromDb = function(next) {
    var query = "\
      DELETE FROM contact \
      WHERE id = ?";

    connection.query(query, [ request.params.contact_id ])
    .then(function(result) {
      next();
    });
  };

  const deleteContactFromElasticsearch = function(next) {
    elasticsearch.delete({
      index: 'address_book',
      type: 'contact',
      id: request.params.contact_id
    })
    .then(next);
  };

  const sendReply = function() {
    reply()
    .code(204);
  };

  async.waterfall([
    deleteContactFromDb,
    deleteContactFromElasticsearch
  ], sendReply);

};
