app.controller('HomeController',
    function ($scope, $http, GetDefaultArticlesService, FavoriteService) {
        var separateArticles;
        var loadMoreArticlesClicksCounter = 1;
        $scope.allShown = false;

        var defaultArticlesPromise = GetDefaultArticlesService;

        defaultArticlesPromise.then(function (articles) {
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
