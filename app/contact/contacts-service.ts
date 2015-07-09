import * as angular from 'angular';
import * as _ from 'lodash';
import {IContact} from './contact';

export class ContactService {
   constructor(private $http) { }

   getAll() {
      return this.$http.get('/api/contacts');
   }

   getContact(contactId: number|string) {
      return this.$http.get(`/api/contacts/${contactId}`);
   }

   saveContact(contact: IContact) {
      return this.$http({
         url: `/api/contacts/${contact.contactId || ''}`,
         method: _.isUndefined(contact.contactId) ? 'POST' : 'PUT',
         data: contact
      });
   }

   deleteContact(contactId: number) {
      return this.$http.delete(`/api/contacts/${contactId}`);
   }
}