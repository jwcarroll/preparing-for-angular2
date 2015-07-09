import * as angular from 'angular';

export function ContactCard() {
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