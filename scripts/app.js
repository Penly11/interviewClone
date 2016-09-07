'use strict';

angular.module('todoApp', [ 'ui.router', 'LocalStorageModule' ])
	.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
		localStorageServiceProvider.setPrefix('todoApp');

		$urlRouterProvider.otherwise('/todos');

		$stateProvider
			.state('todos', {
				url: '/todos',
				component: 'todoList'
			})
			.state('todoDetails', {
				url: '/todos/{id}',
				component: 'todoDetails'
			})
	});