(function () {
   'use strict';

   function ContactNotesController($scope, contactNotesService) {

      var vm = this;

      vm.addNewContactNote = function () {
         vm.newNote = {
            contactId: vm.selectedContact.contactId,
            note: '###New Note\n\n_just another note_'
         };
      };

      vm.cancelNewNote = function () {
         vm.newNote = undefined;
      };

      vm.saveNote = function (contactNote) {
         contactNotesService.saveContactNote(contactNote)
            .success(function (note) {
               var existingNote = _.find(vm.contactNotes, { contactNoteId: note.contactNoteId });

               if (_.isUndefined(existingNote)) {
                  vm.contactNotes.push(note);
               } else {
                  existingNote.editMode = false;
               }

               vm.cancelNewNote();
            });
      };

      vm.deleteNote = function (contactNote) {
         contactNotesService.deleteContactNote(contactNote)
            .success(function (note) {
               _.remove(vm.contactNotes, contactNote);
            });
      };

      $scope.$watch('ctrl.selectedContact', function (newVal) {
         vm.selectedContact = newVal;
         getNotes();
      });

      function getNotes() {
         if (_.isUndefined(vm.selectedContact)) return;

         contactNotesService.getAll(vm.selectedContact.contactId)
            .success(function (notes) {
               vm.contactNotes = notes;
            });
      }
   }

   angular.module('contact-manager')
      .controller('ContactNotesController', ContactNotesController);

} ());