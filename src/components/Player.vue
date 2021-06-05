<template>
  <div :class="['player', { pause: !playstate }]">
    <audio
      v-if="playMusic"
      controls
      autoplay
      :src="`https://music.163.com/song/media/outer/url?id=${playMusic.id}.mp3`"
      ref="player"
      @timeupdate="timeupdate"
      @play="play"
      @pause="pause"
      @ended="end"
    ></audio>
    <div class="minibar" v-if="playMusic">
      <div><img :src="playMusic.song.album.picUrl || cp" /></div>
      <div @click="isFull = true">
        <p class="text-hidden">{{ playMusic.name }}</p>
        <p class="text-hidden">
          专辑:{{ playMusic.song.album.name }} 歌手:<span
            v-for="art in playMusic.song.artists"
            :key="art.id"
            >{{ art.name }}</span
          >
        </p>
      </div>
      <div @click.stop="togglePlay">
        <canvas width="50" height="50" ref="playround"></canvas>
      </div>
    </div>
    <transition name="dh">
      <full-screen
        v-if="isFull"
        @isFull="isFull = false"
        :playMusic="playMusic"
        :lyric="lyric"
        :currentTime="currentTime"
        :duration="duration"
        @togglePlay="togglePlay"
        :playstate="playstate"
        :playList="playList"
        @changetime="changeTime"
        :playmode="playmode"
        @changePlayMusic="$emit('changePlayMusic', $event)"
        @changemode="playMode"
        ref="fullplay"
      ></full-screen>
    </transition>
  </div>
</template>
<script>
import Cp from "@/assets/cp.jpg";
import FullScreen from "@/components/FullScreen";
export default {
  props: ["playMusic", "playList", "stop"],
  data() {
    return {
      duration: 0,
      currentTime: 0,
      playstate: true, //记录是否播放
      isFull: false,
      cp: Cp,
      lyric: null,
      playmode: 1,
      musicCri: {},
    };
  },
  components: {
    FullScreen,
  },
  created() {
    this.axios
      .get("/lyric", {
        params: {
          id: this.playMusic.id,
        },
      })
      .then((d) => {
        if (d.data && d.data.lrc && d.data.lrc.lyric) {
          this.lyric = d.data.lrc.lyric;
          // console.log(d);
        }
      });
  },
  watch: {
    playMusic(newMusic) {
      //侦听playMusic当前播放的音乐.获取歌词
      this.axios
        .get("/lyric", {
          params: {
            id: newMusic.id,
          },
        })
        .then((d) => {
          if (d.data && d.data.lrc && d.data.lrc.lyric) {
            this.lyric = d.data.lrc.lyric;
            // console.log(d);
          }
        });
    },
    stop(newvalue) {
      if (!newvalue) {
        console.log(1111);
        this.playstate = false;
        this.$refs.player.pause();
      }
    },
  },
  methods: {
    end() {
      if (this.playmode == 3) {
        //如果播放模式 是单曲循环 继续播放当前歌曲
        this.$refs.player.play();
      } else if(this.playmode==1) {
        //当前音乐播放完成 播放下一曲 调用子组件的next函数.
        if (this.$refs.fullplay) {
          this.$refs.fullplay.next();
        } else if (this.playList) {
          for (let i = 0; i < this.playList.length; i++) {
            console.log(this.playMusic);
            if (this.playList[i].id == this.playMusic.id) {
              if (this.playList[i + 1]) {
                this.$emit("changePlayMusic", this.playList[i + 1]);
                break;
              } else {
                this.$emit("changePlayMusic", this.playList[0]);
                break;
              }
            }
          }
        }
      }else{
        console.log("随机");
        let i=Math.floor(Math.random()*this.playList.length);
        this.$emit("changePlayMusic", this.playList[i]);
      }
    },
    playMode() {
      this.playmode = this.playmode + 1;
      if (this.playmode > 3) {
        this.playmode = 1;
      }
      console.log(this.playmode);
    },
    changeTime(val) {
      let t = (val / 100) * this.duration; //得到播放时间
      this.$refs.player.currentTime = t; //改变播放时间
    },
    timeupdate(event) {
      this.duration = event.target.duration; //音乐总时长
      this.currentTime = event.target.currentTime; //当前播放时间.
      this.drawCircle(this.duration, this.currentTime);
    },
    drawCircle(total, current) {
      let canvas = this.$refs.playround;
      let cxt = canvas.getContext("2d");
      cxt.clearRect(0, 0, 50, 50);
      cxt.beginPath();
      cxt.strokeStyle = "#FF85AC";
      cxt.lineWidth = 2;
      cxt.arc(25, 25, 20, 0, Math.PI * 2);
      cxt.stroke();
      cxt.closePath();
      cxt.beginPath();
      cxt.strokeStyle = "#FFF";
      cxt.lineWidth = 2;
      //当前播放时间 / 总时长 得到百分比
      //arc(x,y,半径,开始弧度，结束弧度)
      cxt.arc(25, 25, 20, 0, Math.PI * 2 * (current / total));
      cxt.stroke();
      cxt.closePath();
    },
    togglePlay() {
      //如果是播放状态 改为暂停
      if (this.playstate) {
        // this.playstate=false;
        this.$refs.player.pause(); //暂停
      } else {
        // this.playstate=true;
        this.$refs.player.play(); //播放
      }
    },
    play() {
      this.playstate = true;
    },
    pause() {
      this.playstate = false;
    },
  },
};
</script>
<style lang="less" scoped>
audio {
  height: 0px;
  width: 0px;
}
.player {
  height: 0px;
  .minibar {
    position: fixed;
    width: 100%;
    height: 50px;
    background-color: white;
    color: #ff85ac;
    bottom: 0px;
    z-index: 9;
    display: flex;
    align-items: center;
    div {
      padding: 0px 10px;
      &:first-child {
        width: 40px;
        img {
          width: 100%;
          height: auto;
          border-radius: 50%;
          animation: round 3s 0s linear infinite;
        }
      }
      &:nth-child(2) {
        padding: 0;
        flex: 1;
        text-indent: 1em;
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        overflow: hidden;
      }
      &:last-child {
        width: 70px;
        height: 50px;
        font-size: 12px;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          background: url(../assets/stop.png) no-repeat center center;
          width: 50px;
          height: 50px;
          z-index: 2;
          left: 10px;
          top: 0px;
          text-align: center;
          line-height: 50px;
        }
      }
    }
  }
}
.pause {
  height: 0px;
  .minibar {
    div {
      &:first-child {
        img {
          animation-play-state: paused;
        }
      }
      &:last-child {
        &::before {
          content: "";
          background: url(../assets/play.png) no-repeat center center;
        }
      }
    }
  }
}
@keyframes round {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.dh-enter,
.dh-leave-to {
  /*元素进入动画第一帧类名*/
  opacity: 0;
  transform: translateY(100%);
}

.dh-enter-active,
.dh-leave-active {
  /*元素进入整个过程中类名*/
  transition: all 0.5s linear;
}

.dh-enter-to,
.dh-leave {
  /*元素进入动画最后一帧类名*/
  opacity: 1;
  transform: translateY(0);
}
</style>