// 代码生成时间: 2025-08-30 14:38:19
 * This module provides functionality to schedule and manage tasks at specified intervals.
 */

(function() {
  'use strict';

  // Define the AngularJS module and dependencies
  angular.module('ScheduledTaskScheduler', [])
    .factory('TaskScheduler', ['$timeout', '$q', TaskScheduler]);

  function TaskScheduler($timeout, $q) {
    // TaskScheduler service constructor
    var service = {};

    // Internal list to hold scheduled tasks
    var scheduledTasks = [];

    // Method to schedule a new task with a specific interval
    service.scheduleTask = function(task, interval) {
      // Check if interval is valid
      if (typeof interval !== 'number' || interval <= 0) {
        throw new Error('Invalid interval. Interval must be a positive number.');
      }

      // Create a deferred object to handle the task scheduling
      var deferred = $q.defer();

      // Function to execute the task
      var executeTask = function() {
        try {
          // Execute the provided task function
          var result = task();
          deferred.notify(result);
        } catch (error) {
          // Handle any errors that occur during task execution
          deferred.reject(error);
        } finally {
          // Schedule the next execution of the task
          $timeout(executeTask, interval);
        }
      };

      // Schedule the task for the first time
      $timeout(executeTask, interval);

      // Return the promise associated with the task for control
      return deferred.promise;
    };

    // Method to cancel a scheduled task by its promise
    service.cancelTask = function(promise) {
      // Check if the promise is valid
      if (!promise.$$state) {
        throw new Error('Invalid promise. Promise must come from a scheduled task.');
      }

      // Cancel the task by removing it from the scheduled tasks list
      var index = scheduledTasks.indexOf(promise);
      if (index > -1) {
        scheduledTasks.splice(index, 1);
        promise.$$state.status = 2; // Cancelled status
      }
    };

    return service;
  }

  // Define the ScheduledTaskController to handle UI interactions
  angular.module('ScheduledTaskScheduler')
    .controller('ScheduledTaskController', ['$scope', 'TaskScheduler', function($scope, TaskScheduler) {
      // Scope variables to hold task information
      $scope.task = null;
      $scope.interval = 1000; // Default interval in milliseconds
      $scope.promise = null;

      // Method to schedule a new task
      $scope.schedule = function() {
        if ($scope.promise) {
          // Cancel any existing task before scheduling a new one
          TaskScheduler.cancelTask($scope.promise);
        }

        // Schedule the task with the specified interval
        $scope.promise = TaskScheduler.scheduleTask($scope.task, $scope.interval);
      };

      // Method to cancel the scheduled task
      $scope.cancel = function() {
        if ($scope.promise) {
          TaskScheduler.cancelTask($scope.promise);
          $scope.promise = null;
        }
      };
    }]);
})();