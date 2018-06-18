/**
 * Created by nitzan on 21/02/18
 */
app.factory('LoginService', ['$http',"$route", function($http,$route) {
    let service = {};

    console.log("in login page")

    service.isLoggedIn = false;
    // console.log("beginning "+service.isLoggedIn);

    self.loginUrl ="http://localhost:3000/api/v1/student/login";
    service.login = function(user) {
        return $http.post(self.loginUrl, user)
          return $http(req)
            .then(function(response) {
                let data = response.data;
                if(data.succes===true) {
                    service.isLoggedIn = true;
                    console.log("login "+service.isLoggedIn);
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
        document.cookie = 'OpenTestBookSystem' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        service.isLoggedIn = false;
        console.log("logout "+service.isLoggedIn);

    }

    service.checkCookie= function () {
        var isUserLoggedIn = $cookies.get('OpenTestBookSystem')
        if(isUserLoggedIn!== undefined) {
            if(isUserLoggedIn[0]==='j')
                isUserLoggedIn=isUserLoggedIn.substring(2)
            isUserLoggedIn=JSON.parse(isUserLoggedIn)

            service.UserName = isUserLoggedIn.cookieData.UserName
            service.lastLoginDate = isUserLoggedIn.cookieData.LastLoginDate
            service.ClientID= isUserLoggedIn.cookieData.ClientID
          service.isLoggedIn = true;
          //   return true;
        }
        else {
            service.isLoggedIn = false;
            service.UserName = "Guest"
            // return false;
        }
        // console.log("check cookie beginning "+service.isLoggedIn);
    }
    return service;
}]);