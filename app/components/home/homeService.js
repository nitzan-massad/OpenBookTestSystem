/**
 * Created by nitzan on 30/04/18.
 */

app.factory('homeService', ['$http', function($http) {
    let service = {};

    service.setCourseID = function (courseID, courseName ){
        service.courseID = courseID ;
        service.courseName = courseName ;
        //console.log("test");
    }
    service.getCourseID = function(){
        return service.courseID ;
    }
    service.getCourseName = function(){
        return service.courseName ;
    }
    service.getUserType = function(){
        //should return if the user is admin, lecturer or student. the info should be in the cocke
        //return 'student';
        return 'lecturer' ;
    }

    return service ;
}]);