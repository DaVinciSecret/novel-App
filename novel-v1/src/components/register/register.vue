<template>
    <div class="container">
        <div class="register-bg"></div>
        <div class="register-panel">
            <div class="exit">
                <a href="#" @click.prevent="toBack"></a>
            </div>
            <div class="title">
                <p>Sign Up</p>
            </div>
            <div class="info">
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div></div>
            <div>
                <input type="text" v-model="uname" @blur="vali('uname')" autocomplete="off" placeholder="UserName / 账号" @focus="nameFocus">
                <span class="show_img" :class="nameObj">{{namelen}}</span>
            </div>
            <div>
                <input type="text" v-model="upwd" @blur="vali('upwd')" autocomplete="off" placeholder="Password / 密码" @focus="upwdFocus">
                <span class="show_img" :class="upwdObj">{{upwdlen}}</span>
            </div>
            <div>
                <input type="text" v-model="confirm" @blur="vali('confirm')" autocomplete="off" @focus="confrimFocus" placeholder="Confirm/确认密码">
                <span class="show_img" :class="confirmObj">{{confirmlen}}</span>
            </div>
            <div>
                <input type="text" v-model="email" autocomplete="off" placeholder="Emial/邮箱" @blur="vali('email')" @focus="emailFocus">
                <span class="show_img" :class="emailObj">{{emaillen}}</span>
            </div>
            <div>
                <input type="button" @click="signUp" autocomplete="off" value="sign up">
            </div>
        </div>    
    </div>   
</template>

<script>
import Qs from 'qs';
import Axios from 'axios';
    export default{
        data:function(){
            return {
                uname:'',
                upwd:'',
                confirm:'',
                email:'',
                namelen:0,
                upwdlen:0,
                confirmlen:0,
                emaillen:'',
                nameObj:{
                    'ishide':true,
                    'success_msg':false,
                    'fail_msg':false
                },
                upwdObj:{
                    'ishide':true,
                    'success_msg':false,
                    'fail_msg':false
                },
                confirmObj:{
                    'ishide':true,
                    'success_msg':false,
                    'fail_msg':false
                },
                emailObj:{
                    'ishide':true,
                    'success_msg':false,
                    'fail_msg':false
                }
            }
        },
        methods:{
            //正则匹配长度
            getLength:function(str){
                return str.replace(/[^\x00-xff]/g,'xx').length;
            },
            //失焦验证
            vali:function(attr){
                // 用户名校验
                if(attr == 'uname'){
                    console.log(this[attr]);
                    var regName = /[a-zA-Z0-9-_]\w$/ig;
                    if(regName.test(this[attr]) && 
                    this.getLength(this[attr])>6 && 
                    this.getLength(this[attr])<12){
                        console.log('用户名合法');
                        this.namelen = '✔';
                        this.nameObj["success_msg"] = true;
                        this.nameObj["fail_msg"] = false;
                        this.checkReapet();
                    }else{
                        console.log('用户名不合法');
                        this.namelen = '✘';
                        this.nameObj["fail_msg"] = true;
                        this.nameObj["success_msg"] = false;
                    }
                }
                // 密码校验
                if(attr == 'upwd'){
                    console.log(this[attr]);
                    var regName = /[a-zA-Z0-9-_]\w$/ig;
                    if(regName.test(this[attr]) && 
                    this.getLength(this[attr])>5 && 
                    this.getLength(this[attr])<12){
                        console.log('密码合法');
                        this.upwdlen = '✔';
                        this.upwdObj["success_msg"] = true;
                        this.upwdObj["fail_msg"] = false;
                        
                    }else{
                        console.log('密码不合法');
                        this.upwdlen = '✘';
                        this.upwdObj["fail_msg"] = true;
                        this.upwdObj["success_msg"] = false;
                    }
                }
                //密码确认
                if(attr == 'confirm'){
                    if(this.upwd == this[attr]){
                        console.log('两次密码一致');
                        this.confirmlen = '✔';
                        this.confirmObj["success_msg"] = true;
                        this.confirmObj["fail_msg"] = false; 
                    }else{
                        console.log('两次密码不一致');
                        this.confirmlen = '✘';
                        this.upwdObj["fail_msg"] = true;
                        this.upwdObj["success_msg"] = false;
                    }
                }
                //邮箱验证
                if(attr == 'email'){
                    console.log(this[attr]);
                    var regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/g;
                    if(regEmail.test(this[attr])){
                        console.log('邮箱合法');
                        this.emaillen = '✔';
                        this.emailObj["success_msg"] = true;
                        this.emailObj["fail_msg"] = false;
                    }else{
                        console.log('邮箱不合法')
                        this.emaillen = '✘';
                        this.emailObj["fail_msg"] = true;
                        this.emailObj["success_msg"] = false;
                    }
                }
            },
             //用户名鼠标聚焦
            nameFocus:function(){
                this.namelen = this.uname.length;
                this.nameObj['ishide'] = false;
                this.nameObj['success_msg'] = false;
                this.nameObj['fail_msg'] = false;
            },
            //密码鼠标聚焦
            upwdFocus:function(){
                this.upwdlen = this.upwd.length;
                this.upwdObj['ishide'] = false;
                this.upwdObj['success_msg'] = false;
                this.upwdObj['fail_msg'] = false;
            },
            //确认栏聚焦
            confrimFocus:function(){
                this.confirmlen = this.upwd.length;
                this.confirmObj['ishide'] = false;
                this.confirmObj['success_msg'] = false;
                this.confirmObj['fail_msg'] = false;
            },
            //邮箱聚焦
            emailFocus:function(){
                this.emailObj['ishide'] = false;
                this.emailObj['success_msg'] = false;
                this.emailObj['fail_msg'] = false;
            },
            //用户名重复验证
            checkReapet:function(){
                var url = 'http://127.0.0.1:3000/user/checkName';
                var uname = this.uname;
                Axios.get(url,{
                    params:{
                        uname
                    }
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.code == 200){
                        this.namelen = '✔';
                        this.nameObj["success_msg"] = true;
                        this.nameObj["fail_msg"] = false;
                    }else{
                        this.namelen = '✘';
                        this.nameObj["fail_msg"] = true;
                        this.nameObj["success_msg"] = false;
                    }
                })
            },
            //注册
            signUp:function(){
                //成功就返回登录页
                this.$router.push('/login');
                var url = 'http://127.0.0.1:3000/user/signup';
                var uname = this.uname;
                var upwd = this.upwd;
                var email = this.email;
                Axios.post(url,Qs.stringify({
                    uname,
                    upwd,
                    email
                })).then(res=>{
                    console.log(res.data);
                    //注册成功跳转登录页
                    if(res.data.code == 200){
                      this.toBack();
                    }
                }).catch(err=>{

                })
            },
            toBack:function(){
                this.$router.push('/login');
            }
        },
        watch:{
            uname(){
                this.namelen = this.uname.length;
            },
            upwd(){
                this.upwdlen = this.upwd.length;
            }
        }
    }
