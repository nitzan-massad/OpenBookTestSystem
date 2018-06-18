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

                    return Promise.resolve(data);
                }
                else{

                    return Promise.reject();
                }
            })
            .catch(function () {

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
                        return Promise.resolve(data);
                    }
                    else{
                        return Promise.reject();
                    }
                })
                .catch(function () {
                    return Promise.reject();
                });
    };

    service.checkIfNewMessage = function () {
        service.getMessages()
            .then(function(data){
                self.messages=[];
                for (i = 0; i <  data.messages.length; i++) {
                    self.messages[i]=data.messages[i];
                    if (data.messages[i].isRead == false){
                       return true ;
                    }
                }
            });
        return false;
    }


    return service ;
}]);