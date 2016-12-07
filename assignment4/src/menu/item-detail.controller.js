(function () {
  'use strict'

  angular.module('data')
  .controller('ItemDetailController',ItemDetailController);

  ItemDetailController.$inject = ['$stateParams','items'];
  function ItemDetailController($stateParams, items) {
    var itemDetail = this;
    var item = items.data.menu_items[$stateParams.itemId];
    itemDetail.name = item.name;
    itemDetail.quantity = item.quantity;
    itemDetail.description = item.description;
    itemDetail.smallPortion = item.small_portion_name;
    itemDetail.largePortion = item.large_portion_name;
    itemDetail.priceSmall = item.price_small;
    itemDetail.priceLarge = item.price_large;

  }

})();
