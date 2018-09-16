var site = angular.module('site');
// configure routes; for the blogs, it takes in routeParams then injects the HTML page associated with the routeParams into blogEntry.html
site.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'app/home/homeView.html',
        controller: 'homeController'
    })
    .when('/projects', {
        templateUrl: 'app/projects/projectsView.html',
        controller: 'projectsController'
    })
    .when('/blog/:pageNum?', {
        templateUrl: 'app/blog/blogView.html',
        controller: 'blogController'
    })
    .when('/contact', {
        templateUrl: 'app/contact/contactView.html',
        controller: 'contactController'
    })
    .when('/blog/posts/:id', {
        templateUrl: 'app/blog/entry/entryView.html',
        controller: 'entryController'
    })
    .when('/blog/tags/:id/:pageNum?', {
        templateUrl: 'app/blog/tags/tagsView.html',
        controller: 'tagsController'
    })
    .otherwise({
        redirectTo: '/'
    });
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
}]);