/**
 * Created by nitzan on 21/02/18
 */
let app = angular.module('myApp', ['ngRoute']);

app.controller('mainController',  function () {
    let vm = this;
});

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "components/home/home.html",
            controller : "homeController"
        })
         .when("/login", {
            templateUrl : "components/login/login.html",
            controller : "LoginController"
        })
        .when("/try_component", {
            templateUrl : "components/courseDetails/courseDetails.html",
            controller : "courseDetailsController"
        })
        .when("/coursePage", {
            templateUrl : "components/coursePage/coursePage.html",
            controller : "coursePageController"
        })
        .otherwise({redirect: '/',
        });

}]);