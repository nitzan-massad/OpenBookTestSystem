/**
 * Created by nitzan on 30/04/18.
 */

app.factory('homeService', ['$http', function($http) {
    let service = {};

    service.isLoggedIn=false;
    service.getCourses=function(){
        // var userId=service.getCookieInfo("userId");
        var userId =service.getCookieInfo("userId");

      return $http.get("http://ec2-18-130-133-221.eu-west-2.compute.amazonaws.com/api/v1/course/"+userId+"/getcourses")
        return $http(req)
            .then(function (response){
                let data = response.data;
                if (data!=null){
                    //console.log("get courses - data "+ data);
                    return Promise.resolve(data);
                }
              else{
                    //console.log("get courses - reject in get courses");

                    return Promise.reject();
                }
            })
            .catch(function () {
                //console.log("exception in get courses");
                return Promise.reject();
            });
    };

    service.setCourseID = function (courseName,courseID ,courseNumber){
        var m_firstName =service.getCookieInfo("firstName");
        var m_userType = service.getCookieInfo("userType");
        var m_userId = service.getCookieInfo("userId");

        setCookie(m_firstName,m_userType,m_userId ,courseName,courseID,courseNumber);

    }


    service.setInfoAfterLogin= function (response) {

        setCookie(response.data.firstName,response.data.status,response.data._id ,"","","");

    }
    function setCookie(firstName,userType,userId,courseName,courseID,courseNumber) {
        var daysToExpired = 0.5 ;
        var d = new Date();
        d.setTime(d.getTime() + (daysToExpired*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();

        var arr = {"firstName":firstName ,"userType":userType,"userId":userId,"courseName":courseName,
            "courseID":courseID,"courseNumber":courseNumber };
        var json_str = JSON.stringify(arr);

        document.cookie = "OpenTestBookSystem="+json_str + ";" + expires + ";path=/";

    }

    service.getCookieInfo = function getCookieInfo(cname) {
        var name = "OpenTestBookSystem" + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                var jsonStr= c.substring(name.length, c.length);
                var json = JSON.parse(jsonStr);
                var tmp = json[cname];
                return tmp;
            }
        }
        return "";
    }

    service.checkIfCookieExist =function checkIfCookieExist() {
        var decodedCookie = decodeURIComponent(document.cookie);
        if (decodedCookie === "" ){
            service.isLoggedIn =false;
            return false ;
        }
      service.isLoggedIn =true;
        return true;
    }
    service.logout=function () {
        service.isLoggedIn=false;
        document.cookie = 'OpenTestBookSystem' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        var json = []
        var daysToExpired = 0.5 ;
        var d = new Date();
        d.setTime(d.getTime() - (daysToExpired*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = "OpenTestBookSystem="+json + ";" + expires + ";path=/";

    }



    return service ;
}]);