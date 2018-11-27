<template>
    <div class="container">
        <!-- <div class="login-bg"></div> -->
        <div class="login-panel">
            <div class="exit">
                <a href="#" @click.prevent="toBack"></a>
            </div>
            <div class="title">
                <p>Sign in</p>
            </div>
            <div class="info">
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div class="head_img">
                <img src="" alt="">
            </div>
            <div>
                <input type="text" name="uname" @blur="vali('uname')" maxlength="14" v-model="uname" autocomplete="off" placeholder="请输入账号" @focus="nameFocus"/>
                <span class="showMsg" :class="nameObj">{{namelen}}</span>
            </div>
            <div>
                <input type="password" name="upwd" @blur="vali('upwd')" maxlength="14" v-model="upwd" autocomplete="off" placeholder="请输入密码" @focus="upwdFocus"/>
                <span class="showMsg" :class="upwdObj">{{upwdlen}}</span>
            </div>
            <div class="select">
                <label for="checkPwd"><input id="checkPwd" type="checkbox" v-model="isrember"/>记住密码</label> <a href="#" @click="forgetPwd">忘记密码</a>
            </div>
            
            <div> </div>
            <div class="login-btn">
                <input type="button"  value="sign in" @click="toHome"/>
                <input type="button"  value="register" @click="toRegister"/>
            </div>
        </div>    
    </div>   
</template>

<script>
    import Qs from 'qs';
    import Axios from 'axios';
    Axios.defaults.withCredentials=true;
    export default{
        template:'.container',
        data:function(){
            return{
                uname:'',
                upwd:'',
                namelen:0,
                upwdlen:0,
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
                isrember:false
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
                if(attr == 'confirm'){

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
            toBack:function(){
                this.$router.push('/home');
                this.$emit('toBack',1);
            },

            //登录成功跳转主页
            toHome:function(){
                //异步请求登录
                var uname = this.uname;
                var upwd = this.upwd;
                var obj = {
                    uname,
                    upwd
                }
                console.log(uname,upwd);
                var url = "http://127.0.0.1:3000/user/signin"
                Axios.post(url,Qs.stringify(obj)).then(res=>{
                    console.log(res.data);
                    console.log(res.data.data[0].uname);
                    if(res.data.code == 200){
                        // this.$store.getters.consoleOnline();
                        this.$store.state.online = 1;
                        //console.log('dispatch获取'+this.$store.dispatch('getOnline'));
                        this.$store.state.uname = res.data.data[0].uname;
                        this.$emit('islogin',res.data);//向根组件发射登录信息
                         this.$router.push('/home');
                    }else{
                        this.$store.state.online = 1;
                    }
                }).catch(err=>{
                    console.log(err);
                })
                
            },
            // 忘记密码
            forgetPwd:function(){

            },
            // 去注册页面
            toRegister:function(){
                this.$router.push('/register');
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

<style scoped>
.container{
    width: 100%;
    height: 100%;
    background: url(../../assets/bkImg/bkImg.jpg) center center no-repeat;
    background-size: cover;
    transition: all 0.5s;
    position: absolute;
    top: 0;
    left: 0; 
}
/*背景滤镜*/
.container::before{
    /* filter:blur(2px); */
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url(../../assets/bkImg/bkImg.jpg) center center no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(1px);
}
/*背景滤镜*/
.login-bg{
    width: 100%;
    height: 100%;
    background: url(../../assets/bkImg/bkImg.jpg) center center no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    filter: blur(2px);
}
.login-panel{
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



.login-panel div{
    width: 100%;
    height: 40px;
    /* border: 1px solid #eee; */
    margin-top: 10px;
    line-height: 40px;
    position: relative;
}
div.head_img{
    width: 100%;
    text-align: center;
    height: 70px;
    margin-top: 0;
}
.head_img img{
    width: 70px;
    height: 70px;
    display: inline-block;
    border: 1px solid #eee;
    border-radius: 50%;

}
.login-panel div:nth-child(1){
    margin-top: 20px;
}
.login-panel div input[type="text"],[type="password"]{
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
input::-webkit-input-placeholder{
    color: #eee;

}
.select,.select label{
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    align-items: center;
    font-size: 14px;
}
.select a{
    margin-left: 100px;
    color: #eee;
    text-decoration: underline;
}
.select input[type="checkbox"]{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    border: none;
    outline: none;
}
.login-panel div input[type="button"]{
    width: 40%;
    height: 100%;
    outline: none;
    background: transparent;
    box-sizing: border-box;
    border-radius: 18px;
    font-size: 18px;
    color: #eee;
    border: 1px solid #eee;
    font-family: 'Arial';
    box-shadow: 0 0 5px #000;
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

div.title{
    margin-top: 0;
}
.title>p{
    font-size: 40px;
    margin: 0 auto;
}

.info>p{
    font-family: sans-serif;
    margin: 0 auto;
}
.login-btn{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
.login-btn input[type="button"]:nth-child(1){
   background: #090;
   border: none;
}
.login-btn input[type="button"]:nth-child(1):active{
    background: #0a0;
}
.login-btn input[type="button"]:nth-child(2):active{
    background: #105471;
    border: none;
}

.showMsg{
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 2px;
    font-size: 14px;
    font-family: Arial;
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
    font-size: 16px;
}
</style>
