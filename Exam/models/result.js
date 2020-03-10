var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ncepu_exam");
var exam = require("./exam");
var user = require("./user");

var resultSchema = new mongoose.Schema({
    user:
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user"
      }
   ,
    exam:
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "exam"
      }
   ,
   answer:[String],
   score:[String],
});



module.exports = mongoose.model("result", resultSchema);