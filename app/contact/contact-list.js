(function () {
   'use strict';

   function ContactListController($state, $stateParams, contactsService) {

      var vm = this;
      
      vm.selectContact = function (contact) {
         vm.selectedContact = contact;
         $state.go('contacts.notes', {contactId:contact.contactId});
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
               
               var existingContact = _.find(vm.contacts, {
                  contactId: parseInt($state.params.contactId, 10)
               });
               
               if(existingContact){
                  vm.selectContact(existingContact);
               }
            });
      }
   }

   angular.module('contact-manager')
      .controller('ContactListController', ContactListController);

} ());