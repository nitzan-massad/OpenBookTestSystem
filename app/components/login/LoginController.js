/**
 * Created by nitzan on 21/02/18
 */
app.controller('LoginController', ['LoginService', '$location', '$window',
    function(LoginService, $location, $window) {
        let self = this;

        self.user = {UserName: '', Password: ''};
        self.wrongDetails =false;

        self.login = function(valid) {
            if (valid) {
            /*
                LoginService.login(self.user).then(function (success) {
                    self.wrongDetails =true;
                    // LogInService.checkCookie()
                    $location.path('/');
                }, function () {
                    self.errorMessage = "Wrong log in details!";
                    self.wrongDetails =true;
                })*/

                console.log(self.user.UserName);
                console.log(self.user.Password);
            }
        };

    }]);