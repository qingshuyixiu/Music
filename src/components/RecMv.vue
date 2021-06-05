<template>
  <div class="recmv">
    <mv-list v-for="item in mvResult" :key="item.id" :item="item"></mv-list>
  </div>
</template>
<script>
import MvList from '@/components/MvList.vue'
export default {
  props:["mvResult"],
  components:{
    MvList
  }
}
</script>