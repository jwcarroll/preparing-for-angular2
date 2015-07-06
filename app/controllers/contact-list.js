/// <reference path="../../typings/tsd.d.ts" />

(function () {
	'use strict';

	angular.module('contact-manager')
		.controller('ContactListController', function ($scope, contactsService) {

			$scope.deleteContact = function (contact) {
				contactsService.deleteContact(contact.id)
					.success(function () {
					_.remove($scope.contacts, contact);
				});
			};

			init();

			function init() {
				contactsService.getAll()
					.success(function (contacts) {
					$scope.contacts = contacts;
				});
			}
		});

} ());