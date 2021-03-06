/**
 * Created by nitzan on 21/05/18.
 */

app.factory('MailBoxService', ['$http','homeService','$timeout', function($http,homeService,$timeout) {
    let service = {};

    self.userReadMessageUrl ="http://ec2-18-130-133-221.eu-west-2.compute.amazonaws.com/api/v1/student/readMessage";
    service.readOneMessage = function (msgId) {
        let readMessageJson = {userId: homeService.getCookieInfo("userId"),messageId:msgId}
        return $http.post(self.userReadMessageUrl,readMessageJson)
            .then(function(response) {
                let data=response.data;
                if (data!=null){
                    service.newMessagesExist= false;
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
        return $http.get("http://ec2-18-130-133-221.eu-west-2.compute.amazonaws.com/api/v1/student/"+userId+"/getMessages")
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

    // service.checkIfNewMessage = function () {
    //     service.getMessages()
    //         .then(function(data){
    //             for (i = 0; i <  data.messages.length; i++) {
    //                 if (data.messages[i].isRead == false){
    //                     return true ;
    //                 }
    //             }
    //         });
    //     return false;
    // };

    service.newMessagesExist=false;
    service.checkMessagesInterval=10000;
    var check=function(){
        service.getMessages()
            .then(function(data){
                for (i = 0; i <  data.messages.length; i++) {
                    if (data.messages[i].isRead == false){
                        service.newMessagesExist= true ;
                    }
                }
            });
        $timeout(check, service.checkMessagesInterval); // reset the timer
    }

    $timeout(check, service.checkMessagesInterval); // reset the timer


    return service ;
}]);