const async = require('async');
const elasticsearch = require('./elasticsearch_connection');

module.exports = function(request, reply) {
  const searchAddressBookInElasticsearch = function(next) {
    elasticsearch.search({
      index: 'address_book',
      q: request.query.q
    })
    .then(function(results) {
      next(null, results);
    });
  };

  const sendReply = function(err, results) {
    reply(results);
  };

  async.waterfall([
    searchAddressBookInElasticsearch
  ], sendReply)

};
