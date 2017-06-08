(function() {
    var app = angular.module('app');
    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('favorite-list',
                {
                    url: '/favorite-list',
                    controller: 'FavoriteListController',
                    templateUrl: '/scripts/app/favoritelist/favoritelist.template.html'
                });
    });
})