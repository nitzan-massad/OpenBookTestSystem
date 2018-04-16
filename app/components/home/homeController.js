
app.controller('homeController', ['$location', '$window',
    function($location, $window) {
        let self=this;
        self.name = "Nitzan";
        self.image ="folderImg.png";
        self.courses = [
            {courseName:'Advanced topics in cyber security', courseNumber:'372-0-000',courseTestDateFirst:'12.1.18',courseTestDateSecond:'12.2.18'},
            {courseName:'Algorythms', courseNumber:'372-0-111',courseTestDateFirst:'11.1.18',courseTestDateSecond:'11.2.18'},
            {courseName:'Information Retrieval', courseNumber:'372-0-222',courseTestDateFirst:'1.1.18',courseTestDateSecond:'1.2.18'}
        ];
        self.count =0;

    }
    ]);
