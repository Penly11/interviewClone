'use strict';

(function () {
	angular.module('todoApp')
		.factory('todos', function (localStorageService) {

			// When the app starts up, if localStorage is empty, throw a few demo todos in there.
			// Remove for production, but this makes testing easier until the ability to add
			// a todo is added to the interface.
			if(!angular.isArray(localStorageService.get('todos'))) {
				localStorageService.set('todos', [
					{ id: 0, name: 'Pack my lunch' },
					{ id: 1, name: 'Walk the dog' },
					{ id: 2, name: 'Go for a run' }
				]);
			}

			return {
				getTodos: getTodos,
				getTodo: getTodo,
				addTodo: addTodo,
				editTodo: editTodo,
				deleteTodo: deleteTodo
			};

			function getTodos () {
				return localStorageService.get('todos') || [];
			}

			function getTodo (id) {
				var todos = getTodos();
				for (var i = 0; i < todos.length; ++i) {
					if (todos[i].id === id) {
						return todos[i];
					}
				}

				return null;
			}

			function addTodo (todo) {
				var todos = getTodos(),
						newId = null;
				
				//Make sure a unique id is added based on the highest id in the array, but only if the array contains an object
				if(todos.length>0){
					newId = todos[todos.length-1].id + 1;
				}
				else{
					newId = 0;
				}
				
				todo.id = newId;
				todos.push(todo);
				localStorageService.set('todos', todos);
			}

			function editTodo (todo) {
				var todos = getTodos();
				var todoIndex = -1;
				
				for (var i = 0; i < todos.length; ++i) {
					if (todos[i].id === todo.id) {
						todoIndex = i;
						break;
					}
				}

				if (todoIndex === -1) {
					throw new Error('Can\'t find specified todo');
				}

				todos.splice(todoIndex, 1, todo);
				localStorageService.set('todos', todos);
			}
		
			function deleteTodo (todo) {
				var todos = getTodos();
				var todoIndex = -1;
				
				for (var i = 0; i < todos.length; ++i) {
					if (todos[i].id === todo.id) {
						todoIndex = i;
						break;
					}
				}

				if (todoIndex === -1) {
					throw new Error('Can\'t find specified todo');
				}
				//Remove the todo with matching id
				todos.splice(todoIndex, 1);
				localStorageService.set('todos', todos);
			}
		});

})();