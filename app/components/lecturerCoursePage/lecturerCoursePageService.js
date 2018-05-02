/**
 * Created by nitzan on 30/04/18.
 */


app.factory('lecturerCoursePageService', ['$http', function($http) {
    let service = {};

    service.sendAMessage= function (message){
        console.log(message);
    };



    return service ;
}]);