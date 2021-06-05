<template>
  <div class="mv">
    <div class="top">
      <ul>
        <li>
          <a :class="[page == 1 ? 'active' : '']" @click.prevent.stop="page = 1" href="#"
            >推荐</a
          >
        </li>
        <li>
          <a :class="[page == 2 ? 'active' : '']" @click.prevent.stop="page = 2" href="#"
            >最新</a
          >
        </li>
        <li>
          <a :class="[page == 3 ? 'active' : '']" @click.prevent.stop="page = 3" href="#"
            >出品MV</a
          >
        </li>
      </ul>
    </div>
    <component :is="cutMvPage" :mvResult="mvResult"></component>
    <go-top :topshow='topshow'></go-top>
    <loading v-show="!flag"></loading>
    <ol v-if="flag">
      <li>
        <p>木有更多数据了~~</p>
      </li>
    </ol>
  </div>
</template>
<script>
import NewMv from '@/components/NewMv.vue'
import MakeMv from '@/components/MakeMv.vue'
import RecMv from "@/components/RecMv.vue";
import Loading from "@/components/Loading.vue";
import GoTop from "@/components/GoTop.vue"
export default {
  data() {
    return {
      cutMvPage: RecMv,
      page: 1,
      mvResult:[],
      limit:10,
      pages:0,
      timer:null,
      flag:false,
      topshow:false,
    };
  },
  components: {
    Loading,GoTop
  },
  methods: {
    onScroll(){
      // console.log('scrollHeight',document.documentElement.scrollHeight)
      // console.log('scrollTop',document.documentElement.scrollTop)
      console.log('clientHeight',document.documentElement.clientHeight)
      let h=document.documentElement.scrollHeight||document.body.scrollHeight;
      let top=document.documentElement.scrollTop||document.body.scrollTop;
      let ch=document.documentElement.clientHeight||document.body.clientHeight;
      if(top>=400){
        this.topshow=true;
      }else{
        this.topshow=false;
      }
      if(h-top-ch<20){
        console.log(123)
        this.loadMore();
        window.removeEventListener("scroll", this.onScroll);
        this.timer=setTimeout(()=>{
           window.addEventListener("scroll", this.onScroll);
        },1000)
      }
    },
    loadMore() {
      // this.isLoading = true;
      this.pages++;
      this.limit=this.limit+10;
      this.getresult();
    },
    getresult() {
      if(this.page==2){
        this.axios.get("/mv/first", {
          //axios get传值
          params: {
            limit: this.limit,
          },
        })
        .then((d) => {
          console.log(d);
          if(this.mvResult<d.data.data){
            this.mvResult=d.data.data;
          }else{
            //console.log(556623);
            clearTimeout(this.timer);
            this.flag=true;
            window.removeEventListener("scroll", this.onScroll);
          }
          // this.isLoading = false;
        });
      }else if(this.page==3){
        this.$axios.get('/mv/exclusive/rcmd',{
          params: {
            limit: this.limit,
            offset:this.limit*this.pages
          },
        }).then(d=>{
          console.log(d);
          console.log(this.mvResult);
          if(d.data.data.length>0){
            for(let i=0;i<d.data.data.length;i++){
              this.mvResult.push(d.data.data[i]);
            }
            //this.mvResult=this.mvResult+d.data.data;
            console.log(this.mvResult);
          }else{
            console.log(556623);
            this.flag=true;
            clearTimeout(this.timer);
            window.removeEventListener("scroll", this.onScroll);
          }
        })
      }
    },
  },
  watch:{
    page(){
      if(this.page==1){
        document.documentElement.scrollTop=0
        console.log(555);
        this.$axios('/personalized/mv').then(d=>{
          console.log(d);
          this.mvResult=d.data.result;
          this.flag=true;
    })
        this.topshow=false;
        this.cutMvPage=RecMv;
        window.removeEventListener("scroll", this.onScroll);
      }else if(this.page==2){
        document.documentElement.scrollTop=0
        clearTimeout(this.timer);
        this.flag=false;
        window.removeEventListener("scroll", this.onScroll);
        this.limit=10;
        this.$axios('/mv/first?limit=10').then(d=>{
      console.log(d);
      this.mvResult=d.data.data;
      window.addEventListener('scroll',this.onScroll);
    })
        this.topshow=false;
        this.cutMvPage=NewMv;
      }else if(this.page==3){
        document.documentElement.scrollTop=0
        clearTimeout(this.timer);
        this.flag=false;
        window.removeEventListener("scroll", this.onScroll);
        this.limit=10;
        this.pages=0;
        this.$axios('/mv/exclusive/rcmd?limit=10').then(d=>{
          console.log(d);
          this.mvResult=d.data.data;
          window.addEventListener('scroll',this.onScroll);
        })
        this.topshow=false;
        this.cutMvPage=MakeMv;
      }
    },
    
  },
  created() {
    this.$axios('/personalized/mv').then(d=>{
      console.log(d);
      this.mvResult=d.data.result;
    })
    this.flag=true;
  },
  beforeRouteLeave (to, from, next) {
     console.log(54321);
     clearTimeout(this.timer);
     window.removeEventListener("scroll", this.onScroll);
     next();
  }
     
  // beforeRouteEnter(to, from, next) {
  //   next(() => {
  //    // window.addEventListener("scroll", vm.onScroll);
  //   });
  // },
  // activated() {
  //   // 1页面 每页10
  //   // this.mvResult = [];
  //   this.getresult();
  // },
};
</script>
<style lang="less" scoped>
.mv {
  .top {
    height: 40px;
    
    ul {
      width: 100%;
      height: 40px;
      background-color: white;
      display: flex;
      position: fixed;
      top: 40px;
      left: 0;
      z-index: 8;
      li {
        flex: 1;
        height: 100%;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        a {
          display: inline-block;
          height: 100%;
          color: black;
          font-size: 15px;
          &.active {
            color: #ff85ac;
            position: relative;
            &::after {
              content: "";
              display: block;
              width: calc(~"100% + 20px");
              margin-left: -10px;
              position: absolute;
              bottom: -1px;
              border-bottom: 2px solid #ff85ac;
            }
          }
        }
      }
    }
    
  }
  ol{
      width: 100%;
      list-style: none;
      li{
        display: block;
        p{
        text-align: center;
        font-size: 14px;
        color: #ff85ac;
      }
      }
    }
}
</style>