<template>
  <div id="app">
     
     <player v-if="playMusic" v-show="!$route.meta.playshow" :playMusic="playMusic" :playList="playList" :stop="stop" @changePlayMusic="changePlayMusic"></player>
    <div id="nav" v-if="!$route.meta.hideNav">
      <nav-bar v-if="!$route.meta.hideNav"></nav-bar>
      <div class="paddingTop" v-if="!$route.meta.hideNav"></div>
    </div>
   <router-view @player="play" @playli="playli" @stop="stop=$event" />
    <div class="padingBottom" v-if="playMusic" v-show="!$route.meta.playshow"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Player from '@/components/Player'
export default {
  data() {
    return {
      playMusic:null,
      playList:[],
      stop:null
    }
  },
  components:{
    NavBar,Player
  },
  methods:{
    changePlayMusic(event){
      if(event){
        this.playMusic=event;
      }
    },
    // stop(event){
    //   console.log(event);
    // },
    playli(event){
      this.playList=event;
      if(event){
        this.playMusic=event[0];
      }
    },
    play(event){
      //判断歌曲对象里面是否有图片 没有就拿专辑的图片.
      if(!event.picUrl && event.song && event.song.album){
        event.picUrl=event.song.album.picUrl;
      }
      // if(!event.picUrl){
      //   event.picUrl=defaultPic
      // }
      this.playMusic=event;
      console.log(event);
       //加入歌单
      let isPush=true;
      this.playList.map(d=>{
          if(d.id==event.id){//歌曲已经存在
            isPush=false;
          }
      });
      //console.log(this.playMusic);
      if(isPush) this.playList.push(event);
    }
  },
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
}
.paddingTop{
  padding-top:40px;
}
.padingBottom{
  padding-bottom: 50px;
}

</style>
