<template>
    <div class="readCtn">
        <div class="readPanel">
            <p>{{"第一章"}}</p>
            <div>
                {{txt}}
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'
    export default{
        data:function(){
            return {
                txt:'暂时没有...'
            }
        },
        created(){
            this.loadTxt();
            this.$emit('toreading',true);//发射在当前阅读页，隐藏上下栏
        },
        methods:{
            loadTxt:function(){
                // var bookname = this.$route.query.bookname;
                // var author = this.$route.query.author;
                // console.log(bookname,author);
                var author = 'tudou';
                var bookname = 'doupo';
                var url = "http://127.0.0.1:3000/book/download";
                Axios.get(url,{
                    params:{
                        author,
                        bookname
                    }
                }).then(res=>{
                    // 获取到内容
                    console.log(res.data);
                    this.txt = res.data;
                })
            }
        },


    }
</script>

<style>
    div.readCtn{
        width: 100%;
        height: 100%;
        /* background: #aaa; */
    }
    div.readCtn::before{
        width: 100%;
        height: 100%;
        content: "";
        display: block;
        background: #333;
        position: fixed; 
        left: 0;
        top: 50px;
    }
    .readPanel{
        width: 100%;
        height: 100%;
        position: absolute;
        background: transparent;
        left: 0;
        top: 50px;
        color: #aaa;
        font-family: '微软雅黑';
        font-size: 16px;
        
    }
    .readPanel>p{
    }
    .readPanel>div{
        
    }
</style>