var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ncepu_exam");

var UserSchema = new mongoose.Schema({
    sid: String,
    password: String,
    name: String,
    class: String
});

/*var User = mongoose.model("User",UserSchema);
User.update({},{$set: {class:"计算1501"}}, {multi: true}, function(error,user){
        if(error){ console.log("error!")}
    else{ console.log(user);
        
        } });
    
User.find({}, function(error,user){
    console.log(user);
}) */     

module.exports = mongoose.model("user", UserSchema);