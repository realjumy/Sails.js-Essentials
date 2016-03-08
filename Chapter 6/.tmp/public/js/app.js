'use strict';

angular.module('sails-chat-example', [])

  .controller('MainCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.messages = [];
    $scope.data  = {
      name    : null,
      message : null
    };

    $scope.send = function(){
      io.socket.post('/message/chat', $scope.data, function(res){});
    };

    io.socket.get('/message/subscribe', function(res){});

    io.socket.on('message', function onServerSentEvent (msg) {
      switch(msg.verb) {

        case 'created':
          $scope.messages.push(msg.data);
          $scope.$apply();
          break;

        default: return;
      }
    });

    io.socket.on('connect',function(){
        $http.get('http://localhost:1337/Message')
        .success(function(data){
            for(var i = 0 ; i < data.length; i++) {
                $scope.messages.push(data[i]);
                $scope.$apply();
            }
        });
    });

  }]);
