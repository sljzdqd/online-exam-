var express=require("express");
var methodOverride=require("method-override");
var app=express();
var bodyParser=require("body-parser");
var mongoose= require("mongoose");
var User     = require("./models/user");

mongoose.connect("mongodb://localhost/ncepu_exam",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

//requiring routes
var studentRoutes    = require("./routes/student"),
    teacherRoutes = require("./routes/teacher"),
    indexRoutes  =require("./routes/index")

app.use("/", indexRoutes);
app.use("/teacher", teacherRoutes);
app.use("/:sid", studentRoutes);



app.listen(process.env.PORT,process.env.IP, function(){
    console.log("sever start");
});