import * as angular from 'angular';

function ContactCard() {
   return {
      restrict: 'E',
      templateUrl: '/app/contact/contact-card.html',
      scope: {
         contact: '=',
         onSelect: '&',
         onDelete: '&'
      }
   };
}

angular.module('contact-manager')
   .directive('contactCard', ContactCard);
