/**
 * Created by nitzan on 21/05/18.
 */

app.factory('MailBoxService', ['$http','homeService', function($http,homeService) {
    let service = {};


    self.userReadMessageUrl ="http://localhost:3000/api/v1/student/readMessage";
    service.readOneMessage = function (msgId) {
        let readMessageJson = {userId: homeService.getCookieInfo("userId"),messageId:msgId}
        return $http.post(self.userReadMessageUrl,readMessageJson)
            .then(function(response) {
                let data=response.data;
                if (data!=null){
                    console.log("read message - data "+ data);
                    return Promise.resolve(data);
                }
                else{
                    console.log("read message - reject in read message");
                    return Promise.reject();
                }
            })
            .catch(function () {
                console.log("excption");
                return Promise.reject();
            });
    }


    service.getMessages=function(){
        var userId=homeService.getCookieInfo("userId");
        return $http.get("http://localhost:3000/api/v1/student/"+userId+"/getMessages")
            // return $http(req)
                .then(function (response){
                    let data= response.data;
                    if (data!=null){
                        console.log("get messages - data "+ data);
                        return Promise.resolve(data);
                    }
                    else{
                        console.log("get messages - reject in get messages");
                        return Promise.reject();
                    }
                })
                .catch(function () {
                    console.log("exception in get messages");
                    return Promise.reject();
                });
    };
    return service ;
}]);