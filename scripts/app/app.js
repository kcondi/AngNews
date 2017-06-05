﻿var app = angular.module('app', [
    'ui.router',
    'LocalStorageModule'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home',
            {
                url: '/',
                controller: 'HomeController',
                templateUrl: './templates/home.template.html'
            })
        .state('favorite-list',
            {
                url: '/favorite-list',
                controller: 'FavoriteListController',
                templateUrl: './templates/favorites.template.html'
            })
        .state('article-details',
            {
                url: '/article-details/:id',
                controller: 'ArticleDetailsController',
                templateUrl: './templates/details.template.html'
            });
});

app.controller('HomeController',
    function ($scope, $http) {
        var separateArticles;
        var counter = 1;
        $scope.allShown = false;
        $http.get('defaultNews.json').then(function(articles) {
            separateArticles = _.chunk(articles.data, 6);
            $scope.articles = separateArticles[0];
        });
        $scope.showMore = function () {
            $scope.articles = _.concat($scope.articles, separateArticles[counter++]);
            if (counter === separateArticles.length) {
                $scope.allShown = true;
                return;
            }
        }
    });

