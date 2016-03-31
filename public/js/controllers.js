var blogApp = angular.module('blogApp', []);

blogApp.controller('IndexController', [ '$scope', '$http', function($scope, $http) {
  $http.get('/api/posts')
  .success(function(data) {
    $scope.posts = data.posts;
  });
}]);
