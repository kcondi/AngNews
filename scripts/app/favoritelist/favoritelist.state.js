app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('favorite-list',
            {
                url: '/favorite-list',
                controller: 'FavoriteListController',
                templateUrl: './app/favoritelist/favoritelist.template.html'
            });
});