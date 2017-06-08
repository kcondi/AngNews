var app = angular.module('app');
app.service('GetCurrentFavoritesService',
    function (localStorageService) {
        this.getFavorites = function () {
            return angular.fromJson(localStorageService.get("favoritedArticles"));
        }
    });