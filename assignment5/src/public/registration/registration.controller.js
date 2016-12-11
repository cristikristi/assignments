(function () {
  'use strict';

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['RegistrationService','MenuService'];
function RegistrationController(RegistrationService, MenuService) {
  var reg = this;


  reg.submit = function () {
    var userInfo = {};
    reg.warningMsg = false;

    if (reg.user){
      reg.completed = true;
      userInfo.firstName = reg.user.firstName;
      userInfo.lastName = reg.user.lastName;
      userInfo.email = reg.user.email;
      userInfo.phone = reg.user.phone;
      userInfo.menuNumber = reg.user.menuNumber.toUpperCase();

      if(userInfo.menuNumber){
        MenuService.getMenu(userInfo.menuNumber).then(function (response) {
          userInfo.menuItem = response;
        })
        .catch(function (result) {
            // Show  warning
            reg.warningMsg = true;
          });
      }
    }

    RegistrationService.registerUser(userInfo);
  };
}

})();
