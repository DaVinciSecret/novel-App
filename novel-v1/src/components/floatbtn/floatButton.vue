<template>
    <div class="floatCtn" :class="topdis < 100 ? 'ishide':''">
        <div>
            <a href="" @click.prevent="doCollect"></a>
            <a href="" @click.prevent="dotoTop"></a>
        </div>
    </div> 
</template>

<script>
    import bus from '../../main';
    export default{
        data:function(){
            return {
                topdis:0
            }
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll)
        },
        methods:{
            handleScroll:function(){
                this.topdis = window.pageYOffset || document.documentElement.scrollTop||document.body.scrollTop;
                console.log(this.topdis);//输出高度
            },
            doCollect:function(){

            },
            dotoTop:function(){
                bus.$emit('returnTop',this.topdis);
                var timer = setInterval(()=>{
                    var step = Math.floor(-this.topdis/6);
                    this.topdis += step;
                    document.documentElement.scrollTop =        document.body.scrollTop = this.topdis;
                    console.log(this.topdis);
                    if(this.topdis <= 0){
                      clearInterval(timer);
                    }
                },20);
            
            }
        },
        watch:{
            topdis:function(){
                if(this.topdis>400){

                }else{

                }
            }
        }

    }
</script>

<style>
   .floatCtn{
       width: 30px;
       height: 62px;
       position: fixed;
       right: 15px;
       bottom: 100px;
       background-color: rgba(100, 100, 100, .7);
       
       transition: all 0.5s;
   } 
   .floatCtn>div{
       width: 100%;
       height: 100%;
       display: flex;
       flex-flow: column;
       justify-content: center;
   }
   .floatCtn a{
       display: inline-block;
       width: 100%;
       height: 50%;
   }
   .floatCtn>div>a:nth-child(1){
       background: url(../../assets/icon/star-light.png) center center no-repeat;
       background-size: contain;
   }
   .floatCtn>div>a:nth-child(2){
       background: url(../../assets/icon/totop-light.png) center center no-repeat;
       background-size: contain;
   }
   .ishide{
       display: none;
   }
</style>