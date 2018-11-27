<template>
    <div class="detailCtn">
        <div class="detialBox">
            <!--书籍详情 -->
          <div class="detpanel">
              <div class="detpanel_img" @click="toRead">
                  <img :src="bookObj.smimg" alt="">
                  <p v-cloak>{{bookObj.bookname}}</p>
              </div>
              <div class="detpanel_info">
                  <div class="story_detail">
                      <span>[详情]</span><span v-cloak>{{bookObj.subtitle | detailForm}}</span>
                  </div>
                  <div class="detpanel_fun">
                      <button @click="doCollect">收藏</button>
                      <button @click="doCatch">缓存</button>
                  </div>
              </div>
          </div>
            <!--留言评论-->
          <div class="detcomment">
              <div class="sendMsg">
                <textarea v-model="usercmt" cols="30" rows="10"></textarea>
                <input type="button" value="Post" @click="postMsg">
              </div>
              <div class="commentlist">
                  <ul>
                      <li v-for="(item,i) in commentList" :key="i">
                         <div class="commentctn">
                             <span v-cloak>{{item.comment | commentForm}}</span>
                         </div>
                         <div class="commentuser">
                             <span v-cloak>{{item.uname}}</span><span v-cloak>{{item.date | dateForm}}</span>
                         </div>
                      </li>
                      <li><button class="loadMore" @click="loadMore">加载更多</button></li>
                  </ul>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
    import bus from '../../main'
    import fs from 'fs'
    import Axios from 'axios';
    import Qs from 'qs';
    import Vue from 'vue';
    //评论内容省略过滤器
    Vue.filter('commentForm',(str)=>{
        //console.log(str.length);
        if(str && str.length > 40){
            str = str.slice(str.length-1,10) + '...';
        }
         return str;
    })
    //书籍详情省略过滤器
    Vue.filter('detailForm',(str)=>{
        if(str && str.length > 136){
            str = str.slice(str.length-1,10) + '...';  
        }
        return str;
    });
    //日期格式化
    Vue.filter('dateForm',(data)=>{
        var date = new Date(data);
        return date.toLocaleDateString();
    })
    export default{
        name:'detail',
        data:function(){
            return {
                bid:null, //对应书籍id
                uname:'',
                usercmt:'',//用户评论
                commentList:[],//p评论列表
                bookObj:{},//书籍详情
                pno:1,
                pageSize:4,
                pageCount:0,//返回的总页数   
            }
        },
        created(){
            console.log('Vuex状态:'+this.$store.state.online);
            console.log('Vuex用户名：'+this.$store.state.uname);

            console.log('详情页在线标志'+this.online);
            var bookname = this.$route.query.bookname;
            var author = this.$route.query.author;
            var bid = this.$route.query.bid;
            console.log('获得书籍ID：'+ bookname + author + bid);
            
            //加载书籍详情
            this.loadDetail(bookname,author,bid);
            //加载评论列表
            this.loadComment();
        },
        methods:{
            //显示书籍详情
            loadDetail:function(bookname,author,bid){
                var url = 'http://127.0.0.1:3000/book/load';
                Axios.get(url,{
                    params:{
                        bookname,
                        author,
                        bid
                    }
                }).then(res=>{
                    console.log(res.data.data[0]);
                    this.bookObj = res.data.data[0];
                }).catch(err=>{
                    console.log(err);
                })
            },

            //加载用户评论
            loadComment:function(num){
                var url = 'http://127.0.0.1:3000/comment/';
                var pno = 1;
                if(num){ pno = num;}
                
                var pageSize = this.pageSize;
                Axios.get(url,{
                    params:{
                        pno,
                        pageSize
                    }
                })
                .then(res=>{
                    console.log('返回的评论');
                    console.log(res.data.obj.data);
                    this.pageCount = res.data.obj.pageCount;
                    console.log('得到总条数'+this.pageCount);
                    //同步到本地model，加载并拼接
                     this.commentList = (this.commentList).concat(res.data.obj.data);
                    //  this.commentList = this.commentList.concat(res.data.obj.data);
                    //console.log(this.commentList);
                })
                .catch(err=>{
                    //捕捉异常
                    console.log(err);
                })
            },
            //加载更多
            loadMore:function(){
                this.pno ++;
                console.log('第多少页:'+this.pno);
                console.log('总页数：'+this.pageCount);
                if(this.pno > this.pageCount){
                    alert("没有更多了") 
                }else{
                   this.loadComment(this.pno);
                }
            },
            //跳转阅读页
            toRead:function(){
                var author = this.bookObj.author;
                var bookname = this.bookObj.bookname;
                this.$router.push({
                    path:'/reading',
                    query:{
                        author,
                        bookname
                    }
                });

            },

            // 收藏
            doCollect:function(){
                //axios操作,添加书籍的id到用对应用户表的收藏列
                var url = 'http://127.0.0.1:3000/user/';
                var bid = this.bid;
                Axios.get(url,{bid})
                    .then(res=>{
                        if(res.data.code == 200){
                            //响应成功
                        }else{
                            //响应失败
                        }
                    }).catch(err=>{
                        //捕捉异常
                    });
            },
            // 缓存
            doCatch:function(){
                //下载到本地
                var bookname = 'dp';
                var author = 'author1';
                var url = "http://127.0.0.1:3000/book/download";
                Axios.get(url,{
                    params:{
                        author,
                        bookname
                    }
                }).then(res=>{
                    // 获取到内容
                    console.log(res.data);
                })
            },

            //提交评论
            postMsg:function(){
                //插入数据到评论表
                var url = "http://127.0.0.1:3000/comment/insert";
                if(this.usercmt.trim() != ""){
                    var usercmt = this.usercmt;
                    // var uname = this.uname;
                    var uname = this.$store.state.uname;
                    if(this.$store.state.online){
                        Axios.post(url,Qs.stringify({
                                usercmt,
                                uname
                            })).then(res=>{
                                //如果评论成功，再调一次loadComment加载出新的数据
                                 console.log(res.data);
                                if(res.data.code == 200){
                                   //拿到新插入的数据
                                   console.log(res.data.obj.data);
                                   this.commentList.unshift(res.data.obj.data);
                                    //this.loadComment();
                                    //this.returnMsg();
                                    // this.commentList=this.commentList.splice(0,4);
                                    this.usercmt = "";
                                }else{
                                    console.log("fail insert");
                                }
                            }).catch(err=>{
                                //捕捉异常                    
                                console.log(err);
                            })
                    }else{
                        alert('请登录');
                    }
                }else{
                    alert('请输入')
                }   
            },
            //获取一条
            returnMsg:function(){
                var url = "http://127.0.0.1:3000/comment/returnOne";
                Axios.get(url)
                .then(res=>{
                    console.log('只有一条')
                    console.log(res.data);
                    console.log(res.data.code);
                    console.log(res.data.data);
                    console.log(this.commentList);
                    console.log(this.commentList.unshift(res.data.data));
                    //拼接一下
                    //this.commentList.concat(res.data.data);
                    //console.log(this.commentList +""+ res.data.data);
                    //console.log(this.commentList);
                    

                })
            }
        },
        watch:{
            online:function(){
                console.log(this.online);
            }
        },
        props:['online']
    }
