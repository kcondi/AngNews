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
    function ($scope, $http, GetDefaultArticlesService, FavoriteService) {
        var separateArticles;
        var loadMoreArticlesClicksCounter = 1;
        $scope.allShown = false;

        var defaultArticlesPromise = GetDefaultArticlesService;

        defaultArticlesPromise.then(function(articles) {
            separateArticles = _.chunk(articles, 6);
            $scope.articles = separateArticles[0];
        });

        $scope.favoriteArticle = function (articleToFavoriteId) {
            FavoriteService.favoriteArticle(articleToFavoriteId);
        }

        $scope.search = function () {
            if (!$scope.searchText) {
                defaultArticlesPromise = GetDefaultArticlesService;
                defaultArticlesPromise.then(function (articles) {
                    separateArticles = _.chunk(articles, 6);
                    $scope.articles = separateArticles[0];
                });
                $scope.allArticlesAreShown = false;
                loadMoreArticlesClicksCounter = 1;
            }
            $scope.articles = _.filter($scope.articles,
                article => article.title.toLowerCase().startsWith($scope.searchText.toLowerCase()));
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
    function ($scope, $http, $state, $stateParams, GetDefaultArticlesService, FavoriteService) {

        var defaultArticlesPromise = GetDefaultArticlesService;

        defaultArticlesPromise.then(function(articles) {
            $scope.chosenArticle = articles[$stateParams.id - 1];
        });

        $scope.favoriteArticle = function (articleToFavoriteId) {
            FavoriteService.favoriteArticle(articleToFavoriteId);
        }
    });

app.controller('FavoriteListController',
    function ($scope, $http, localStorageService, GetDefaultArticlesService, GetCurrentFavoritesService) {

        var defaultArticlesPromise = GetDefaultArticlesService;

        defaultArticlesPromise.then(function(articles) {
            $scope.favoritedArticles = articles;
        });
        
        $scope.unfavorite = function(articleId) {
            var currentFavoritesIds = GetCurrentFavoritesService.getFavorites();
            currentFavoritesIds.splice(currentFavoritesIds.indexOf(articleId), 1);
            localStorageService.set("favoritedArticles", currentFavoritesIds);
        }

        $scope.search = function () {
            if (!$scope.searchText) {
                defaultArticlesPromise = GetDefaultArticlesService;
                defaultArticlesPromise.then(function (articles) {
                    $scope.favoritedArticles = articles;
                });
            }
            $scope.favoritedArticles = _.filter($scope.favoritedArticles,
                article => article.title.toLowerCase()
                    .startsWith($scope.searchText.toLowerCase()));
        }
    });


app.service('GetDefaultArticlesService',
    function($http) {
        return $http.get('defaultNews.json').then(function(articles) {
            return articles.data;
        });
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

app.filter('favoritedArticlesFilter',
    function(localStorageService) {
        return function (articleList) {
            var currentFavoritesIds = angular.fromJson
                (localStorageService.get("favoritedArticles"));
            var filtered = [];
            angular.forEach(articleList,
                function(article) {
                    if (currentFavoritesIds.indexOf(article.id) > -1)
                        filtered.push(article);
                });
            return filtered;
        }
    });
