(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65c600b4"],{"00e0":function(t,e,o){"use strict";o("bf3a")},"3d6b":function(t,e,o){},"62a9":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("li",{staticClass:"comments"},[o("div",{staticClass:"userpic"},[o("img",{attrs:{src:t.Comments.user.avatarUrl,alt:""}})]),o("div",{staticClass:"userCom"},[o("p",[o("span",{staticClass:"user"},[t._v(t._s(t.Comments.user.nickname)+":")]),t._v(" "+t._s(t.Comments.content))])]),o("div",{staticClass:"like"},[o("i",{staticClass:"likebg"}),o("p",[t._v(t._s(t.Comments.likedCount))])])])},s=[],i={props:["Comments"]},c=i,r=(o("c965"),o("2877")),a=Object(r["a"])(c,n,s,!1,null,"4c518ade",null);e["a"]=a.exports},"7a09":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"return"},[o("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.goback(e)}}},[t._v(" <")])])},s=[],i={methods:{goback:function(){this.$router.go(-1)}}},c=i,r=(o("dc19"),o("2877")),a=Object(r["a"])(c,n,s,!1,null,"50c54c4e",null);e["a"]=a.exports},"893f":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"albumreviews"},[o("return"),t.hotComments.length>0?o("div",{staticClass:"goodcomments"},[o("h3",[t._v("精彩评论")]),o("ul",[t._l(t.hotComments,(function(t,e){return o("comments",{key:e,attrs:{Comments:t}})})),t.isLoading?o("loading"):t._e()],2)]):t._e(),o("div",{staticClass:"usercomments"},[o("h3",[t._v("用户评论")]),o("ul",[t._l(t.userComments,(function(t,e){return o("comments",{key:e,attrs:{Comments:t}})})),o("go-top",{attrs:{topshow:t.topshow}}),t.isLoading?o("loading"):t._e(),t.flag?o("li",{staticClass:"no"},[t._v("木有更多了/(ㄒoㄒ)/~~")]):t._e()],2)])],1)},s=[],i=o("7a09"),c=o("62a9"),r=o("3a5e"),a=o("c12c"),l={props:["id"],data:function(){return{hotComments:[],userComments:[],perpage:30,page:0,isLoading:!0,flag:!1,timer:null,topshow:!1}},components:{Return:i["a"],Comments:c["a"],Loading:r["a"],GoTop:a["a"]},methods:{onScroll:function(){var t=this,e=document.documentElement.scrollHeight||document.body.scrollHeight,o=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.clientHeight||document.body.clientHeight;this.topshow=o>=400,e-o-n<20&&(this.loadMore(),window.removeEventListener("scroll",this.onScroll),this.timer=setTimeout((function(){window.addEventListener("scroll",t.onScroll)}),1e3))},loadMore:function(){this.isLoading=!0,this.page++,this.getresult()},getresult:function(){var t=this;this.$axios.get("/comment/playlist",{params:{id:this.id,limit:this.perpage,offset:this.page*this.perpage}}).then((function(e){if(e.data.comments.length>0)for(var o=0;o<e.data.comments.length;o++)t.userComments.push(e.data.comments[o]);else clearTimeout(t.timer),window.removeEventListener("scroll",t.onScroll),t.flag=!0;t.isLoading=!1}))}},beforeDestroy:function(){clearTimeout(this.timer),window.removeEventListener("scroll",this.onScroll)},beforeRouteEnter:function(t,e,o){o((function(t){window.addEventListener("scroll",t.onScroll)}))},created:function(){var t=this;this.$axios.get("/comment/playlist?id="+this.id+"&limit=30").then((function(e){t.hotComments=e.data.hotComments,t.userComments=e.data.comments,t.isLoading=!1}))}},u=l,m=(o("00e0"),o("2877")),d=Object(m["a"])(u,n,s,!1,null,"42a26bfb",null);e["default"]=d.exports},a3ca:function(t,e,o){"use strict";o("3d6b")},b530:function(t,e,o){},bf3a:function(t,e,o){},c12c:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"returntopbox"},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.topshow,expression:"topshow"}],staticClass:"returntop",on:{click:t.goTop}},[t._v("^")])])},s=[],i={props:["topshow"],data:function(){return{topTimer:null}},methods:{goTop:function(){var t=this;this.topTimer=setInterval((function(){var e=document.documentElement.scrollTop||document.body.scrollTop,o=e/4;0!=document.documentElement.scrollTop?document.documentElement.scrollTop-=o:document.body.scrollTop-=o,0==e&&clearInterval(t.topTimer)}),30)}}},c=i,r=(o("a3ca"),o("2877")),a=Object(r["a"])(c,n,s,!1,null,"343572f4",null);e["a"]=a.exports},c965:function(t,e,o){"use strict";o("b530")},dc19:function(t,e,o){"use strict";o("e277")},e277:function(t,e,o){}}]);
//# sourceMappingURL=chunk-65c600b4.05a721dc.js.map