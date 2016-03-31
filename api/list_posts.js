const connection = require('./mysql_connection');

var restructurePosts = function(posts) {
  var restructuredPosts = [];
  posts.forEach(function(post) {
    if (!restructuredPosts.hasOwnProperty(post.post_id)) {
      post.author = {
        first_name: post.first_name,
        last_name: post.last_name,
        email: post.email,
        organization: post.organization
      };
      post.tags = [];
      delete post.id;
      delete post.author_id;
      delete post.first_name;
      delete post.last_name;
      delete post.email;
      delete post.organization;
      restructuredPosts.push(post);
    }
    post.tags.push(post.tag);
    delete post.tag;
    delete post.post_id;
  });
  return restructuredPosts;
};

var getPostsFromDb = function(cb) {
  var query = "\
    SELECT      p.*, p.id AS post_id, a.* \
    FROM        posts AS p \
    INNER JOIN  authors AS a ON p.author_id = a.id \
    ORDER BY    p.publish_date DESC";

  connection.query(query, cb);
};

var getTagsForPostFromDb = function(post, cb) {
  var query = "\
    SELECT      t.tag \
    FROM        tags AS t \
    INNER JOIN  posts_tags AS pt ON t.id = pt.tag_id \
    WHERE       pt.post_id = ?";

  connection.query(query, [ post.id ], cb);
};

module.exports = function(request, reply) {

  getPostsFromDb(function(err, posts) {

    // TODO: Use _ or async
    var done = (function() {
      var numPostsDone = 0;
      return function(cb) {
        ++numPostsDone;
        if (numPostsDone == posts.length) {
          cb();
        }
      };
    })();

    var addTagsToPost = function(post, tags, cb) {
      post.tags = [];
      tags.forEach(function(tag) {
        post.tags.push(tag.tag);
      });
      cb();
    };

    var replyWithPosts = function() {
      reply({
        posts: posts
      });
    };

    posts.forEach(function(post) {
      getTagsForPostFromDb(post, function(err, tags) {
        addTagsToPost(post, tags, function() {
          done(replyWithPosts);
        });
      });
    });
  });
};
