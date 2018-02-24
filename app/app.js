/**
 * Created by nitzan on 21/02/18
 */
let app = angular.module('myApp', ['ngRoute']);

// app.controller('mainController', ['LoginService', function (LoginService) {
//     let vm = this;
//    // UserLogInService.checkCookie();
//     vm.userService = LoginService;
//
//     vm.logout = function () {
//         LoginService.logout();
//     }
// }]);
app.controller('mainController', [ function () {
    let vm = this;
    // UserLogInService.checkCookie();
    // vm.userService = LoginService;

    // vm.logout = function () {
        // LoginService.logout();
    // }
}]);

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
        // .when("/login", {
        //     templateUrl : "components/login/login.html",
        //     controller : "LoginController"
        // })
        .otherwise({redirect: '/',
        });

}]);