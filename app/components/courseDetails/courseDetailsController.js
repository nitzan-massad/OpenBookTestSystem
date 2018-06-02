/**
 * Created by nitzan on 26/03/18.
 */



app.controller('courseDetailsController', ['$scope','$http',
    function ($scope, $http) {
        var self = this;



        self.tmp = function () {
            console.log("adsq");
            var deleteUrl= "http://s3-eu-west-1.amazonaws.com/openbooktestliron/mongoDBstart.txt";
            return $http.delete(deleteUrl)
            return $http(req)
                .then(function(response) {
                    console.log("nitzanTheKing");
                    console.log(response);


                })
                .catch(function () {
                    console.log("excption");
                    return Promise.reject();
                });
        }

        AWS.config.update({
            accessKeyId : 'AKIAJL4QAWFVAVQMBIRA',
            secretAccessKey : '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'
        });
        AWS.config.region = 'eu-west-1';
        $("#fileUploadForm").submit(function() {
            var bucket = new AWS.S3({params: {Bucket: 'openbooktestliron'}});
            var fileChooser = document.getElementById('file');
            var file = fileChooser.files[0];
            if (file) {
                var params = {Key: 'FILE_NAME', ContentType: file.type, Body: file};
                bucket.upload(params).on('httpUploadProgress', function(evt) {
                    console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
                }).send(function(err, data) {
                    console.log(err);
                    console.log(data);
                    //alert("File uploaded successfully.");
                });
            }
            return false;
        });

    }]);