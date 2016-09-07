'use strict';

(function () {
	angular.module('todoApp')
		.component('todoList', {
			controller: TodoListController,
			template: `
				<h2>Your Todos</h2>
				<ul>
					<li ng-repeat="todo in $ctrl.todos track by todo.id">
						<a ui-sref="todoDetails({id: todo.id})">{{todo.name}}</a> &nbsp <button ng-click="$ctrl.deleteTodoClicked(todo)">Delete</button>
					</li>
				</ul>
				<p ng-if="$ctrl.todos.length === 0">No todos</p>
				<br>
				<p ng-show="$ctrl.addError" style="color:red">Please enter text before adding a Todo.</p>
				<span>Add a Todo: </span>
				<input type="text" ng-model="$ctrl.newTodo.name"></input><button ng-click="$ctrl.addTodoClicked($ctrl.newTodo)">Add</button>
			`
		});


	function TodoListController (todos) {

		this.$onInit = function () {
			this.todos = todos.getTodos();
		}
		
		this.addTodoClicked = function(todo){
			
			if(todo && todo.name.length>0){
				this.addError = false;
				todos.addTodo(todo);
				this.newTodo = "";
				this.todos = todos.getTodos();
			}
			else{
				this.addError = true;
			}
			
		}
		
		this.deleteTodoClicked = function(todo){
			todos.deleteTodo(todo);
			this.todos = todos.getTodos();
		}

	}

})();