webpackJsonp([1],{"+KeV":function(t,e){},"2jrB":function(t,e){},JWFw:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),o=n("mvHQ"),r=n.n(o),a={name:"App",created:function(){this.$store.subscribe(function(t,e){localStorage.setItem("store",r()(e))})}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var c=n("VU/8")(a,s,!1,function(t){n("2jrB")},null,null).exports,l=n("/ocq"),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v(" "+t._s(t.collection.collectionName)+" ")]),t._v(" "),n("nav",[n("ul",t._l(t.navItems,function(e,i){return n("li",{key:i},[n("router-link",{attrs:{to:e.route}},[t._v(t._s(e.display))])],1)}))]),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var d=n("VU/8")({props:{id:{required:!0}},data:function(){return{navItems:[{display:"Lesson",route:{name:"collection"}},{display:"Cards",route:{name:"collectionView"}},{display:"Edit",route:{name:"collectionEdit"}}]}},computed:{collection:function(){return this.$store.state.collections[this.id]}}},u,!1,function(t){n("yZql")},"data-v-5f149ad0",null).exports,h=n("Dd8w"),p=n.n(h),f={props:["id","createMode"],data:function(){return{homeRoute:{name:"home"},emptyCard:{q:"",a:""},errors:{q:[],a:[]}}},beforeRouteLeave:function(t,e,n){this.readyToSave&&("both"===this.lastCardIsNotFilled&&this.remove(this.lastIndex,1),n())},computed:{collection:function(){return this.$store.state.collections[this.id]},lastIndex:function(){return this.collection.items.length-1},lastCardIsNotFilled:function(){if(-1===this.lastIndex)return null;var t=this.collection.items[this.lastIndex];return""===t.q?""===t.a?"both":"q":""===t.a?"a":null},readyToSave:function(){return 0===this.errors.q.length&&0===this.errors.a.length},titleClass:function(){return{error:""===this.collection.collectionName}}},methods:{checkLastCard:function(){if(this.readyToSave)if("both"===this.lastCardIsNotFilled)this.blur(this.lastIndex,"q"),this.blur(this.lastIndex,"a");else{if(!this.lastCardIsNotFilled)return!0;this.blur(this.lastIndex,this.lastCardIsNotFilled)}return!1},deleteCollection:function(){this.$store.dispatch("deleteCollection",this.id),this.$router.push(this.homeRoute)},remove:function(t){var e=this.id;this.$store.commit("removeCard",{id:e,index:t});var n=function(e){return e.filter(function(e){return e!==t}).map(function(e){return e>t?e-1:e})};this.errors.q=n(this.errors.q),this.errors.a=n(this.errors.a)},add:function(t){if(this.checkLastCard()){var e=p()({},this.emptyCard),n=this.id;this.$store.commit("addCard",{id:n,card:e}),"function"==typeof t&&t()}},save:function(){this.checkLastCard()&&(this.$emit("save"),this.$router.push(this.homeRoute))},blur:function(t,e){var n=this.errors[e].findIndex(function(e){return e===t});-1!==n?""!==this.collection.items[t][e]&&this.errors[e].splice(n,1):""===this.collection.items[t][e]&&this.errors[e].push(t)},focusNext:function(t,e,n){var i=this;if(""!==t.value.trim()){var o=function(o,r){i.$nextTick(function(){var a=i.$refs[o];a&&a[r]?a[r].focus():"a"!==o&&i.add(function(){return i.focusNext(t,e,n)})})};switch(e){case"title":o("q",0);break;case"q":o("a",n);break;case"a":o("q",n+1)}}},inputClass:function(t,e){return{error:this.errors[e].filter(function(e){return e===t}).length>0}}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.collection.collectionName,expression:"collection.collectionName",modifiers:{trim:!0}}],class:t.titleClass,attrs:{type:"text",placeholder:"Collection name",autofocus:t.createMode},domProps:{value:t.collection.collectionName},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.focusNext(e.target,"title")},input:function(e){e.target.composing||t.$set(t.collection,"collectionName",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),t.createMode?t._e():n("button",{on:{click:t.deleteCollection}},[t._v("Delete Collection")]),t._v(" "),t.createMode?n("router-link",{attrs:{to:t.homeRoute}},[n("button",[t._v("Discard")])]):t._e()],1),t._v(" "),t._l(t.collection.items,function(e,i){return n("div",{key:i,staticClass:"card"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.q,expression:"card.q",modifiers:{trim:!0}}],ref:"q",refInFor:!0,class:t.inputClass(i,"q"),attrs:{type:"text",placeholder:"Question"},domProps:{value:e.q},on:{blur:[function(e){t.blur(i,"q")},function(e){t.$forceUpdate()}],keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.focusNext(e.target,"q",i)},input:function(n){n.target.composing||t.$set(e,"q",n.target.value.trim())}}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.a,expression:"card.a",modifiers:{trim:!0}}],ref:"a",refInFor:!0,class:t.inputClass(i,"a"),attrs:{type:"text",placeholder:"Answer"},domProps:{value:e.a},on:{blur:[function(e){t.blur(i,"a")},function(e){t.$forceUpdate()}],keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.focusNext(e.target,"a",i)},input:function(n){n.target.composing||t.$set(e,"a",n.target.value.trim())}}}),t._v(" "),n("button",{on:{click:function(e){t.remove(i)}}},[t._v("X")])])}),t._v(" "),n("button",{staticClass:"btn btn-add newCard",on:{click:t.add}},[t._v("Add")]),t._v(" "),t.createMode?n("button",{staticClass:"btn btn-save",on:{click:t.save}},[t._v("\n  Save")]):t._e()],2)},staticRenderFns:[]};var v=n("VU/8")(f,m,!1,function(t){n("r4Gr")},"data-v-1684c764",null).exports,q={components:{appCollectionEdit:v},data:function(){return{id:null,newCollection:{collectionName:"",items:[{q:"",a:""}]},saved:!1}},created:function(){var t=p()({},this.newCollection);this.$store.commit("createCollection",{collection:t}),this.id=this.$store.getters.collectionQuantity-1},beforeRouteLeave:function(t,e,n){this.saved||this.$store.commit("removeCollection",this.id),n()},methods:{save:function(){this.saved=!0}}},C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h1",[this._v("collection new")]),this._v(" "),e("app-collection-edit",{attrs:{id:this.id,createMode:!0},on:{save:this.save}})],1)},staticRenderFns:[]};var _=n("VU/8")(q,C,!1,function(t){n("+KeV")},"data-v-12940eec",null).exports,g={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flip-container pointer",class:t.flipClass,on:{click:t.flip}},[n("div",{staticClass:"flipper"},[n("div",{staticClass:"front"},[t._v("\n      "+t._s(t.card.q)+"\n    ")]),t._v(" "),n("div",{staticClass:"back"},[t._v("\n      "+t._s(t.card.a)+"\n    ")])])])},staticRenderFns:[]};var k=n("VU/8")({props:["card","endlessFlip"],data:function(){return{question:!0}},computed:{cardState:function(){return{question:this.question,answer:!this.question}},cardSide:function(){return this.question?this.card.q:this.card.a},flipClass:function(){return{flip:!this.question,flipper:this.endlessFlip||!this.endlessFlip&&!this.question,flipperFast:!this.endlessFlip}}},methods:{flip:function(){this.question||this.$emit("nextCard"),this.question=!this.question}}},g,!1,function(t){n("zwca")},"data-v-331deafa",null).exports,b={name:"CollectionView",components:{appCard:k},props:{id:{required:!0}},computed:{deck:function(){return this.$store.getters.alphabeticalDeck(this.id)}}},x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"cards-container"},this._l(this.deck,function(t){return e("app-card",{key:t.id,attrs:{card:t,endlessFlip:!0}})}))])},staticRenderFns:[]};var y=n("VU/8")(b,x,!1,function(t){n("oMCB")},"data-v-213101a0",null).exports,w={name:"Lesson",components:{appCard:k},props:{id:{required:!0}},data:function(){return{index:0}},created:function(){this.index=this.randIndex()},computed:{collection:function(){return this.$store.state.collections[this.id]},card:function(){return this.collection.items[this.index]},quantity:function(){return this.collection.items.length}},methods:{nextCard:function(){this.index=this.randIndex()},randIndex:function(){return Math.floor(Math.random()*this.quantity)}}},$={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",[e("app-card",{attrs:{card:this.card},on:{nextCard:this.nextCard}})],1)])},staticRenderFns:[]},N=n("VU/8")(w,$,!1,null,null,null).exports,F={render:function(){var t=this.$createElement,e=this._self._c||t;return e("header",[e("div",{staticClass:"content"},[e("img",{attrs:{src:n("rnH7")}}),this._v(" "),e("router-link",{attrs:{to:"/"}},[this._v("Home")])],1)])},staticRenderFns:[]};var I={data:function(){return{version:"0.3"}},computed:{currentYear:function(){return(new Date).getFullYear()}}},R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",[n("div",{staticClass:"content"},[n("span",{staticClass:"pull-left"},[t._v("\n      © "+t._s(t.currentYear)+"\n      "),n("a",{attrs:{href:"https://github.com/chingu-voyage4/Bears-Team-15#readme",target:"_blank"}},[t._v("Chingu Voyage-4 Team Bears-15")])]),t._v(" "),n("span",{staticClass:"pull-right"},[n("a",{attrs:{href:"https://github.com/chingu-voyage4/Bears-Team-15/wiki/What's-new",target:"_blank"}},[t._v("\n        v "+t._s(t.version)+"\n      ")])])])])},staticRenderFns:[]},V={name:"Homepage",components:{appHeader:n("VU/8")({data:function(){return{}}},F,!1,function(t){n("JWFw")},"data-v-edff5e5a",null).exports,appFooter:n("VU/8")(I,R,!1,null,null,null).exports}},S={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"homepage"},[e("app-header"),this._v(" "),e("router-view"),this._v(" "),e("app-footer")],1)},staticRenderFns:[]},E=n("VU/8")(V,S,!1,null,null,null).exports,B=n("NYxO"),L={name:"Dashboard",data:function(){return{greeting:"Welcome to Bears-15 Cards!"}},computed:Object(B.b)(["collections"])},U={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v(t._s(t.greeting))]),t._v(" "),n("div",{staticClass:"dashboard"},[t._l(t.collections,function(e,i){return t.collections[i]?n("div",{key:i},[n("router-link",{attrs:{to:{name:"collection",params:{id:i}}}},[n("div",{staticClass:"deck"},[n("h3",[t._v(t._s(t.collections[i].collectionName))])])])],1):t._e()}),t._v(" "),n("div",[n("router-link",{attrs:{to:{name:"collectionNew"}}},[n("div",{staticClass:"deck"},[n("h3",[t._v("+")])])])],1)],2)])},staticRenderFns:[]};var M=n("VU/8")(L,U,!1,function(t){n("ksgV")},"data-v-1242a26e",null).exports;i.a.use(l.a);var T=new l.a({routes:[{path:"/",component:E,children:[{path:"/",name:"home",component:M},{path:"/collection/new",name:"collectionNew",component:_},{path:"/collection/:id",component:d,props:!0,children:[{path:"/",name:"collection",component:N,props:!0},{path:"cards",name:"collectionView",component:y,props:!0},{path:"edit",name:"collectionEdit",component:v,props:!0}]}]}]}),A=n("woOf"),D=n.n(A),H=n("Gu7T"),P=n.n(H);i.a.use(B.a);var W=new B.a.Store({state:{collections:[{collectionName:"Italian words",items:[{q:"ciotola",a:"bowl"},{q:"tazza",a:"cup"},{q:"forchetta",a:"fork"},{q:"piatto",a:"plate"},{q:"scrivania",a:"desk"},{q:"tavola",a:"table"},{q:"matita",a:"pencil"},{q:"penna",a:"pen"},{q:"quaderno",a:"exercise book"},{q:"diario",a:"diary"}]},{collectionName:"European Capital Cities",items:[{q:"England",a:"London"},{q:"France",a:"Paris"},{q:"Germany",a:"Berlin"},{q:"Spain",a:"Madrid"},{q:"Italy",a:"Rome"},{q:"Scotland",a:"Edinburgh"},{q:"Wales",a:"Cardiff"},{q:"Northern Ireland",a:"Belfast"},{q:"Portugal",a:"Lisbon"},{q:"Greece",a:"Athens"},{q:"Austria",a:"Vienna"},{q:"Switzerland",a:"Bern"},{q:"Belgium",a:"Brussels"},{q:"Ireland",a:"Dublin"},{q:"Netherlands",a:"Amsterdam"},{q:"Denmark",a:"Copenhagen"},{q:"Poland",a:"Warsaw"},{q:"Russia",a:"Moscow"},{q:"Ukraine",a:"Kyiv"},{q:"Norway",a:"Oslo"},{q:"Sweden",a:"Stockholm"},{q:"Turkey",a:"Ankara"},{q:"Cyprus",a:"Nicosia"},{q:"Bulgaria",a:"Sofia"},{q:"Romania",a:"Bucharest"},{q:"Iceland",a:"Reykjavík"},{q:"Luxembourg",a:"Luxembourg City"}]}]},getters:{alphabeticalDeck:function(t){return function(e){var n=[].concat(P()(t.collections[e].items));return n.sort(function(t,e){return t.q.toLowerCase()>e.q.toLowerCase()?1:t.q.toLowerCase()<e.q.toLowerCase()?-1:0}),n}},collectionQuantity:function(t){return t.collections.length}},mutations:{addCard:function(t,e){var n=e.id,i=e.card;t.collections[n].items.push(i)},removeCard:function(t,e){var n=e.id,i=e.index;t.collections[n].items.splice(i,1)},createCollection:function(t,e){var n=e.collection;t.collections.push(n)},deleteCollection:function(t,e){t.collections[e]=null},removeCollection:function(t,e){t.collections.splice(e,1)},initialiseStore:function(t){var e=localStorage.getItem("store");e&&this.replaceState(D()(t,JSON.parse(e)))}},actions:{deleteCollection:function(t,e){t.commit("deleteCollection",e)}}});i.a.config.productionTip=!1,new i.a({el:"#app",store:W,router:T,components:{App:c},template:"<App/>",beforeCreate:function(){this.$store.commit("initialiseStore")}})},ksgV:function(t,e){},oMCB:function(t,e){},r4Gr:function(t,e){},rnH7:function(t,e,n){t.exports=n.p+"static/img/logo-placeholder.4c97b4d.png"},yZql:function(t,e){},zwca:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f9018827d244f5d01956.js.map