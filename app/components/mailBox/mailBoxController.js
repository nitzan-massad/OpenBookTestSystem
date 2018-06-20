/**
 * Created by nitzan on 21/05/18.
 */

app.controller('mailBoxController', ['$location', '$window','MailBoxService','homeService',
    function($location, $window,MailBoxService,homeService) {
        let self=this;

        if (!homeService.checkIfCookieExist()) {
            window.location.href = "#/login";
        }
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

    }
]);
