(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3d2ab40"],{"5b17":function(t,n,a){"use strict";a.r(n);var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"songitem"},[a("return"),a("div",{staticClass:"top"},[a("img",{attrs:{src:t.pic,alt:""}}),a("div",{staticClass:"details"},[a("h3",[t._v(t._s(t.details.name))]),a("p",[t._v(t._s(t.details.description))]),a("div",{staticClass:"box"},[a("router-link",{attrs:{to:"/AlbumReviews/"+t.id}},[t._v("查看评论")]),a("span",{on:{click:function(n){return n.stopPropagation(),t.$emit("playli",t.songs)}}},[t._v("播放全部")])],1)])]),a("ul",t._l(t.songs,(function(n,i){return a("li-item",{key:n.id,attrs:{item:n},on:{player:function(n){return t.$emit("player",n)}},scopedSlots:t._u([{key:"sortnum",fn:function(){return[a("b",[t._v(t._s(i+1<10?"0"+(i+1):i+1))])]},proxy:!0}],null,!0)})})),1)],1)},e=[],s=(a("d81d"),a("b0c0"),a("7a09")),r=a("8f4a"),c={props:["id"],components:{Return:s["a"],LiItem:r["a"]},data:function(){return{show:!1,pic:"",songs:[],details:"",i:-1}},created:function(){var t=this;this.axios.get("/playlist/detail?id="+this.id).then((function(n){t.pic=n.data.playlist.coverImgUrl,t.songs=n.data.playlist.tracks.map((function(a){return a.song={artists:[{name:a.ar[0].name}],album:{name:a.al.name,picUrl:a.al.picUrl},privilege:{maxbr:[n.data.privileges[t.i+1].maxbr]}},a})),t.details=n.data.playlist}))}},o=c,l=(a("ff93"),a("2877")),u=Object(l["a"])(o,i,e,!1,null,"3f31c758",null);n["default"]=u.exports},"7a09":function(t,n,a){"use strict";var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"return"},[a("a",{attrs:{href:"#"},on:{click:function(n){return n.preventDefault(),n.stopPropagation(),t.goback(n)}}},[t._v(" <")])])},e=[],s={methods:{goback:function(){this.$router.go(-1)}}},r=s,c=(a("dc19"),a("2877")),o=Object(c["a"])(r,i,e,!1,null,"50c54c4e",null);n["a"]=o.exports},aa3d:function(t,n,a){},b0c0:function(t,n,a){var i=a("83ab"),e=a("9bf2").f,s=Function.prototype,r=s.toString,c=/^\s*function ([^ (]*)/,o="name";i&&!(o in s)&&e(s,o,{configurable:!0,get:function(){try{return r.call(this).match(c)[1]}catch(t){return""}}})},dc19:function(t,n,a){"use strict";a("e277")},e277:function(t,n,a){},ff93:function(t,n,a){"use strict";a("aa3d")}}]);
//# sourceMappingURL=chunk-b3d2ab40.232b6db5.js.map