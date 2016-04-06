const Hapi = require('hapi');
const listPostsApi = require('./api/list_posts');
const listAuthorsApi = require('./api/list_authors');
const createPostApi = require('./api/create_post');
const deletePostApi = require('./api/delete_post');

const server = new Hapi.Server();
server.connection({
  port: 8080
});

// Serve APIs
server.route({ method: 'GET', path: '/api/posts', handler: listPostsApi });
server.route({ method: 'GET', path: '/api/authors', handler: listAuthorsApi });
server.route({ method: 'POST', path: '/api/posts', handler: createPostApi });
server.route({ method: 'DELETE', path: '/api/posts/{post_id}', handler: deletePostApi });

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
