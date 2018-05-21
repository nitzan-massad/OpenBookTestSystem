/**
 * Created by nitzan on 21/05/18.
 */

app.controller('mailBoxController', ['$location', '$window','MailBoxService','homeService',
    function($location, $window,MailBoxService,homeService) {
        let self=this;
        self.messages = [
            {msgid:'1111',course:'Algo',subject:'extra time' , message:'you have extra time',isRead:false},
            {msgid:'2222',course:'Algo',subject:'Q2 mistake', message:'there is a mistake in Q 2 ',isRead:true},
            {msgid:'3333',course:'economic',subject:'extra time', message:'you have extra time',isRead:true}
        ]

        Object.keys(self.messages).forEach(function(key) {
            if (self.messages[key].isRead == false){
                //self.messages[key].isRead = true;
                MailBoxService.userReadMessage(homeService.userId ,self.messages[key].msgid );
                //console.log('Key : ' + key + ', Value : ' + self.messages[key].course)
            }
        })

        self.userReadMessages= function () {

            Object.keys(self.messages).forEach(function(key) {

                if (self.messages[key].isRead == false){
                    //self.messages[key].isRead = true;
                    //console.log('Key : ' + key + ', Value : ' + self.messages[key].course)
                }
            })
        }
    }
]);
