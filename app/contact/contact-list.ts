import * as angular from 'angular';
import * as _ from 'lodash';
import {IContact} from './contact';
import {ContactService} from './contacts-service';

export class ContactListController {
   selectedContact: IContact;
   contacts: IContact[];

   constructor(
      private $state,
      private $stateParams,
      private contactsService) {
      this.init();
   }

   selectContact(contact: IContact) {
      this.selectedContact = contact;
      this.$state.go('contacts.notes', { contactId: contact.contactId });
   }

   deleteContact(contact: IContact) {
      this.contactsService.deleteContact(contact.contactId)
         .success(() => {
            _.remove(this.contacts, contact);
         });
   }

   init() {
      this.contactsService.getAll()
         .success(contacts => {
            this.contacts = contacts;

            var existingContact = _.find(this.contacts, {
               contactId: parseInt(this.$state.params.contactId, 10)
            });

            if (existingContact) {
               this.selectContact(existingContact);
            }
         });
   }
}