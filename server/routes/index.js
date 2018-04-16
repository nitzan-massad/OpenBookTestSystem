var express = require('express');
var router = express.Router();
var User= require("../lib/user");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',function(req,res){
    console.log("inside");

    var newuser= new User();
  newuser.full_name=req.body.full_name;
    newuser.email_address=req.body.email_address;
    newuser.password=req.body.password;
    newuser.is_admin=req.body.is_admin;
    newuser.is_lecturer=req.body.is_lecturer;

    newuser.save(function(err,savedUser){
      if(err){
        console.log(err);
        return res.status(500).send();
      }
        console.log("success");
        return res.status(200).send();
    })

})
module.exports = router;