import * as angular from 'angular';
import * as _ from 'lodash';
import {IContactNote} from './contact-note';

export class ContactNotesService {
   constructor(private $http) { }

   getAll(contactId: number|string) {
      return this.$http.get(`/api/contacts/${contactId}/notes`);
   }

   getContactNote(contactId: number, contactNoteId: number) {
      return this.$http.get(`/api/contacts/${contactId}/notes/${contactNoteId}`);
   }

   saveContactNote(contactNote:IContactNote) {
      return this.$http({
         url: `/api/contacts/${contactNote.contactId}/notes/${contactNote.contactNoteId || ''}`,
         method: _.isUndefined(contactNote.contactNoteId) ? 'POST' : 'PUT',
         data: contactNote
      });
   }

   deleteContactNote(contactId: number, contactNoteId: number) {
      return this.$http.delete(`/api/contacts/${contactId}/notes/${contactNoteId}`);
   };
}

angular.module('contact-manager')
   .service('contactNotesService', ContactNotesService);
