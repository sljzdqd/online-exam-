var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ncepu_exam");

var questionSchema = new mongoose.Schema({
    sub: String,
    type: String,
    content: String,
    selection: [String],
    answer: String,
    level: String
});

/*var question = mongoose.model( "question", questionSchema);
question.create ({
    sub: '数据结构',
    type: 'single',
    content: '在数据结构中，与所使用的的计算机无关的是是数据的（）结构',
    selection: ['逻辑件', '存储', '逻辑和存储', '物理'],
    answer: 'A',
    level: '1'
    }, function(error,quesion){
        if(error) { console.log("error!") }
    else{ console.log(quesion);
        } });
    
question.find({}, function(error,q){
    console.log(q);
})*/       

module.exports = mongoose.model("question", questionSchema);