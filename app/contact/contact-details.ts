import * as angular from 'angular';
import * as _ from 'lodash';
import {IContact} from 'contact';
import {ContactService} from './contacts-service';

export class ContactDetailController {
   private _contact: IContact;
   private originalContact: IContact;

   constructor(
      private $state,
      private $stateParams,
      private $q,
      private contactsService: ContactService) {
      this.init();
   }

   cancelChanges() {
      this.contact = angular.copy(this.originalContact);
   }

   saveContact() {
      this.contactsService.saveContact(this.contact)
         .success(() => {
            this.$state.go("contacts");
         });
   }

   get contact() {
      return this._contact;
   }

   set contact(newVal: IContact) {
      this.originalContact = angular.copy(newVal);
      this._contact = newVal;
   }

   init() {
      var contactId = this.$stateParams['contactId'];
      this.contact = <IContact>{};
      this.getContact(contactId)
         .then(contact => {
            this.contact = contact;
         });
   }

   getContact(contactId: number|string) {
      var def = this.$q.defer();

      if (_.isUndefined(contactId) || contactId === "new") {
         def.resolve({});
      }

      this.contactsService.getContact(contactId)
         .success(contact => {
            def.resolve(contact);
         });

      return def.promise;
   }
}