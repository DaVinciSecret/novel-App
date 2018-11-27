<template>
  <div id="app">
    <div class="container">
      <!-- 顶部菜单 -->
      <title-bar @isClick="isClick" :clickflag="clickflag" :hideflag="hideflag"></title-bar>
      <!-- 路由插槽 -->
      <div class="router_view">
        <router-view @islogin="islogin" @toBack="toBack" @toreading="toreading" :online="online" />
      </div>
      <!-- 悬浮按钮 -->
      <!-- <float-button :topdis="topdis"></float-button> -->
      <!-- 底部菜单 -->
      <footer-bar @isClick="isClick" :clickflag="clickflag" :hideflag="hideflag"></footer-bar>
    </div>
    
    <!-- 侧边栏 -->
    <div id="sliderBar" :style="isleft">
      <div class="slider-top">
        <div class="slider-head">
          <div class="head-info">
            <img src="./assets/icon/head-light.png" alt="" @click="tologin">
            <span class="uname">{{uname}}</span>
          </div>
          <p>{{subtitle}}</p>
        </div>
      </div>
      <div class="slider-body">
        <a href="" @click.prevent="toMy"><img src="./assets/icon/my-light.png" alt=""><span>我的</span></a>
        <a href="" @click.prevent="toStar"><img src="./assets/icon/star-light.png" alt=""><span>收藏</span></a>
        <a href="" @click.prevent="toSkin"><img src="./assets/icon/skin-light.png" alt=""><span>换肤</span></a>
        <a href="" @click.prevent="toAuthor"><img src="./assets/icon/author-light.png" alt=""><span>作者</span></a>
        <a href="" @click.prevent="toSetting"><img src="./assets/icon/setting-light.png" alt=""><span>设置</span></a>
        <a href="" @click.prevent="toEdition"><img src="./assets/icon/edition-light.png" alt=""><span>版本</span></a>
      </div>
      <div class="slider-btm">
        <a href="" @click.prevent="toNight">夜间模式</a>
        <a href="" @click.prevent="to">退出</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import footerBar from './components/footerbar/footerbar.vue'
  import titleBar from './components/titlebar/titlebar.vue'
  import floatButton from './components/floatbtn/floatButton.vue'
  import Axios from 'axios'

  import bus from './main';

  Axios.defaults.withCredentials=true;

  export default{
    data:function(){
      return{
        uname:'二蛋',
        subtitle:'一句话描述自己的心情',
        clickflag:false,
        hideflag:false,
        online:0,//在线标志
        isleft:{
          'left':'-60%',
        },
        // topdis:0
        
      }
    },
    components:{
      titleBar,
      footerBar,
      floatButton
    },
    created(){
      // console.log('获取Store的状态');
      // this.uname = this.$store.state.uname;
      // console.log('获取成功：'+this.uname);
      bus.$on('returnTop',(data)=>{
        console.log('收到'+data);
      })
      this.isOnline();

      console.log('根组件在线标志'+this.online);

        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("online") ) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("online"))));
        } 
        if (sessionStorage.getItem("uname") ) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("uname"))));
        }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("online",JSON.stringify(this.$store.state))
            sessionStorage.setItem("uname",JSON.stringify(this.$store.state))
        });


    },
    mounted(){
      // window.addEventListener('scroll',this.handleScroll)
    },
    methods:{
      /*handleScroll:function(){
         this.topdis = window.pageYOffset || document.documentElement.scrollTop||document.body.scrollTop;
        //  console.log(this.topdis);输出高度
      },*/
       //检测在线
      isOnline:function(){
          var url = 'http://127.0.0.1:3000/user/isonline';
          Axios.get(url)
              .then(res=>{
                  console.log('App中在线监测'+ res.data.code);
                  console.log(res.data);
                  if(res.data.code == 1){
                    console.log('在线标志更改')
                    this.online = true;
                  }
                  console.log(res.data.data[0].uname);
                  this.uname = res.data.data[0].uname;
                  //为state状态赋值
                  this.$store.state.uname = this.uname;
                  this.subtitle = res.data.data[0].subtitle;
              })
              .catch(err=>{
                  console.log(err);
              })
      },

      //捕捉返回上一级事件
      toBack:function(data){
        if(data == 1){
          this.hideflag = false;
        }
      },
      //接收登录页回传到父组件的数据，检测是否在线
      islogin:function(data){
        console.log(data);
        console.log('接收到登录页'+data.code)
        //if(data.code == 200){
        if(this.online){
          this.online = true;
          console.log('根组件在线标志'+this.online)
          console.log(data.data[0].uname)
          this.uname = data.data[0].uname;
          this.subtitle = data.data[0].subtitle;
        }else{
          console.log('异常判断');
          this.online = false;
        }
        
        //如果有用户
        //if(this.uname){
          this.hideflag = false;
        //}
      },
      isClick:function(data){
        console.log(data);
        this.clickflag = data;
        if(this.clickflag  == false){
          this.isleft.left = '-60%';
        }else{
          this.isleft.left = 0;
        }
        // this.clickflag = data;
      },
      retCaseHander:function(data){
        console.log(data);
      },
      //在阅读页
      toreading:function(data){
          console.log('在阅读页'+data);
      },
      toHome:function(){
        this.$router.push('/home');
      },
      toType:function(){
        this.$router.push('/type');
      },
      toWritting:function(){
        this.$router.push('/writting');
      },
      //跳登录页
      tologin:function(){
         //this.isClick = true;
        //this.toSlider();
        //  this.toleft.top ="-50px";
        //  this.ishiden.bottom = '-40px';
        this.clickflag = false;
        this.hideflag = true;//上下边栏隐藏
        this.$router.push('/login');
      },
      //
      toMy:function(){
        this.$router.push('/my');
        this.clickflag = false;
      }
    },
    watch:{
      clickflag(){
        if(this.clickflag == false){
          this.isleft.left = "-60%";
        }else{
          this.isleft.left = "0";
        }
      },
      online(){
        console.log('根组件在线标志' + this.online);
      }
    }

  }
