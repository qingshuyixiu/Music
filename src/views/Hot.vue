<template>
  <div class="hot">
    <div class="box">
      <div class="hotbox"></div>
      <p>更新日期:{{listInfo&&listInfo.trackUpdateTime|formatDate('m月d日')}}</p>
    </div>
    <ul>
    
    <li-item v-for="(item,index) in hotList" :key="item.id" @player="$emit('player',$event)" :item="item">
      <template v-slot:sortnum>
            <b>{{((index+1) &lt; 10) ? '0'+(index+1):index+1}}</b>
        </template>
    </li-item>
    <loading v-if="hotList.length<=0"></loading>
    </ul>
  </div>
</template>

<script>
import LiItem from '@/components/LiItem.vue'
import Loading from '@/components/Loading.vue'
export default {
  data() {
    return {
      listInfo:null,
      hotList:[],
      allList:[],
      page:0,//记录页码
      perpage:20,//每页显示20条
    }
  },
  methods: {
    loadeMore(){
        this.page++; // 1  2
        console.log(234);
        let start=(this.page)*this.perpage;// 20   40
        let end=(this.page+1)*this.perpage;// 40   60
        this.hotList=this.hotList.concat(this.allList.slice(start,end));
    },
    onScroll(){
      // console.log('scrollHeight',document.documentElement.scrollHeight)
      // console.log('scrollTop',document.documentElement.scrollTop)
      // console.log('clientHeight',document.documentElement.clientHeight)
      let h=document.documentElement.scrollHeight||document.body.scrollHeight;
      let top=document.documentElement.scrollTop||document.body.scrollTop;
      let ch=document.documentElement.clientHeight||document.body.clientHeight;
      if(h-top-ch<20){
        console.log(123)
        this.loadeMore();
      }
    }
  },
  components:{
   LiItem,Loading
  },
  created() {
    this.axios.get('playlist/detail?id=3778678').then(d=>{console.log(d);
    this.listInfo=d.data.playlist;
    this.allList=d.data.playlist.tracks.map((data,index)=>{
      data.song={
        privilege:{
          maxbr:d.data.privileges[index].maxbr
        },
        artists:data.ar,
        album:data.al
      }
      this.isLoading=false;
      return data;
    });
    this.hotList=this.allList.slice(0,20);
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
  filters:{
    formatDate(value,fstr){
      let d=new Date(value);
      let formatO={
        'Y+':d.getFullYear(),
        'm+':d.getMonth()+1,
        'd+':d.getDate(),
        'h+':d.getHours(),
        'M+':d.getMinutes(),
        'S+':d.getSeconds()
      }
      for(let k in formatO){
        let reg=new RegExp(k);
        let val=formatO[k];
        val=val<10?'0'+val:val;
        fstr=fstr.replace(reg,val);
      }
      return fstr;
    }
  }
}
</script>
<style lang="less" scoped>
.hot{
  .box{
    display: flex;
    width: 100%;
    height: 39vw;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background: url('../assets/hot_music_bg_2x.jpg') no-repeat;
    background-size: contain;
    
    .hotbox{
      width: 142px;
      height: 67px;
      margin-left: 20px;
      background: url('../assets/index_icon_2x.png') no-repeat;
      background-size: 166px 97px;
      background-position: -24px -30px;
      
    }
    p{
      padding-left: 20px;
      font-size: 12px;
      margin-top: 10px;
      color: white;
    }
  }
  ul{
    &>:nth-child(1) b,
    &>:nth-child(2) b,
    &>:nth-child(3) b{
      color: #ff85ac;
    }
  }
}
</style>