/**
 * Created by nitzan on 21/02/18
 */
app.factory('LoginService', ['$http',"$route", function($http,$route) {
    let service = {};

    service.isLoggedIn = false;
    service.login = function(user) {
        return $http.post('/Login', user)
            .then(function(response) {
                let data = response.data;
                if(data.Status===true) {
                    service.isLoggedIn = true;
                    return Promise.resolve(response);
                }
                else
                    return Promise.reject();
            })
            .catch(function () {
                return Promise.reject();
            });
    };

    service.logout=function () {
        if($cookies.get('DrinkShop')) {
            $cookies.remove('DrinkShop')
            $route.reload();
        }
    }

    service.checkCookie= function () {
        var isUserLoggedIn = $cookies.get('DrinkShop')
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