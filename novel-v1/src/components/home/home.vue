<template>

    <div class="container">
        <div class="swiper">
            <div class="imgBox" :style="toleft">
                <img :src="item.poster" alt="" v-for="(item,i) in plist" :key="i">
                <!-- <img src="" alt="">
                <img src="" alt="">
                <img src="" alt=""> -->
            </div>
            <ul class="imgtip">
                <li :style="idx==0?'background:#eee':'background:#333'"></li>
                <li :style="idx==1?'background:#eee':'background:#333'"></li>
                <li :style="idx==2?'background:#eee':'background:#333'"></li>
                <li :style="idx==3?'background:#eee':'background:#333'"></li>
            </ul>
        </div>
        <div class="ninebox">
            <div class="book" @click="toDetail($event)" :data-bookname="item.bookname" :data-bid="item.bid" :data-author="item.author" v-for="(item,i) in book" :key='i'>
                <img :src="item.smimg" alt="">
                <p>{{item.bookname}}</p>
            </div>
        </div>
         <float-button ></float-button>
    </div>
</template>

<script>
    import floatButton from '../floatbtn/floatButton.vue'
    import bus from '../../main';
    import Axios from 'axios';

    //import detail from '../detail/detail.vue';
    export default{
        data:function(){
            return {
                idx:0,
                toleft:{
                    'left':0
                },
                book:[],
                plist:[],
                online:false
            }
        },

        created(){
            console.log(this.$route.query.flag);
            //在线检测
            this.isOnline();
            //加载书籍
            this.loadBook();
        },
        mounted(){
            setInterval(this.swiper,2000);
        },
        methods:{
            //检测在线
            isOnline:function(){
                var url = 'http://127.0.0.1:3000/user/isonline';
                Axios.get(url)
                    .then(res=>{
                        console.log(res.data);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            //加载书籍数据
            loadBook:function(){
                var url = 'http://127.0.0.1:3000/book';
                Axios.get(url)
                    .then(res=>{
                        console.log(res.data.data);
                        this.book = res.data.data;
                        this.plist = res.data.data.slice(0,4);
                        console.log(this.plist);
                    }).catch(err=>{
                        console.log(err);
                    })
            },

            // 轮播图
            swiper:function(){
                // console.log(parseInt(this.toleft.left));
                this.toleft.left = `${parseInt(this.toleft.left)-320}px`;
                this.idx ++;
                if(parseInt(this.toleft.left) < -960 && this.idx > 2){
                    this.toleft.left = 0;
                    this.idx = 0;
                }
                // console.log(this.idx); 
            },
            // 跳转详情页
            toDetail:function(e){
                if(e.currentTarget.nodeName == "DIV"){
                    console.log(e.currentTarget);
                    var bid = e.currentTarget.dataset.bid;
                    var bookname = e.currentTarget.dataset.bookname;
                    var author = e.currentTarget.dataset.author;
                    console.log(bid,bookname,author);

                }
                //query相当于get请求
                this.$router.push(`/detail?bookname=${bookname}&author=${author}`);
                this.$router.push({
                    path:'/detail',
                    query:{
                        bid,
                        bookname,
                        author
                    }
                });
                //params相当于post请求
                /*this.$router.push({
                    name:'detail',
                    params:{
                        bookname,
                        author
                    }
                })*/
            }
        },
        components:{
            floatButton
        }
    }
</script>

<style>
 .container{
     width: 100%;
     height: 100%;
     position: relative;
 }
 .container .swiper{
    width: inherit;
    height: 30%;
    border-bottom: 1px solid #aaa;
    background: #eee;
    position: absolute;
    left: 0;
    top: 50px;
    border-bottom:5px solid #666 ;
 }
 .container  .ninebox{
     width: inherit;
     padding-bottom: 50px;
     background: #eee;
     display: flex;
     flex-flow: row wrap;
     margin-top: 5px;
     border-top: 1px solid #666;
     justify-content: space-evenly;
 }
 .book{
     width: 30%;
     height: 120px;
     border: 1px solid #aaa;
     margin-top: 15px;
     position: relative;
     border-radius: 2px;
 }
 .book img{
     position: absolute;
     left: 0;
     top: 0;
     display: inline-block;
     width: 100%;
     height: 100%;
 }
 .book p{
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #eee;
    font-family: '微软雅黑';
    left: 0;
    bottom: 0;
    text-align: center;
    background: rgba(150, 150, 150, 0.7);
 }
.container .swiper{
    position: fixed;
    left: 0;
    top: 50px;
    overflow: hidden;
    z-index: 10
 }
 .imgtip{
     position: absolute;
     width: 150px;
     left: 50%;
     bottom: 5px; 
     margin-left:-75px; 
     margin-bottom: 5px;
     list-style: none;
 }
 .isactive{
    background: #fff;
 }
 .imgtip>li{
     float: left;
     width: 15px;
     height: 4px;
     background: #333;
 }
 .imgtip>li+li{
    margin-left: 8px;
 }
 .ninebox{
    position: absolute;
    left: 0;
    top: 38%;
    padding-top: 10px;
    margin-bottom: 30px;
 }
 .imgBox{
    width: 1280px;
    height: 100%;
    position: relative;
    left: 0;
 }
 .imgBox>img{
    width: 320px;
    height: 100%;
    display: inline-block;
    background: #eee;
 }
 .imgBox>img:nth-child(1){
     background: #fa0;
 }
 .imgBox>img:nth-child(2){
     background: #0af;
 }
 .imgBox>img:nth-child(3){
     background: #f0a;
 }
 .imgBox>img:nth-child(4){
     background: #0fa;
 }
</style>