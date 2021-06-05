<template>
  <div class="fullscreen">
    <div class="top">
      <div @click="$emit('isFull')">
        <p>&lt;</p>
      </div>
      <div class="topcenter">
        <h4>{{ playMusic.name }}</h4>
      </div>
      <div class="list" @click="show = !show"></div>
      <transition name="dh">
      <ul class="playList" v-show="show">
        <li
          v-for="song in playList"
          :key="song.id"
          :class="{ active: playMusic.id == song.id }"
          @click="$emit('changePlayMusic', song)"
        >
          {{ song.name }}-{{ song.song.artists[0].name }}
        </li>
      </ul>
      </transition>
    </div>
    <div class="center">
      <div class="pic">
        <img :src="playMusic.song.album.picUrl || src" alt="" />
      </div>
    </div>
    <div class="lyricview">
      <ul
        :style="{
          transform:`translateY(-${lyricIndex * 16 - 100}px)`
        }"
        ref="lyrc"
      >
        <li
          v-for="(item, index) in lyricArray"
          :key="index"
          :class="{ highlight: index == lyricIndex }"
        >
          {{ item.lyric }}
        </li>
        <li v-if="flag" class="highlight">暂时木有歌词/(ㄒoㄒ)/~~</li>
      </ul>
    </div>
    <div class="group">
      <div class="progress">
        <span>{{ currentTime | formatTime }}</span>
        <input
          type="range"
          max="100"
          :value="(currentTime / duration) * 100"
          @change="changeTime"
        />
        <span>{{ duration | formatTime }}</span>
      </div>
      <div class="btn">
        <div :class="[playmode==1?'order':playmode==2?'randomAndorder':'circulation']" @click="$emit('changemode')"></div>
        <div class="last" @click="prev"></div>
        <div
          :class="playstate ? 'stop' : 'play'"
          @click="$emit('togglePlay')"
        ></div>
        <div class="next" @click="next"></div>
      </div>
    </div>
    
  </div>
