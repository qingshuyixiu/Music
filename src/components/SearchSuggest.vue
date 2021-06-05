<template>
  <div class="searchSuggest">
    <p>搜索提示</p>
    <ul>
      <li v-for="item in suggestList" :key="item.id" @click.prevent.stop="$emit('clksearch',{keywords:item.name})">
        <i></i>{{item.name}}
      </li>
      <li class="no" v-show="!suggestList">木有更多结果了/(ㄒoㄒ)/~~</li>
    </ul>
  </div>
</template>
<script>
export default {
  props:['keywords'],
  data() {
    return {
      suggestList:[]
    }
  },
  created() {
    this.suggest(this.keywords);
  },
  watch:{
    keywords(newvalue){
      this.suggest(newvalue);
    }
  },
  methods: {
    suggest(keywords){
      this.$axios.get('/search/suggest?keywords='+keywords).then(d=>{this.suggestList=d.data.result.songs})
    }
  },
}
</script>
<style lang="less" scoped>
.searchSuggest{
  padding: 0 10px;
  font-size: 12px;
  p{
    margin: 10px 0;
  }
  ul{
    li{
      width: 100%;
      height: 40px;
      font-size: 15px;
      line-height: 40px;
      color: #333;
      i{
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
        background-repeat: no-repeat;
      }
      
    }
    .no{
        text-align: center;
      }
  }
}
</style>
