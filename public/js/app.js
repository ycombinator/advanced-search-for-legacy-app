var blogApp = angular.module('blogApp', [
  'ngRoute',
  'blogControllers'
]);

blogApp.config([ '$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller:  'HomeController'
  })
  .when('/posts/new', {
    templateUrl: 'partials/edit.html',
    controller: 'EditPostController'
  })
  .when('/posts/:postId/edit', {
    templateUrl: 'partials/edit.html',
    controller: 'EditPostController'
  });
}]);
