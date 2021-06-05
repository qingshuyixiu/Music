<template>
  <div class="search">
    <return></return>
    <search-box
      @inputing="inputing"
      @searchresult="searchresult"
      :keyword="keywords"
      :flag="flag"
    ></search-box>
    <component
      :is="showcomponent"
      :keywords="keywords"
      @player="$emit('player', $event)"
      @clksearch="searchresult"
    ></component>
  </div>
</template>
<script>
import SearchBox from "@/components/SearchBox.vue";
import Return from "@/components/Return.vue";
import SearchHotComponent from "@/components/SearchHotComponent.vue";
import SearchSuggest from "@/components/SearchSuggest.vue";
import SearchResult from "@/components/SearchResult.vue";
export default {
  data() {
    return {
      keywords: "",
      showcomponent: SearchHotComponent,
      flag:false
    };
  },
  components: {
    SearchBox,
    Return,
  },
  methods: {
    inputing(event) {
      if (event) {
        this.keywords = event;
      }

      if (event == "" || event.length <= 0) {
        this.showcomponent = SearchHotComponent;
      } else {
        this.showcomponent = SearchSuggest;
      }
    },
    searchresult(event) {
      console.log(event);
      if (event.keywords) {
        this.keywords = event.keywords;
      }
      console.log(this.keywords);
      this.showcomponent = SearchResult;
    },
  },
  created() {
    this.flag=true;
  },
  

  // beforeRouteEnter (to, from, next) {
  //   //console.log($refs);
  //   next(vm=>{

  //   })
  // }
};
</script>