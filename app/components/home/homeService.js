/**
 * Created by nitzan on 30/04/18.
 */

app.factory('homeService', ['$http', function($http) {
    let service = {};

    service.setCourseID = function (courseID, courseName ,courseNumber){
        service.courseID = courseID ;
        service.courseName = courseName ;
        service.courseNumber = courseNumber ;
        //console.log("test");
    }


    service.setInfoAfterLogin= function (response) {
        console.log(response)
        service.userType =response.data.status;
        service.firstName = response.data.firstName;
    }
    return service ;
}]);