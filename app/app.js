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
            // templateUrl : "views/shop.html",
            templateUrl : "components/home/home.html",
            controller : "mainController"
        })
         .when("/login", {
            templateUrl : "components/login/login.html",
            controller : "LoginController"
        })
        .otherwise({redirect: '/',
        });

}]);