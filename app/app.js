/**
 * Created by nitzan on 21/02/18
 */
let app = angular.module('myApp', ['ngRoute']);

app.controller('mainController', ['MailBoxService', '$timeout','homeService', function (MailBoxService, $timeout,homeService) {
    let vm = this;
    vm.mailNoNewMessages = "app/styles/whiteMailBox.png";
    vm.mailWithNewMessages = "app/styles/whiteMailBoxWithNotfiction.png";

    vm.logo = "app/styles/logoWhiteWithColor.png";
    vm.homeService = homeService;
    vm.mailBoxService= MailBoxService;

    vm.logout = function () {
        homeService.logout();
    }



    // vm.checkIfNewMessage =MailBoxService.getMessages()
    //     .then(function(data){
    //         for (i = 0; i <  data.messages.length; i++) {
    //             if (data.messages[i].isRead == false){
    //                 return true ;
    //             }
    //         }
    //         return false;
    //     });


    vm.clock = "loading clock..."; // initialise the time variable
    vm.tickInterval = 1000 //ms

    var tick = function () {
        vm.clock = Date.now() // get the current time
        $timeout(tick, vm.tickInterval); // reset the timer
    }

    $timeout(tick, vm.tickInterval);


}]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/home/home.html",
            controller: "homeController"
        })
        .when("/login", {
            templateUrl: "app/components/login/login.html",
            controller: "LoginController"
        })
        .when("/try_component", {
            templateUrl: "app/components/courseDetails/courseDetails.html",
            controller: "courseDetailsController"
        })
        .when("/studentCoursePage", {
            templateUrl: "app/components/studentCoursePage/studentCoursePage.html",
            controller: "studentCoursePageController"
        })
        .when("/lecturerCoursePage", {
            templateUrl: "app/components/lecturerCoursePage/lecturerCoursePage.html",
            controller: "lecturerCoursePageController"
        })
        .when("/mailBox", {
            templateUrl: "app/components/mailBox/mailBox.html",
            controller: "mailBoxController"
        })
        .when("/test", {
            templateUrl: "app/components/courseDetails/courseDetails.html",
            controller: "courseDetailsController"
        })

        .otherwise({
            redirect: '/login',
        });

}]);