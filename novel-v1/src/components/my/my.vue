<template>
    <div class="myContainer">
        <div class="myContent">
            <div class="myHeadInfo">
                <div class="headinfo">
                    <img src="" alt="">
                    <p>{{userinfo.uname}}</p>
                    <p>{{userinfo.subtitle | titleForm}}</p>
                </div>
                <a href="" class="update"  :class="isdisabled ? '':''" @click.prevent="updateInfo"></a>
            </div>
            <div class="myListInfo">
              <div class="divider"></div>
              <div>
                <span>昵称</span><input type="text" :disabled="isdisabled" v-model="userinfo.uname" >
              </div>
              <div>
                <span>签名</span><textarea :disabled="isdisabled" cols="30" rows="10" v-model="userinfo.subtitle"></textarea>
              </div>
              <div>
                <span>性别</span><input :disabled="isdisabled" name="sex" value="2" type="radio" v-model="userinfo.sex">男<input :disabled="isdisabled" name="sex" value="0" type="radio" v-model="userinfo.sex">女
              </div>
              <div>
                <span>生日</span><input type="text" :disabled="isdisabled"  v-model="userinfo.birthday">
              </div>
              <div>
                <span>生日</span><input type="text" :disabled="isdisabled"  v-model="userinfo.birthday">
              </div>
              <div></div>
               <div class="divider"></div>
              <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    
    Vue.filter('titleForm',(str)=>{
        if(str.length > 30){
            str = str.slice(0,25)+'...';
            return str;
        }
    })
    export default{
        data:function(){
            return {
                isdisabled:true,
                userinfo:{
                    uname:'Diva',
                    subtitle:'Lorem ipsum consecteturLorem ipsum consectetur...',
                    sex:0,
                    birthday:'1991-01-01'
                }
            }
        },
        methods:{
            updateInfo:function(){
                if(this.isdisabled){
                    this.isdisabled = false;
                    console.log(this.isdisabled)
                }else{
                    this.isdisabled = true;
                    console.log('修改结束')
                    console.log(this.isdisabled)
                }  
            }
        },
    }
</script>

<style>
    div.myContainer{
        width: 100%;
        height: 100%;
        position: relative;
        /* background: #eee; */
    }
    div.myContent{
        width: 100%;
        height: 100%;
        flex-flow: column;
        background: #eee;
        position: absolute;
        left: 0;
        top: 50px;
    }
    div.myHeadInfo{
      width: 100%;
      height: 150px;
      background: #aaa;
      position: absolute;
      left: 0;
      top: 0px;
    }
    .headinfo{
        width: 80%;
        height: 80%;
        margin: 0px auto;
        margin-top: 25px;
        border: 1px solid #aaa;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }
    .headinfo img{
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #fff;
    }
    .headinfo p{
        margin: 0;
        padding: 0;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
    }
    .update{
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 5px;
        width: 20px;
        height:20px;
        background: url(../../assets/icon/update.png) center center no-repeat;
        background-size: contain;
    }
    .update-light{
        display: inline-block;
        position: absolute;
        right: 5px;
        top: 5px;
        width: 20px;
        height:20px;
        background: url(../../assets/icon/update-light.png) center center no-repeat;
        background-size: contain;
    }
    div.myListInfo{
      width: 100%;
      height: 418px;
      background: #eee;
      position: absolute;
      left: 0;
      top: 150px;
      font-family: '微软雅黑';
      font-size: 14px;
      margin-bottom: 40px;
    }
    div.myListInfo div{
        width: 100%;
        height: 50px;
        /* border-top: 1px solid #aaa; */
        display: flex;
        flex-flow: row nowrap;
        justify-content: left;
        align-items: flex-end;
        background: #fff;
    }
    div.myListInfo div>span{
        display: inline-block;
        height: 30px;
        width: 15%;
        line-height: 30px;
        /* margin-left: ; */
    }
    /* div.myListInfo div:nth-child(3){
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    } */
    div.myListInfo div.divider{
        width: 100%;
        height: 10px;
        background: #e1e1e1;
    }
    textarea{
        width: 70%;
        height: 30px;
        line-height: 30px;
        border: none;
        outline: none;
        background: #fff;
        border-bottom: 1px solid #aaa;
        text-align: center;
        margin-left: 10px;
        text-overflow: ellipsis;
    }
    div.myListInfo div>input[type="checkbox"]{
        width: 15px;
        height: 15px;
        margin-left: 20px;
    }
    div.myListInfo div>input[type="text"]{
        width: 70%;
        height: 30px;
        margin-left: 10px;
        border: none;
        background: #fff;
        outline: none;
        border-bottom: 1px solid #aaa;
        text-align: center;
    }
</style>