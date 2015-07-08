(function () {
   'use strict';

   function ContactListController($scope, contactsService) {

      $scope.selectContact = function (contact) {
         $scope.selectedContact = contact;
      };

      $scope.deleteContact = function (contact) {
         contactsService.deleteContact(contact.contactId)
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
   }

   angular.module('contact-manager')
      .controller('ContactListController', ContactListController);

} ());