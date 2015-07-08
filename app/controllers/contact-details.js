(function () {
   'use strict';

   function ContactDetailController($location, $routeParams, $q, contactsService) {

      var vm = this,
         contact,
         originalContact = {};

      vm.cancelChanges = function () {
         vm.contact = angular.copy(originalContact);
      };

      vm.saveContact = function () {
         contactsService.saveContact(vm.contact).success(function () {
            $location.path("/contacts");
         });
      };

      Object.defineProperty(vm, 'contact', {
         get:function(){
            return contact;
         },
         set:function(newVal){
            originalContact = angular.copy(newVal);
            contact = newVal;   
         }
      });

      init();

      function init() {
         var contactId = $routeParams['contactId'];
         vm.contact = {};
         getContact(contactId).then(function (contact) {
            vm.contact = contact;
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
   }

   angular.module('contact-manager')
      .controller('ContactDetailController', ContactDetailController);

} ());