(function () {
  'use strict';

  angular.module('data')
  .controller('MenuItemsController',MenuItemsController);

  MenuItemsController.$inject =['items'];
  function MenuItemsController(items) {
    var menuItems = this;
    menuItems.items = items.data.menu_items;
    menuItems.categoryName = items.data.category.name;
  }









  })();
