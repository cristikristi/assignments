(function () {
  'use strict';

  angular.module('public')
  .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['$rootScope'];
  function UserInfoController($rootScope) {
    var userInfoCtrl = this;
    userInfoCtrl.userInfo = $rootScope.userInfo;
  }

})();
