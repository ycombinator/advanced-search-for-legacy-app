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

  $scope.search = function($event) {

    if (!$scope.q) {
      return $route.reload();
    }

    $http.get('/api/search?q=' + $scope.q)
    .success(function(data) {
      var contacts = [];
      data.hits.hits.forEach(function(hit) {
        contacts.push({
          id: hit._id,
          first_name: hit._source.first_name,
          last_name: hit._source.last_name,
          organization: hit._source.organization,
          phone_number: hit._source.phone_number,
          email: hit._source.email,
          line_1: hit._source.address.line_1,
          line_2: hit._source.address.line_2,
          city: hit._source.address.city,
          postal_code: hit._source.address.postal_code,
          state: hit._source.address.state,
          country: hit._source.address.country
        });
      });
      $scope.contacts = contacts;
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
