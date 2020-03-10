var express = require("express");
var router  = express.Router();
var question = require("../models/question");
var exam = require("../models/exam");
var result = require("../models/result");
var mongoose = require('mongoose');

router.get("/", function(req,res)
    {
        res.render("teacher/admin");
    
    })
    
router.get("/bank/:sid/new",function(req,res){      //增加题目界面
    res.render("teacher/newQ");
})

router.get("/bank/:sid/:qid",function(req,res){     //查看某科目的某一具体题目
    
    var qid=req.params.qid;
    question.findById(qid, function(error, findq){
        if(error) console.log(error);
        else {
            //console.log(findq);
            res.render("teacher/showQ",{question:findq});
        }
    })
    
})

router.delete("/bank/:sid/:qid",function(req,res){     //删除某科目的某一具体题目
    question.findByIdAndDelete(req.params.qid, function(error){
        if(error) console.log(error);
        else {
            console.log("delete!");
            res.redirect("/teacher/bank/"+req.params.sid);
        }
    })
})

router.put("/bank/:sid/:qid",function(req,res){ //修改某科目的某一具体题目
    var sub = "数据结构";
    var type = req.body.type;
    var content = req.body.content;
    var selection = [];
        selection.push(req.body.selection1);
        selection.push(req.body.selection2);
        selection.push(req.body.selection3);
        selection.push(req.body.selection4);

    var answer = req.body.answer;
    var level = req.body.level;
    var updatequestion = {sub: sub, type: type, content: content, selection: selection, answer: answer, level: level};
    question.findByIdAndUpdate(req.params.qid, updatequestion, function(error,updateq){
        if(error) console.log(error);
        else {
            res.redirect("/teacher/bank/"+req.params.sid+"/"+req.params.qid);
        }
    })
})



router.get("/bank", function(req,res)    // 选择题库的科目
    {
        res.render("teacher/subIndex");
    
    })
    
router.get("/bank/:sid",function(req,res){  //查看某科目的题库
    
    question.find({}, function(error, questions) {
        if (error) {
            console.log(error);
        } else {
            res.render("teacher/showQbank",{questions:questions}); 
        }
    })
    
})

router.post("/bank/ds",function(req,res){ //增加题目之后返回题目页面
    var sub = req.body.sub;
    var type = '单选';
    var content = req.body.content;
    var answer = '';
    if(req.body.type === "check") type = "判断";
    if(req.body.type === "tk") type = "填空";
    var selection = [];
    if(type === '单选') {
        selection.push(req.body.selection1);
        selection.push(req.body.selection2);
        selection.push(req.body.selection3);
        selection.push(req.body.selection4);
        answer = req.body.answer;
    } else if(type === "判断") {
        selection.push("正确");
        selection.push("错误");
        if(req.body.answer === "正确") answer = 'A';
        else answer = 'B';
    } else if(type === "填空") {
        answer = req.body.answer;
    }
    
    
    var level = req.body.level;
    var newquestion = {sub: sub, type: type, content: content, selection: selection, answer: answer, level: level};
    question.create(newquestion, function(error, newlycreate){
        if(error) console.log(error);
        else {
            //console.log(newlycreate);
            res.redirect("/teacher/bank/ds");
        }
        
    })
})


//////////////////////////////////////////////////////


router.get("/exam",function(req,res){ //查看所有试卷
    console.log(req.find);
    exam.find({}, function(error, all){
        if(error) console.log(error);
        else {
            res.render("teacher/subExam",{exams:all});
        }
    })
})

