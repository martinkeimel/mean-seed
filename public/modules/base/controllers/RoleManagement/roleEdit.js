angular.module('mean').controller('RoleEditCtrl', function ($scope, $rootScope, $location, $routeParams, roleService, resourceService) {

    $scope.init = function() {
        $scope.editMode = true;
        $scope.roleId = $routeParams.id;
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

        roleService.getById($scope.roleId)
            .success(function (response, status, headers, config) {
                $scope.role.roleName = response.roleName;
                 for (var i = 0, len = response.resources.length; i < len; i++) {
                     $scope.role.resources.push({ id: response.resources[i]._id });
                 }
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });
        
    };

    $scope.init();

    $scope.saveRole = function (form){
        roleService.update($scope.roleId, $scope.role)
            .success(function (response, status, headers, config) {
                $location.path('/roles');
            })
            .error(function(response, status, headers, config) {
                $scope.errorMessage = response.data.message;
            });
    };

    $scope.Cancel = function () {
        $location.path('/roles');   
    };
});
