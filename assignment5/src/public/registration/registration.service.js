(function () {
  'use strict';

  angular.module('public')
  .service('RegistrationService', RegistrationService);

  RegistrationService.$inject = ['$rootScope'];
  function RegistrationService($rootScope) {
    var service = this;

    service.registerUser = function (userInfo) {
      if(userInfo){
        $rootScope.userInfo = userInfo;
      }
    };
  }
})();
