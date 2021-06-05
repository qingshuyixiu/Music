<template>
 
  <div class="mvplay">
    <return></return>
    <video :src="url" controls autoplay></video>
    <div class="describe">
      <div class="author">
       <h3>{{mvdata.name}}</h3>
       <h5>作者:<span v-for="item in artists" :key="item.id">{{item.name}}/</span></h5>
       <div class="mvauthor">
         <p @click.stop="show=!show">详情</p>
         <p v-show="show">{{mvdata.desc}}</p>
       </div>
      </div>
    </div>
    <div class="similarity">
      <h3>相似MV</h3>
      <div class="similaritymv">
        <router-link  tag="div" :to="`/MvPlay/${item.id}`" class="mv" v-for="item in similaritymv" :key="item.id">
          <img :src="item.cover" @click="refresh">
        </router-link>
      </div>
    </div>
    <div class="comment">
        <h4>评论({{mvdata.commentCount}})</h4>
        <comments v-for="item in Comments" :key="item.id" :Comments='item'></comments>
        <go-top :topshow='topshow'></go-top>
        <loading v-show="isLoading"></loading>
        <ul>
          <li class="no" v-if="flag">木有更多了/(ㄒoㄒ)/~~</li>
        </ul>
    </div>
  </div>
</template>
<script>
import Return from '@/components/Return.vue' 
import Comments from '@/components/Comments.vue' 
import Loading from "@/components/Loading.vue"
import GoTop from "@/components/GoTop.vue"
export default {
  props:['id'],
  data() {
    return {
      url:'',
      artists:[],
      mvdata:{},
      Comments:[],
      show:false,
      perpage:30,
      page:0,
      isLoading: true,
      flag:false,
      topshow:false,
      timer:null,
      similaritymv:[],
    }
  },
  components:{
    Return,Comments,Loading,GoTop
  },
  created() {
    // document.documentElement.scrollTop=0;
    this.$emit('stop',false);
    this.$axios.get('/mv/detail?mvid='+this.id).then(d=>{
      console.log(d);
      this.artists=d.data.data.artists;
      this.mvdata=d.data.data;
      if(this.mvdata.commentCount==0){
        console.log("mmmm");
        this.isLoading=false;
        this.flag=true;
      }
      // this.mvname=d.data.data.name;
      // this.desc=d.data.data.desc;
      console.log(this.artists);
    });
    this.$axios.get('/mv/url?id='+this.id).then(d=>{
      console.log(d);
      this.url=d.data.data.url
    });
    this.$axios.get('/comment/mv?id='+this.id).then(d=>{
      console.log(d);
      this.Comments=d.data.comments;
    });
    this.$axios.get('/simi/mv?mvid='+this.id).then(d=>{
      console.log(d);
      this.similaritymv=d.data.mvs;
      console.log(this.similaritymv);
    })
  },
  methods: {
      refresh(){
        console.log(112233445566);
        window.location.reload();
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
        this.$axios.get('/comment/mv',{
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
            this.Comments.push(d.data.comments[i]);
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
  watch: {
    id(){
      this.refresh()
    }
  },
  beforeDestroy(){
     clearTimeout(this.timer);
     window.removeEventListener("scroll", this.onScroll);
  },
  beforeRouteEnter(to, from, next) {
     
    next((vm) => {
      //console.log(vm);
      window.addEventListener("scroll", vm.onScroll);
    });
  },
  beforeRouteLeave (to, from, next) {
    console.log(7777);
    this.$emit('stop',true);
    next();
  }
}
</script>
<style lang="less" scoped>
.mvplay{
  overflow: hidden;
  video{
    width: 100vw;
    height: auto;
    display: block;
    box-sizing: border-box;
  }
  .describe{
    width: 100%;
    height: auto;
    margin-top: 10px;
    .author{
      width: 95%;
      margin-left: 6px;
      .mvauthor{
        width: 100%;
        height: auto;
        font-size: 14px;
        text-align: justify;
        color: #ff85ac;
        &>:nth-child(2){
          font-size: 12px;
          color: black;
        }
      }
    }
  }
  .similarity{
    margin-top: 10px;
    h3{
      margin-left: 6px;
    }
    .similaritymv{
      width: 100%;
      height: 23vw;
      margin-left: 6px;
      margin-top: 10px;

      display: flex;
      justify-content: space-between;
      overflow-x: auto;
      .mv{
        margin-right: 10px;
        width: 40vw;
        height: 23vw;
        white-space: nowrap;
        flex-shrink: 0;
        img{
          width: 100%;
        }
      }
    }
  }
  .comment{
    width: 100%;
    margin-left: 6px;
    margin-top: 10px;
    .no{
      text-align: center;
      color:#ff85ac ;
    }
    
  }
}
</style>