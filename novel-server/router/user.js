const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

//登录
router.post('/signin',(req,res)=>{
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    console.log($uname,$upwd);
    var sqlstr = 'select uid,uname,subtitle from nov_user where  uname = ? AND upwd = ? ';
    pool.query(sqlstr,[$uname,$upwd],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            console.log(result);
            var user = result[0];
            req.session['uid'] = user['uid'];
            console.log(req.session['uid']);
            res.send({code:200,msg:'login success',data:result});
        }else{
            res.send({code:301,msg:'login error'});
        }
    })
})

//是否在线
router.get('/isonline',(req,res)=>{
    console.log(req.session['uid']);
    if(req.session['uid'] === undefined){
        res.send({code:0,msg:'offline'})
    }else{
        var uid = req.session.uid;
        var sql = 'select uname,subtitle from nov_user where uid=?';
        pool.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            if(result.length > 0){
                res.send({code:1,msg:'online',data:result});
            }
        })
    }
})



//注册
router.post('/signup',(req,res)=>{
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    var $email = req.body.email;
    var $subtitle = req.body.subtitle;
    console.log($uname,$upwd,$email,$subtitle);
    if(!$subtitle){
        $subtitle = "这位用户很懒，什么也没说"
    }
    var $avatar = '../img/head1.png';
    var sqlstr = 'insert into nov_user values (NULL,?,?,?,?,?,1)';
    pool.query(sqlstr,[$uname,$upwd,$subtitle,$email,$avatar],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code:'200',msg:'register success'});
        }else{
            res.send({code:'305',msg:'register fail'})
        }
    })

})


//用户名验证
router.get('/checkName',(req,res)=>{
    var $uname = req.query.uname;
    var sqlstr =  'select uid from nov_user where uname = ?';
    console.log($uname);
    pool.query(sqlstr,[$uname],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:305,msg:'this name was used'});
        }else{
            res.send({code:200,msg:'this name can be use'});
        }
    })
})

module.exports = router;
