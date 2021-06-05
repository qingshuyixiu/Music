<template>
  <div class="returntopbox">
    <div class="returntop" v-show="topshow" @click="goTop">^</div>
  </div>
</template>
<script>
export default {
  props:['topshow'],
  data() {
    return {
      topTimer:null,
    }
  },
  methods: {
     goTop(){
        this.topTimer=setInterval(()=>{
          let top=document.documentElement.scrollTop||document.body.scrollTop;
          let temp=top/4;
          if(document.documentElement.scrollTop!=0){
            document.documentElement.scrollTop-=temp;
          }else{
            document.body.scrollTop-=temp;
          }
          if(top==0){
            clearInterval(this.topTimer);
          }
        },30)
        // document.documentElement.scrollTop=0;
        // document.body.scrollTop=0;
      },
  },
}
</script>
<style lang="less" scoped>
.returntopbox{
      .returntop{
        width: 35px;
        height: 35px;
        position: fixed;
        bottom:150px;
        right: 10px;
        border-radius: 8px;
        background-color: #ff85acda;
        text-align: center;
        line-height: 45px;
        font-size: 30px;
        color:white ;
      }
    }
</style>