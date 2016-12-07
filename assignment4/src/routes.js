(function () {
  'use strict';

  angular.module('MenuApp')
  .config(MenuAppConfig);

  MenuAppConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function MenuAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })
  .state('categories',{
      url:'/categories',
      templateUrl: 'src/menu/templates/menuCategories.template.html',
      controller: 'CategoriesController as categories',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items',{
        url:'/items/{categoryShortName}',
        templateUrl: 'src/menu/templates/menuItems.template.html',
        controller: 'MenuItemsController as menuItems',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      })
      .state('items.itemDetail', {
      templateUrl: 'src/menu/templates/item-detail.template.html',
      controller: 'ItemDetailController as itemDetail',
      params:{
        itemId:null
      }

    });
  }




})();
