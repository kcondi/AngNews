var app = angular.module('app', [
    'ui.router',
    'LocalStorageModule'
]);

app.run(function (localStorageService) { 
    if (!angular.fromJson(localStorageService.get("favoritedArticles")))
        localStorageService.set("favoritedArticles", angular.toJson([]));
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home',
            {
                url: '/',
                controller: 'HomeController',
                templateUrl: './templates/home.template.html'
            })
        .state('article-details',
            {
                url: '/article-details/:id',
                controller: 'ArticleDetailsController',
                templateUrl: './templates/details.template.html'
            })
        .state('favorite-list',
            {
                url: '/favorite-list',
                controller: 'FavoriteListController',
                templateUrl: './templates/favorites.template.html'
            });
});

app.controller('HomeController',
    function ($scope, $http, FavoriteService) {
        var separateArticles;
        var loadMoreArticlesClicksCounter = 1;
        $scope.allShown = false;

        $scope.favoriteArticle = function (articleToFavoriteId) {
            FavoriteService.favoriteArticle(articleToFavoriteId);
        }

        $http.get('defaultNews.json').then(function(articles) {
            separateArticles = _.chunk(articles.data, 6);
            $scope.articles = separateArticles[0];
        });

        $scope.search = function () {
            if (!$scope.searchText) {
                $http.get('defaultNews.json').then(function (articles) {
                    separateArticles = _.chunk(articles.data, 6);
                    $scope.articles = separateArticles[0];
                });
            }
            $scope.articles = _.filter($scope.articles, article => article.title.startsWith($scope.searchText));
        }

        $scope.showMore = function () {
            $scope.articles = _.concat($scope.articles,
                separateArticles[loadMoreArticlesClicksCounter++]);

            if (loadMoreArticlesClicksCounter === separateArticles.length) {
                $scope.allArticlesAreShown = true;
                return;
            }
        }
    });

app.controller('ArticleDetailsController',
    function ($scope, $http, $state, $stateParams, FavoriteService) {

        $scope.favoriteArticle = function (articleToFavoriteId) {
            FavoriteService.favoriteArticle(articleToFavoriteId);
        }

        $http.get('defaultNews.json').then(function (articles) {
           $scope.chosenArticle = articles.data[$stateParams.id - 1];
        });
    });

app.controller('FavoriteListController',
    function ($scope, $http, localStorageService, GetCurrentFavoritesService) {

        $http.get('defaultNews.json').then(function (articles) {
            $scope.allArticles = articles.data;
        });

        $scope.isArticleFavorited = function (article) {
            var currentFavoritesIds = GetCurrentFavoritesService.getFavorites();
            return currentFavoritesIds.indexOf(article.id) > -1;
        }

        $scope.unfavorite = function(articleId) {
            var currentFavoritesIds = GetCurrentFavoritesService.getFavorites();
            currentFavoritesIds.splice(currentFavoritesIds.indexOf(articleId), 1);
            localStorageService.set("favoritedArticles", currentFavoritesIds);
        }
    });

app.service('FavoriteService', function (localStorageService, GetCurrentFavoritesService) {
    this.favoriteArticle = function (articleToFavoriteId) {
        var currentFavoritesIds = GetCurrentFavoritesService.getFavorites();
            if (currentFavoritesIds.indexOf(articleToFavoriteId) === -1)
        currentFavoritesIds.push(articleToFavoriteId);
        localStorageService.set("favoritedArticles", currentFavoritesIds);
    }
});

app.service('GetCurrentFavoritesService',
    function(localStorageService) {
        this.getFavorites = function() {
            return angular.fromJson(localStorageService.get("favoritedArticles"));
        }
    });

/*app.service('SearchArticlesService',
    function($scope, $http) {
        $http.get('defaultNews.json').then(function(articles) {
            return _.filter(articles, article => article.title_.startsWith($scope.searchText));
        });
    });*/

app.filter('favoritedArticlesFilter',
    function(article, localStorageService) {
        return function () {
            var currentFavoritesIds = angular.fromJson
                (localStorageService.get("favoritedArticles"));
            console.log(article.id);
            return currentFavoritesIds.indexOf(article.id) > -1;
        }
    });