/**
 * Created by nitzan on 21/05/18.
 */

app.factory('MailBoxService', ['$http', function($http) {
    let service = {};


    self.userReadMessageUrl ="http://localhost:3000/api/v1/student/userReadMessage";
    service.userReadMessage = function (userId ,msgId) {
        let readMessageJson = {userId:userId,messageId:msgId}
        return $http.post(self.userReadMessageUrl,readMessageJson)
        return $http(req)
            .then(function(response) {
            })
            .catch(function () {
                console.log("excption");
                return Promise.reject();
            });
    }

    return service ;
}]);