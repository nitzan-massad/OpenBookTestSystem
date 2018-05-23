/**
 * Created by nitzan on 16/04/18.
 */

app.controller('studentCoursePageController', ['$location', '$window','studentCoursePageService','homeService',
    function($location, $window,studentCoursePageService,homeService) {
        let self=this;
        self.courseName = homeService.getCookieInfo("courseName") ;
        self.courseNumber = homeService.getCookieInfo("courseID") ;
        self.image ="app/styles/pdfLogo.png";
        self.files= [
            {fileName:'first file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'second file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'third file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'4 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'5 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'6 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'7 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'}
        ];
        self.openFile = function (url) {
            window.location.href = url;
        }

    }
]);
