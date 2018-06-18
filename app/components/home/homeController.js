app.controller('homeController', ['$location', '$window', 'studentCoursePageService', 'homeService',
    function ($location, $window, studentCoursePageService, homeService) {
        let self = this;

        if (!homeService.checkIfCookieExist()) {
            window.location.href = "#/login";
        }


        self.name = homeService.getCookieInfo("firstName");
        self.image = "app/styles/folderImg.png";
        self.getCourses =
            homeService.getCourses()
                .then(function (res) {
                    // console.log("response!! " + res +" "+ res.data.courses.length);
                    self.courses = [];
                    for (i = 0; i < res.data.courses.length; i++) {
                        self.courses[i] = res.data.courses[i].courseId;

                    }
                });

        self.openCoursePage = function (courseName, courseID, courseNumber) {
            homeService.setCourseID(courseID, courseName, courseNumber);
            self.userType = homeService.getCookieInfo("userType");
            //console.log(self.userType);
            switch (self.userType) {
                case 'admin':
                    //console.log("ronTonBon1");
                    window.location.href = "#/adminPage";
                    break;
                case 'lecturer':
                    //console.log("ronTonBon2");
                    window.location.href = "#/lecturerCoursePage";
                    break;
                default:
                    //console.log("ronTonBon3");
                    window.location.href = "#/studentCoursePage";
            }
        }

    }
]);
