(function () {
   'use strict';

   var app = angular.module('contact-manager', ['ui.router', 'btford.markdown']);

   app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/contacts");

      $stateProvider.state('contacts', {
            url:'/contacts',
            templateUrl: '/app/views/contact-list.html',
            controller: 'ContactListController',
            controllerAs: 'ctrl'
         })
         .state('contacts.notes', {
            url:'/:contactId/notes',
            templateUrl: '/app/views/contact-notes.html',
            controller: 'ContactNotesController',
            controllerAs: 'notes'
         })
         .state('contact', {
            url: '/contact/:contactId',
            templateUrl: '/app/views/contact-details.html',
            controller: 'ContactDetailController',
            controllerAs: 'ctrl'
         });
   });

} ());