var blogControllers = angular.module('blogControllers', []);

blogControllers.controller('HomeController', [ '$scope', '$route', '$http', function($scope, $route, $http) {

  $scope.togglePageControls = function() {
    $scope.showPageControls = ! $scope.showPageControls;
  }

  $scope.togglePostControls = function(post) {
    post.showControls = ! post.showControls;
  };

  $scope.deletePost = function(post) {
    $http.delete('/api/posts/' + post.id)
    .success(function() {
      $route.reload();
    })
  };

  // Get latest posts
  $http.get('/api/posts')
  .success(function(data) {
    $scope.posts = data.posts;
  });
}]);

blogControllers.controller('EditPostController', [ '$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

  // Get authors
  $http.get('/api/authors')
  .success(function(data) {
    $scope.authors = data.authors;
  });

  $scope.addPost = function($event) {
    var post = {
      author_id: $scope.author_id,
      title: $scope.post_title,
      abstract: $scope.post_abstract,
      body: $scope.post_body
    };

    $http.post('/api/posts', post)
    .success(function(data) {
      console.log(data);
    });
  };

}]);
