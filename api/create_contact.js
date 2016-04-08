const async = require('async');
const connection = require('./mysql_connection');

module.exports = function(request, reply) {

  const normalizeInput = function(next) {
    Object.keys(request.payload).map(function(key) {
      if (typeof request.payload[key] === 'string') {
        request.payload[key] = request.payload[key].trim();
      }
    });
    next();
  };

  const insertOrSelectAddressFromDb = function(next) {
    const query = ' \
      SELECT  id \
      FROM    address \
      WHERE   LOWER(line_1) = ? \
      AND     LOWER(IFNULL(line_2,"")) = ? \
      AND     LOWER(city) = ? \
      AND     LOWER(postal_code) = ? \
      AND     LOWER(state) = ? \
      AND     LOWER(country) = ? \
      ';
    connection.query(query, [
      request.payload.line_1.toLowerCase(),
      (typeof request.payload.line_2 !== 'undefined' ? request.payload.line_2.toLowerCase() : ''),
      request.payload.city.toLowerCase(),
      request.payload.postal_code.toLowerCase(),
      request.payload.state.toLowerCase(),
      request.payload.country.toLowerCase()
    ])
    .then(function(rows) {
      if (rows.length === 1) {
        next(null, rows[0].id);
      } else {
        const now = new Date();
        const query = ' \
          INSERT INTO address ( \
            line_1, line_2, city, postal_code, state, country, created_on, updated_on \
          ) VALUES ( \
            ?, ?, ?, ?, ?, ?, ?, ? \
          )';
        connection.query(query, [
          request.payload.line_1,
          request.payload.line_2,
          request.payload.city,
          request.payload.postal_code,
          request.payload.state,
          request.payload.country,
          now,
          now
        ])
        .then(function(result) {
          next(null, result.insertId);
        });
      }
    });
  };

  const insertContactInDb = function(addressId, next) {
    const now = new Date();
    const query = ' \
      INSERT INTO contact ( \
        first_name, last_name, organization, phone_number, email, address_id, created_on, updated_on \
      ) VALUES ( \
        ?, ?, ?, ?, ?, ?, ?, ? \
      )';
    connection.query(query, [
      request.payload.first_name,
      request.payload.last_name,
      request.payload.organization,
      request.payload.phone_number,
      request.payload.email,
      addressId,
      now,
      now
    ])
    .then(function(result) {
      next(null, result.insertId);
    });

  }

  const sendReply = function(err, contactId) {
    reply({
      id: contactId
    })
    .code(201);
  };

  async.waterfall([
    normalizeInput,
    insertOrSelectAddressFromDb,
    insertContactInDb
  ], sendReply);

};