router.post("/exam",function(req,res){       //增加试卷后返回
    var s1n = [], s2n = [], s3n = [], c1n = [], c2n = [], c3n = [],t1n = [], t2n = [], t3n = [];
    question.find({sub:"数据结构"}, function(error,ques){
        if(error) console.log(error);
        else {
            ques.forEach(function(que,index){
                if(que.type === "单选"){
                    if(que.level === "1") s1n.push(que);
                    if(que.level === "2") s2n.push(que);
                    if(que.level === "3") s3n.push(que);
                }
                else if(que.type === "判断"){
                    if(que.level === "1") c1n.push(que);
                    if(que.level === "2") c2n.push(que);
                    if(que.level === "3") c3n.push(que);
                } else if(que.type === "填空"){
                    if(que.level === "1") t1n.push(que);
                    if(que.level === "2") t2n.push(que);
                    if(que.level === "3") t3n.push(que);
                }
            })
            var temp = [];    //temp存放生成的随机数组
            var temps = [];
            if(req.body.single0 != "0") {
                var arr = s1n;
                for (var i = 0;i < Number(req.body.single0);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.single1);
                    arr.splice(num,1);    
                }
            }
            if(req.body.single2 != "0") {
                var arr = s2n;
                for (var i = 0;i < Number(req.body.single2);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.single3);
                    arr.splice(num,1);    
                }
            }
             if(req.body.single4 != "0") {
                var arr = s3n;
                for (var i = 0;i < Number(req.body.single4);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.single5);
                    arr.splice(num,1);    
                }
            }
            if(req.body.check0 != "0") {
                var arr = c1n;
                for (var i = 0;i < Number(req.body.check0);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.check1);
                    arr.splice(num,1);    
                }
            }
            
            if(req.body.check2 != "0") {
                var arr = c2n;
                for (var i = 0;i < Number(req.body.check2);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.check3);
                    arr.splice(num,1);    
                }
            }
             if(req.body.check4 != "0") {
                var arr = c3n;
                for (var i = 0;i < Number(req.body.check4);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.single5);
                    arr.splice(num,1);    
                }
            }
            if(req.body.tk0 != "0") {
                var arr = t1n;
                for (var i = 0;i < Number(req.body.tk0);i++)
                { 
                    var num = Math.floor(Math.random()*arr.length); //生成随机数num
                    temp.push(arr[num]);    //获取arr[num]并放入temp
                    temps.push(req.body.tk1);
                    arr.splice(num,1);    
                }
            }
            exam.create({sub:req.body.sub, creator:req.body.author, name:req.body.title, date:req.body.date, score:temps, pass:req.body.pass}, function(error, newexam){
                if(error) console.log(error)
                else {
                        temp.forEach( function(one){
                        newexam.questions.push(one);
                     });
                        newexam.save();
                        console.log(newexam);
                        res.redirect("/teacher/exam");
                }
            })
        
            
        }
    });
})


router.get("/exam/new",function(req,res){
    res.render("teacher/newExam");
})

router.get("/exam/:eid",function(req,res){     //查看某一特定试卷
    var myexam=null; var unique=null;
    exam.findById (req.params.eid).populate({path: "questions"}).exec(function(error, findexam){
        if(error) console.log(error)
        else { unique = findexam;
        res.render("teacher/showExam",{exam:unique});
        }
    });

})

router.delete("/exam/:eid",function(req,res){      //删除试卷
    var eid=req.params.eid;
    exam.findByIdAndDelete(eid, function(error){
        if(error) console.log(error);
        else {
            res.redirect("/teacher/exam");
        }
    })
    
})

router.post("/exam/:eid",function(req,res){      //发布试卷
    var eid=req.params.eid;
    exam.findByIdAndUpdate(eid, {$set: {post:"yes"}},function(error, newexam){
        if(error) console.log(error);
        else {
            console.log(newexam);
            res.redirect("/teacher/exam");
        }
    })
})

router.get("/:eid/grade",function(req,res){
    result.find({exam:mongoose.Types.ObjectId(req.params.eid)}).populate([{path: "user"},{path: "exam"}]).exec(function(error, results){
        if(error) console.log(error);
        else {
            res.render("teacher/allGrades",{results: results});
        }
    })
    
})


    
    
    
module.exports = router;