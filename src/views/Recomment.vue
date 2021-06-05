<template>
  <div class="recomment">
    <search-box @search='search'></search-box>
    <border-title>推荐歌单</border-title>
    <loading v-if="recomment_song.length<=0"></loading>
    <div class="recomment_song">
      <picture-item v-for="item in recomment_song" :key="item.id" :item="item"></picture-item>
    </div>
    <border-title>最新音乐</border-title>
    <loading v-if="newSongs.length<=0"></loading>
    <div class="newSong">
      <ul>
        <li-item v-for="item in newSongs" :key="item.id"  @player="$emit('player',$event)"  :item="item">
        </li-item>
      </ul>
    </div>
  </div>
</template>
<script>
import BorderTitle from '@/components/BorderTitle.vue'
import PictureItem from '@/components/PictureItem.vue'
import Loading from '@/components/Loading.vue'
import LiItem from '@/components/LiItem.vue'
import SearchBox from '@/components/SearchBox.vue'
export default {
  components:{
    BorderTitle,PictureItem,Loading,LiItem,SearchBox
  },
  data() {
    return {
      recomment_song:[],
      newSongs:[]
    }
  },
  created() {
    this.axios.get('/personalized').then(d=>{this.recomment_song=d.data.result.slice(0,6)});
    this.axios.get('/personalized/newSong').then(d=>{this.newSongs=d.data.result; console.log(d.data);})
  },
  methods: {
    search(){
      this.$router.push('/Search')
    }
  },
}
</script>
<style lang="less" scoped>
.recomment_song{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  div{
    width: 33%;
  }
}
ul{
  list-style: none;
}
</style>