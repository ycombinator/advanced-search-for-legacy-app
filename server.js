const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  port: 8080
});

// Serve APIs
server.route({ method: 'GET', path: '/api/contacts', handler: require('./api/list_contacts') });
server.route({ method: 'POST', path: '/api/contacts', handler: require('./api/create_contact') });
server.route({ method: 'GET', path: '/api/contacts/{contact_id}', handler: require('./api/retrieve_contact') });
server.route({ method: 'PUT', path: '/api/contacts/{contact_id}', handler: require('./api/update_contact') });
server.route({ method: 'DELETE', path: '/api/contacts/{contact_id}', handler: require('./api/delete_contact') });
server.route({ method: 'GET', path: '/api/search', handler: require('./api/search') });

// Serve static files
server.register(require('inert'), function(err) {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  server.start(function(err) {
    if (err) {
      throw err;
    }
    console.log('Server running at: ', server.info.uri);
  });

});
