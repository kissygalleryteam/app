/*! app - v1.4 - 2013-12-04 4:24:19 PM
* Copyright (c) 2013 bachi@taobao.com; Licensed  */
KISSY.add("gallery/app/1.4/util",function(a){"use strict";a.mix(a,{setHash:function(a,b){var c,d;"object"==typeof a?(c=window.location.href,b=a):c=a,c.indexOf("#")<0&&(c+="#");var e=this.getHash(c);for(var d in e)d in b||"viewpath"===d||delete e[d];for(d in b)e[d]=b[d];c=c.split("#")[0]+"#";for(d in e)c+=d+"="+e[d]+"&";return c=c.substr(0,c.length-1)},getHash:function(b){var c=b||window.location.href;if(c.indexOf("#")<0)return{};var d=c.split("#")[1];if(""===d)return{};try{"&"==d[d.length-1]&&(d=d.substr(0,d.length-1)),d=d.replace(/"/gi,"'"),d=d.replace(/=/gi,'":"'),d=d.replace(/&/gi,'","'),d+='"',d='{"'+d+"}";var e=a.JSON.parse(d)}catch(f){a.unparam(d)}return e},_globalEval:function(a){if(a&&/\S/.test(a)){var b=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0],c=document.createElement("script");c.text=a,b.insertBefore(c,b.firstChild),setTimeout(function(){b.removeChild(c)},1)}},execScript:function(b){var c,d,e,f,g,h,i=this,j=new RegExp(/<script([^>]*)>([^<]*(?:(?!<\/script>)<[^<]*)*)<\/script>/gi),k=a.one("head").getDOMNode(),l=/\stype="(javascript)|(text)\/template"/i,m=/\ssrc=(['"])(.*?)\1/i,n=/\scharset=(['"])(.*?)\1/i;for(j.lastIndex=0;c=j.exec(b);)d=c[1],e=d?d.match(m):!1,d.match(l)||(e&&e[2]?(g=document.createElement("script"),g.src=e[2],(f=d.match(n))&&f[2]&&(g.charset=f[2]),g.async=!0,k.appendChild(g)):(h=c[2])&&h.length>0&&i._globalEval(h))},isDaily:function(){return/daily\.taobao\.net/.test(window.location.hostname)?!0:!1}})},{requires:["node","json","uri"]}),KISSY.add("gallery/app/1.4/kissy2yui",function(a){a.augment(a.Node,{size:function(){return this.length},get:function(a){var b=this,c={region:function(){return{height:b.height(),width:b.width()}}};return a in c?c[a]():void 0}})},{requires:["node","event"]}),KISSY.add("gallery/app/1.4/slide",function(a){"use strict";var b=(a.Node.all,function(){if(!(this instanceof b))throw new Error('please use "new Slide()"');this.init.apply(this,arguments)});return a.augment(b,a.Event.Target,{init:function(b,c){var d=this;if(a.isObject(b))d.con=b;else if(/^#/i.test(b))d.con=a.one(b);else if(a.one("#"+b))d.con=a.one("#"+b);else{if(!a.one(b))throw new Error("Slide Container Hooker not found");d.con=a.one(b)}return d.buildParam(c),d.buildHTML(),d.bindEvent(),d.fixSlideSize(),this},setWrapperSize:function(b){var c=this;a.isUndefined(b)&&(b=0),c.pannels=c.con.all("."+c.contentClass+" div."+c.pannelClass),c.length=c.pannels.length;var d={none:function(){},hSlide:function(){var a=c.animcon.get("region");c.animwrap.css({width:(c.length+b)*a.width/c.colspan+"px"})}};return d[c.effect](),a.isUndefined(b)||c.relocateCurrentTab(),this},add:function(b,c){var d=this;return(a.isUndefined(c)||c>d.length)&&(c=d.length),a.isString(b)&&(b=a.one(b)),d.transitions&&b.css({visibility:"hidden"}),c==d.length?(setTimeout(function(){d.setWrapperSize(1)},0),b.insertAfter(d.pannels[c-1])):b.insertBefore(d.pannels[c]),d.setWrapperSize(),d.fixSlideSize(d.currentTab),d.transitions&&b.css({visibility:""}),d.transitions,this},remove:function(b){var c=this;if(1!==c.length)return b<=c.currentTab&&(c.currentTab--,c.length--),c.transitions&&c.con.css({visibility:"hidden"}),a.one(c.pannels[b]).remove(),c.setWrapperSize(),c.transitions&&c.con.css({display:"block",visibility:""}),c.fixSlideSize(c.currentTab),this},removeLast:function(){var a=this;return a.remove(a.length-1),a},renderLazyData:function(b){if(b.css("display","none"),"1"!=b.attr("lazy-data")){b.attr("lazy-data","1");var c=(a.stamp(d),b.html().replace(/&lt;/gi,"<").replace(/&gt;/gi,">")),d=a.Node("<div>"+c+"</div>");a.DOM.insertBefore(d,b),a.execScript(c)}},buildWrap:function(){var b=this;return b.animwrap=a.Node('<div style="position:absolute;"></div>'),b.animwrap.html(b.animcon.html()),b.animcon.html(""),b.animcon.append(b.animwrap),b.pannels=b.con.all("."+b.contentClass+" div."+b.pannelClass),b},doEffectInit:function(){var a=this,b={none:function(){a.pannels=a.con.all("."+a.contentClass+" div."+a.pannelClass),a.pannels.css({display:"none"}),a.pannels.item(a.defaultTab).css({display:"block"})},hSlide:function(){a.buildWrap();var b=a.animcon.get("region");a.pannels.css({"float":"left",overflow:"hidden"}),a.animwrap.css({width:a.length*b.width/a.colspan+"px",overflow:"hidden",left:-1*a.defaultTab*b.width+"px"})}};return b[a.effect](),this},buildHTML:function(){var b=this,c=b.con;b.tabs=c.all("."+b.navClass+" "+b.triggerSelector);var d=c.all("."+b.contentClass+" ."+b.pannelClass);if(b.length=d.size(),c.one("."+b.navClass)||a.Node('<ul class="'+b.navClass+'" style="display:none"></ul>').appendTo(b.con),0===b.tabs.size()){for(var e=c.all("."+b.navClass),f="",g=0;g<b.length;g++){var h="";0===g&&(h=b.selectedClass),f+='<li class="'+h+'"><a href="javascript:void(0);">'+(g+1)+"</a></li>"}e.html(f)}return b.tabs=c.all("."+b.navClass+" "+b.triggerSelector),b.animcon=c.one("."+b.contentClass),b.animwrap=null,b.doEffectInit(),b.fixSlideSize(b.currentTab),b.hightlightNav(b.getWrappedIndex(b.currentTab)),b.autoSlide===!0&&b.play(),this},getCurrentPannel:function(){var b=this;return a.one(b.pannels[b.currentTab])},renderWidth:function(){var a=this,b=a.animcon.get("region").width;return"hSlide"==a.effect&&(b/=a.colspan),a.pannels.css({width:b+"px"}),this},renderHeight:function(){var a=this,b=a.animcon.get("region").height;return a.pannels.css({height:b+"px"}),this},relocateCurrentTab:function(b){var c=this;return a.isUndefined(b)&&(b=c.currentTab),"hSlide"==c.effect?(c.transitions?c.animwrap.css({"-webkit-transition-duration":"0s","-webkit-transform":"translate3d("+-1*b*c.animcon.get("region").width+"px,0,0)","-webkit-backface-visibility":"hidden"}):c.animwrap.css({left:-1*b*c.animcon.get("region").width}),c.currentTab=b,this):void 0},fixSlideSize:function(a){var b=this;return b.adaptive_fixed_width&&b.renderWidth(),b.adaptive_fixed_height&&b.renderHeight(),b.adaptive_fixed_size&&b.renderHeight().renderWidth(),b.resetSlideSize(a),this},hideURIbar:function(){this.animcon.height("2500px"),window.scrollTo(0,1),this.animcon.height(window.innerHeight+"px")},setViewSize:function(b){var c=a.one("body"),d=a.one("html"),e="auto"===b?"auto":"100%";c.css("height",e),d.css("height",e),this.animcon.css("height",e),this.animcon.parent().height(e)},removeHeightTimmer:function(){var b=this;a.isNull(b.heightTimmer)||(clearInterval(b.heightTimmer),b.heightTimmer=null)},addHeightTimmer:function(){var b=this;a.isNull(b.heightTimmer)||(clearInterval(b.heightTimmer),b.heightTimmer=null);var c=function(){"hSlide"==b.effect&&b.animcon.css({height:b.pannels.item(b.currentTab).get("region").height+"px"})};b.heightTimmer=setInterval(c,100),c()},resetSlideSize:function(a){var b,c,d=this;return("undefined"==typeof a||null===a)&&(a=d.currentTab),"hSlide"==d.effect||"vSlide"==d.effect?("hSlide"==d.effect&&(b=d.adaptive_width?d.adaptive_width():d.animcon.get("region").width,c=d.pannels.item(a).get("region").height,b/=d.colspan,d.pannels.css({width:b+"px",display:"block"}),d.animcon.css({width:b*d.colspan+"px",overflow:"hidden"}),d.animWrapperAutoHeightSetting&&d.animcon.css({height:c+"px"})),this):void 0},getWrappedIndex:function(a){var b=this,c=0;return c=b.carousel?a<b.colspan?b.length-3*b.colspan+a:a>=b.length-b.colspan?a-(b.length-b.colspan):a-b.colspan:a},bindEvent:function(){var b=this;return a.Event.on(window,"resize",function(){b.fixSlideSize(b.currentTab),b.relocateCurrentTab()}),this},buildParam:function(b){function c(a,c){var e=b[c];d[c]=void 0===e||null===e?a:e}var d=this;return(void 0===b||null===b)&&(b={}),a.each({autoSlide:!1,speed:500,timeout:3e3,effect:"none",eventType:"click",easing:"easeBoth",hoverStop:!0,selectedClass:"selected",conClass:"t-slide",navClass:"tab-nav",triggerSelector:"li",contentClass:"tab-content",pannelClass:"tab-pannel",carousel:!1,reverse:!1,touchmove:!1,adaptive_fixed_width:!1,adaptive_fixed_height:!1,adaptive_fixed_size:!1,adaptive_width:!1,adaptive_height:!1,defaultTab:0,layerSlide:!1,layerClass:"tab-animlayer",colspan:1,animWrapperAutoHeightSetting:!0,webkitOptimize:!0},c),a.mix(d,{tabs:[],animcon:null,pannels:[],timmer:null,touching:!1}),d.speed=d.speed/1e3,0!==d.defaultTab&&(d.defaultTab=Number(d.defaultTab)-1),d.currentTab=d.defaultTab,d.transitions="webkitTransition"in document.body.style&&d.webkitOptimize,d},fix_for_transition_when_carousel:function(){},isAming:function(){var a=this;return a.anim?a.anim.isRunning():!1},previous:function(a){var b=this;try{if(b.isAming()&&b.carousel)return this}catch(c){}var d=b.currentTab+b.length-1-(b.colspan-1);return d>=b.length-b.colspan+1&&(d%=b.length-b.colspan+1),b.carousel&&b.is_first()?(b.fix_pre_carousel(),b.previous.call(b),this):(b.go(d,a),this)},is_last:function(){var a=this;return a.currentTab==a.length-(a.colspan-1)-1?!0:!1},is_first:function(){var a=this;return 0===a.currentTab?!0:!1},next:function(a){var b=this;try{if(b.isAming()&&b.carousel)return this}catch(c){}var d=b.currentTab+1;return d>=b.length-b.colspan+1&&(d%=b.length-b.colspan+1),b.carousel&&b.is_last()?(b.fix_next_carousel(),b.next.call(b),this):(b.go(d,a),this)},fix_next_carousel:function(){},fix_pre_carousel:function(){},hightlightNav:function(){},switch_to:function(b,c){var d=this,e=function(){a.isFunction(c)&&c.call(d,d),d.fire("afterSwitch",{index:d.currentTab,navnode:d.tabs.item(d.getWrappedIndex(d.currentTab)),pannelnode:d.pannels.item(d.currentTab)})};if(d.fire("beforeTailSwitch",{index:d.currentTab,navnode:d.tabs.item(d.getWrappedIndex(d.currentTab)),pannelnode:d.pannels.item(d.currentTab)}),d.hightlightNav(d.getWrappedIndex(b)),d.fixSlideSize(b),d.autoSlide&&d.stop().play(),b>=d.length&&(b%=d.length),b==d.currentTab)return this;if(d.anim)try{d.anim.stop(),d.anim=null}catch(f){}var g={none:function(a){d.pannels.css({display:"none"}),d.pannels.item(a).css({display:"block"}),e()},hSlide:function(b){d.transitions?(d.animwrap.css({"-webkit-transition-duration":d.speed+"s","-webkit-transform":"translate3d("+-1*b*d.animcon.get("region").width/d.colspan+"px,0,0)","-webkit-backface-visibility":"hidden"}),d.anim=a.Anim(d.animwrap,{opacity:1},d.speed,d.easing,function(){e()}),d.anim.run()):(d.anim=a.Anim(d.animwrap,{left:-1*b*d.animcon.get("region").width/d.colspan},d.speed,d.easing,function(){e()}),d.anim.run())}};g[d.effect](b),d.currentTab=b,d.fire("switch",{index:b,navnode:d.tabs.item(d.getWrappedIndex(b)),pannelnode:d.pannels.item(b)});var h=d.pannels.item(b).all(".data-lazyload");h&&h.each(function(a){d.renderLazyData(a)})},go:function(a,b){var c=this,d=c.fire("beforeSwitch",{index:a,navnode:c.tabs.item(a),pannelnode:c.pannels.item(a)});return d!==!1&&(a+c.colspan>c.pannels.size()&&(a=c.pannels.size()-c.colspan),c.switch_to(a,b)),this},play:function(){var a=this;return null!==a.timer&&clearTimeout(a.timer),a.timer=setTimeout(function(){a.next().play()},Number(a.timeout)),this},stop:function(){var a=this;return clearTimeout(a.timer),a.timer=null,this}}),b},{requires:["node","event","json","./util","./kissy2yui"]}),KISSY.add("gallery/app/1.4/index",function(a,b){"use strict";function c(a){return this instanceof c?(c.superclass.constructor.call(this,a),this.init(),void 0):new c(a)}var d=window.history;return c.ATTRS={hideURIbar:{value:!1},viewpath:{value:"index.html",setter:function(a){return decodeURIComponent(a)}},forceReload:{value:!0},page:{value:null},direction:{value:"none"},anim:{value:"hSlide"},dataload:{value:"true"},param:{value:null},pageCache:{value:!1},tapTrigger:{value:"a"},animWrapperAutoHeightSetting:{value:!0},errorAlert:{value:!0},containerHeighTimmer:{value:!0},basepath:{value:window.location.protocol+"//"+window.location.hostname+window.location.pathname.replace(/\/[^\/]+$/i,"").replace(/\/$/,"")+"/",setter:function(a){return/\/$/.test(a)?a:a+"/"}},initPostData:{value:null},signet:{value:{level:0,viewpath:"",hisurl:"",lastviewpath:"",forward:0,scrollTop:0}},fullRangeWidth:{value:function(){return document.body.offsetWidth}},webkitOptimize:{value:!0},positionMemory:{value:!0}},a.mix(c,{READY:{},STARTUP:{},TEARDOWN:{},INCLUDEONCE:{},DESTROY:{},PAGECACHE:{},PAGESCROLL:{},STORAGE:{},APP:null,AndroidHis:{},includeOnce:function(b){if(c.APP.slide){var d=this.APP.get("viewpath");a.isFunction(this.INCLUDEONCE[d])||(this.INCLUDEONCE[d]=b,b.call(this.APP,this.APP))}else b.call(this.APP)},destroy:function(b){var c=this.APP.get("viewpath");this.APP.isSinglePage()&&a.Event.on(window,"unload",b),a.isFunction(this.DESTROY[c])||(this.DESTROY[c]=b)},startup:function(a){if(c.APP.slide){var b=this.APP.get("viewpath");"true"==this.APP.get("page").attr("data-startup")&&a.call(this.APP),this.STARTUP[b].push(a)}else a.call(c.APP)},ready:function(a){if(c.APP.slide){var b=this.APP.get("viewpath");"true"==this.APP.get("page").attr("data-ready")&&a.call(this.APP),this.READY[b].push(a)}else a.call(this.APP)},teardown:function(b){if(c.APP.slide){var d=this.APP.get("viewpath");this.TEARDOWN[encodeURIComponent(d)].push(b)}else a.Event.on(window,"beforeunload",b)},cleanup:function(){var a=this.APP.get("viewpath");this.STARTUP[a]=[],this.READY[a]=[],this.TEARDOWN[encodeURIComponent(a)]=[]},queryKey:function(a,b){b="undefined"==typeof b||"hash"!==b?"search":"hash";var c=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),d=location[b].substr(1).match(c);return null!=d?unescape(d[2]):null}}),a.extend(c,a.Base,{init:function(){var d=this;return c.APP=d,d.MS=d.constructor,a.one("#MS")?(a.UA.opera&&a.UA.opera>0&&d.set("animWrapperAutoHeightSetting",!0),d.slide=new b("MS",{easing:"easeBoth",autoSlide:!1,effect:d.get("anim"),touchmove:!1,adaptive_fixed_width:!0,contentClass:"MS-con",speed:450,pannelClass:"MS-pal",animWrapperAutoHeightSetting:d.get("animWrapperAutoHeightSetting"),webkitOptimize:d.get("webkitOptimize"),adaptive_width:d.get("fullRangeWidth")}),d.positionTimmer=null,d.get("containerHeighTimmer")&&d.slide.addHeightTimmer(),d.bindEvent(),d.initLoad()):d.set("page",a.one("body")),d.initPageStorage(),d.set("storage",d.MS.STORAGE[d.get("viewpath")]||{}),this},isSinglePage:function(){return this.slide?!1:!0},isMultiplePage:function(){return!this.isSinglePage()},callDestroy:function(){var b=this,c=b.get("signet").lastviewpath,d=b.MS.DESTROY[c];return a.isFunction(d)&&d.call(b,b),this},initPageStorage:function(){var b=this,c=b.get("viewpath");if(!a.isObject(this.MS.STORAGE[c])){var d=a.Base.extend();this.MS.STORAGE[c]=new d}},callReady:function(b){var c=this;a.isUndefined(b)&&(b=c.get("viewpath"));var d=c.MS.READY[b],e=c.get("param");return c.get("page").attr("data-ready","true"),a.isArray(d)&&a.each(d,function(a){setTimeout(function(){a.call(c,e)},200)}),a.isFunction(d)&&setTimeout(function(){d.call(c)},200),this},callStartup:function(b){var c=this;a.isUndefined(b)&&(b=c.get("viewpath"));var d=c.MS.STARTUP[b];c.get("page").attr("data-startup","true");var e=c.get("param");return c.set("param",null),c.set("storage",c.MS.STORAGE[b]||{}),a.isArray(d)&&a.each(d,function(a){a.call(c,e)}),a.isFunction(d)&&d.call(c,e),this},callTeardown:function(b){var c=this;if(a.isUndefined(b)&&(b=c.get("viewpath")),""!==b){var d=c.MS.TEARDOWN[encodeURIComponent(b)];return c.rememberPosition(b),a.isArray(d)&&a.each(d,function(a){a.call(c,c)}),a.isFunction(d)?d.call(c,c):!0}},rememberPosition:function(b){var c=this;c.MS.PAGESCROLL[b]=a.DOM.scrollTop()},recallPosition:function(){var b=this;if(b.get("positionMemory")){var c=b.get("viewpath"),d=b.MS.PAGESCROLL[c];d&&0===a.DOM.scrollTop()&&setTimeout(function(){a.Anim(window,{scrollTop:d},.5,"easeBoth",function(){}).run()},200)}},initLoad:function(){var b=this;a.isUndefined(a.getHash().viewpath)||b.set("viewpath",decodeURIComponent(a.getHash().viewpath)),a.isNull(b.get("initPostData"))||(b.__post=b.get("initPostData")),b._go(b.get("viewpath"),"none");var c=b.formatUrlTail(b.get("viewpath"),a.getHash()),e={level:0,viewpath:b.get("viewpath"),hisurl:c,forward:0,lastviewpath:"",scrollTop:a.DOM.scrollTop()};b.set("signet",e),d.replaceState(e,"",c),b.set("viewpath",decodeURIComponent(a.getHash().viewpath))},rollback:function(){var b=this,c=b.formatUrlTail(b.get("viewpath"),a.getHash()),e={level:0,viewpath:b.get("viewpath"),hisurl:c,forward:0,lastviewpath:"",scrollTop:a.DOM.scrollTop()};b.set("signet",e),d.replaceState(e,"",c),b.set("viewpath",decodeURIComponent(a.getHash().viewpath))},loading:function(){var b=this,c=a.one("#MS-loading"),d=a.one("#MS-loading-mask"),e=['<div id="MS-loading" style="display:none">','<img src="http://img04.taobaocdn.com/tps/i4/T1aIsKXmReXXa679Pe-40-40.gif" />',"</div>"].join(""),f='<div id="MS-loading-mask"></div>';return c=c?c:a.Node(e).appendTo("body"),d=d?d:a.Node(f).appendTo("body"),c.one("img").css({"margin-top":"5px"}),c.css({display:"none",position:"fixed",height:"50px",width:"50px",top:"50%",left:"50%","margin-top":"-25px","margin-left":"-25px","border-radius":"6px","text-align":"center","background-color":"white",opacity:.7,"z-index":101}),d.css({display:"none",position:"fixed",background:"white",opacity:0,height:a.DOM.viewportHeight()+"px",width:a.DOM.viewportWidth()+"px","z-index":100,top:"0px"}),b.loadingTimer=setTimeout(function(){b.loadingTimer&&(b.closeLoadingTimer&&(clearTimeout(b.closeLoadingTimer),b.closeLoadingTimer=null),c.css({display:"block"}),d.css({display:"block"}),b.closeLoadingTimer=setTimeout(function(){b.closeLoading(),b.closeLoadingTimer=null},5e3))},350),b},closeLoading:function(){var b=this;b.loadingTimer&&(clearTimeout(b.loadingTimer),b.loadingTimer=null);var c=a.one("#MS-loading"),d=a.one("#MS-loading-mask");return c&&(c.css({display:"none"}),d.css({display:"none"})),b},getUrlPrefix:function(){var a=window.location,b=a.pathname.replace(/\/.+\//i,"").replace("/","")+a.search;return b},formatUrlTail:function(b,c){var d=this;a.isUndefined(c)&&(c=""),a.isString(c)&&(c=a.unparam(c));var e=a.setHash(a.merge(c,{viewpath:encodeURIComponent(b)}));return d.getUrlPrefix()+e.replace(/^.+#/i,"#")},setRouteHash:function(b,c){var e=this,b=decodeURIComponent(b);e.set("viewpath",b),a.isUndefined(c)&&(c=""),a.isString(c)&&(c=a.unparam(c));var f=e.formatUrlTail(b,a.getHash()),g={level:e.get("signet").level+1,viewpath:b,hisurl:a.setHash(f,c),forward:1,lastviewpath:b,scrollTop:a.DOM.scrollTop()},h=window.location,i=h.protocol+"//"+h.hostname+h.pathname+h.search;i=a.setHash(i,a.merge({viewpath:encodeURIComponent(b)},c)),a.UA.android&&a.UA.android<4.3?window.location.href=i:(e.doHashChange(b,c),d.replaceState(g,"",i))},doHashChange:function(b,c){var d=a.setHash(a.merge({stamp:a.now(),viewpath:encodeURIComponent(b)},c)),e=d.match(/#.*$/i)[0];window.location.hash=e},bindEvent:function(){var b=this,c=a.UA.mobile?"click":"click";if(a.UA.android&&a.UA.android<4.3){var e=a.getHash().viewpath?a.getHash().viewpath:b.get("viewpath");b.MS.AndroidHis[e]=1}b.slide.con.delegate(c,b.get("tapTrigger"),function(c){var d=a.one(c.currentTarget);if(!a.isUndefined(d.attr("target"))&&""!==d.attr("target")||/^javascript:/i.test(d.attr("href")))return"top"==d.attr("target")&&(window.location.href=d.attr("href"),c.preventDefault()),!0;b.__clickEvent=!0;var e=d.attr("href"),f=d.attr("data-param"),g=d.attr("dir");return""===e?!0:(c.preventDefault(),"back"===g?b.back(e,f):"forward"===g?b.forward(e,f):b.setRouteHash(e,f),void 0)}),a.Event.on(window,"hashchange",function(){var c=b.get("signet"),e=decodeURIComponent(a.getHash().viewpath);(void 0===e||"undefined"===e)&&(e=c.lastviewpath),b.set("viewpath",e);var f=!1;if(f=b.__clickEvent&&b.__clickEvent===!0?!0:!1,delete b.__clickEvent,!a.isUndefined(e)){{b.formatUrlTail(e,a.getHash())}a.UA.android&&a.UA.android<4.3?b._androidHistoryMan(f):a.isUndefined(d.state)||a.isUndefined(d.state.level)?(b._go(e,"none"),b.recordSignet(0,e)):0===b.get("signet").forward&&d.state.forward>0?(b.next(e),b.recordSignet(1,e)):d.state.level>c.level?b.get("signet").forward>0&&d.state.forward<0?(b.prev(e),b.recordSignet(1,e,-1)):(b.next(e),b.recordSignet(1,e)):b.get("signet").forward>0&&d.state.forward<0?(b.prev(),b.recordSignet(-1,e,d.state.forward)):b.get("signet").forward<0&&d.state.forward>0?(b.next(e,function(){b.callDestroy(),b.slide.remove(b.slide.length-2)}),b.recordSignet(-1,e,d.state.forward)):(b.prev(function(){b.recallPosition()}),b.recordSignet(-1,e,d.state.forward))}})},recordSignet:function(b,c,d){var e=this;a.isUndefined(b)&&(b=0,c=a.getHash().viewpath,d=1),a.isUndefined(c)&&(c=a.getHash().viewpath,d=1),a.isUndefined(d)&&(d=1);var c=decodeURIComponent(c),f=e.get("signet").level,g=e.formatUrlTail(c,a.getHash()),h={level:f+b,viewpath:c,hisurl:g,forward:d,lastviewpath:e.get("signet").viewpath,scrollTop:a.DOM.scrollTop()};return e.set("signet",h),h},destroy:function(){},_go:function(b,c,d){var e=this;return e.isMultiplePage()&&e.callTeardown(e.get("signet").viewpath)===!1?(e.rollback(),this):(a.isUndefined(c)&&(c="next",d=function(){}),a.isFunction(c)&&(d=c,c="next"),a.isUndefined(d)&&(d=function(){}),e.loadData(b,c,d),void 0)},postback:function(b){var c=this;c.__post=b.data,a.isString(b.path)?c.back(b.path,b.data,b.callback):c.back(b.data,b.callback)},postforward:function(b){var c=this;c.__post=b.data,a.isString(b.path)?c.forward(b.path,b.data,b.callback):c.forward(b.data,b.callback)},back:function(b,c,e){var f=this;if(a.isUndefined(b)&&(b=void 0,c={},e=function(){}),a.isUndefined(c)&&(c={},e=function(){}),a.isFunction(c)&&(e=c,c={}),a.isObject(b)&&(c=b,e=function(){},b=void 0),a.isObject(c)&&a.isUndefined(e)&&(e=function(){}),a.isString(c)&&(c=a.unparam(c)),a.isString(b)&&(b=encodeURIComponent(b)),f.set("param",a.merge(c,{from:f.get("signet").viewpath})),a.isString(b)){f.prev.apply(f,[b,c,e]);var g=f.recordSignet(1,b,-1);d.pushState(g,"",a.setHash(g.hisurl,c))}else d.back();return f.set("viewpath",decodeURIComponent(a.getHash().viewpath)),this},forward:function(b,c,e){var f=this;a.isUndefined(c)&&(c={},e=function(){}),a.isFunction(c)&&(e=c,c={}),a.isObject(c)&&a.isUndefined(e)&&(e=function(){}),a.isString(c)&&(c=a.unparam(c)),f.set("param",a.merge(c,{from:f.get("signet").viewpath})),b=encodeURIComponent(b),f.next.apply(f,[b,c,e]);var g=f.recordSignet(1,b);return d.pushState(g,"",a.setHash(g.hisurl,c)),f.set("viewpath",decodeURIComponent(a.getHash().viewpath)),f},_androidHistoryMan:function(b,c){var d=this;if(a.isUndefined(c)&&(c=d.get("viewpath")),!b&&c in d.MS.AndroidHis){d.prev(c,function(){d.recallPosition()}),d.recordSignet(1,c,-1);for(var e in d.MS.AndroidHis)1==d.MS.AndroidHis[e]&&delete d.MS.AndroidHis[e]}else d.next(c),d.recordSignet(1,c);for(var f in d.MS.AndroidHis)d.MS.AndroidHis[f]=null;d.MS.AndroidHis[c]=1},next:function(b,c){var d=this;if(a.isFunction(b)&&(c=b,b=void 0),a.isUndefined(c)&&(c=function(){}),a.isUndefined(b)){if(d.isMultiplePage()&&d.callTeardown(d.get("signet").viewpath)===!1)return d.rollback(),this;d.slide.removeHeightTimmer(),d.get("animWrapperAutoHeightSetting")&&window.scrollTo(0,0),d.slide.next(function(){d.get("containerHeighTimmer")&&d.slide.addHeightTimmer(),a.isFunction(c)&&c.call(d.slide,d.slide),d.get("forceReload")&&d.slide.remove(d.slide.length-2),alert(d.slide.animwrap.height()),d.callReady()}),d.set("page",d.slide.getCurrentPannel()),d.callStartup()}else d._go(b,"next",c)},prev:function(b,c){var d=this;if(a.isFunction(b)&&(c=b,b=void 0),a.isUndefined(c)&&(c=function(){}),!a.isString(b)&&d.get("forceReload")&&(b=d.get("viewpath")),a.isUndefined(b)){if(d.isMultiplePage()&&d.callTeardown(d.get("signet").viewpath)===!1)return d.rollback(),this;d.slide.removeHeightTimmer(),d.slide.previous(function(){var b=this;d.get("containerHeighTimmer")&&d.slide.addHeightTimmer(),d.callDestroy(),b.removeLast(),a.isFunction(c)&&c.call(d.slide,d.slide),d.callReady()}),d.set("page",d.slide.getCurrentPannel()),d.callStartup()}else d._go(b,"prev",c)},getAjaxPath:function(a){var b=this;return b.get("basepath")+a},loadData:function(b,c,d){var e=this;a.isUndefined(c)&&(c="next",d=function(){}),a.isFunction(c)&&(d=c,c="next"),a.isUndefined(d)&&(d=function(){});var f=function(b){e.closeLoading();var f=e.get("page"),g=a.Node('<div class="MS-pal">'+b+"</div>");switch(e.set("page",g),c){case"prev":e.slide.add(g,e.slide.currentTab),e.slide.relocateCurrentTab(e.slide.currentTab+1),setTimeout(function(){e.MS.cleanup(),a.execScript(b),e.initPageStorage(),e.callStartup(),e.slide.removeHeightTimmer(),e.slide.previous(function(){var b=this;e.get("containerHeighTimmer")&&e.slide.addHeightTimmer(),e.callDestroy(),a.isFunction(d)&&d.call(e.slide,e.slide),b.removeLast(),e.slide.animwrap.css({"-webkit-transform":"none"}),setTimeout(function(){e.callReady()},0)})},150);break;case"next":console.info("next"),e._fixScrollTopBefore(g,f),e.slide.add(g),setTimeout(function(){e.MS.cleanup(),a.execScript(b),e.initPageStorage(),e.callStartup(),e.slide.removeHeightTimmer(),e.get("animWrapperAutoHeightSetting")&&window.scrollTo(0,0),e.slide.next(function(){e.callDestroy(),a.isFunction(d)&&d.call(e.slide,e.slide),e.get("forceReload")&&e.slide.remove(e.slide.length-2),e.get("containerHeighTimmer")&&e.slide.addHeightTimmer(),e._fixScrollTopAfter(g,f,function(){setTimeout(function(){e.callReady()},0)}),e.slide.animwrap.css({"-webkit-transform":"none"})})},150);break;case"none":e.slide.add(g,e.slide.currentTab),e.callDestroy(),e.MS.cleanup(),a.execScript(b),e.initPageStorage(),d.call(e.slide,e.slide),e.slide.removeLast(),e.slide.animwrap.css({"-webkit-transform":"none"}),e.callStartup(),e.callReady()}},g=function(a){a=a.replace(/\r/gim,"$123").replace(/\n/g,"$456").replace(/.*<!--kdk{{-->/i,"").replace(/<!--kdk}}-->.*$/i,""),a=a.replace(/\$123/g,"\r").replace(/\$456/g,"\n"),e.MS.PAGECACHE[b]=a,f(a)},h=e.getAjaxPath(decodeURIComponent(b));e.loading(),h.match(/http:/gi)&&h.match(/http:/gi).length>1&&(h=h.replace(/^http:.+(http:.+)$/,"$1")),e.__post?(a.io.post(h,e.__post,g),delete e.__post):e.get("pageCache")&&!a.isUndefined(e.MS.PAGECACHE[b])?f(e.MS.PAGECACHE[b]):new a.IO({url:h,success:g,error:function(){e.get("errorAlert")&&alert("\u9875\u9762\u8bf7\u6c42\u51fa\u9519\uff01"),e.closeLoading()}})},_fixScrollTopBefore:function(b){var c=this;if(!c.get("animWrapperAutoHeightSetting")){var d=a.DOM.scrollTop();b.css({"margin-top":d+"px"})}},_fixScrollTopAfter:function(b,c,d){var e=this;if(e.get("animWrapperAutoHeightSetting"))return d(),void 0;var f=(b.parent(),function(){b.css({position:"absolute",top:0}).css({"margin-top":0,position:"relative","-webkit-backface-visibility":!1,left:0}),e.get("containerHeighTimmer")&&e.slide.addHeightTimmer(),e.get("hideURIbar")&&e.slide.hideURIbar(),d()});e.slide.animwrap.css({"-webkit-transform":"none"}),b.css({"margin-top":0,position:"fixed",top:0,"-webkit-backface-visibility":!1,left:e.slide.con.offset().left+"px"}),a.UA.opera&&a.UA.opera>0?(window.scrollTo(0,0),f()):a.Anim(window,{scrollTop:0},.1,"easeNone",function(){f()}).run()},initPlaceholder:function(){var a=this;!a.slide}}),c},{requires:["./slide","io","base"]});