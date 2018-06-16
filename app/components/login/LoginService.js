/**
 * Created by nitzan on 21/02/18
 */
app.factory('LoginService', ['$http',"$route", function($http,$route) {
    let service = {};

    service.isLoggedIn = false;
    self.loginUrl ="http://localhost:3000/api/v1/student/login";
    service.login = function(user) {
        //console.log(user);

        return $http.post(self.loginUrl, user)
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
    };

    service.logout=function () {
        // homeService.isLoggedIn=false;
        document.cookie = 'OpenTestBookSystem' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        // console.log("login service, logout "+ homeService.isLoggedIn)
        // mainController.updateLoginStatus();
    }

    service.checkCookie= function () {
        var isUserLoggedIn = $cookies.get('OpenTestBookSystem')
        if(isUserLoggedIn!== undefined) {
            if(isUserLoggedIn[0]==='j')
                isUserLoggedIn=isUserLoggedIn.substring(2)
            isUserLoggedIn=JSON.parse(isUserLoggedIn)
            service.isLoggedIn = true;
            service.UserName = isUserLoggedIn.cookieData.UserName
            service.lastLoginDate = isUserLoggedIn.cookieData.LastLoginDate
            service.ClientID= isUserLoggedIn.cookieData.ClientID
        }
        else {
            service.isLoggedIn = false;
            service.UserName = "Guest"
        }
    }
    return service;
}]);