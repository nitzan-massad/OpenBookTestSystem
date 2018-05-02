
app.controller('homeController', ['$location', '$window','studentCoursePageService','homeService',
    function($location, $window,studentCoursePageService,homeService) {
        let self=this;
        self.name = "Nitzan";
        self.image ="styles/folderImg.png";
        self.courses = [
            {_id:'983274',courseName:'Advanced topics in cyber security', courseNumber:'372-0-000',courseTestDateFirst:'12.1.18',courseTestDateSecond:'12.2.18'},
            {_id:'983275',courseName:'Algorythms', courseNumber:'372-0-111',courseTestDateFirst:'11.1.18',courseTestDateSecond:'11.2.18'},
            {_id:'983276',courseName:'Information Retrieval', courseNumber:'372-0-222',courseTestDateFirst:'1.1.18',courseTestDateSecond:'1.2.18'}
        ];

        self.openCoursePage = function (courseID,courseName) {
            homeService.setCourseID(courseID,courseName);
            self.userType = homeService.getUserType();
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
                    window.location.href = "#/studentCoursePage";
            }
        }
    }
    ]);
