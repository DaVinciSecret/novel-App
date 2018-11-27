<template>
    <div class="container">
      <div class="list">
        <div class="listbox">
          <div class="search">
            <input type="text" v-model="keyCode"><input  type="button" value="搜索" @click="searchBook">
          </div>
          <div class="mark" @click.prevent="bindKeyCode">
            <!-- 类型标签 -->
            <a href="" :class="curindex == i ? 'isactive':''" :data-idx="i" v-for="(p,i) in typelist" :key="i">{{p}}</a>
          </div>
        </div> 
        <div class="content">
          <div class="content-item" v-for="(item,i) in bookList"  :key="i">
              <div>
                <img :src="item.smimg" alt="" @click="toDetail($event)" :data-author="item.author" :data-bid="item.bid" :data-bookname="item.bookname">  
              </div>
              <div>  
                <p><span>《{{item.bookname}}》</span><span>{{item.author}}</span></p>
                <p>{{item.subtitle}}</p>
              </div>
          </div>
          <div class="content-item">
              <div>
                <img src="" alt="">  
              </div>
              <div>  
                <p><span>书名</span><span>作者</span></p>
                <p>subtitle</p>
              </div>
          </div>
          <div class="content-item">
              <div>
                <img src="" alt="">  
              </div>
              <div>  
                <p><span>书名</span><span>作者</span></p>
                <p>subtitle</p>
              </div>
          </div>
 
          <button class="getMore" @click="loadMore">加载更多</button>
        </div>   
      </div>
      <float-button></float-button>
    </div>
</template>

<script>
    import floatButton from '../floatbtn/floatButton.vue'
    import bus from '../../main';
    import Axios from 'axios';

    export default{
      data:function(){
        return{
          pageSize:6,
          pno:1,
          pageCount:0,
          bookList:[],
          keyCode:"",
          typelist:["武侠","名著","经典","玄幻","修真","言情","都市","探案","悬疑","恐怖","惊悚","男生最爱","女生最爱"],
          curindex:14,
          isactive:{
            'isactive':false
          }
        }
      },
      created(){
        this.loadBook();
      },
      methods:{ 
          bindKeyCode:function(e){
            if(e.target.nodeName == "A"){
              var text = e.target.innerText;
              console.log(text);
              console.log('点击的是'+e.target.dataset.idx);
              this.curindex = e.target.dataset.idx;
              this.keyCode = text;
            }
          },
          //模糊查询
          searchBook:function(){
            var url = 'http://127.0.0.1:3000/book/search';
            var keyCode = this.keyCode;
            Axios.get(url,{
              params:{
                keyCode
              }
            }).then(res=>{
              console.log(res.data);
              if(res.data.code == 200){
                this.bookList = res.data.result;
              }
            });
          },
          // 跳转详情页
          toDetail:function(e){
              if(e.currentTarget.nodeName == "IMG"){
                  console.log(e.currentTarget);
                  var bid = e.currentTarget.dataset.bid;
                  var bookname = e.currentTarget.dataset.bookname;
                  var author = e.currentTarget.dataset.author;
                  console.log(bid,bookname,author);

              }
              //query相当于get请求
              //this.$router.push(`/detail?bookname=${bookname}&author=${author}`);
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
          },
          //加载书籍信息
        loadBook:function(){
            var url = 'http://127.0.0.1:3000/book/loadmore';
            var pno = this.pno;
            var pageSize = this.pageSize;
            Axios.get(url,{
              params:{
                pno,
                pageSize
              }
            })
            .then(res=>{
              console.log('得到书籍列表')
              console.log(res.data);
              console.log(res.data.obj.data);
              //加载并拼接之前的数据
              this.bookList = this.bookList.concat(res.data.obj.data);
              this.pageCount = res.data.obj.pageCount;
            }).catch(err=>{
                console.log(err);
            })
        },
        //加载更多
        loadMore:function(){
            this.pno ++;
            console.log('第多少页'+this.pno);
            console.log('总页数'+this.pageCount);
            if(this.pno > this.pageCount){
              alert('没有更多了');
            }else{
              this.loadBook();
            }
        },
        
      },
      components:{
        floatButton
      },
      watch:{
        keyCode(){
          //根据内容点亮标签
          console.log(this.keyCode);
          if(this.typelist.indexOf(this.keyCode) != -1){
            this.curindex = this.typelist.indexOf(this.keyCode);
            // console.log(this.curindex);
            this.isactive['isactive']=true;
          }else{
            this.curindex = 14;
            this.isactive['isactive']=false;
          }
        }
      }

    }
