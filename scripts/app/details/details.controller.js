app.controller('ArticleDetailsController',
    function ($scope, $http, $state, $stateParams, GetDefaultArticlesService, FavoriteService) {

        var defaultArticlesPromise = GetDefaultArticlesService;

        defaultArticlesPromise.then(function (articles) {
            $scope.chosenArticle = articles[$stateParams.id - 1];
        });

        $scope.favoriteArticle = function (articleToFavoriteId) {
            FavoriteService.favoriteArticle(articleToFavoriteId);
        }
    });

