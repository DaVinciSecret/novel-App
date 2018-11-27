<template>
    <div id="title" :style="toleft">
      <a href="#" @click.prevent="toSlider()"></a>
      <a href="#" @click.prevent=""></a>
    </div>
</template>

<script>
    import bus from '../../main'

    export default{
        data:function(){
            return {
                isClickflag:false,
                toleft:{
                    'left':'',
                    'top':'0'
                }
            }
        },
        methods:{
            toSlider:function(){
                if(this.isClickflag == false){
                    // this.toleft.left = '60%';
                    this.isClickflag = true;
                   
                    // bus.$emit('clickA',this.isClick);
                }else{
                    //this.toleft.left = '0';
                    this.isClickflag = false;
                }   
                //消息总线
                bus.$emit('clickA',1);
                //向父级传递
                this.$emit('isClick',this.isClickflag);
               
                console.log('$bus');
            }
        },
       
        watch:{
            clickflag(){
                console.log('title:'+this.clickflag);
                this.isClickflag = this.clickflag;
                if(this.isClickflag == false){
                    this.toleft.left = '0';
                }else{
                    this.toleft.left = '60%';
                }
            },
            hideflag(){
                console.log('hide:'+this.hideflag);
                if(this.hideflag == true){
                    this.toleft.top = '-50px';
                }else{
                    this.toleft.top = 0;
                }
            }
        },
        props:['clickflag','hideflag']
    }
</script>

<style>
#title{
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
  z-index: 100;
}
#title a{
  color: #fff;
  display: inline-block;
  width: 35px;
  height: 35px;
}

#title a:nth-child(1){
  margin-left: 10px;
  background: url(../../assets/icon/return-light.png) center center no-repeat;
  background-size: 20px;
}
#title a:nth-child(2){
  margin-right: 10px;
  background: url(../../assets/icon/hanber-light.png) center center no-repeat;
  background-size: 20px;
}
</style>