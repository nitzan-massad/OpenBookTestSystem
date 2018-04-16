/**
 * Created by nitzan on 16/04/18.
 */

app.controller('studentCoursePageController', ['$location', '$window','studentCoursePageService',
    function($location, $window,studentCoursePageService) {
        let self=this;
        self.courseID = studentCoursePageService.getCourseID() ;
        self.image ="styles/pdfLogo.png";
        self.files= [
            {fileName:'first file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'second file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'third file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'}
        ];
        self.openFile = function (url) {
            console.log(url);
            window.location.href = url;
        }

    }
]);