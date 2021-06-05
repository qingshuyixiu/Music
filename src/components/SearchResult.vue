<template>
  <div class="result">
    <p>搜索结果</p>
    <ul>
      <li-item
        v-for="(item,index) in searchresult"
        :keywords="keywords"
        @player="$emit('player', $event)"
        :item="item"
        :key="index"
      ></li-item>
      <go-top :topshow='topshow'></go-top>
      <loading v-if="isLoading"></loading>
      <li v-if="flag" class="no">木有更多搜索结果了/(ㄒoㄒ)/~~,换个词试试吧~~</li>
    </ul>
  </div>
</template>
<script>
import LiItem from "@/components/LiItem.vue";
import Loading from "@/components/Loading.vue";
import GoTop from "@/components/GoTop.vue"
export default {
  props: ["keywords"],
  data() {
    return {
      searchresult: [],
      page: 0, //默认第一页
      perpage: 30, //每页显示三十
      isLoading: true,
      flag:false,
      timer:null,
      topshow:false,
    };
  },
  components: {
    LiItem,
    Loading,
    GoTop
  },
  created() {
    this.$axios.get("/search?keywords=" + this.keywords).then((d) => {
      console.log(d);
      console.log(this.keywords);
      this.searchresult = d.data.result.songs.map((data) => {
        data.song = {
          artists: [{ name: data.artists[0].name }],
          album: data.album,
        };
        this.isLoading = false;
        return data;
      });
    });
    window.addEventListener('scroll',this.onScroll);
  },
  beforeDestroy(){
     clearTimeout(this.timer);
     window.removeEventListener("scroll", this.onScroll);
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
        console.log(123)
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
    getresult() {
      this.axios.get("/search", {
          //axios get传值
          params: {
            keywords: this.keywords,
            limit: this.perpage,
            offset: this.page * this.perpage,
          },
        })
        .then((d) => {
          console.log(d);
          if(!d.data.result.songs){
            this.isLoading = false;
            clearTimeout(this.timer);
            window.removeEventListener("scroll", this.onScroll);
            this.flag=true;
            return;
          }
          let result = d.data.result.songs.map((data) => {
            data.song = {
              artists: data.artists,
              album: data.album,
            };
            return data;
          });
          this.isLoading = false;
          this.searchresult = this.searchresult.concat(result);
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.onScroll);
    });
  },
  activated() {
    // 1页面 每页10
    this.searchresult = [];
    this.getresult();
  },
};
</script>
<style lang="less" scoped>
.result {
  padding: 0 10px;
  font-size: 12px;
  ul{
    .no{
      text-align: center;
      color: #ff85ac;
    }
  }
  p {
    margin: 10px 0;
  }
}
</style>