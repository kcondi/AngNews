(function(){var app = angular.module('app');
    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('article-details',
                {
                    url: '/article-details/:id',
                    controller: 'ArticleDetailsController',
                    templateUrl: '/scripts/app/details/details.template.html'
                });
    });})