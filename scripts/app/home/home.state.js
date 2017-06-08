app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home',
            {
                url: '/',
                controller: 'HomeController',
                templateUrl: './app/home/home.template.html'
            });
});