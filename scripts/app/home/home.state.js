var app = angular.module('app');
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home',
                {
                    url: '/',
                    controller: 'HomeController',
                    templateUrl: '/scripts/app/home/home.template.html'
                });
    });
