(function () {

   function ContactNotesService($http) {

      var svc = this;

      svc.getAll = function (contactId) {
         return $http.get('/api/contacts/' + contactId + '/notes');
      };

      svc.getContactNote = function (contactId, contactNoteId) {
         return $http.get('/api/contacts/' + contactId + '/notes/' + contactNoteId);
      };

      svc.saveContactNote = function (contactNote) {
         return $http({
            url: '/api/contacts/' + contactNote.contactId + '/notes/' + (contactNote.contactNoteId || ''),
            method: _.isUndefined(contactNote.contactNoteId) ? 'POST' : 'PUT',
            data: contactNote
         });
      };

      svc.deleteContactNote = function (contactId, contactNoteId) {
         return $http.delete('/api/contacts/' + contactId + '/notes/' + contactNoteId);
      };
   }

   angular.module('contact-manager')
      .service('contactNotesService', ContactNotesService);

} ());