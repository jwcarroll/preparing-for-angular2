(function () {
   'use strict';

   function ContactNotesController($scope, contactNotesService) {

      $scope.addNewContactNote = function () {
         $scope.newNote = {
            contactId: $scope.selectedContact.contactId,
            note: '###New Note\n\n_just another note_'
         };
      };

      $scope.cancelNewNote = function () {
         $scope.newNote = undefined;
      };

      $scope.saveNote = function (contactNote) {
         contactNotesService.saveContactNote(contactNote)
            .success(function (note) {
               var existingNote = _.find($scope.contactNotes, { contactNoteId: note.contactNoteId });

               if (_.isUndefined(existingNote)) {
                  $scope.contactNotes.push(note);
               } else {
                  existingNote.editMode = false;
               }

               $scope.cancelNewNote();
            });
      };

      $scope.deleteNote = function (contactNote) {
         contactNotesService.deleteContactNote(contactNote)
            .success(function (note) {
               _.remove($scope.contactNotes, contactNote);
            });
      };

      $scope.$watch('selectedContact', function () {
         getNotes();
      });

      function getNotes() {
         if (_.isUndefined($scope.selectedContact)) return;

         contactNotesService.getAll($scope.selectedContact.contactId)
            .success(function (notes) {
               $scope.contactNotes = notes;
            });
      }
   }

   angular.module('contact-manager')
      .controller('ContactNotesController', ContactNotesController);

} ());