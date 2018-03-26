
app.controller('homeController', ['$location', '$window',
    function($location, $window) {
        let self=this;
        self.name = "Nitzan";
        self.courses = [
            {name:'Advanced topics in cyber security', number:'372-0-000'},
            {name:'Algorythms', number:'372-0-111'},
            {name:'Information Retrieval', number:'372-0-222'}
        ];
        console.log("avi");
        // self.avi = "avi ron";

    }
    ]);
