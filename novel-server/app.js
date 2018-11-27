const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');

const app = express();

//导入路由
const user = require('./router/user');
const book = require('./router/book');
const comment = require('./router/comment');



//托管静态资源
app.use(express.static('public'));

//设置请求头
app.all('*',(req,res,next)=>{
    //设置允许跨域的域名
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //验证信息，配置携带cookie
    res.header("Access-Control-Allow-Credentials", true);

    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(3000,()=>{
    console.log('novel server is running');
});

app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(session({
    secret:'加密',
    resave:false,
    saveUninitialized:true
}));




//挂载路由
app.use('/user',user);
app.use('/book',book);
app.use('/comment',comment);
