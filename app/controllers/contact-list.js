(function () {
   'use strict';

   angular.module('contact-manager')
      .controller('ContactListController', function ($scope, contactsService) {

         $scope.selectContact = function (contact) {
            $scope.selectedContact = contact;
         };

         $scope.deleteContact = function (contact) {
            contactsService.deleteContact(contact.id)
               .success(function () {
                  _.remove($scope.contacts, contact);
               });
         };

         init();

         function init() {
            contactsService.getAll()
               .success(function (contacts) {
                  $scope.contacts = contacts;
               });
         }
      });

} ());