<template>
  <div class="songitem">
     <return></return>
    <div class="top">
      <img :src="pic" alt="" />
      <div class="details">
        <h3>{{details.name}}</h3>
        <p>{{details.description}}</p>
        <div class="box">
            <router-link :to="`/AlbumReviews/${id}`">查看评论</router-link>
            <span @click.stop="$emit('playli',songs)">播放全部</span>
        </div>
       
      </div>
    </div>
    <ul>
    <li-item v-for="(item,index) in songs" :key="item.id" @player="$emit('player',$event)" :item="item">
      <template v-slot:sortnum>
            <b>{{((index+1) &lt; 10) ? '0'+(index+1):index+1}}</b>
        </template>
    </li-item>
    </ul>
  </div>
</template>
<script>
import Return from '@/components/Return.vue'
import LiItem from '@/components/LiItem.vue'
export default {
  props:['id'],
  components: {
    Return,LiItem
  },
  data() {
    return {
      show:false,
      pic:'',
      songs:[],
      details:'',
      i:-1
    }
  },
  created() {
    this.axios.get('/playlist/detail?id='+this.id).then(d=>{console.log(d);
    this.pic=d.data.playlist.coverImgUrl;
    this.songs=d.data.playlist.tracks.map((data)=>{
      data.song={
        artists:[{name:data.ar[0].name}],
        album:{name:data.al.name,picUrl:data.al.picUrl},
        privilege:{maxbr:[d.data.privileges[this.i+1].maxbr]}
      }
      return data;
    });
    this.details=d.data.playlist;
    console.log(this.pic);
    console.log(this.songs);
    })
  },
}
</script>
<style lang="less" scoped>
.songitem{
  ul{
    list-style: none;
  }
  .top{
    width: 100%;
    display: flex;
    // justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 6px;
    p{
      font-size: 12px;
      height: 50px;
      margin-top: 10px;
      display: block;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .details{
      width: 70vh;
      margin-left: 10px;
      overflow: hidden;
      .box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        span{
        font-size: 14px;
        padding-right: 6px;
        color: #ff85ac;
      }
      }
     
    }
   
    img{
      width: 20vh;
      margin-left: 6px;
      display: block;
      border: none;
      height: 20vh;
      max-width: 100%;
      // float: left;
    }
    a{
      color: #ff85ac;
      font-size: 14px;
    }
  }
}
</style>