angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'contactsCtrl'
  })
}])

.controller('contactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
  // Initialize Firebase
  var rootRef = firebase.database().ref('contacts');
  $scope.contacts = $firebaseArray(rootRef);
  console.log($scope.contacts);
  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }
  $scope.hide = function(){
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }
  $scope.addFormSubmit = function(){
    var name = null;
    var email = null;
    var company = null;
    if($scope.name) name = $scope.name;
    if($scope.email) email = $scope.email;
    if($scope.company) company = $scope.company;
    $scope.contacts.$add({
      name: name,
      email: email,
      company: company
    }).then(function(rootRef){
      var id = rootRef.key;
      console.log(id);
      // clearFields();
      $scope.addFormShow = false;
    });
  }
  $scope.showContact = function(contact){
    console.log('details');
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;

    $scope.contactShow = true;

  }
}])
