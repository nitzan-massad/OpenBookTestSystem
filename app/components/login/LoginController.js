/**
 * Created by nitzan on 21/02/18
 */
app.controller('LoginController', ['LoginService', '$location', '$window','homeService',
    function(LoginService, $location, $window,homeService) {
        let self = this;

        self.user = {username: '', password: ''};
        self.wrongDetails =false;

        self.login = function(valid) {
            if (valid) {

                LoginService.login(self.user).then(function (success) {
                    console.log("look at me now !!!");
                    self.wrongDetails =true;
                    homeService.setInfoAfterLogin(success);
                    $location.path('/');
                }, function () {
                    self.errorMessage = "Wrong log in details!";
                    self.wrongDetails =true;
                })
               // console.log(self.user.username);
                //console.log(self.user.password);
            }
        };

    }]);