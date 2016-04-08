var addressBookControllers = angular.module('addressBookControllers', []);

addressBookControllers.controller('ListContactsController',
  [ '$scope', '$route', '$http', function($scope, $route, $http) {

  // Get contacts
  $http.get('/api/contacts')
  .success(function(data) {
    $scope.contacts = data.contacts;
  });

  $scope.deleteContact = function(contact) {
    $http.delete('/api/contacts/' + contact.id)
    .success(function() {
      $route.reload();
    })
  };

}]);

addressBookControllers.controller('CreateContactController',
  [ '$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.createContact = function($event) {
    $http.post('/api/contacts', $scope.contact)
    .success(function(data, statusCode) {
      if (statusCode === 201) {
        $location.path('/');
      }
    });
  };

}]);

addressBookControllers.controller('UpdateContactController',
  [ '$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {

  // Get contact
  $http.get('/api/contacts/' + $routeParams.contact_id)
  .success(function(data) {
    $scope.contact = data;
  });

  $scope.updateContact = function($event) {
    $http.put('/api/contacts/' + $routeParams.contact_id, $scope.contact)
    .success(function(data, statusCode) {
      if (statusCode === 204) {
        $location.path('/');
      }
    });
  };
}]);
