<template>
  <div>
    <router-link  class="ranking" tag="div" :to="`/songitem/${id}`">
    <div class="left">
      <img :src="listPic" alt="" />
    </div>
    <div class="right">
      <p>{{description}}</p>
    </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props:['id'],
   data() {
    return {
      songlistname:'',
      listPic:'',
      description:''
    }
  },
  created() {
    this.$axios.get('playlist/detail?id='+this.id).then(d=>{
      console.log(d);
      this.songlistname=d.data.playlist.name;
      this.listPic=d.data.playlist.coverImgUrl;
      this.description=d.data.playlist.description;
      console.log(this.listPic);
    })
  },
}
</script>
<style lang="less" scoped>
.ranking{
  width: 100%;
  display: flex;
  // align-items: center;
  margin-top: 10px;
  .left{
  
    img{
      width: 30vh;
    margin-left: 6px;
    display: block;
    border: none;
    height: 35vw;
    max-width: 100%;
    }
  }
  .right{
    width: 60vh;
    margin-left: 10px;
    overflow: hidden;
    p{
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    // min-height: 50px;
    line-height: 1.2;
    font-size: 14px;
    text-align: left;
    padding-top: 10px;
    }
  }
}
</style>