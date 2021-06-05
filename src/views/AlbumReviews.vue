<template>

  <div class="albumreviews">
    <return></return>
    <div class="goodcomments" v-if="hotComments.length>0">
      <h3 >精彩评论</h3>
      <ul>
        <comments v-for="(item,index) in hotComments" :key="index" :Comments="item"></comments>
        <loading v-if="isLoading"></loading>
      </ul>
    </div>
    <div class="usercomments">
      <h3>用户评论</h3>
      <ul>
        <comments v-for="(item,index) in userComments" :key="index" :Comments="item"></comments>
        <go-top :topshow='topshow'></go-top>
        <loading v-if="isLoading"></loading>
        <li class="no" v-if="flag">木有更多了/(ㄒoㄒ)/~~</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Return from '@/components/Return.vue'
import Comments from '@/components/Comments.vue'
import Loading from "@/components/Loading.vue";
import GoTop from "@/components/GoTop.vue"
export default {
  props:['id'],
  data() {
    return {
      hotComments:[],
      userComments:[],
      perpage:30,
      page:0,
      isLoading: true,
      flag:false,
      timer:null,
      topshow:false,

    }
  },
  components: {
    Return,Comments,Loading,GoTop
  },
  methods: {
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
      if(h-top-ch<20){
        console.log(123);
        this.loadMore();
        window.removeEventListener("scroll", this.onScroll);
        this.timer=setTimeout(()=>{
           window.addEventListener("scroll", this.onScroll);
        },1000)
      }
    },
    loadMore() {
      this.isLoading = true;
      this.page++;
      this.getresult();
    },
     getresult(){
        this.$axios.get('/comment/playlist',{
        params: {
              id: this.id,
              limit: this.perpage,
              offset: this.page * this.perpage,
            },
      }).then(d=>{
        console.log(d);
        // if(d.data.hotComments.length>0){
        //   this.hotComments=d.data.hotComments;
        // }
        if(d.data.comments.length>0){
          for(let i=0;i<d.data.comments.length;i++){
            this.userComments.push(d.data.comments[i]);
          }      
        }else{
           clearTimeout(this.timer);
           window.removeEventListener("scroll", this.onScroll);
           this.flag=true;
        }
        this.isLoading = false;
      })
     }
  },
  
   beforeDestroy(){
     clearTimeout(this.timer);
     window.removeEventListener("scroll", this.onScroll);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.onScroll);
    });
  },
  created() {
    this.$axios.get('/comment/playlist?id='+this.id+'&limit=30',).then(d=>{
      console.log(d);
      this.hotComments=d.data.hotComments;
      this.userComments=d.data.comments;
      this.isLoading = false;
      // console.log(this.hotComments);
    })
  },
}
</script>
<style lang="less" scoped>
.albumreviews{
  h3{
    margin-top: 10px;
    text-align: center;
  }
  .no{
    text-align: center;
  }
}
</style>