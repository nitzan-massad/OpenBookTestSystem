/**
 * Created by nitzan on 30/04/18.
 */

app.factory('homeService', ['$http', function($http) {
    let service = {};
    //service.courseID = getCookieInfo("courseID") ;
    //service.courseName = getCookieInfo("courseName") ;
    //service.firstName = getCookieInfo("firstName");
    //service.userType = getCookieInfo("userType");

    service.setCourseID = function (courseName,courseID ,courseNumber){
        var m_firstName =service.getCookieInfo("firstName");
        var m_userType = service.getCookieInfo("userType");
        setCookie(m_firstName,m_userType ,courseName,courseID,courseNumber);

    }


    service.setInfoAfterLogin= function (response) {

        //service.userType =response.data.status;
        //service.firstName = response.data.firstName;
        //service.userId = response.data._id;
        setCookie(response.data.firstName,response.data.status ,"","","");

    }
    function setCookie(firstName,userType,courseName,courseID,courseNumber) {
        var daysToExpired = 0.5 ;
        var d = new Date();
        d.setTime(d.getTime() + (daysToExpired*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();

        var arr = {"firstName":firstName ,"userType":userType,"courseName":courseName,
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

  /* service.checkCookie=function checkIfCookieExist() {
        var decodedCookie = decodeURIComponent(document.cookie);

    }*/

    return service ;
}]);