</script>

<style>
 .container{
    width: 100%;
    height: 100%;
    position: relative;
 }
 .list{
    width: inherit;
    height: 100%;
    background: #eee;
    padding: 5px;
    position: relative;
    left: 0;
    top: 50px;
    box-sizing: border-box;
 }
 .listbox{
    width: inherit;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    font-family: '微软雅黑';
    font-size:14px;
    position: fixed;
    padding-bottom: 10px;
    border-bottom: 5px solid #888;
    left: 0;
    top: 50px;
    z-index: 50;
    background: #eee;
 }
  .search{
    width: 100%;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid #aaa;
  }
  .search>input[type="text"]{
    width: 70%;
    height: 30px;
    text-indent: 10px;
    border: 1px solid #aaa;
  }
  .search>input[type="button"]{
    width: 20%;
    height: 30px;
    border: none;
    background: #aaa;
    border-radius: 5px;
    outline: none;
  }
  .search>input[type="button"]:active{
    background: #555;
  }
  .mark{
    padding-top: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
  }
  
  .mark a{
     color: #eee;
     margin-top: 5px;
     display: inline-block;
     height: 30px;
     line-height: 30px;
     min-width: 18%;
     background: #aa0;
     border-radius: 20px;
     outline: none;
     padding: 0px 2px
 }

  div.content{
   width: 100%;
   height: auto;
   position: absolute;
   left: 0;
   top: 30%;
   display: flex;
   flex-flow: column;
   padding-top: 10px;
   margin-bottom: 80px;
 }
 .content-item{
     width: 100%;
     height: 70px;
     display: flex;
     flex-flow: row nowrap;
     align-items: top;
     justify-content: left;
     margin-top: 5px;
     box-sizing: border-box;
    font-family: '微软雅黑';
 }
 .content-item>div:nth-child(1){
     width: 25%;
     height: 70px;
 }
 .content-item>div:nth-child(1)>img{
     display: inline-block;
     width: 100%;
     height: 100%;
     background: #333;
 }
 .content-item>div:nth-child(2){
     display: flex;
     width: 75%;
     text-align: left;
     text-indent: 10px;
     flex-flow: column;
     justify-content: center;
     background: #afafaf;
 }
  .content-item>div:nth-child(2)>p{
    width: 100%;
    margin: 0;
    font-size: 12px;
  }
  .content-item>div:nth-child(2)>p:nth-child(1){
    height: 40%;
    line-height: 25px;
  }
  .content-item>div:nth-child(2)>p:nth-child(2){
    height: 60%;
    line-height: 20px;
    text-indent: 10px;
  }
  .content-item>div:nth-child(2)>p>span{
      line-height: 12px;
      font-size: 13px;
  }
  .content-item>div:nth-child(2)>p>span:nth-child(2){
    font-weight: bold;
  }
   .content-item>div:nth-child(2)>p>span:nth-child(2){
     margin-left: 5px;
   }

  
 .getMore{
      width: 100%;
      height: 40px;
      border-radius: 5px;
      outline: none;
      border: none;
      background: #555;
      font-family: '微软雅黑';
      font-size: 14px;
      color: #fff;
      margin-top: 5px;
 }
 .getMore:active{
   background: #777;
 }
 a.isactive{
   background: #ff6347;
 }
</style>