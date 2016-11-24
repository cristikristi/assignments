(function () {
'use strict'

  angular.module('ShoppingListApp', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject =['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.buyItem = function (index) {
        ShoppingListCheckOffService.buyItem(index);
    };
  }

    AlreadyBoughtController.$inject =['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtList = this;
        boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
      var service = this;

      var toBuyItems = [{ name: "cookies", quantity: 10 },
                        { name: "wine", quantity: 2 },
                      { name: "water", quantity: 5 },
                    { name: "milk", quantity: 1 },
                  { name: "mais", quantity: 2 },
                { name: "chips", quantity: 3 },
              { name: "eggs", quantity: 10 }];
      var boughtItems = [];

      service.getToBuyItems = function () {
        return toBuyItems;
      };
      service.getBoughtItems = function () {
        return boughtItems;
      };
      service.buyItem = function (index) {
        boughtItems.push(toBuyItems[index]);
        toBuyItems.splice(index,1);
      };
    }

})();
