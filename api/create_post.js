const connection = require('./mysql_connection');

module.exports = function(request, reply) {

  var query = "\
    INSERT INTO posts (\
      author_id, \
      title, \
      abstract, \
      body, \
      publish_date \
    ) VALUES ( \
      ?, \
      ?, \
      ?, \
      ?, \
      ? \
    )";

  var values = [
    request.payload.author_id,
    request.payload.title,
    request.payload.abstract,
    request.payload.body,
    new Date()
  ]
  connection.query(query, values)
  .then(function(result) {
    console.log(result.insertId);
  //
  //   reply({
  //     authors: rows
  //   });
  });

};
