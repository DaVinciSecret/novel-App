<template>
    <div id="footer" :style="toleft">
     <div><a href="#" @click.prevent="toHome"></a></div>
     <div><a href="#" @click.prevent="toType"></a></div>
     <div><a href="#" ></a></div>
     <div><a href="#" @click.prevent="toWritting"></a></div>
    </div>
</template>

<script>
    import bus from '../../main'
    export default{
        data:function(){
            return {
              isClick:false,
              toleft:{
                'left':'0',
                'bottom':'0'
              },
            }
        },
        created(){
     
        },
        mounted(){
        //  bus.$on('clickA',(data)=>{
        //     console.log('总线+'+data);
        //   })
        },
        // beforeDestroy(){
        //   bus.$off('clickA',data);
        //  },
        methods:{
          toHome:function(){
            this.$router.push('/home'); 
            if(this.clickflag){
              this.$emit('isClick',!this.clickflag);
            }else{
              this.$emit('isClick',this.clickflag);
            }
          },
          toType:function(){
            this.$router.push('/type');
          },
          toWritting:function(){
            this.$router.push('/writting');
          },
        },
        props:['clickflag','hideflag'],
        watch:{
          clickflag(){
            console.log(this.clickflag);
            if(this.clickflag == false){
              this.toleft.left = "0"
            }else{
              this.toleft.left = "60%"
            }
          },
          hideflag(){
            console.log('hide:'+this.hideflag);
            if(this.hideflag == true){
              this.toleft.bottom = '-40px';
            }else{
              this.toleft.bottom = 0;
            }
          }
        }
    }
</script>

<style>
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
  background: url(../../assets/icon/hot-light.png) center center no-repeat;
  background-size: cover;
}
#footer  div:nth-child(2)>a{
  background: url(../../assets/icon/type-light.png) center center no-repeat;
  background-size: cover;
}
#footer  div:nth-child(3)>a{
  background: url(../../assets/icon/bookcity-light.png) center center no-repeat;
  background-size: cover;
}
#footer  div:nth-child(4)>a{
  background: url(../../assets/icon/writing-light.png) center center no-repeat;
  background-size: cover;
}
</style>