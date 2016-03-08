'use strict';

var todoApp = angular.module('todoApp',[]);

todoApp.controller('TodoCtrl', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService) {
  $scope.formData = {};
  $scope.todos = [];

  TodoService.getTodos().then(function(response) {
    console.log(response);
    $scope.todos = response;
  })

  $scope.addTodo = function() {
    console.log($scope.formData);
    TodoService.addTodo($scope.formData).then(function(response) {
      console.log(response);
      $scope.todos.push(response)
      $scope.formData = {};
    })
  }

  $scope.removeTodo = function(todo) {
    console.log(todo);
    TodoService.removeTodo(todo).then(function(response) {
      $scope.todos.splice($scope.todos.indexOf(todo), 1)
      console.log(response);
    })
  }
}])
