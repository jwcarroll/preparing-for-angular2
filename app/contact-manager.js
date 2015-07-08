(function () {
   'use strict';

   var app = angular.module('contact-manager', ['ngRoute', 'btford.markdown']);

   app.config(function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
         .when('/contacts', {
            templateUrl: '/app/views/contact-list.html',
            controller: 'ContactListController'
         })
         .when('/contacts/:contactId', {
            templateUrl: '/app/views/contact-details.html',
            controller: 'ContactDetailController'
         })
         .otherwise({
            redirectTo: '/contacts'
         });
   });

} ());