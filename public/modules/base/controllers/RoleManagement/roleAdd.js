angular.module('mean').controller('RoleAddCtrl', function ($scope, $rootScope, $location, roleService, resourceService) {

    $scope.init = function() {
        $scope.resources = [];
        $scope.role = {
            roleName : '',
            resources : []
        };
        
        resourceService.getAll()
             .then(function (response, status, headers, config) {
                      $scope.resources = response.data;
                    }, function (response, status, headers, config) {
                          $scope.errorMessage = response.data.message;
                    });
    };

    $scope.init();
    
    $scope.saveRole = function (form){
        roleService.add($scope.role)
            .success(function (response, status, headers, config) {
                $location.path('/roles');
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.message;
            });
    };
    
    $scope.Cancel = function () {
        $location.path('/roles');   
    };
});
