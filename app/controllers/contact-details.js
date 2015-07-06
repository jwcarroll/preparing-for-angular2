(function () {
   'use strict';

   angular.module('contact-manager')
      .controller('ContactDetailController',
         function ($scope, $location, $routeParams, $q, contactsService) {

            var originalContact = {};

            $scope.cancelChanges = function () {
               $scope.contact = angular.copy(originalContact);
            };

            $scope.saveContact = function () {
               contactsService.saveContact($scope.contact).success(function () {
                  $location.path("/contacts");
               });
            };

            $scope.$watch('contact', function (newVal, oldVal) {
               originalContact = angular.copy(newVal);
            });

            init();

            function init() {
               var contactId = $routeParams['contactId'];
               $scope.contact = {};
               getContact(contactId).then(function (contact) {
                  $scope.contact = contact;
               });
            }

            function getContact(contactId) {
               var def = $q.defer();

               if (_.isUndefined(contactId) || contactId === "new") {
                  def.resolve({});
               }

               contactsService.getContact(contactId).success(function (contact) {
                  def.resolve(contact);
               });

               return def.promise;
            }
         });

} ());