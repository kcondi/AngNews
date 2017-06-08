app.run(function (localStorageService) {
    if (!angular.fromJson(localStorageService.get("favoritedArticles")))
        localStorageService.set("favoritedArticles", angular.toJson([]));
});
