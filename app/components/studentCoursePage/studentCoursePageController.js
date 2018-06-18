/**
 * Created by nitzan on 16/04/18.
 */

app.controller('studentCoursePageController', ['$location', '$window','studentCoursePageService','homeService','uploadFileToS3Service','$scope',
    function($location, $window,studentCoursePageService,homeService,uploadFileToS3Service,$scope) {
        let self=this;
        self.courseName = homeService.getCookieInfo("courseName") ;
        self.courseNumber = homeService.getCookieInfo("courseNumber") ;
        self.image ="app/styles/pdfLogo.png";
        /*
        self.files= [
            {fileName:'first file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'second file', fileURL:'http://clickit3.ort.org.il/APPS/Public/GetFile.aspx?inline=yes&f=Files/6202BF2E-DF58-4347-9B32-1ECFD84803A3/92C4C077-5B20-422E-A6D3-7DC59BDE7533/31F82C30-D609-4E35-8E2A-51050E7E6EC7/C4AC8C15-DD2C-4EA1-B8CB-1C5D577C5840.pdf&n=%D7%A2%D7%A7%D7%A8%D7%95%D7%A0%D7%95%D7%AA_%D7%94%D7%93%D7%9E%D7%95%D7%A7%D7%A8%D7%98%D7%99%D7%94_%D7%AA%D7%A8%D7%A9%D7%99%D7%9D.pdf'},
            {fileName:'third file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'4 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'5 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'6 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'},
            {fileName:'7 file', fileURL:'http://animalsoc.tau.ac.il/upload/articles/GFMSUE2627animals_society47_long.pdf'}
        ];
        */
        //self.files = getCourses() ;

        self.getFiles =  studentCoursePageService.getCourses()
               .then(function(data){
                    self.files=[];
                   for ( i = 0; i <  data.files.length; i++) {
                       self.files[i]=data.files[i];
                   }
               })


        $scope.uploadFileChange = function () {
           // console.log("in func");

            var fullPath = document.getElementById('inputFileElement').value;
            if (fullPath) {
                var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                var filename = fullPath.substring(startIndex);
                if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
                }
            }
            var policyDetailsJson ={
                "expiration": "2018-07-07T12:00:00.000Z",
                "conditions": [
                    {"bucket": "openbooktestliron" },
                    {"acl": "public-read" },
                    ["eq", "$key",filename ],
                    ["starts-with", "$Content-Type", "application/pdf"],
                ]
            };
            var policyDetailsString = JSON.stringify(policyDetailsJson);
            document.getElementById("fileNameElement").value = filename;
           // var Base64 = uploadFileToS3Service.Base64;
            var policyBase64 = Base64.encode(policyDetailsString);
            document.getElementById("policyElement").value = policyBase64;
            var lock = "ZRCjWnO4aMNmK7o0wdd5vQvvp8pY6TOhYs3dbtVG"
            var signature = uploadFileToS3Service.b64_hmac_sha1(lock, policyBase64);
            document.getElementById("signatureElement").value = signature;




        }
        var Base64 = {

            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            // public method for encoding
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

                }

                return output;
            },

            // public method for decoding
            decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;

                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                while (i < input.length) {

                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                }

                output = Base64._utf8_decode(output);

                return output;

            },

            // private method for UTF-8 encoding
            _utf8_encode : function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    }
                    else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                    else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },

            // private method for UTF-8 decoding
            _utf8_decode : function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;

                while ( i < utftext.length ) {

                    c = utftext.charCodeAt(i);

                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }

                }

                return string;
            }

        }

        $scope.submitForm= function(){
            //console.log("here");
            var filename =document.getElementById("fileNameElement").value
            studentCoursePageService.uploadFilePathToMongoDB(filename)

        }



        self.openFile = function (url) {
            console.log(url);
            window.location.href = url;
        }

    }
]);
