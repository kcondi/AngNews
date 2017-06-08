app.service('GetDefaultArticlesService',
    function ($http) {
        return $http.get('defaultNews.json').then(function (articles) {
            return articles.data;
        });
    });