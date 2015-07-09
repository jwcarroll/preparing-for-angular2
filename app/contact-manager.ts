import * as angular from 'angular';
import 'angular-ui-router';
import './markdown/btford.markdown';
import {ContactCard} from './contact/contact-card';
import {ContactService} from './contact/contacts-service';
import {ContactDetailController} from './contact/contact-details';
import {ContactListController} from './contact/contact-list';
import {ContactNotesController} from './contact-notes/contact-notes';
import {ContactNotesService} from './contact-notes/contact-notes-service';

var app = angular.module('contact-manager', ['ui.router', 'btford.markdown'])
   .directive('contactCard', ContactCard)
   .service('contactsService', ContactService)
   .controller('ContactDetailController', ContactDetailController)
   .controller('ContactListController', ContactListController)
   .controller('ContactNotesController', ContactNotesController)
   .service('contactNotesService', ContactNotesService);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
   $urlRouterProvider.otherwise("/contacts");

   $stateProvider.state('contacts', {
      url: '/contacts',
      templateUrl: '/app/contact/contact-list.html',
      controller: 'ContactListController',
      controllerAs: 'ctrl'
   })
      .state('contacts.notes', {
         url: '/:contactId/notes',
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

export default {
	name:'contact-manager'
};