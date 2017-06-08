var app = angular.module('app');
app.service('FavoriteService', function (localStorageService, GetCurrentFavoritesService) {
    this.favoriteArticle = function (articleToFavoriteId) {
        var currentFavoritesIds = GetCurrentFavoritesService.getFavorites();
        if (currentFavoritesIds.indexOf(articleToFavoriteId) === -1)
            currentFavoritesIds.push(articleToFavoriteId);
        localStorageService.set("favoritedArticles", currentFavoritesIds);
    }
});