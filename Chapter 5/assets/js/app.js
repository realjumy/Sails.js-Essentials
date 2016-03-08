var socketApp = angular.module('socketApp',[]);

socketApp.controller('ChatController',['$http','$log','$scope',function($http,$log,$scope){


    $scope.predicate = '-id';
    $scope.reverse = false;
    $scope.baseUrl = 'http://localhost:1337';
    $scope.chatList =[];
    $scope.getAllMessages = function(){

        io.socket.get('/chat/');

        $http.get($scope.baseUrl+'/chat/')
             .success(function(success_data){
                     $scope.chatList = success_data;
                     $log.info(success_data);
             });
    };

    $scope.getAllMessages();
    $scope.chatUser = "Anonymous"
    $scope.chatMessage="";

    io.socket.on('chat',function(obj){

        if(obj.verb === 'created'){
            $log.info(obj)
            $scope.chatList.push(obj.data);
            $scope.$digest();
        }

    });

    $scope.sendMsg = function(){
        $log.info($scope.chatMessage);
        io.socket.post('/chat/',{user:$scope.chatUser,message: $scope.chatMessage});
        $scope.chatMessage = "";
    };
}]);