</script>

<style>

.container{
    width: 100%;
    height: 568px;
    background: url(../../assets/bkImg/bkImg.jpg) center center no-repeat;
    background-size: cover;  
}
.register-bg{
    width: 100%;
    height: 568px;
    background: url(../../assets/bkImg/bkImg.jpg) center center no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(2px);
}
.register-panel{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 85%;
    margin: 0 auto;
    font-family: '微软雅黑';
    color: #eee;
    position: fixed;
    left: 7.5%;
    top: 0;
}
.register-panel>div{
    position: relative;
}
.exit{
    text-align: left;
}
.exit>a{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(../../assets/icon/exit-light.png) center center no-repeat;
    background-size: cover;
}
input::-webkit-input-placeholder{
    color: #ccc;
    text-align: center;
}
input::-ms-input-placeholder{
    color: #eee;
}
.show_img{
    display: inline-block;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 12px;
    line-height: 20px;
}
.ishide{
    opacity: 0;
    transition: all 0.5s;
}
.success_msg{
    color: #0a0;
    font-size: 18px;
}
.fail_msg{
    color: #a00;
    font-size: 18px;
}

.register-panel div{
    width: 100%;
    height: 40px;
    /* border: 1px solid #eee; */
    margin-top: 10px;
    line-height: 40px;
}
.register-panel div:nth-child(1){
    margin-top: 20px;
}
.register-panel div input[type="text"]{
    width: 100%;
    height: 100%;
    outline: none;
    border: 1px solid #eee;
    background: transparent;
    box-sizing: border-box;
    border-radius: 18px;
    text-indent: 15px;
    font-size: 14px;
    color: #eee;
    font-family: '微软雅黑';
    box-shadow: 0 0 5px #000;
}
.register-panel div input[type="button"]{
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: #070;
    box-sizing: border-box;
    border-radius: 18px;
    font-size: 18px;
    color: #eee;
    font-family: 'Arial';
    box-shadow: 0 0 5px #000;
}
.register-panel div input[type="button"]:active{
    background: #0a0;
}
.title>p{
    font-size: 40px;
    margin: 0 auto;
}

.info>p{
    font-family: sans-serif;
    margin: 0 auto;
}
</style>
