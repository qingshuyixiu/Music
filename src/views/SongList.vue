<template>
  <div class="songlist">
      <ranking v-for="item in list" :key="item.id" :id="item.id"></ranking>
      <go-top :topshow='topshow'></go-top>
      <loading v-if="show"></loading>
      <ul class="no" v-if="!show">
        <li>木有更多了/(ㄒoㄒ)/~~</li>
      </ul>
  </div>
</template>
<script>
import Ranking from '@/components/Ranking'
import Loading from '@/components/Loading.vue'
import GoTop from "@/components/GoTop.vue"
export default {
  data() {
    return {
      allList:[],
      list:[],
      page:0,//记录页码
      perpage:6,//每页显示6条
      show:true,
      topshow:false,
    }
  },
  methods: {
    loadeMore(){
        this.page++; // 1  2
        console.log(234);
        let start=(this.page)*this.perpage;// 20   40
        let end=(this.page+1)*this.perpage;// 40   60
        this.list=this.list.concat(this.allList.slice(start,end));
    },
    onScroll(){
      // console.log('scrollHeight',document.documentElement.scrollHeight)
      // console.log('scrollTop',document.documentElement.scrollTop)
      // console.log('clientHeight',document.documentElement.clientHeight)
      let h=document.documentElement.scrollHeight||document.body.scrollHeight;
      let top=document.documentElement.scrollTop||document.body.scrollTop;
      let ch=document.documentElement.clientHeight||document.body.clientHeight;
      if(top>=400){
        this.topshow=true;
      }else{
        this.topshow=false;
      }
      if(h-top-ch<=5){
        console.log(123);
        if(this.allList.length==this.list.length){
          console.log("asasa");
          window.removeEventListener('scroll',this.onScroll);
          this.show=false;
        }
        this.loadeMore();
      }
    }
  },
 components:{
   Ranking,Loading,GoTop
 },
 created() {
   this.$axios.get('/toplist/detail').then(d=>{
     console.log('榜单',d);
     this.allList=d.data.list;
     this.list=this.allList.slice(0,6);
     console.log(this.list);
   });
    window.addEventListener('scroll',this.onScroll);
 },
 beforeRouteEnter(to,from,next){
      next(vm=>{
        window.addEventListener('scroll',vm.onScroll);
      })
  },
  beforeRouteLeave(to,from,next){//移除滚动.
    window.removeEventListener('scroll',this.onScroll);
    next();
  },
}
</script>
<style lang="less" scoped>
.songlist{
  .no{
    li{
      text-align: center;
      color: #ff85ac;
    }
  }
}
</style>