</script>

<style>
    [v-cloak]{
        display: none;
    }
    .detailCtn{
        width: 100%;
        height: 100%;
    }
    .detialBox{
        width: 100%;
        height: 100%;
        position: relative;
        top: 50px;
        display: flex;
        flex-flow: column;
    }
    .detpanel{
        width: 100%;
        height: 150px;
        background: #eee;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
    }
    .detpanel_img{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .detpanel_img>img{
        width: 98%;
        height: 98%;
        display: inline-block;
        background: #cd853f;
    }
    .detpanel_img p{
        width: 100%;
        height: 30px;
        position: absolute;
        left: 0;
        bottom: 5px;
        font-family: '微软雅黑';
        font-size: 14px;
        color: #eee;
        line-height: 30px;
        background: rgba(50, 50, 50,.7);
    }
    .detpanel>div:nth-child(1){
        width: 30%;
        height: 95%;
        background: #333;
    }
    .detpanel>div:nth-child(2){
        width: 65%;
        height: 95%;
        background: #aaa;
    }
    .detpanel_info{
        display: flex;
        flex-flow: column;
    }
    .detpanel_info>div:nth-child(1){
        width: 100%;
        height: 70%;
        border-bottom: 1px solid #fff;
        text-align: left;
        text-indent: 5px;
    }
    div.story_detail{
        overflow: hidden;
        font-size: 14px;
        font-family: '微软雅黑';
        padding-top: 5px;
        padding-left: 2px;
    }
    .story_detail span{
        margin-right: 5px;
    }
    .story_detail span:nth-child(1){
        font-weight: bold;
    }
    .detpanel_info>div:nth-child(2){
        width: 100%;
        height: 25%;
        line-height: 35px;
        text-align: right;
    }
    .detpanel_fun>button{
        width: 60px;
        height: 30px;
        border: 1px solid #aaa;
        border-radius: 5px;
        margin-right: 5px;
        font-family: '微软雅黑';
        color: #fff;
        outline: none;
    }
    .detpanel_fun>button:nth-child(1){
        background: #555;
    }
    .detpanel_fun>button:nth-child(1):active{
        background: #777;
    }
   .detpanel_fun>button:nth-child(2){
        background: #1e90ff;
    }
    .detpanel_fun>button:nth-child(2):active{
        background: #0af;
    }
    /* 已收藏 */
    .isCollect{
        background: #cd853f;
    }
    /* 已缓存 */
    .isCache{
        background: #00BFFF;
    }
 
    .detcomment{
        width: 100%;
        height: auto;
        min-height: 400px;
        background: #aaa;
        display: flex;
        flex-flow: column;
    }
    .sendMsg{
        width: 100%;
        /* height: 60px; */
        border: 1px solid #fff;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;
        padding:5px 0;
    }
    .sendMsg textarea{
        width: 70%;
        min-height: 50px;
        height: 50px;
        max-height: 95%;
        text-align: left;
        margin: 0;
        text-indent: 5px;
    }
    .sendMsg input{
        width: 20%;
        height: 30px;
        border-radius: 5px;
        outline: none;
        border: 1px solid #aaa;
        margin-top: 25px;
    }
    .sendMsg input:active{
        background: #888;
    }
    .commentlist{
        width: 100%;
    }
    .commentlist ul{
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        background: #aaa;
        padding-bottom: 10px;
        margin-bottom: 70px;
    }
    .commentlist ul>li{
        margin: 0 auto;;
        width: 95%;
        height: 50px;
        background: #fff;
        margin-top: 5px;
        border-radius: 5px;
        display: flex;
        flex-flow: column;
    }
    .commentlist ul>li:last-child{
       background: transparent;
    }
    .loadMore{
        width: 100%;
        height: 90%;
        border-radius: 5px;
        outline: none;
        border: none;
        background: #555;
        font-family: '微软雅黑';
        font-size: 14px;
        color: #fff;
    }
    .loadMore:active{
        background: #777;
    }
    .commentlist ul>li>div{
        width: 100%;
        height: 50%; 
        line-height: 25px; 
        font-size: 14px;
    }
    .commentctn{
        text-align: left;
    }
    .commentctn span{
        margin-left: 20px;
        font-size: 12px;
        font-family: '微软雅黑';
    }
    .commentuser{
        text-align: right;
    }
    .commentuser span{
        font-family: '微软雅黑';
        margin-right: 10px;
        font-size: 12px;
    }
</style>
