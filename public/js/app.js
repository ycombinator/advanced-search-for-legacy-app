var addressBookApp = angular.module('addressBookApp', [
  'ngRoute',
  'addressBookControllers'
]);

addressBookApp.config([ '$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/list.html',
    controller:  'ListContactsController'
  })
  .when('/contacts/create', {
    templateUrl: 'partials/create.html',
    controller: 'CreateContactController'
  })
  .when('/contacts/:contact_id/update', {
    templateUrl: 'partials/update.html',
    controller: 'UpdateContactController'
  });
}]);