</script>

<style>
body{
  width: 100%;
  height: 100%;
  margin: 0;
}
a{
  text-decoration: none;
  font-family: "微软雅黑";
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin-left: 0;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

/* #title{
  width: inherit;
  height: 50px;
  background: #161B1F;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-family: "微软雅黑";
  text-align: center;
  transition: all 0.3s;
} */
/* #title a{
  color: #fff;
  display: inline-block;
  width: 35px;
  height: 35px;
}

#title a:nth-child(1){
  margin-left: 10px;
  background: url(./assets/icon/return-light.png) center center no-repeat;
  background-size: 20px;
}
#title a:nth-child(2){
  margin-right: 10px;
  background: url(./assets/icon/hanber-light.png) center center no-repeat;
  background-size: 20px;
} */

#footer{
  position: fixed;
  width: 100%;
  height: 40px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background: #101316;
  transition:  all 0.3s;
  color:#eee;
  position: fixed;
  left: 0;
  bottom: 0;
  /* z-index: -1; */
  font-size: 14px;
  font-family: '微软雅黑';
}
#footer  div{
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
#footer  div>a {
  display: inline-block;
  width: 20px;
  height: 20px;
}
#footer  div:nth-child(1)>a{
  background: url(./assets/icon/hot-light.png) center center no-repeat;
  background-size: cover;
}
#footer  div:nth-child(2)>a{
  background: url(./assets/icon/type-light.png) center center no-repeat;
  background-size: cover;
}
#footer  div:nth-child(3)>a{
  background: url(./assets/icon/bookcity-light.png) center center no-repeat;
  background-size: cover;
}
#footer  div:nth-child(4)>a{
  background: url(./assets/icon/writing-light.png) center center no-repeat;
  background-size: cover;
}
/*侧边栏*/
#sliderBar{
  width: 60%;
  height: 100%;
  position: fixed;
  left: -60%;
  top: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  transition: all 0.3s;
  background: #0C0E10;
  z-index: 999;
}
.slider-top,.slider-body,.slider-btm{
  width: 100%;
  box-sizing: border-box;
  color: #666;

}
.uname{
  color: #eee;
}
div.slider-top{
  height: 40%;
  display: flex;
  align-items: center;
  background: #333;
}
#sliderBar .slider-body{
  height: 40%;
  display: flex;
  flex-flow:column;
  justify-content: space-around;
}
#sliderBar .slider-body a{
  display:inline-block;
  width: 100%;
  height: 20%;
  color: #bbb;
  border: 1px solid #555;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: left;
  font-size: 14px;
}
#sliderBar .slider-body a:active{
  background: #105471;
}
#sliderBar .slider-body a+a{
  border-top: none;
}
#sliderBar .slider-body a>img{
  width: 20px;
  margin-left: 50px;
}
#sliderBar .slider-body a>span{
  margin-left: 20px;
}


#sliderBar .slider-btm{
  height: 20%;
}

/*头像部分*/
.slider-head{
  width: 100%;
  height: 150px;
  font-family: "微软雅黑";
}

.head-info{
  width: 100%;
  height: 60px;
  vertical-align: top;
  margin-top: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items:flex-end;
}
.head-info img{
  width: 40px;
  height: 40px;
  /* border: 1px solid #fff; */
  border-radius: 50%;
  box-sizing: border-box;
}
/*昵称*/
.head-info span{
  font-size: 13px;
  margin-left: -20px;
  color: #aaa;
}
.slider-head p{
  font-size: 14px;
  margin-top: 10px;
}


.slider-btm{
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
}
.slider-btm a{
  width: 50%;
  display: inline-block;
  height: 40px;
  color: #aaa;
  line-height: 40px;
  font-size: 14px;
  box-sizing: border-box;
}
.slider-btm a+a{
  border-left: 1px solid #1f1f1f;
}
.slider-btm a:nth-child(2){
  background: #500;
}
.slider-btm a:nth-child(2):hover{
  background: #800;
}
</style>
