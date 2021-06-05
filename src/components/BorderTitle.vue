<template>
  <h2 class="bordertitle"><slot></slot></h2>
</template>
<style lang="less" scoped>
.bordertitle{
  font-size: 17px;
  color: #333;
  padding-left:9px ;
  line-height: 22px;
  position: relative;
  margin: 16px 0;
  &::after{
    content: "";
    position: absolute;
    border-left: 2px solid #FF85AC;
    left:0px;
    height: 16px;
    top: 3px;
  }
}
</style>