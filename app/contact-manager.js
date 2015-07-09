(function () {
   'use strict';

   var app = angular.module('contact-manager', ['ui.router', 'btford.markdown']);

   app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/contacts");

      $stateProvider.state('contacts', {
            url:'/contacts',
            templateUrl: '/app/contact/contact-list.html',
            controller: 'ContactListController',
            controllerAs: 'ctrl'
         })
         .state('contacts.notes', {
            url:'/:contactId/notes',
            templateUrl: '/app/contact-notes/contact-notes.html',
            controller: 'ContactNotesController',
            controllerAs: 'notes'
         })
         .state('contact', {
            url: '/contact/:contactId',
            templateUrl: '/app/contact/contact-details.html',
            controller: 'ContactDetailController',
            controllerAs: 'ctrl'
         });
   });

} ());