<template>
  <div class="return">
    <a href="#" @click.prevent.stop="goback"> &lt;</a>
  </div>
</template>
<script>
export default {
  methods: {
    goback(){
      this.$router.go(-1);
      // this.$emit('show');
      
    }
  },
}
</script>
<style lang="less" scoped>
.return{
  width: 100%;
  height: 35px;
  line-height: 35px;
  a{
    color: #FF85AC;
    font-size: 30px;
    margin-left: 6px;
  }
}
</style>