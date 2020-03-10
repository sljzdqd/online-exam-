var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ncepu_exam");
var question = require("./question");

var examSchema = new mongoose.Schema({
    sub: String,
    creator: String,
    name: String,
    date: String,
    questions:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "question"
      }
   ],
   score: [String],
   post: String,
   pass: String
});

/*var exam = mongoose.model( "exam", examSchema);

exam.update({},{$set: {pass:"10"}},{multi: true},function(error, findq){
    if(error) console.log(error);
    else {
        console.log(findq)
    }
}
)
exam.find({}, function(error,finde){
    console.log(finde);
})*/


module.exports = mongoose.model("exam", examSchema);
