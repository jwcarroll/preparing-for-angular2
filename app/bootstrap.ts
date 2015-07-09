import * as angular from 'angular';
import app from 'contact-manager';

angular.element(document).ready(function() {
    angular.bootstrap(document, [app.name]);
});