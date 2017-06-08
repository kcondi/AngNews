var app = angular.module('app');
app.controller('FavoriteListController',
    function ($scope, $http, localStorageService, GetDefaultArticlesService, GetCurrentFavoritesService) {

        var defaultArticlesPromise = GetDefaultArticlesService;

        defaultArticlesPromise.then(function (articles) {
            $scope.favoritedArticles = articles;
        });

        $scope.unfavorite = function (articleId) {
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