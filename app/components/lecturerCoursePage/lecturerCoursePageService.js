/**
 * Created by nitzan on 30/04/18.
 */


app.factory('lecturerCoursePageService', ['$http','homeService', function($http,homeService) {
    let service = {};

    service.sendAMessage= function (message){
        console.log(message);
        var courseID =homeService.getCookieInfo("courseID");
        var userID = homeService.getCookieInfo("userId");
        var messageData = {
            "courseId":courseID,
            "userId":userID,
            "message" :message
        }
        var url ="http://localhost:3000/api/v1/course/sendMessageToCourse";
        return $http.post(url, messageData)
        return $http(req)
            .then(function(response) {

                let data = response.data;
                console.log(response.data);
                if(data.succes===true) {
                    return Promise.resolve(response);
                }
                else
                    return Promise.reject();
            })
            .catch(function () {
                console.log("excption");
                return Promise.reject();
            });


    };



    return service ;
}]);