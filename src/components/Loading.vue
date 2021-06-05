<template>
  <ul class="loading">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>
<style lang="less" scoped>
.loading{
  display: flex;
  justify-content: center;
  li{
    width: 3px;
    height: 20px;
    margin-left: 3px;
    transform-origin: bottom;
    background-color: #FF85AC;
    animation: load 0.5s 0s infinite;
    &:nth-child(1){
      animation-delay: -0.2s;
    }
    &:nth-child(3){
      animation-delay: 0.2s;
    }
    &:nth-child(4){
      animation-delay: 0.4s;
    }
  }
  @keyframes load {
    from{
      transform:scaleY(0.1)
    }
    to{
      transform:scaleY(1.2)
    }
  }
}
</style>