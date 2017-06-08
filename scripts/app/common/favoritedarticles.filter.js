app.filter('favoritedArticlesFilter',
    function (localStorageService) {
        return function (articleList) {
            var currentFavoritesIds = angular.fromJson
                (localStorageService.get("favoritedArticles"));
            var filtered = [];
            angular.forEach(articleList,
                function (article) {
                    if (currentFavoritesIds.indexOf(article.id) > -1)
                        filtered.push(article);
                });
            return filtered;
        }
    });
