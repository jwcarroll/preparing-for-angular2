(function () {
   'use strict';

   function ContactListController(contactsService) {

      var vm = this;
      
      vm.selectContact = function (contact) {
         vm.selectedContact = contact;
      };

      vm.deleteContact = function (contact) {
         contactsService.deleteContact(contact.contactId)
            .success(function () {
               _.remove(vm.contacts, contact);
            });
      };

      init();

      function init() {
         contactsService.getAll()
            .success(function (contacts) {
               vm.contacts = contacts;
            });
      }
   }

   angular.module('contact-manager')
      .controller('ContactListController', ContactListController);

} ());