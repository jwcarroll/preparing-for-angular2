import * as angular from 'angular';
import * as _ from 'lodash';
import {ContactNotesService} from './contact-notes-service';
import {IContactNote} from './contact-note';
import {IContact} from '../contact/contact';

interface IEditableContactNote extends IContactNote {
   editMode:boolean;
}

class ContactNotesController {
   newNote:IEditableContactNote;
   selectedContact:IContact;
   contactNotes:IEditableContactNote[];

   constructor(
      private $stateParams,
      private contactNotesService: ContactNotesService) {

      if ($stateParams.contactId) {
         this.selectedContact = <IContact>{
            contactId: $stateParams.contactId
         };
      }

      this.getNotes();
   }

   addNewContactNote() {
      this.newNote = <IEditableContactNote>{
         contactId: this.selectedContact.contactId,
         note: '###New Note\n\n_just another note_'
      };
   }

   cancelNewNote() {
      this.newNote = undefined;
   }

   saveNote(contactNote) {
      this.contactNotesService.saveContactNote(contactNote)
         .success(note => {
            var existingNote = _.find(this.contactNotes, { contactNoteId: note.contactNoteId });

            if (_.isUndefined(existingNote)) {
               this.contactNotes.push(note);
            } else {
               existingNote.editMode = false;
            }

            this.cancelNewNote();
         });
   }

   deleteNote(contactNote:IContactNote) {
      this.contactNotesService.deleteContactNote(contactNote.contactId, contactNote.contactNoteId)
         .success(note => {
            _.remove(this.contactNotes, contactNote);
         });
   }

   getNotes() {
      if (_.isUndefined(this.selectedContact)) return;

      this.contactNotesService.getAll(this.selectedContact.contactId)
         .success(function(notes) {
            this.contactNotes = notes;
         });
   }
}

angular.module('contact-manager')
   .controller('ContactNotesController', ContactNotesController);
