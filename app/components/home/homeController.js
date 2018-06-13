
app.controller('homeController', ['$location', '$window','studentCoursePageService','homeService',
    function($location, $window,studentCoursePageService,homeService) {
        let self=this;

        /*if (homeService.checkIfCookieExist){
            window.location.href = "#/login";
        }
        */
        self.name = homeService.getCookieInfo("firstName");
        self.image ="app/styles/folderImg.png";
        self.getCourses=
            homeService.getCourses()
            .then(function(courses) {
                // var stringCourses = JSON.stringify(courses);
                console.log("response!! " + courses + courses.data.courses.length);
                self.courses = [];
                for (i = 0; i <  courses.data.courses.length; i++) {
                    self.courses.push(i,courses.data.courses[i].courseId)
                }
            });
        // self.courses = [
            // {_id:'983274',courseName:'Advanced topics in cyber security', courseNumber:'372-0-000',courseTestDateFirst:'12.1.18',courseTestDateSecond:'12.2.18'},
            // {_id:'983275',courseName:'Algorythms', courseNumber:'372-0-111',courseTestDateFirst:'11.1.18',courseTestDateSecond:'11.2.18'},
            // {_id:'983276',courseName:'Information Retrieval', courseNumber:'372-0-222',courseTestDateFirst:'1.1.18',courseTestDateSecond:'1.2.18'},
            // {_id:'983277',courseName:'Algorythms12', courseNumber:'372-0-333',courseTestDateFirst:'13.1.18',courseTestDateSecond:'11.2.18'},
            // {_id:'983278',courseName:'Information Retrieval12', courseNumber:'372-0-444',courseTestDateFirst:'15.1.18',courseTestDateSecond:'1.2.18'}
        // ];

        self.openCoursePage = function (courseName,courseID,courseNumber) {
            homeService.setCourseID(courseID,courseName,courseNumber);
            self.userType = homeService.getCookieInfo("userType");
            //console.log(self.userType);
            switch(self.userType) {
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
                    window.location.href = "#/lecturerCoursePage";
            }
        }



    }
    ]);
