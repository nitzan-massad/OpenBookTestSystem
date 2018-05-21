/**
 * Created by nitzan on 21/02/18
 */
let app = angular.module('myApp', ['ngRoute']);

app.controller('mainController',['MailBoxService',  function (MailBoxService) {
    let vm = this;
    vm.mail = "app/styles/whiteMailBox.png";
    //vm.mail = "app/styles/whiteMailBoxWithNotfiction.png";
}]);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "app/components/home/home.html",
            controller : "homeController"
        })
         .when("/login", {
            templateUrl : "app/components/login/login.html",
            controller : "LoginController"
        })
        .when("/try_component", {
            templateUrl : "app/components/courseDetails/courseDetails.html",
            controller : "courseDetailsController"
        })
        .when("/studentCoursePage", {
            templateUrl : "app/components/studentCoursePage/studentCoursePage.html",
            controller : "studentCoursePageController"
        })
        .when("/lecturerCoursePage", {
            templateUrl : "app/components/lecturerCoursePage/lecturerCoursePage.html",
            controller : "lecturerCoursePageController"
        })
        .when("/mailBox", {
            templateUrl : "app/components/mailBox/mailBox.html",
            controller : "mailBoxController"
        })

        .otherwise({redirect: '/login',
        });

}]);