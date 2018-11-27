const express = require('express');
const pool = require('../pool.js');
const bodyParser = require('body-parser');

const router = express.Router();

// 查找评论列表
router.get('/',(req,res)=>{
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    console.log(pno,pageSize);


    var obj = {};
    var progress = 0;

    var sqlstr1 = 'select COUNT(cid) as c from nov_comment';
    var sqlstr2 = 'select uname,date,comment from nov_comment order by cid desc limit ? , ? ';
    pool.query(sqlstr1,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            var c = Math.ceil(result[0].c/pageSize);
            obj.pageCount = c;
            progress += 50;
            if(progress == 100){
                res.send({code:200,obj});
            }
        }
    });

    var offset = parseInt((pno-1)*pageSize);//当前页下标
    pageSize = parseInt(pageSize);
    console.log(offset,pageSize);
    //分页查询
    pool.query(sqlstr2,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
        console.log(result);
          obj.data = result;
          progress += 50;
          if(progress == 100){
              res.send({code:200,obj});
          }
        }
    })

})

//插入评论
router.post('/insert',(req,res)=>{
    var uid = req.body.uid;
    var $uname = req.body.uname;
    var $usercmt = req.body.usercmt;
    
    var obj = {};
    //var progress = 0;

    var sqlstr = 'insert into nov_comment values (NULL,?,now(),?)';
    var sqlstr2 = 'select uname,date,comment from nov_comment order by cid desc';

    Promise.all([
        // new Promise((open)=>{
        //     //先执行插入操作
        //     pool.query(sqlstr,[$uname,$usercmt],(err,result)=>{
        //         if(err) throw err;
        //         if(result.affectedRows > 0){
        //             obj.msg = "insert success";
        //             console.log('插入成功');
        //             open();
        //         }
        //     });
        // }),
        new Promise((open)=>{
            setTimeout(()=>{
                pool.query(sqlstr2,(err,result)=>{
                    if(err) throw err;
                    if(result.length > 0){
                        console.log('取到最后一条');
                        console.log(result[0]);
                        obj.data = result[0];
                        open();
                    }
                });
            },100);
        }),
        new Promise((open)=>{
            pool.query(sqlstr,[$uname,$usercmt],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows > 0){
                    obj.msg = "insert success";
                    console.log('插入成功');
                    open();
                }
            });
            //先执行插入操作
            // pool.query(sqlstr,[$uname,$usercmt],(err,result)=>{
            //     if(err) throw err;
            //     if(result.affectedRows > 0){
            //         obj.msg = "insert success";
            //         console.log('插入成功');
            //         open();
            //     }
            // });
        })

        
    ]).then(function(){
        res.send({code:200,obj});
    }).catch((err)=>{
        res.send({code:305,obj});
    })
    
    /*pool.query(sqlstr,[$uname,$usercmt],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            obj.msg = "insert success";
            progress += 50;
            if(progress == 100){
                res.send({code:200,obj});
            }
            // res.send({code:200,msg:'insert success'});
        }else{
            res.send({code:305,msg:'insert fail'});
        }
    });

    pool.query(sqlstr2,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            obj.data = result[0];
            progress += 50;
            if(progress == 100){
                res.send({code:200,obj});
            }
        }
    });*/
})

/*router.get('/returnOne',(req,res)=>{
    var sqlstr2 = 'select uname,date,comment from nov_comment order by cid desc';
    pool.query(sqlstr2,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result[0]});
        }else{
            res.send({code:305,Msg:'error'});
        }
    })
})*/



module.exports = router;