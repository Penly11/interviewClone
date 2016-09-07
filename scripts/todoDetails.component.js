'use strict';

(function () {
	angular.module('todoApp')
		.component('todoDetails', {
			controller: TodoDetailsController,
			template: `
				<form>
					Name: <input ng-model="$ctrl.todo.name">

					<br />
					<button ng-click="$ctrl.save()">Save changes and back to list</button>
				</form>
			`
		});


	function TodoDetailsController ($state, todos) {

		this.$onInit = function () {
			this.todo = todos.getTodo(parseInt($state.params.id, 10));
		}

		this.save = function () {
			todos.editTodo(this.todo);
			$state.go('todos');
		}

	}

})();