/**
 * Created by nitzan on 16/04/18.
 */

app.factory('studentCoursePageService', ['$http','homeService', function($http,homeService) {
    let service = {};

    service.uploadFilePathToMongoDB =function( fileName ){
        var url  ="http://localhost:3000/api/v1/course/addFiles";
        var newFileName =fileName.split(" ").join("+");
        // the link of the S3 is made of amzon url +/+ bucket+/+file name
        console.log(newFileName);
        var fileLink ="https://s3-eu-west-1.amazonaws.com/openbooktestliron/"+newFileName;
        var userId =homeService.getCookieInfo("userId");
        var courseId =homeService.getCookieInfo("courseID");

        var fileInfo = {
            "courseId":courseId,
            "userId":userId,
            "files" : [
                {
                    "fileName" : fileName,
                    "fileLink" : fileLink
                }
            ]
        }

        return $http.post(url , fileInfo)
        return $http(req)
            .then(function(response) {
                let data = response.data;
                if(data.succes===true) {
                    service.isLoggedIn = true;
                    return Promise.resolve(response);
                }
                else
                    return Promise.reject();
            })
            .catch(function () {
                console.log("excption");
                return Promise.reject();
            });


    }


    return service ;
}]);