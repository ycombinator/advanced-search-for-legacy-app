const Hapi = require('hapi');
const listPostsApi = require('./api/list_posts');
// const addPostApi = require('./api/add_post');

const server = new Hapi.Server();
server.connection({
  port: 8080
});

// Serve APIs
server.route({
  method: 'GET',
  path: '/api/posts',
  handler: listPostsApi
});

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
