<template>
  <li class="comments">
    <div class="userpic">
       <img :src="Comments.user.avatarUrl" alt="">
    </div>
    <div class="userCom">
      <p><span class="user">{{Comments.user.nickname}}:</span>
      {{Comments.content}}</p>
    </div>
    <div class="like">
      <i class="likebg"></i>
      <p>{{Comments.likedCount}}</p>
    </div>
  </li>
</template>
<script>
export default {
  props:['Comments'],
  // created() {
  //   console.log(this.Comments)
  // },
}
</script>
<style lang="less" scoped>
.comments{
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  overflow: hidden;
  display: flex;
  
  .userpic{
    margin-left: 6px;
    float: left;
    width: 6vh;
    height: auto;
    overflow: hidden;
    margin-right: 6px;
    img{
      border-radius: 50%;
      display: block;
      width: 100%;
      height: auto;
    }

  }
  .userCom{
    width: 70%;
    p{
    // display: -webkit-box;
    // // -webkit-line-clamp: 5;
    // -webkit-box-orient: vertical;
    // overflow: hidden;
    padding: 6px 2px 0 6px;
    min-height: 30px;
    line-height: 1.2;
    font-size: 13px;
    text-align: justify;
  }
   .user{
          color: #FF85AC;
     }
  }
  .like{
    display: flex;
    justify-content: center;
    width: 15%;
    .likebg{
      display: inline-block;
      margin-top: 6px;
      width: 20px;
      height: 20px;
      background: url('../assets/liked.png') no-repeat center center/100% 100%;
    }
    p{
      font-size: 12px;
      padding-top: 6px;
      color:#888 ;
    }
  }
}
</style>