var express = require("express");
var router  = express.Router({mergeParams: true});
var exam = require("../models/exam");
var result = require("../models/result");
var user = require("../models/user");
var mongoose = require('mongoose');

router.get("/", function(req,res)
    {
        var sid=req.params.sid;
        res.render("student/student",{sid:sid});
    
    })
    
router.get("/info", function(req,res){      //查看学生个人信息
    var sid=req.params.sid;
    user.findById(sid, function(error, findu){
        res.render("student/info",{sid:sid, user:findu});
    })
    
})

router.get("/exam",function(req,res){               //查看所有可以参加考试的试卷
    var sid=req.params.sid;
    exam.find({post:"yes"}, function(error, findexam){
        if(error) console.log(error);
        else {
            result.find({user: mongoose.Types.ObjectId(sid)}).populate({path:"exam"}).exec(function(error,findr){
                if(error) console.log(error);
                else {
                    res.render("student/examIndex",{sid:sid, exams:findexam, results:findr});
                }
            })
        }
    })
})  

router.get("/grade",function(req,res){          //查看所有可以看成绩的试卷
    var sid=req.params.sid;
    result.find({user:mongoose.Types.ObjectId(sid)}).populate({path: "exam"}).exec(function(error, findu){
        if(error) console.log(error)   //关联表查询
        else { 
        res.render("student/gradeIndex", {sid:sid, results:findu});
        }
    });
})  

router.get("/grade/:rid/:eid",function(req,res){        //查看某一个试卷的具体成绩
    var sid=req.params.sid;
    result.findById(req.params.rid).populate({
        path: "exam",
        populate: {     //关联表查询
            path:"questions"
        }
    }).exec(function(error, findu){
        if(error) console.log(error)
        else { 
        res.render("student/grade", {sid:sid, result:findu});
        }
    });
})  

router.get("/exam/:eid",function(req,res){      //参加某一个试卷的考试
    var sid=req.params.sid;
    var eid=req.params.eid;
    exam.findById(eid).populate({path: "questions"}).exec(function(error, finde){
        if(error) console.log(error);
        else {
        res.render("student/answer",{sid:sid, exam:finde});
        }
    })
}) 

router.post("/exam/:eid",function(req,res){      //参加某一个试卷的考试
    var sid=req.params.sid;
    var eid=req.params.eid;
    var answer = [];
    var score = [];
    user.findById(sid, function(error, findu){    //定位到对应学生的ID
    if(error) console.log(error);
    else {
        exam.findById(eid).populate({path: "questions"}).exec(function(error,finde){
            result.create ({            //定位到对应试卷的ID
            answer:[],                  //生成一个新的result文档
            score:[]
            }, function(error,newresult){
                if(error) { console.log("error!") }
            else{
                var length = finde.questions.length;
                for(var j=0;j<length;j++) {
                    answer.push(req.body["select"+j]);   //将学生答题结果存储起来
                    if(req.body["select" + j] === finde.questions[j].answer) {
                        score.push(finde.score[j]);
                    } else {
                        score.push("0");         //计算学生每题得分并存储起来
                    }
                }
                newresult.exam = finde;
                newresult.user = findu;
                newresult.answer = answer;
                newresult.score = score;
                newresult.save();
                res.redirect("/" + sid + "/grade");  //重定向到显示成绩界面
                } });
        })
    }
})
}) 


    
module.exports = router;