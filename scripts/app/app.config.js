var app = angular.module('app');
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
});

app.run(function (localStorageService) {
    if (!angular.fromJson(localStorageService.get("favoritedArticles")))
        localStorageService.set("favoritedArticles", angular.toJson([]));
});