</template>
<script>
import pic from "@/assets/logo.png";
export default {
  props: [
    "playMusic",
    "lyric",
    "currentTime",
    "duration",
    "playstate",
    "playList",
    "playmode"
  ],
  data() {
    return {
      src: pic,
      show: false,
      flag:false
    };
  },
  created() {
    console.log(this.playMusic);
    // this.$axios.get('/comment/music?id='+this.playMusic.id)
  },
 
  computed: {
    lyricArray() {
      //格局字符串歌词 转化为数组
      let lyric = this.lyric;
      if (!lyric){
        this.no();
         return []; //如果没有歌词返回空
      }
      let arr = lyric.split("\n");
      arr.pop();
      let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
      let lyricArr = arr.map((d) => {
        if (reg.test(d)) {
          let lyricObj = {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lyric: RegExp.$3,
          };
          return lyricObj;
        }
      });
      return lyricArr;
    },
    lyricIndex() {
      //计算属性当前歌词下标
      let ctime = this.currentTime; //当前播放时间
      let lyric = this.lyricArray; //歌词计算属性数组
      let index = 0;
      for (let i = 0; i < lyric.length; i++) {
        if (i >= lyric.length - 1) {
          //最后一条歌词
          index = i;
          break;
        }
        if (lyric[i].time <= ctime && ctime < lyric[i + 1].time) {
          index = i;
          break;
        }
      }
      return index;
    },
  },
  methods: {
    no(){
      this.flag=true;
    },
    changeTime(event) {
      let val = event.target.value;
      this.$emit("changetime", val);
      // console.log(event.target.value);
    },
    next() {
      let i = 0;
      this.playList.map((d, index) => {
        if (d.id == this.playMusic.id) {
          //找到当前播放音乐下标
          i = index;
        }
      });
      // console.log(i);
      if(this.playmode==1||this.playmode==3){
          i++;//下一曲 
          // console.log(this.playList.length);
          if(i>this.playList.length-1){
            // console.log('next');
            i=0;
          }
      }else if(this.playmode==2){//随机播放
          i=Math.floor(Math.random()*this.playList.length);
      }

      // console.log(this.$refs.lyrc);
      
      let pmusic = this.playList[i];
      this.$emit("changePlayMusic", pmusic);
      this.$refs.lyrc.style.transform=""
    },
    prev() {
      let i = 0;
      this.playList.map((d, index) => {
        if (d.id == this.playMusic.id) {
          //找到当前播放音乐下标
          i = index;
        }
      });
     if(this.playmode==1||this.playmode==3){
        i--;//上一曲 
         if(i<0){
            // console.log('prev');
            i=this.playList.length-1;
          }
    }else if(this.playmode==2){//随机播放
        i=Math.floor(Math.random()*this.playList.length);
    }
      let pmusic = this.playList[i];
      this.$emit("changePlayMusic", pmusic);
    },
  },
  filters: {
    formatTime(val) {
      let minutes = parseInt(val / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let sec = parseInt(val) - parseInt(minutes * 60);
      sec = sec < 10 ? "0" + sec : sec;
      return minutes + ":" + sec;
    },
  },
};
</script>
<style lang="less" scoped>
.fullscreen {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 11111;
  .top {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-around;
    height: 50px;
    width: 100%;
    .topcenter{
      width: 70%;
      height: 100%;
      text-align: center;
      line-height: 50px;
      h4{
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        overflow: hidden;
      }
    }
    p {
      display: block;
      width: 50px;
      height: 50px;
      font-size: 25px;
      line-height: 50px;
      text-align: center;
      color: #ff85ac;
    }
    .list {
      width: 50px;
      height: 50px;
      background: url("../assets/list.png") no-repeat center center;
    }
    .playList {
      position: fixed;
      width:100%;
      height: 50%;
      top: 50px;
      right: 0;
      background-color: rgba(255, 255, 255, 0.7);
      overflow-y: auto;
      z-index: 99999;
      li {
        width: 100%;
        text-indent: 1em;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        overflow: hidden;
        margin-top: 10px;
        //height: 50px;
        &.active {
          font-weight: bold;
          color: #ff85ac;
          font-size: 16px;
        }
      }
    }
  }
  .center {
    width: 40vh;
    height: 40vh;
    margin: 0 auto;
    .pic {
      width: 100%;
      height: 100%;
      display: flex;
      img {
        width: 100%;
        // height: auto;
        display: block;
      }
    }
  }
  .lyricview {
    width: 100vw;
    height: 40vh;
    overflow: hidden;
    margin-top: 10px;
    // box-sizing: border-box;
    ul {
      li {
        font-size: 13px;
        text-align: center;
        &.highlight {
          font-size: 16px;
          color: #ff85ac;
          font-weight: bold;
        }
      }
    }
  }
  .group {
    width: 100vw;
    height: calc(~"20vh - 50px");
    // display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    .progress {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: #ff85ac;
      height: 30%;

      span {
        width: 6vw;
        font-size: 12px;
        line-height: 4vh;
        text-align: center;
      }
      input {
        width: 75vw;
      }
      input[type="range"] {
        // margin-top: 8px;
        outline: none;
        -webkit-appearance: none; /*清除系统默认样式*/
        width: 56% !important;
        background: -webkit-linear-gradient(#ff85ac, #ff85ac) no-repeat;
        background-size: 100%; /*设置左右宽度比例*/
        height: 4px; /*横条的高度*/
        border-radius: 4px;
      }
      /*拖动块的样式*/
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /*清除系统默认样式*/
        height: 16px; /*拖动块高度*/
        width: 16px; /*拖动块宽度*/
        background: #ff85ac; /*拖动块背景*/
        border-radius: 50%; /*外观设置为圆形*/
      }
    }
    .btn {
      width: 100%;
      height: 70%;
      display: flex;
      .randomAndorder {
        width: 25%;
        height: auto;
        background: url("../assets/random.png") no-repeat center center;
      }
      .order{
        width: 25%;
        height: auto;
        background: url("../assets/order.png") no-repeat center center;
      }
      .circulation{
        width: 25%;
        height: auto;
        background: url("../assets/circulation.png") no-repeat center center;
      }
      .last {
        width: 25%;
        height: auto;
        background: url("../assets/last.png") no-repeat center center;
      }
      .play {
        width: 25%;
        height: auto;
        background: url("../assets/play.png") no-repeat center center;
      }
      .stop {
        width: 25%;
        height: auto;
        background: url("../assets/stop.png") no-repeat center center;
      }
      .next {
        width: 25%;
        height: auto;
        background: url("../assets/next.png") no-repeat center center;
      }
    }
  }
  .dh-enter,
  .dh-leave-to {
    /*元素进入动画第一帧类名*/
    opacity: 0;
    transform: translateX(50%);
  }

  .dh-enter-active,
  .dh-leave-active {
    /*元素进入整个过程中类名*/
    transition: all .3s linear;
  }

  .dh-enter-to,
  .dh-leave {
    /*元素进入动画最后一帧类名*/
    opacity: 1;
    transform: translateX(0);
  }
}
</style>