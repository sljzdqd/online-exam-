var express = require("express");
var router  = express.Router();
var User     = require("../models/user");


router.get("/", function(req, res){
   res.render("home"); 
});

//handling login logic
router.post("/",  function(req, res){
    if(req.body.username==="admin" && req.body.password==="admin"){      
                                                //判断是否为教师登录及密码是否正确
        res.redirect("/teacher");
    }
    else{ 
        User.findOne( {sid:req.body.username,password:req.body.password}, function (error, user){
            if (error) {                        //学生登录时判断账号密码是否正确
                console.log("login error");
            } else {
                if (user !== null )
                 res.redirect("/"+user._id);    //正确则重定向到学生主页，否则返回登录界面
                 else {
                     res.redirect("/");
                 }
            }
        });
      
    }
});







module.exports = router;