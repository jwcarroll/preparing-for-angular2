import * as angular from 'angular';
import * as _ from 'lodash';

interface IContact {
   contactId:number;
   firstName:string;
   lastName:string;
   city:string;
   twitter:string;
}

class ContactListController {
   selectedContact: IContact;
   contacts: IContact[];

   constructor(
      private $state,
      private $stateParams,
      private contactsService) { }

   selectContact(contact:IContact) {
      this.selectedContact = contact;
      this.$state.go('contacts.notes', { contactId: contact.contactId });
   }

   deleteContact(contact:IContact) {
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

angular.module('contact-manager')
   .controller('ContactListController', ContactListController);