/**
 * Created by nitzan on 21/05/18.
 */

app.controller('mailBoxController', ['$location', '$window','MailBoxService','homeService',
    function($location, $window,MailBoxService,homeService) {
        let self=this;
        self.getMessages=
            MailBoxService.getMessages()
                .then(function(data){
                    self.messages=[];
                    for (i = 0; i <  data.messages.length; i++) {
                        self.messages[i]=data.messages[i];
                        if (data.messages[i].isRead == false){
                            self.readMessage(data.messages[i])
                        }
                    }
                });

    self.readMessage=
        function(msg){
            if (msg.isRead==false){
                msg.read=true;
                MailBoxService.readOneMessage(msg.msgid)
                    .then(function(data){
                        if (data.succes==true)
                            console.log("read message success "+msg.msgid);
                    })

            }
        }
        // Object.keys(self.messages).forEach(function(key) {
        //     if (self.messages[key].isRead == false){
        //         //self.messages[key].isRead = true;
        //         MailBoxService.userReadMessage(homeService.userId ,self.messages[key].msgid );
        //         //console.log('Key : ' + key + ', Value : ' + self.messages[key].course)
        //     }
        // })

        // self.userReadMessages= function () {
        //
        //     Object.keys(self.messages).forEach(function(key) {
        //
        //         if (self.messages[key].isRead == false){
        //             //self.messages[key].isRead = true;
        //             //console.log('Key : ' + key + ', Value : ' + self.messages[key].course)
        //         }
        //     })
        // }
    }
]);
