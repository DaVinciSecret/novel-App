<template>
  <div class="container">
      <div class="chart">
          <div>
              <span>书名：</span>
              <input  type="text">
          </div>
          <div>
              <span>作者：</span>
              <input  type="text">
          </div>
          <div>
              <span>介绍：</span>
              <input  type="text">
          </div>
          <div>
              <span>章节：</span>
              <input  type="text">
          </div>
          <div>
              <span>内容：</span>
              <textarea name="" id=""  cols="30" rows="10"></textarea>
          </div>
          <div>
             <input type="button" :disabled="isdisabled" value="保存">
             <input type="button" :disabled="isdisabled" value="上传">
          </div>
      </div>
  </div>
</template>

<script>
    import bus from '../../main';
    export default{
        data:function(){
            return {
                isAuthor:false,
                islogin:false,
                isdisabled:true
            }
        },
        created(){
            console.log('是否在线、是否是作者')
            console.log(this.$store.state.online);
            // this.isdisabled = false;
        },
        methods:{

        },

    }


</script>

<style>
.container{
    width: 100%;
    height: 100%;
    background: #eee;
}
.chart{
    width: inherit;
    height: 100%;
    background: #eee;
    position: fixed;
    left: 0;
    top: 50px;
}
.chart div{
    display: flex;
    flex-flow: row nowrap;
    justify-content: left;
    width: 90%;
    height: 35px;
    line-height: 35px;
    margin-top: 5px;
    font-family: '微软雅黑';
    font-size: 14px;
}
.chart>div:nth-child(4){
    display: flex;
    flex-flow: row;
    align-items: top;
    justify-content: left;
    margin-top: 30px;
}
.chart>div:nth-child(5){
    margin-bottom: 30px;
    height: auto;
}
.chart>div:nth-child(5)>textarea{
    width: 80%;
    min-height: 200px;
    text-indent: 10px;
    line-height: 20px;
    margin-top: 5px;
}
.chart>div:last-child>input{
    width: 80px;
    height: 30px;
    margin-left: 50px;
}
.chart>div:last-child{
    justify-content: center;
}
.chart div>span{
    width: 20%;
}
.chart div>input[type="text"]{
    width: 80%;
    height: 30px;
    line-height: 30px;
    text-indent: 10px;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 5px;
}

</style>