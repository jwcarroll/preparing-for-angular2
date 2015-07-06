(function () {

   angular.module('contact-manager')
      .service('contactsService', function ($http) {

         var svc = this;

         svc.getAll = function () {
            return $http.get('/api/contacts');
         };

         svc.getContact = function (contactId) {
            return $http.get('/api/contacts/' + contactId);
         };

         svc.saveContact = function (contact) {
            return $http({
               url: '/api/contacts/' + (contact.id || ''),
               method: _.isUndefined(contact.id) ? 'POST' : 'PUT',
               data: contact
            });
         };

         svc.deleteContact = function (contactId) {
            return $http.delete('/api/contacts/' + contactId);
         };

      });

} ());