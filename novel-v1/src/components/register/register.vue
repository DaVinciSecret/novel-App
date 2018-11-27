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
                <input type="text" v-model="uname" @blur="checkReapet" autocomplete="off" placeholder="UserName / 账号">
            </div>
            <div>
                <input type="text" v-model="upwd" autocomplete="off" placeholder="Password / 密码">
            </div>
            <div>
                <input type="text" v-model="confirm" autocomplete="off" placeholder="Confirm/确认密码">
            </div>
            <div>
                <input type="text" v-model="email" autocomplete="off" placeholder="Emial/邮箱">
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
                email:''
            }
        },
        methods:{
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
                })
            },
            //注册
            signUp:function(){
                //成功就返回登录页
                this.$router.push('/login');
                var url = 'http://127.0.0.1:3000/user/signup';
                Axios.post(url,Qs.stringify({
                    uname,
                    upwd,
                    email
                })).then(res=>{

                }).catch(err=>{

                })
            },
            toBack:function(){
                this.$router.push('/login');
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
