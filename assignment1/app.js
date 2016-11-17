(function () {
'use strict'

  angular.module('LunchCheckerApp', [])

  .controller('LunchCheckerController', LunchCheckerController);
LunchCheckerController.$inject =['$scope'];
  function LunchCheckerController($scope) {

    $scope.textBox="";
    $scope.message="";
    $scope.messageColor="";
    var re = /\s*,\s*/;
    $scope.checkTooMuch =function () {
      var arrayOfStrings = $scope.textBox.split(re);
      arrayOfStrings = arrayOfStrings.filter(Boolean);

      if($scope.textBox===""){
        $scope.message="Please enter data first";
         $scope.messageColor="red";
      }else if(arrayOfStrings.length <= 3){
         $scope.message="Enjoy!";
         $scope.messageColor="green";
       } else if (arrayOfStrings.length > 3){
         $scope.message="Too much!";
         $scope.messageColor="green";
       }




    };



  }

})();
