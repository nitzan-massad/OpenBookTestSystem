//
//'use strict';
//app.controller('homeController',[function(){
//    let self=this;
//    self.courses= [
//                        {name:'Advanced topics in cyber security', number:372-0-000},
//                        {name:'Algorythms', number:372-0-111},
//                        {name:'Information Retrieval', number:372-0-222}
//                  ];
//
//}]);


//
//app.controller('homeController',['$location', function($scope) {
//  var courses = [
//
//        {name:'Advanced topics in cyber security', number:372-0-000},
//        {name:'Algorythms', number:372-0-111},
//        {name:'Information Retrieval', number:372-0-222}
//  ];
//  }

//
//
/*(function(angular) {
  'use strict';*/
//angular.module('homeApp', ['ngAnimate']).controller('homeController', function($scope) {
app.controller('homeController', function($scope) {
  $scope.friends = [
     {name:'Advanced topics in cyber security', number:'372-0-000'},
                          {name:'Algorythms', number:'372-0-111'},
                          {name:'Information Retrieval', number:'372-0-222'}
  ];
});
//})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/