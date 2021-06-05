
<template>
      <li class="item">
          <slot name="sortnum"></slot>
          <div class="left">
              <!-- 在v-html里调用过滤器 $options.filters.highLight -->
              <h5 v-html="$options.filters.highLight(item.name,keywords)"></h5>
              <p>
                  <i v-if="item.song.privilege&&item.song.privilege.maxbr>320000"></i>
                  <span v-html="$options.filters.highLight(item.song.artists[0].name,keywords)"></span> - <span v-html="$options.filters.highLight(item.song.album.name,keywords)"></span>
              </p>
            </div>
          <div class="right" @click.stop="$emit('player',item)"></div>
    </li>
</template>



<script>
export default {
  props:{
        item:Object,
        keywords:{
            type:String,
            default:''
        }
    },
  filters:{
        highLight(value,k){
            //把 关键词 替换成 <span style="color:#ff85ac;">关键词</span>
           return value.replace(k,'<span style="color:#ff85ac;">'+k+'</span>')
        }
    }
}
</script>
<style lang="less" scoped>
  .text-hidden(){
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        overflow: hidden;
    }
    li.item{
        display: flex;
        align-items: center;
        padding:6px 10px 6px 0px;
        margin-left:10px;
        border-bottom: 1px solid rgba(0,0,0,.1);
        .left{
            flex:1;
            overflow: hidden;
            padding-right:10px;
           .text-hidden();
            i{
                display: inline-block;
                width: 12px;
                height: 8px;
                margin-right: 4px;
                background:url(../assets/index_icon_2x.png) no-repeat;
                background-size: 166px 97px;
            }
            h5{
                font-size:17px;
                color:#333;
                .text-hidden();
            }
            p{
                font-size:12px;
                color:#888;
                .text-hidden();
            }
        }
        .right{
            width:22px;
            height:22px;
            background:url(../assets/index_icon_2x.png) no-repeat;
            background-size: 166px 97px;
            background-position: -24px 0;
        }
        &>b{
            display: inline-block;
            margin-right: 10px;
            font-weight: normal;
            font-size:17px;
            color:#999;
        }
        &:first-child,&:nth-child(2),&:nth-child(3){
            &>b{
                color:#ff85ac;
            }
        }
    }

</style>