const connection = require('./mysql_connection');

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
