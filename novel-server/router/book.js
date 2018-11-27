const express = require('express');
const pool = require('../pool');
const fs = require('fs');
const router = express.Router();

//加载书籍信息
router.get('/',(req,res)=>{
    var sqlstr = 'select bid,bookname,author,poster,smimg,subtitle,date from nov_book';
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,data:result});
        }
    })
});

//按书名和作者查询
router.get('/search',(req,res)=>{
    var keyCode = req.query.keyCode;
    console.log(keyCode)
    var keyarr = keyCode.split(' ');
    console.log(keyarr);
   
    for(var i in keyarr){
        keyarr[i] =`bookname like '%${keyarr[i]}%'`;
    }
    //关键词查询拼接
    var where = " where " + keyarr.join(" and ");
    var sqlstr = ' select bid,bookname,author,poster,smimg,subtitle,date from nov_book ' + where;
    pool.query(sqlstr,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:200,result});
        }
    })

    // var $bookname = req.query.bookname;
    // var $author = req.query.author;
    // console.log($bookname,$author);
    // var sqlstr = "";
    // if(!$bookname){
    //     sqlstr = 'select bid,bookname,author,poster,smimg,subtitle from nov_book where author = ?';
    // }
    // else if(!$author){
    //     sqlstr = 'select bid,bookname,author,poster,smimg,subtitle from nov_book where bookname = ?';
    // }
    // else{
    //     sqlstr = 'select bid,bookname,author,poster,smimg,subtitle from nov_book where bookname = ? and author = ?';
    // }

    // pool.query(sqlstr,[$bookname,$author],(err,result)=>{
    //     if(err) throw err;
    //     if(result.length > 0){
    //         res.send({code:200,data:result});
    //     }
    // })
});

//加载更多
router.get('/loadmore',(req,res)=>{
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    console.log(pno,pageSize);


    var obj = {};
    var progress = 0;

    var sqlstr1 = 'select COUNT(bid) as b from nov_book';
    var sqlstr2 = 'select bookname,author,subtitle,poster,smimg,bid from nov_book limit ? , ? ';
    pool.query(sqlstr1,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            var b = Math.ceil(result[0].b/pageSize);
            obj.pageCount = b;
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

//下载内容
router.get('/download',(req,res)=>{
    var author = req.query.author;
    var bookname = req.query.bookname;
    //按照author和bookname,查询到静态资源对应位置的对应文件
    var str = fs.readFileSync(`./public/txt/${author}/${bookname}.txt`);
    res.writeHead(200,{
        "Content-Type":'text/xml','charset':'utf-8',
    });
    res.write(str);
    res.end();
});

module.exports = router;