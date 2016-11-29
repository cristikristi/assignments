( function () {
  'use strict';
  angular.module('NarrowDownMenuAPP',[])
  .controller('NarrowDownMenuController',NarrowDownMenuController)
  .factory('MenuServiceFactory',MenuServiceFactory)
  .constant('ApibasePath',"http://davids-restaurant.herokuapp.com")
  .directive('foundItems',FoundItemsDirective);

function FoundItemsDirective() {
  var ddo={
      templateUrl: 'menuList.html',
      scope: {
        items:'<',
        onRemove: '&'
      },
      controller:FoundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController:true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var menu =this;

}

  NarrowDownMenuController.$inject = ['MenuServiceFactory'];
  function NarrowDownMenuController(MenuServiceFactory) {
    var menu = this;
    var menuService = MenuServiceFactory();

    menu.searchItems = function () {
    if(menu.searchTerm){
      menuService.getMatchedMenuItems(menu.searchTerm);
      menu.foundItems = menuService.getFoundItems();

    }else menu.foundItems =[];
    }

    menu.removeItem = function (itemIndex) {
      menuService.removeFoundItem(itemIndex);
      menu.foundItems = menuService.getFoundItems();
      if(menu.foundItems.length ===0){
        menu.searchTerm = "";
      }
    }


  }

  MenuSearchService.$inject = ['$http','ApibasePath']
  function MenuSearchService($http,ApibasePath) {
    var service = this;
    var foundItems = [];
    service.getMatchedMenuItems = function (searchTerm) {
      foundItems = [];
        var promise = service.getMenuItems();
        promise.then(function (response) {
          for(let value of response.data.menu_items){
            if(value.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
              foundItems.push(value);
            }
          }
        })
        .catch (function (error) {
          console.log(error);
        })


    };

    service.removeFoundItem= function (itemIndex) {
      foundItems.splice(itemIndex, 1);
    };

    service.getFoundItems = function () {
      return foundItems;
    };

    service.getMenuItems = function () {
      var response = $http({
                          method : "GET",
                          url : (ApibasePath+"/menu_items.json")
                        });
      return response;
    };
  }
  MenuServiceFactory.$inject = ['$http','ApibasePath']
  function MenuServiceFactory($http,ApibasePath) {
    var factory = function () {
      return new MenuSearchService($http,ApibasePath);
    };

    return factory;
  }

})();
