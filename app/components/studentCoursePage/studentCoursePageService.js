/**
 * Created by nitzan on 16/04/18.
 */

app.factory('studentCoursePageService', ['$http', function($http) {
    let service = {};

    service.setCourseID = function (courseID ){
        service.courseID = courseID ;
        console.log("avi");
    }
    service.getCourseID = function(){
        return service.courseID ;
    }


    return service ;
}]);