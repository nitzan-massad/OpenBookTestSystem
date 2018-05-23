/**
 * Created by nitzan on 30/04/18.
 */

app.controller('lecturerCoursePageController', ['$location', '$window','lecturerCoursePageService','homeService','$timeout',
    function($location, $window,lecturerCoursePageService,homeService,$timeout   ) {
        let self=this;
        //console.log("ronTonBon")
        self.courseName = homeService.getCookieInfo("courseName");
        self.courseNumber = homeService.getCookieInfo("courseNumber");

        self.sendAMesssage = function(){
           //    console.log(self.Message);
            if(self.Message=="" || self.Message==null){
               self.sentMessage = "Please Add a Messaage";
            }
            else{
                lecturerCoursePageService.sendAMessage(self.Message);
                self.sentMessage = "Message Sent Successfully";
            }
            self.Message = "";
            self.messageSentSuccessfully = true;
            $timeout(function() {
                self.messageSentSuccessfully = false;
            }, 4000);



        }
    }
]);

/*
$scope.forgotPassword = function() {
    $scope.loginAlertMessage = false;
    $timeout(function() {
        $scope.loginAlertMessage = true;
    }, 3000);
};

    */