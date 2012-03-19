/**
 * Juhuasuan JS
 */
if (typeof Ju === 'undefined' || !Ju) {
    Ju = function(o) {
        var S = Ju;

        if (!(this instanceof S)) {
            return new S(o);
        } else {
            return S._setup(o);
        }
    };
}
(function(J) {

    var Y = YAHOO.util,
    D = Y.Dom,
    E = Y.Event,
    L = Y.Lang;
    
    L.augmentObject(J, {
        /**
         * 模块
         */
        mods : {},
        
        /**
         * 添加模块
         * @param name { String } 模块名称
         * @param fn { Function } 模块函数
         * @param details { Object } 此对象目前主要包含需要用到的模块名以及需要执行的模块名，例：{'require':'suggest','use':'fav'}
         */
        add: function(name, fn, details) {

            this.mods[name] = {
                name: name,
                fn: fn,
                details: details || {}
            };

            return this; // chain support
        },
        /**
         * setup to use
         */
        _setup: function(o) {
            o.debug = ('debug' in o) ? o.debug : false;
            this.config = o;
            return this;
        },

        /**
         * 函数执行，应用加载，可用以按需加载
         * @param arguments[0] { Function } 要执行的函数
         * @param arguments[1] { String } 需要加载的应用模块
         */
        use: function() {
            //执行
            var _this = this,
                a = arguments,
                callback = a[0],
                appname = a[1],
                complete = function() {
                    _this._loadModules();
                    if(callback) callback(_this);
                };

            //如果未加载，则先加载应用再执行函数
            if(appname && !_this[app][appname]) {
                Get.script(_this.base + appname + '.js',{
                    onEnd:function() {
                        complete(); 
                    }
                });
            } else {
                complete(); 
            }
        },

        /**
         * 已加载的模块
         */
        _attached: {},

        /**
         * 加载注册的所有模块
         */
        _loadModules: function() {
            var mods = this.mods,
                attached = this._attached,
                name, m;

            for (name in mods) {
                m = mods[name];

                if (!attached[name] && m) {
                    attached[name] = m;

                    if (m.fn) {
                        m.fn(this);
                    }
                }

                // 注意：m.details 暂时没用到，仅是预留的扩展接口
            }
        },
        
        /**
         * 创建命名空间
         * @param arguments { String } 需要添加的命名空间名字
         */
        namespace: function() {
            var a = arguments, o = null, i, j, d;
            for (i = 0; i < a.length; i = i + 1) {
                d = ('' + a[i]).split('.');
                o = this;
                for (j = (d[0] == 'Ju') ? 1 : 0; j < d.length; j = j + 1) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]];
                }
            }
            return o;
        }
    });
    
    J.namespace('sys'/*公用函数*/, 'app'/*应用*/,'widget'/*饰件，扩展*/);

})(Ju);

Ju.add("sys.Helper", function(J) {
	var lt8 = KISSY.UA.ie ? KISSY.UA.ie < 8 : false;
	KISSY.add({
	    editor:{
	        fullpath:"http://a.tbcdn.cn/s/kissy/1.1.6/editor/editor-pkg-min.js",
	        cssfullpath:'http://a.tbcdn.cn/s/kissy/1.1.6/editor/theme/cool/editor-pkg-min-datauri.css'
	    }
	});	
	function initLt8Style(){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'http://a.tbcdn.cn/s/kissy/1.1.6/editor/theme/cool/editor-pkg-min.css';
		document.getElementsByTagName('head')[0].appendChild(link);
		initLt8Style= function(){};
	}
    J.namespace("sys.Helper");

    /**
     * Shortcuts
     */
    var K = KISSY,
        Dom = K.DOM,
        Event = K.Event,
        doc = document;

    /**
     * 辅助工具库
     */
    var Helper = Ju.sys.Helper;
    
    /**
     * 辅助工具库的配置参数
     */
    var config = {
        apiLightww  : "http://amos.im.alisoft.com/mullidstatus.aw",
        apiToken:"comment:/json/token.htm"
    };
    
    /**
     * 注册的 API 服务器地址，格式为 服务器名称 : 地址，例如：
     * portal : "http://wang.alisoft.com/space"
     */
    var apiServers = {
        i       : "http://i.ju.{serverHost}",
        ju      : "http://ju.{serverHost}",
        portal  : "http://jianghu.{serverHost}",
        assets  : "http://{cdnHost}/apps/snsju",
        app     : "http://app.jianghu.{serverHost}",
        comment : "http://comment.jianghu.{serverHost}",
        poke    : "http://poke.jianghu.{serverHost}",
        share   : "http://share.jianghu.{serverHost}",
        blog   : "http://blog.jianghu.{serverHost}",
        checkCode: "http://comment.jianghu.{serverHost}/json/get_comment_check_code.htm",
        feedCheckCode: "http://jianghu.{serverHost}/json/get_feed_comment_check_code.htm"
    };
    
    var pickDocumentDomain = function(depth, host) {
        host = host || location.hostname;
        depth = depth || 2;
        var parts = host.split("."), ret = [];
        while (parts.length > 0 && depth > 0) {
            ret.unshift(parts.pop());
            depth--;
        }

        return ret.join(".");
    };

    // 自动判断当前域名的 host
    var hostname = location.hostname, serverHost = "taobao.com", cdnHost = "a.tbcdn.cn";
    if (pickDocumentDomain(3) === "daily.taobao.net") {
        serverHost = "daily.taobao.net";
        cdnHost = "assets.daily.taobao.net";
    } else if (pickDocumentDomain(2) === "taobao.com") {
        serverHost = "taobao.com";
        cdnHost = "a.tbcdn.cn";
    }
    for (var p in apiServers) {
        if (typeof apiServers[p] === "string") {
            apiServers[p] = TB.common.formatMessage(apiServers[p], {
                serverHost : serverHost,
                cdnHost    : cdnHost
            });
        }
    }
    apiServers.serverHost=serverHost;
    apiServers.cdnHost=cdnHost;
    
    /**
     * 设置 tb token
     */
    setToken = function(token) {
        var tokenStr = token || "",
        tokenArr = tokenStr.split("="),
        tokenDiv = Dom.get('#Jianghu_tb_token'),
        input;
        if(!tokenDiv) {
            tokenDiv = doc.createElement('div');
            tokenDiv.id = 'Jianghu_tb_token';
            tokenDiv.innerHTML = '<input type="hidden" />';
            doc.body.appendChild(tokenDiv);
        }
        if (tokenStr && tokenArr.length === 2) {
            input = getFirstChild(tokenDiv);
            input.name = tokenArr[0];
            input.value = tokenArr[1];
        }


                
        /* added by liuling @110610 */
        
        function getFirstChild(elem) {

          var cnt;
          
          if (elem && elem.firstChild) {
          
            cnt = elem.firstChild;
          }   

          while(cnt && cnt.nextSibling) {
           
              var tmp = cnt.nextSibling;
            
              if (isElementNode(tmp)) {
                 return tmp;
              }

              cnt = cnt.nextSibling;
          }
          
          function isElementNode(elem) {
            return elem.nodeType == 1 ? true : false;
          }
          
        }   
    }


    K.mix(Helper, {
        test : function(){
            alert(1);
        },
        
        /**
         * 检查用户是否登录
         * @return  {Boolean}       true 表示用户已经登录
         * @modified etai 2011.11.25 登录不同步临时解决：后台输出用户是否登录的标记，前端只根据标记判断；
         */
        checkLogin: function() {
            
            //根据页面标记判断登录
            var isLoginInp = Dom.get('#isLoginForJu');
            if(isLoginInp){ 
                return ((isLoginInp.value == "1" || isLoginInp.value == "true") ? true : false);
            }
            
            var getCookie = function(name) {
                var m = doc.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
                return (m && m[1]) ? decodeURIComponent(m[1]) : '';
            };

            //对本地做判断
            if (location.href.indexOf('taobao') == -1) {
                return true;
            }

            // 用户昵称，Session内有效
            var nick = getCookie('_nk_');

            // 用户是否已经登录。注意：必须同时判断nick值，因为 _nk_ 和 _l_g_ 有时不同步
            var isLogin = (getCookie('_l_g_') && nick)/*长登录*/;

            return !!isLogin;
        },
        
        /**
         * 检查登录状态，如果没有登录则显示登录框
         * @param   {Object}    cfg                 参数
         * @param   {Boolean}   cfg.autoCallback    是否在登录完成后自动进行回调
         * @return  {Boolean}       true 表示用户已经登录
         */
        checkAndShowLogin: function(cfg) {
            var that = this;
            if (that.checkLogin()) {
                return true;
            }

            cfg = cfg || {};

            var callback = null;

            //执行回调函数 by shiran 100401
            if (cfg.callback) {
                callback = cfg.callback;
            } else if (cfg.autoCallback && arguments.callee.caller) {
                try {
                    var caller = arguments.callee.caller,

                    args = caller.arguments || [],
                    scope = cfg.callbackScope || {},
                    newArgs = [],
                    obj;

                    for (var i = 0; i < args.length; ++i) {
                        obj = args[i];
                        if (K.isObject(obj) && obj.srcElement) {
                            obj = K.merge({}, obj);
                        }
                        newArgs.push(obj);
                    }

                    callback = caller ? function() {
                        try {
                            caller && caller.apply(scope, newArgs);
                        } catch (e) {
                        //alert(e.message);
                        }
                    } : null;
                } catch (e) {
                    callback = null;
                }
            }

            // 页面载入了 UserCheck 时使用 Ajax 进行用户登录，否则直接跳转到登录页
            if (window.UserCheck && window.UserCheck.init) {

                try {
                    document.domain = TB.bom.pickDocumentDomain(2);
                } catch(e) {};

                window.UserCheck.init({
                    width   : 410,
                    height  : 270,
                    isLogin: true,
                    callback: function() {
                        callback && callback();
                        //that.getToken();
                    }
                });
            } else {
                location.href = that.buildURI(that.getApiURI('portal:/admin/login.htm'),
                    'redirect_url=' + encodeURIComponent(location.href));
            }

            return false;
        },
        
        /**
         * 获取 API 的 URI
         * @param   {String}    api         API 地址
         * @param   {Boolean}   useCache    是否使用缓存
         * @param   {Boolean}   ignoreToken 是否不加 Token
         * @return  {String}                获取到的实际 API 地址
         */
        getApiURI : function(api, useCache, ignoreToken) {

            if (!(api.substr(0, 7) === "http://" || api.substr(0, 8) === "https://") &&
                api.indexOf(":") > 0) {

                var semPos = api.indexOf(":");
                var apiServer = apiServers[api.substr(0, api.indexOf(":"))] || "";

                if (apiServer !== "") {
                    api = apiServer + api.substr(semPos + 1);
                }
            }

            if (!useCache) {
                api = Helper.addStamp(api);
            }

            if (!ignoreToken) {
                var elToken = Dom.get("#Jianghu_tb_token");
                if (elToken) {
                    var tokens = elToken.getElementsByTagName("INPUT");
                    for(var i=0;i<tokens.length;i++){
                        api = Helper.buildURI(api, [tokens[i].name, encodeURIComponent(tokens[i].value)].join("="));
                    }
                }
            }
            var newApi=TB.common.formatMessage(api, {
                serverHost : serverHost,
                cdnHost: cdnHost
            });
            return newApi;
        },

        getServerURI:function(serverName){
            return apiServers[serverName];
        },
        getDomain:function(){
            return serverHost;
        },
        /**
         * 给 URL 添加时间戳
         * @param   {String}    url     要添加时间戳的 URL
         * @return  {String}            添加了时间戳的 URL
         */
        addStamp : function(url) {
            return Helper.buildURI(url, "t=" + new Date().getTime());
        },
        /**
         * 拼接 URI，自动判断第一部分是否有 ?，如果有则以 & 连接，
         * 否则以 & 连接第一部分和第二部分，其他部分均以 & 连接
         * @param   {String}    uriPart     要拼接的 URI 片段
         * @return  {String}                拼接的 URI
         */
        buildURI : function() {
            var args = Array.prototype.slice.call(arguments);
            if (args.length < 2) {
                return args[0] || "";
            }

            var uri = args.shift();
            uri += uri.indexOf("?") > 0 ? "&" : "?";

            return uri + args.join("&").replace(/&+/g, "&");
        },
        /**
         * 设置token
         */
        setToken:function (token,callback){
            setToken(token);
            callback();
        },
        
        /**
         * 获取token
         */
        getToken:function(callback) {
            this.setToken=function(token){
                setToken(token);
                if(callback) callback();
            }
          
            K.getScript(Helper.buildURI(Helper.getApiURI(config.apiToken),"callback=Ju.sys.Helper.setToken"),{
                charset : "gbk"
            });
            
        },
        /**
         * 截断字符
         * @param   {String}    str     要截断的字符串
         * @param   {Number}    len     要截断的长度
         * @return  {String}            截断后的字符串
         */
        cutStr : function(str, len) {
            if (len && len > 0) {
                var copyStr = str.replace(/[^\x00-\xFF]/g, "\xFF\xFF");
                if (copyStr.length > len) {
                    str = str.substr(0, len - (copyStr.substr(0, len).match(/[\xFF]/g) || []).length/2);
                    str += "...";
                }
            }

            return str;
        },
        /**
         * 格式化字符串
         * from: TB.common.formatMessage
         * eg:
         *  TB.common.formatMessage('{0}天有{1}个小时', [1, 24]) 
         *  or
         *  TB.common.formatMessage('{day}天有{hour}个小时', {day:1, hour:24}}
         * @param {Object} msg
         * @param {Object} values
         */
        formatMessage: function(msg, values, filter) {
            var pattern = /\{([\w-]+)?\}/g;
            return function(msg, values, filter) {
                return msg.replace(pattern, function(match, key) {
                    return filter?filter(values[key], key):values[key];
                }); 
            }
        }(),

        /**
         * 模拟点击事件
         * 
         */
        createClick : function(el){
            el = Dom.get(el);
            if(!el) {
                return;
            }
            if(document.createEvent) { //非IE
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                el.dispatchEvent(evt);
            }
            else{ //IE
                el.click();
            }
            
        },
        /**
         * 显示提示框
         */
        messageBox : function(type, content){
            
            var width = (type == 1 ? 394 : 570);

            var popup = new Ju.sys.Popup({
                    width: width,
                    content: content,
                    title: '温馨提示:',
                    type: '',
                    buttons: [],
                    autoShow: false,
                    useAnim: true
                });
            popup.show();
            return popup;
        },
        /**
         * 加入收藏
         */
        addFavorite : function(url, name){
            
            if (document.all) {
                window.external.addFavorite(url, name);
            }
            else 
                if (window.sidebar) {
                    window.sidebar.addPanel(name, url, "");
                }
                else {
                    return;
                }
        },
        /**
         * 取得get参数
         * @param {Object} TheName
         */
        getQuery: function(queryName){
            var queryStr =  location.search.substring(1,location.search.length),
                queryArr = queryStr.split("&");
            for (var i = 0; i < queryArr.length; i++) {
                var get = queryArr[i].split("=");
                if (get[0] == queryName) {
                    var queryValue = get[1];
                    break;
                }
            }
            return queryValue;
        },
        /**
         * 取得radio值
         */
        getRadioValue: function(RadioName, container){

            container = container ? container : document;
            var obj;
            
            obj = Dom.filter('input', function(elem) {
               return (Dom.contains(container, elem)) && (Dom.attr(elem, 'name') == RadioName);
            })
            
            //obj = document.getElementsByName(RadioName);
            if(obj.length > 0){
                var i;
                for(i=0;i<obj.length;i++){
                    if(obj[i].checked){
                        return obj[i].value;           
                    }
                }
            }
            return null;
        },
        /**
         * 时间格式化
         */
        timeFormat:function(time, format){
            var o =
            {
                "M+" : time.getMonth()+1, //month
                "d+" : time.getDate(),    //day
                "h+" : time.getHours(),   //hour
                "m+" : time.getMinutes(), //minute
                "s+" : time.getSeconds(), //second
                "q+" : Math.floor((time.getMonth()+3)/3),  //quarter
                "S" : time.getMilliseconds() //millisecond
            }
            if(/(y+)/.test(format))
            format=format.replace(RegExp.$1,(time.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
            if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        },
        /**
         * 小数除法
         */
        decimalDiv: function(arg1,arg2){
            var t1=0,t2=0,r1,r2;
            try {
                t1=arg1.toString().split(".")[1].length
            } catch(e) {
            }
            try {
                t2=arg2.toString().split(".")[1].length
            } catch(e) {
            }
            with(Math) {
                r1=Number(arg1.toString().replace(".",""))
                r2=Number(arg2.toString().replace(".",""))
                return (r1/r2)*pow(10,t2-t1);
            }
        },
        /**
         * fire Event
         */
        fireEvent: function(element, event, callback){
    		var t ;
    		if (document.createEventObject){
    		// dispatch for IE
    			var evt = document.createEventObject();
    			t = element.fireEvent('on' + event,evt);
    			K.isFunction(callback) && callback.call(element);
    			return t;
    		}
    		else{
    			// dispatch for firefox + others
    			var evt = document.createEvent("HTMLEvents");
    			evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    			t = !element.dispatchEvent(evt);
    			K.isFunction(callback) && callback.call(element);
    			return t;
    		}
    	},
    	/*
		 * 初始化字数显示插件
		 * http://docs.kissyui.com/kissy-editor/demo/word-count.js
		 */
		initEditorWordcountPlugin:function(){
			var S = KISSY;
		    S.namespace('EditorPlugins.Wordcount');
		
			//参数：textarea的ID，初始化编辑器源代码数，最大限制数，编辑器editor对象
			S.EditorPlugins.Wordcount.bind = function(textarea, max, editor) {
			    //在当前text编辑器后面加入操作节点
			    var size = 0;
			    S.DOM.insertAfter(S.DOM.create('<div class="J_WS">源码:已输入 <em class="J_WordSize">' + size + '</em>/最多输入 <em class="J_WsMax">' + max + '</em> <span class="J_WsTips"></span></div>'), S.one(textarea).parent('.ke-editor-wrap'));
			    var wordsizenode = S.one(textarea).parent('.ke-editor-wrap').next('.J_WS').children('.J_WordSize');
			    var tips = "请减少源码数量，否则无法发布成功";
			    S.DOM.css('.J_WordSize', {'font-weight':'bold','color':'#0092D2'});
			    S.DOM.css('.J_WsMax', 'font-weight', 'bold');
			    S.DOM.css('.J_WS', {'font-size':'13px','padding-left':'5px'});
			    S.DOM.css('.J_WsTips', 'color', 'red');
			    var _change = function(node, s) {
			        if (s <= max) {
			            node.text(s).css('color', '#0092D2');
			            node.siblings('.J_WsTips').text('');
			        }
			        else {
			            node.text(s).css('color', 'red');
			            node.siblings('.J_WsTips').text(tips);
			        }
			    }, timer;
			    function bufferChange(){
			    	timer && clearTimeout(timer);
                    timer = setTimeout(function() {
                        _change(wordsizenode, editor.getData().length);
                    }, 500);
			    }
			     //给编辑器绑定ctrl+enter触发发表start
			    editor.ready(function(){KISSY.Event.on([editor.document,document],"keydown",function(ev){
				    	// etao在1.1.6同样的配置下没有问题  http://8.etao.com/ceshi/bar-52042-0-0-1-list.htm?bar_name=%B2%E2%CA%D4&q=%B2%E2%CA%D4  
				    	//TODO hack:但是在此却无法在keydown的情况下 触发save事件 所以在此进行HACK
				    	bufferChange()
				})});
				//给编辑器绑定ctrl+enter触发发表end
			    //绑定save事件
			    editor.ready(function() {
			        _change(wordsizenode, editor.getData().length);
			        editor.on('save restore', function(ev) {
			
			                if (ev.buffer) {
			                    bufferChange()
			                } else {
			                    _change(wordsizenode, editor.getData().length);
			                }
			            });
			        });
			    };
		},
		initEditor:function(selector,callback,opt){
			var nodes = KISSY.all(selector),
				args = [],
				cfg = {
			            attachForm:true,
			            baseZIndex:10000,
			            pluginConfig: {
			                "flash":{
			                    defaultWidth:"300",
			                    defaultHeight:"300"
			                },
			                "resize":{
			                    direction:["y"]
			                }
			            }
			            ,customStyle:'body {word-wrap: break-word; word-break: break-all}'
		        };
			opt = opt || {};
			nodes && KISSY.use("editor",function(S,Editor){
				lt8 && initLt8Style();
				(KISSY.EditorPlugins && KISSY.EditorPlugins.Wordcount) || Ju.sys.Helper.initEditorWordcountPlugin();
			    nodes.each(function(n,i){
				    args[i] = S.Editor(n,S.clone(cfg)).use(
				    		"sourcearea,separator," +
				    		"font,separator,color,separator," +
				    		"image,smiley,link,separator," +
				    		"list,indent,justify,preview,resize" 
	                );
	                KISSY.EditorPlugins.Wordcount.bind(n,opt.maxLen||25000,args[i]);
                });
                callback && callback(args);
			});
		}
        
    });
    
});// vim: set et sw=4 ts=4 sts=4 fdm=marker ff=unix fenc=gbk:
/**
 * SNS 弹出模态框
 *
 * @author mingcheng@taobao.com
 * @date   2009-08-10
 */
Ju.add('sys.Popup', function(S){
    var Event = YAHOO.util.Event, Dom = YAHOO.util.Dom, Lang = YAHOO.lang;
    
    var runCustomEvent = function(func, scope){
        var args = Array.prototype.slice.call(arguments);
        if (typeof func == 'function') {
            return func.apply(scope || this, args.slice(2));
        }
    };
    
    var TMPL = '<div class="ju-popup-mask"></div>' +
    '<div class="ju-popup">' +
    '<div class="hd">' +
    '<h3>{title}</h3>' +
    '</div>' +
    '<div class="bd">{content}</div>' +
    '<div class="ft">' +
    '<div class="buttons"></div>' +
    '<a href="#" title="关闭此窗口" class="btn-close">&times;</a>' +
    '</div>' +
    '</div>';
    
    var defConfig = {
        title: '', // 模态框标题
        type: '', // 模块框额外样式
        content: '', // 模态框文案，支持 HTML
        useAnim: false, // 是否动画显示
        autoShow: true, // 是否自动显示
        wrapId : '',
        width: 350, // 对话框宽度
        hideMask: false, // 是否显示遮层
        focus: 0, // 默认焦点对焦位置
        adaptive: false, // 过高是否显示滚动条
        hideHd: false, // 是否隐藏标头
        hideFt: false, // 是否隐藏底栏
        keepShow: false, //是否禁止关闭
        buttons: [{
            style: "",
            text: "确定",
            func: function(){
                this.hide();
            }
        }]
    };
    
    
    var Popup = function(config, context){
        this.context = context || document.body;
        this.config = Lang.merge(defConfig, config || {});
        this.init();
    };
    
    Popup.prototype = {
        /**
         * 初始化
         */
        init: function(){
            var wrapper = document.createElement('div'), config = this.config;
            
            if(config.wrapId !== "") {
                wrapper.id = config.wrapId;
            }
            
            Dom.setStyle(wrapper, 'display', 'none');
            
            if (YAHOO.lang.isString(config.content)) {
                wrapper.innerHTML = TB.common.formatMessage(TMPL, config);
            }
            else {
                wrapper.innerHTML = TB.common.formatMessage(TMPL, Lang.merge(config, {
                    content: ''
                }));
                Dom.getElementsByClassName('bd', 'div', wrapper)[0].appendChild(config.content);
            }
            
            if (config.hideMask) {
                Dom.addClass(wrapper, 'ju-popup-hidemask');
            }
            Dom.addClass(wrapper, 'ju-popup-wrapper');
            
            // 对话框
            var popup = Dom.getElementsByClassName('ju-popup', 'div', wrapper)[0];
            if (config.width) {
                Dom.setStyle(popup, 'width', config.width + 'px');
            }
            
            if (config.type) {
                Dom.addClass(popup, config.type);
            }
            
            // 添加按钮
            var buttonContent = Dom.getElementsByClassName('buttons', 'div', popup)[0], i = 0, buttons = config.buttons, len = buttons.length;
            if (len) {
                for (; i < len; i++) {
                    var btn = document.createElement('button');
                    if(buttons[i].style) {
                        Dom.addClass(btn, buttons[i].style);
                    }
                    btn.innerHTML = "<span>" + buttons[i].text + "</span>";
                    Event.on(btn, 'click', buttons[i].func, this, true); // 绑定对应的回调
                    buttonContent.appendChild(btn);
                }
            }
            else {
                Dom.setStyle(buttonContent, 'display', 'none');
            }
            
            var closeButton = Dom.getElementsByClassName('btn-close', 'a', popup)[0];
            if (closeButton) {
                if(config.keepShow) {
                    Dom.setStyle(closeButton, 'display', 'none');
                }
                Event.on(closeButton, 'click', function(e){
                    Event.stopEvent(e);
                    this.hide();
                }, this, true);
            }
            if (!config.keepShow) {
                // 绑定 ESC 键，@TODO Fix Webkit
                Event.on(document, 'keypress', function(e){
                    if (27 == Event.getCharCode(e)) 
                        this.hide();
                }, this, true);
            }
            
            // 针对 IE6 的 Hack
            if (6 == YAHOO.env.ua.ie || config.iframeShim) {
                var de = document.documentElement;
                //Fix added by shiran 解决ie6下有滚动条时跳动问题 10.05.24
                var _offset = de.scrollTop || document.body.scrollTop;
                //添加窗口宽度过小时，弹出框需要左右移动的处理
                var _offsetLeft = de.scrollLeft || document.body.scrollLeft;
                
                Dom.setStyle(wrapper, 'overflow', 'hidden');
                Dom.setStyle(wrapper, 'position', 'absolute');
                Dom.setStyle(wrapper, 'z-index', '999999');
                Dom.setStyle(wrapper, 'top', _offset + 'px');//Fix changed by shiran 解决ie6下有滚动条时跳动问题 10.05.24
                Dom.setStyle(wrapper, 'left', _offsetLeft + 'px');
                
                var iframe = document.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('scrolling', 'no');
                iframe.src = "about:blank";
                iframe.style.cssText = 'filter:alpha(opacity=0); position:absolute; top: 0px; left: 0px; z-index: -1;';
                Dom.setStyle(iframe, 'width', (de.clientWidth || document.body.clientWidth) - 20 + 'px');
                Dom.setStyle(iframe, 'height', (de.clientHeight || document.body.clientHeight) + 'px');
                Dom.setStyle(wrapper, 'height', (de.clientHeight || document.body.clientHeight) + 'px');
                wrapper.appendChild(iframe);
                
                var innerMask = Dom.getElementsByClassName('ju-popup-mask', 'div', wrapper)[0], resizeTimer;
                var resizePopup = function(e){
                    var resize = function(){
                        if (innerMask) {
                            Dom.setStyle(innerMask, 'width', Dom.getViewportWidth() + 'px');
                            Dom.setStyle(innerMask, 'height', Dom.getViewportHeight() + 'px');
                        }
                        
                        var offset = de.scrollTop || document.body.scrollTop;
                        var offsetLeft = de.scrollLeft || document.body.scrollLeft;
                        var totalHeight = de.scrollHeight || document.body.scrollHeight;
                        if (offset + (de.clientHeight || document.body.clientHeight) > totalHeight) {
                            return;
                        }
                        
                        Dom.setStyle(wrapper, 'top', offset + 'px');
                        Dom.setStyle(wrapper, 'left', offsetLeft + 'px');
                        Dom.setStyle(wrapper, 'zoom', '1.2');
                        Dom.setStyle(wrapper, 'zoom', '');
                    };
                    
                    if (resizeTimer) {
                        resizeTimer.cancel();
                    }
                    resizeTimer = YAHOO.lang.later(10, null, resize, null, false);
                };
                
                Event.on(window, 'scroll', resizePopup, this, true);
                Event.on(window, 'resize', resizePopup, this, true);
                
                // 重修修订 IE6 下滚动条的问题
                resizePopup();
            }
            
            this.context.appendChild(wrapper);
            
            this.wrapper = wrapper;
            this.popup = popup;
            
            
            //是否隐藏标头
            if (config.hideHd) {
                var popupHd = Dom.getElementsByClassName('hd', 'div', popup)[0];
                if (popupHd) {
                    Dom.setStyle(popupHd, 'display', 'none');
                    Dom.addClass(popup, 'no-hd');
                }
            }
            if(config.hideFt){
                var popupFt = Dom.getElementsByClassName('ft', 'div', popup)[0];
                if (popupFt) {
                    Dom.setStyle(popupFt, 'display', 'none');
                }
            }
            
            // 是否自动显示
            if (config.autoShow) 
                this.show();
        },
        
        /**
         * 自适应高度处理
         */
        adaptive: function(){
            //取得视口高度
            var clientHeight = Dom.getClientHeight(), 
                popupHeight = this.popup.offsetHeight, 
                maxHeight = clientHeight * 0.7; //popup最大高度
                
            if (popupHeight > maxHeight) {
                Dom.setStyle(this.popup, 'top', '10%');
//                var popBd = Dom.getElementsByClassName('bd', 'div', this.wrapper)[0];
//                Dom.setStyle(popBd, 'height', clientHeight * 0.8 + 'px');
//                Dom.setStyle(popBd, 'overflow-y', 'scroll');
//                Dom.setStyle(popBd, 'overflow-x', 'hidden');
            }
        },
        
        /**
         * 显示模态框
         */
        show: function(){
            var config = this.config, self = this;
            if (config.onShow) {
                runCustomEvent(config.onShow, this);
            }
            
            Dom.setStyle(this.wrapper, 'display', '');
            
            if (config.useAnim) {
                Dom.setStyle(this.popup, 'opacity', '0');
                this.anim = new YAHOO.util.Anim(this.popup, {
                    opacity: {
                        to: 1
                    }
                }, .5);
                this.anim.onComplete.subscribe(function(){
                    
                    //IE8滤镜导致A:hover失效
                    if(8 == YAHOO.env.ua.ie){

                        self.anim.setAttribute('filter', 'disabled');
                    }
                    
                });
                this.anim.animate();
            }
            
//            YAHOO.lang.later(20, this, function(){
//                try {
//                    (this.popup.getElementsByTagName('button')[config.focus]).focus();
//                } 
//                catch (e) {
//                };
//                            }, null, false);

            //是否判断高度
            if (config.adaptive) {
                this.adaptive();
            }

        },
        
        /**
         * 隐藏模态框
         */
        hide: function(){
            var config = this.config;
            if (config.useAnim && this.animate) 
                this.animate.stop();
            Dom.setStyle(this.wrapper, 'display', 'none');
            //怪异，就加了这个就解决了问题，点取消后，不能重点的问题，待研究 by shiran 10.04.12
            //此问题待处理！！！ 10.04.14
            //this.wrapper && Dom.addClass(this.wrapper,'hidden');
            if (config.onHide) {
                runCustomEvent(config.onHide, this);
            }
        },
        
        destroy: function(){
            
        }
    };
    
    // 耦合到 SNS 命名空间
    S.sys.Popup = Popup;
});
/**
 * 本地存储
 * @author etai
 */
Ju.add("sys.simpleStorage", function(J) {
var simpleStorage = function() {
    var oStorage,
        inited = false,
        EMPTY_FUNC = function() {},
        _setItem = EMPTY_FUNC,
        _getItem = EMPTY_FUNC,
        _removeItem = EMPTY_FUNC;

    return {
        init: function() {
            var doc = document,
                ie = doc.all,
                STR_UNDEFINED = 'undefined',
                IE_STORE_NAME = 'IEDataStore'; // IE6，7下，保存数据的xml文件名

            if (inited) {return;}

            if (typeof localStorage !== STR_UNDEFINED) {
                // for IE8, FF 3.6, Chrome 4.1+, Safari 4+, Opera 10.5
                oStorage = localStorage;
            } else if (typeof globalStorage !== STR_UNDEFINED) {
                // for FF unsupport localStorage
                oStorage = globalStorage[location.hostname];
            } else if (ie) { // IE6, 7，使用userData
                oStorage = doc.createElement('input');
                oStorage.type = 'hidden';
                doc.body.appendChild(oStorage);
                oStorage.addBehavior('#default#userData');
            }

            _setItem = function(key, value) {
                var func = EMPTY_FUNC;

                if ('setItem' in oStorage) {
                    func = function(key, value) {
                        oStorage.setItem(key, value);
                    };
                } else if (ie) {
                    func = function(key, value) {
                        /*
                         * 添加try...catch的原因是：某些用户的IE，可能将安全级别设置得过高，或当前站点被添加至"受限站点"中(会
                         * 禁用掉"安全"tab下的"持续使用用户数据"选项，从而导致userData无法使用，这里通过try...catch来避免此
                         * 情况下的JS报错，下同。
                         */
                        try {
                            oStorage.setAttribute(key, value);
                            oStorage.save(IE_STORE_NAME);                       
                        } catch(e){}
                    };
                }

                return func;
            }();

            _getItem = function(key) {
                var func = EMPTY_FUNC;

                if ('getItem' in oStorage) {
                    func = function(key) {
                        return oStorage.getItem(key); 
                    };
                } else if (ie) {
                    func = function(key) {
                        try {
                            oStorage.load(IE_STORE_NAME);
                            return oStorage.getAttribute(key);                      
                        } catch(e){}
                    };
                }

                return func;
            }();

            _removeItem = function(key) {
                var func = EMPTY_FUNC;

                if ('removeItem' in oStorage) {
                    func = function(key) {
                        oStorage.removeItem(key);
                    };
                } else if (ie) {
                    func = function(key) {
                        try {
                            oStorage.removeAttribute(key);
                            oStorage.save(IE_STORE_NAME);                       
                        } catch(e){}
                    };
                }

                return func;
            }();

            inited = true;
        },

        setItem: function(key, value) {
            return _setItem(key, value);
        },

        getItem: function(key) {
            return _getItem(key);
        },

        removeItem: function(key) {
            return _removeItem(key);
        }
    };
}();

    J.sys.simpleStorage = simpleStorage;
    
})
    /**
 * 操作剪贴板
 *
 * @author mingcheng@taobao.com
 * @date   2009-08-17
 */

Ju.add('Clipboard', function(S) {
    var Util = YAHOO.util, Event = Util.Event, Dom = Util.Dom, Lang = YAHOO.lang;

    // @TODO Use ZeroClipboard.js
    var Clipboard = function(el, config) {
        this.el = Dom.get(el);

    };

    Clipboard.prototype = {
        setText: function(msg) {
            try {
                if (window.clipboardData && clipboardData.setData) {
                    clipboardData.setData("text", msg);
                } else if (this.el.createTextRange) {
                    var range = el.createTextRange();
                    if (range) {
                        range.execCommand('Copy');
                    }
                }
            } catch(e) {}
        },
                clip:function(txt,callback){
                    if(YAHOO.env.ua.ie){
                        this.setText(txt);
                       // SNS.sys.Helper.showMessage("复制成功，马上发给你旺旺、QQ、MSN上的好友吧！")
                       callback();
                    }
                    //else Ju.sys.Helper.showMessage("由于浏览器的原因系统无法正常复制链接。请选中地址并按Ctrl+C，将链接复制下来。")
                     else alert("由于浏览器的原因系统无法正常复制链接。请选中地址并按Ctrl+C，将链接复制下来。")
                }
    };

    S.sys.Clipboard = new Clipboard();
       
});
/**
 * 聚划算倒计时组件v2
 * @author etai
 * @param {Object} config
 * @TO-DO html模板、分秒倒计时图片化
 */

Ju.add('app.timer', function(J) {

    var K = KISSY, DOM = K.DOM, Event = K.Event;
    
    var CHECKER_INTERVAL = 300000, //校准间隔时间
        //timer层内html模板
        TIMER_TPL0 = '<p class="min"><span class="t{{minute0}}"></span><span class="t{{minute1}}"></span></p><span class="label">分</span>'
                   + '<p class="sec"><span class="t{{second0}}"></span><span class="t{{second1}}"></span></p><span class="label">秒</span>',
        //样式2模板
        TIMER_TPL1 = '<p class="hour">{{hours}}</p><span class="label">小时</span>'
                  + '<p class="min">{{minutes}}</p><span class="label">分</span>'
                  + '<p class="sec">{{seconds}}</p>'; 

    /**
     * timer管理器
     */
    var timeManager = (function(){
        /**
         * 倒计时
         */
        var Timer = function(config){
            
            /**
             * 默认配置
             */
            var defConfig = {
                //结束时间，毫秒时间戳
                timeEnd: 0,
                //当前时间，毫秒时间戳
                timeCurrent: 0,
                //直接定义剩余时长，毫秒
                timeLeft : 0,
                //容器
                container: null,
                //时间结束回调
                callback: null,
                //模板
                template: null
            },
                self = this;
            
            this.config = K.merge(defConfig, config || {});
            
            /**
             * 剩余时间
             */
            this._leftTime = 0;
            
            /**
             * 容器
             */
            this._container = null;
            
            /**
             * interval handler
             */
            this._timeHandler = null;
            
            /**
             * 校准偏移
             */
            this._timeOffset = 0;
            
            /**
             * DOM数组
             */
            this._domBox = null;
            
            /**
             * 初始化
             */
            //擦
            
            K.use('template', function(){
                self._init();
            });
            /**
             * hacked by etai @2012.1.10
             
            if(!K.Template || K.Template.prototype.constructor.name != "Template"){
                K.getScript(Ju.sys.Helper.getServerURI('assets') + '/js/kissy-template-pkg.js', function(){
                    self._init();
                    return;
                });
            }
            else{
                 self._init();
            }
            */
            
         };
         
         Timer.prototype = {
             
             /**
              * 初始化
              */
             _init: function(){
                 
                 //检查
                 if(!this._valider()) {
                     return;
                 }
                 
                 //初始状态
                 var timeObj = this._divider();
                 
                 if(this.config.style == '1') {
                     this._display1(timeObj);
                 }
                 else{
                     this._display(timeObj);
                 }
                 
                 //倒计时
                 this._counter();
                 
             },
             /**
              * 倒计时
              */
             _counter: function(){
                 var self = this;
                 this._timeHandler = setInterval(function(){
                     
                    self._leftTime--;
                     
                    if (self._leftTime < 0) {
                        self.onOver(); //结束倒计时执行
                        return;
                    }
                    
                    var timeObj = self._divider();
                    
                    
                    if(self.config.style == '1') {
                         self._display1(timeObj);
                     }
                     else{
                         self._display(timeObj);
                     }
                    
                    //self._display(timeObj);
                    
                 }, 1000);
             },
             
             /**
              * 检查
              */
             _valider: function(){
                 
                 //容器必须有
                 this._container = K.get(this.config.container);
                 if(!this._container) {
                     return;
                 };
                 
                 //结束时间必须有
                 if (!this.config.timeLeft && !this.config.timeEnd) {
                     return;
                 }
                 
                 //开始时间没有，取客户端时间
                 if (!this.config.timeCurrent) {
                     var clientTime = new Date(); //否则使用客户端时间
                     this.config.timeCurrent = clientTime.getTime();
                 }
                 
                 //剩余时间
                 this._leftTime = this.config.timeLeft || (this.config.timeEnd - this.config.timeCurrent);
                 
                 this._leftTime = parseInt(this._leftTime / 1000);
                 
                 if (this._leftTime <= 0) {
                     
                     //显示结束状态
                     //待优化
                     this._leftTime = 0;
                     var timeObj = this._divider();
                     
                     if(this.config.style == '1') {
                         this._display1(timeObj);
                     }
                     else{
                         this._display(timeObj);
                     }
                     
                     this.onOver();
                     return;
                 }
                 
                 return true;
                 
             },
             
             /**
              * 计算时间
              */
             _divider: function(){
                 
                 //this._leftTime
                 
                 var hours, minutes, seconds, days, hours24;
                 
                 hours = Math.floor(this._leftTime / 3600);
                 minutes = Math.floor(this._leftTime / 60 % 60);
                 seconds = this._leftTime % 60;
                 
                 //计算天数和小时
                 days = Math.floor(hours / 24);
                 hours24 = hours % 24;

                 return {
                     'hours':hours,
                     'minutes':minutes,
                     'seconds':seconds,
                     'days': days,
                     'hours24':hours24
                 };
                 
                 
             },
             
             /**
              * 显示
              */
             _display:function(obj){

                 var tpl = this.config.template || TIMER_TPL1,
                     //html = TB.common.formatMessage(tpl, obj);
                     
                     html = K.Template(tpl).render(obj);
                 
                 //直接设置container的innerHTML
                 this._container.innerHTML = html;
                 
                 //replace DOM的形式
                 //实验表明两者性能差别不大
                 //this._container = this._replaceHtml(this._container, html);
             },
             
             /**
              * style1样式
              */
             _display1:function(obj){
                 
                 
                 //拆分时间
                var hour = this._divStr(obj.hours),
                    minute = this._divStr(obj.minutes),
                    second = this._divStr(obj.seconds),
                    timeObj = {};
                
                timeObj.hour0 = hour.charAt(0);
                timeObj.hour1 = hour.charAt(1);
                timeObj.minute0 = minute.charAt(0);
                timeObj.minute1 = minute.charAt(1);
                timeObj.second0 = second.charAt(0);
                timeObj.second1 = second.charAt(1);
                
                 //var html = TB.common.formatMessage(TIMER_TPL0, timeObj);
                 var html = K.Template(TIMER_TPL0).render(timeObj);
                 
                 //直接设置container的innerHTML
                 this._container.innerHTML = html;
                 //replace DOM的形式
                 //实验表明两者性能差别不大
                 //this._container = this._replaceHtml(this._container, html);
             },
             
             /**
              * 替换html
              */
             _replaceHtml: function(el, html) {
                 
                var oldEl = KISSY.get(el),
                    newEl = oldEl.cloneNode(false);
                    
                newEl.innerHTML = html;
                oldEl.parentNode.replaceChild(newEl, oldEl);

                return newEl;
                
            },
            
            /**
             * 拆分字符
             */
            _divStr: function(str){
                var tmp = '0' + str;
                    tmp = tmp.substr((tmp.length - 2), 2);
                return tmp;
            },
             
             /**
              * 结束倒计时处理
              */
             onOver: function(){
                 
                //清除定时器
                try {
                    clearInterval(this._timeHandler);
                } 
                catch (e) {
                    
                }
                
                //回调函数
                var callback = this.config.callback;
                if(callback && this._leftTime <= 0) {
                    callback && callback.call(this, this._container);
                }
                else{
                    this._leftTime = 0;
                }
    
             },
             
             /**
              * 外部唤醒校准
              * 并返回秒表状态供判断
              * off = st1 + lt1
              * lt2 = off - st2
              */
             calibrate: function(serverTime){

                if (this._leftTime <= 0) {
                    return false;
                }
                 
                if(!this._timeOffset) {
                    this._timeOffset = serverTime + this._leftTime;
                }
                else{
                    this._leftTime = this._timeOffset - serverTime;
                }
                return true;
             }
             
         };
         
         
         /**
          * 检查器
          */
         
         var checker = {
             
             /**
              * checker
              */
             _checkerRunner: null,
             
             /**
              * checker运行状态
              */
             _checkerOn:0,
             
             /**
              * 服务器时间
              */
             _serverDate:0,
             
             /**
              * 初始化checker
              */
             init: function(){
                 if(this._checkerOn) return;
                 //定时校准服务器时间
                 var self = this;
                 this._checkerRunner = setInterval(function(){
                     
                    var xhr = self._getXMLHttpRequest(), serverDate, serverTime;
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState == 4) {
                            //取得响应头时间
                            serverDate = new Date(xhr.getResponseHeader('date'));
                            serverTime = Math.floor(serverDate.getTime() / 1000);
                            self._calibrater(serverTime);
                        }
                    };
                    xhr.open('HEAD', '/?'+Math.random());
                    xhr.send(null);
    
                 },CHECKER_INTERVAL);
                 
                 self._checkerOn = 1;
                 
             },
             
             _getXMLHttpRequest: function(){
                try{
                   if(window.XMLHttpRequest){
                     return new XMLHttpRequest();
                   }
                   if(window.ActiveXObject){
                     return new ActiveXObject("MSXML2.XmlHttp");
                   }
                }catch(e){

                }   
              },
             
             /**
              * 校准器
              */
             _calibrater: function(serverTime){
                 
                 if(this._serverDate == serverTime) {
                     return;
                 }

                 var needChecker = 0;
                 K.each(timers, function(timer){
                     needChecker = needChecker || (timer._leftTime > 0);
                     timer.calibrate(serverTime);
                 })
                 
                 this._serverDate = serverTime;

                 /**
                  * 所有秒表已结束：停止checker
                  */
                 if(!needChecker) {
                     this._clearChecker();
                 }
             },
             
             /**
              * 停止checker
              */
             _clearChecker: function(){
                try {
                    clearInterval(this._checkerRunner);
                } 
                catch (e) {
                    
                }
                this._checkerOn = 0;
             }
             
         }
         
         /**
          * timer实例
          */
         var timers = [];

         return {
             /**
              * 外部初始化Timer接口
              */
             create: function(conf){
                 
                 checker.init();
                 
                 var aTimer = new Timer(conf);
                 timers.push(aTimer);
                 
                 return aTimer;
                 
             },
             /**
              * 销毁一个timer
              */
             remove: function(theTimer){
                 if(K.inArray(theTimer, timers)) {
                     theTimer.onOver();
                 }
             }
         }
         
         
    })();
    
    J.app.timer = timeManager;
    
});
/**
 * 聚划算表单验证组件
 * @param {Object} config
 */
Ju.add('app.formValidator', function(S) {

    var Event = YAHOO.util.Event, Dom = YAHOO.util.Dom, Lang = YAHOO.lang;
    
    var regxs = {
        //email   : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        email   : /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        tel     : /^((\d{3}\-)|(0\d{2,3}-))[1-9]\d{6,7}(\-\d{1,4})?$/,
        cell    : /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/, 
        cell_int: /^[0-1]\d{9,12}$/, //"^[0-1]\\d{9,12}$ 国际手机号
        phone   : /^[0-9]{11,12}$/,
        url     : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        number  : /^\d+(\.\d+)?$/,
        intNum  : /^[0-9]*[1-9][0-9]*$/,
        floatNum:/^\d+(\.\d{0,2})?$/,
        chinese : /^[\u4e00-\u9fa5]{0,}$/,
        unsafe  : /[#\\\$%\^&\*]+/,
        qscode  : /^[A-Z0-9\\-]{12,16}$/
    };
    
    
    var formValidator = function(app){

        var self = this;
        /*
         * 配置
         * 表单项目配置格式：
         * items: [
         *   'J_ItemId' : {
         *      el: '', //外层元素/ID
         *      type: '', //类型：email/tel/cell/url/number
         *      limit: [10,100], //字数限制，不限为0
         *      msg: '10-100个字符', //提示信息
         *   }
         * ]
         */
//        this.config = {
//            realTime  : false, //是否需要实时反馈
//            promptMsg : false, //是否显示提示信息
//            items     : [], //表单项配置
//            defMsg    : { //默认提示
//                safe    : '您输入的内容含有非法字符',
//                email   : '邮件格式错误',
//                tel     : '联系电话格式错误',
//                cell    : '手机号码格式错误',
//                url     : '网址格式错误'
//            }
//        };
        this.currItem = null;
        /*
         * 初始化
         */
        this.init = function(app){

//            this.config = Lang.merge(this.config, config || {});
//            
//            for(var ind = 0, len = formItem.length; ind < len; ind++) {
//                
//            }
            //app类型
//            switch(app) {
//                case 'sign' :
//                    //this.signValid();
//                    break;
//                case 'add' :
//                    this.addValid();
//                    break;
//                case 'detail' :
//                    this.detailValid();
//                    break;
//                case 'edit' :
//                    this.editValid();
//                    break;
//            }
            
            
        };
        
        /**
          * 报名
          */
         this.signValid = function(){

             //alert(this.normalValid('J_FormSellerName', '', [0,20], ''));
             var valid0 = this.normalValid('J_FormSellerName', '', [2,50], '请填写正确的姓名'),
                 valid1 = this.normalValid('J_FormSellerTel', 'phone', [], ''),
                 valid2 = this.normalValid('J_FormSellerEmail', 'email', [2,30], ''),
                 valid3 = this.normalValid('J_FormSellerAddress', '', [5,100], ''),
                 valid4 = this.agreddmentValid('J_FormSellerAgreement'),
                 valid5 = this.normalValid('J_FormSellerWangWang', '', [2,50], '请填写正确的旺旺名称');

             return (valid0 && valid1 && valid2 && valid3 && valid4 && valid5);
         }
         /**
          * 添加商品
          */
         this.addValid = function(){
             var valid0 = this.normalValid('J_FormGoodsUrl', 'url', [2,100], '');
             return (valid0);
         }
         /**
          * 添加商品详情
          */
         this.detailValid = function(){

             var valid0 = this.normalValid('J_FormDetName', '', [2,256], '请填写商品名称, 256个汉字以内'),
                 valid1 = this.normalValid('J_FormDetShortName', '', [2,64], '请填写商品短名称, 64个汉字以内'),
                 valid2 = this.normalValid('J_FormDetPrice', 'number', [], ''),
                 valid3 = this.jupriceValid('J_FormDetJuPrice', ''),
                 valid4 = this.normalValid('J_FormDetJuNum', 'intNum', [], ''),
                 valid5 = this.editorValid('J_FormDetEditor', '请填写商品详情'),
                 valid6 = this.radioCheck('J_FormDetPost', 'payPostage', '请填写邮费信息'),
                 valid7 = this.normalValid('J_FormDetJuLimit', 'intNum', [], ''),
                 valid8 = this.radioCheck('J_FormDetJuStore', 'isInBarn', '请填写入仓信息'),
                 valid9 = this.qsCodeValid('J_FormDetQS', ''),
                 valid10 = this.pollDiscCountValid(),
                 valid11 = this.pollDiscPriceValid();

             return (valid0 && valid1 && valid2 && valid3 && valid4 && valid5 && valid6 && valid7 && valid8 && valid9 && valid10 && valid11);
                 
                 
         }
         /**
          * 支付定金
          */
         this.frontValid = function(){
             var valid0 = this.normalValid('J_FrontPhone', 'cell_int', [], ''),
                 valid1 = this.repeatValid('J_FrontPhone', 'J_FrontPhoneRepeat', '手机号码不一致,请核对');

             return (valid0 && valid1);
         }
         /**
          * 支付尾款
          * J_EditInvInput
          * name
          */
         this.finalValid = function(){
             var valid0 = this.radioSelect('J_General', 'mode', '请选择运送方式'),
                 valid1 = this.textAreaTest('J_SellerMsg', 500),
                 self = this,
                 valid2 = (function(){
                     var text = Dom.get('J_EditInvInput');
                     if(!text) return true;
                     
                     if(Dom.getStyle(Dom.get('J_EditInvInput').parentNode, 'display') == 'none') {
                         return true;
                     }
                     
                     return self.normalValid('J_EditInv', '', [0, 500], '请填写发票抬头, 500字以内');
                     
                 })(),
                 valid3 = this.radioSelect('J_AddressList', 'address', '请添加并选择收货地址');

             return (valid0 && valid1 && valid2 && valid3);
         }


        /*
         * 商品变更信息
         */
         this.modifyValid = function() {

             var valid0 = this.jupriceValid('J_FormSellerModPrice', ''),
                 valid1 = this.normalValid('J_FormSellerModSum', 'intNum', [], ''),
                 valid2 = this.normalValid('J_FormSellerModLimitNumber', 'intNum', [], '');
                 valid3 = this.radioCheck('J_FormSellerModPost', 'payPostage', '请填写邮费信息');

             return (valid0 && valid1 && valid2 && valid3);
         }
         
        
        this.init(app);
     };
     
     formValidator.prototype = {

		checkValue : function(type,value){
            
             //正则
             if(type === '') {
                 if(this._checkRegx(value, regxs.unsafe)) {
                     
                     return false;
                 }
             }
             else if(type === 'phone') {  
                 if(!this._checkRegx(value, regxs.tel) && !this._checkRegx(value, regxs.cell)) {
                  
                     return false;
                 }
             }
             else if(type === 'cell'){
                 if(!this._checkRegx(value, regxs.cell)) {
                     
                     return false;
                 }
             }
             else if(type === 'cell_int'){
                 if(!this._checkRegx(value, regxs.cell_int)) {
                    
                     return false;
                 }
             }
             else if(type === 'email') {
                 if(!this._checkRegx(value, regxs.email)) {
                    
                     return false;
                 }
             }
             else if(type === 'url') {
                 if(!this._checkRegx(value, regxs.url)) {
                    
                     return false;
                 }
             }
             else if(type === 'number') {
                 if(!this._checkRegx(value, regxs.number)) {
                     
                     return false;
                 }
             }
             else if(type === 'intNum') {
                 if(!this._checkRegx(value, regxs.intNum)) {
                   
                     return false;
                 }
             }
             
             else if(type === 'chinese') {
                 if(!this._checkRegx(value, regxs.chinese)) {
                    
                     return false;
                 }
             } 

       
             

             return true;
             
             
         },
         
         /*
          * 验证item
          * @param el 外层field
          * @param type 类型
          * @param limit 数组，[下限, 上限]
          * @param msg 提示/错误信息
          */
         normalValid : function(el, type, limit, msg, cls){
             var field = Dom.get(el);
             if(!field) return true;
             
             //取得表单元素和输入反馈区域
             var input = field.getElementsByTagName('INPUT')[0];
                 
             if(!input) return true;
             this.currItem = input;
             this.hideMsg();
             //正则
             if(type === '') {
                 if(this._checkRegx(input.value, regxs.unsafe)) {
                     this.showMsg(msg ? msg : '输入的内容含有非法字符');
                     return false;
                 }
             }
             else if(type === 'phone') {  
                 if(!this._checkRegx(input.value, regxs.tel) && !this._checkRegx(input.value, regxs.cell)) {
                     this.showMsg(msg ? msg : '请填写您的手机或固话（固话格式示例：0571-88155188)');
                     return false;
                 }
             }
             else if(type === 'cell'){
                 if(!this._checkRegx(input.value, regxs.cell)) {
                     this.showMsg(msg ? msg : '请填写正确的手机号码', '', cls);
                     return false;
                 }
             }
             else if(type === 'cell_int'){
                 if(!this._checkRegx(input.value, regxs.cell_int)) {
                     this.showMsg(msg ? msg : '请填写正确的手机号码');
                     return false;
                 }
             }
             else if(type === 'email') {
                 if(!this._checkRegx(input.value, regxs.email)) {
                     this.showMsg(msg ? msg : '邮件格式不正确');
                     return false;
                 }
             }
             else if(type === 'url') {
                 if(!this._checkRegx(input.value, regxs.url)) {
                     this.showMsg(msg ? msg : '请填写正确的url地址');
                     return false;
                 }
             }
             else if(type === 'number') {
                 if(!this._checkRegx(input.value, regxs.number)) {
                     this.showMsg(msg ? msg : '请填写正确格式的数字');
                     return false;
                 }
             }
             else if(type === 'intNum') {
                 if(!this._checkRegx(input.value, regxs.intNum)) {
                     this.showMsg(msg ? msg : '请填写整数数字');
                     return false;
                 }
             }
             
             else if(type === 'chinese') {
                 if(!this._checkRegx(input.value, regxs.chinese)) {
                     this.showMsg(msg ? msg : '本项只允许填写汉字');
                     return false;
                 }
             } 

       
             

             if(input.value.length < limit[0]) {
                this.showMsg(msg ? msg : '本项不能少于'+limit[0]+'字');
                return false;
             }
             else if(input.value.length > limit[1]) {
                this.showMsg(msg ? msg : '本项不能超出'+limit[1]+'字');
                return false;
             }
             else if (input.value.length == 0) {
                 this.showMsg(msg ? msg :'请填写内容');
                 return false;
             }

/*
             if(!this._checkLength(input.value.length, limit[0], limit[1] )) {
                 this.showMsg('请控制在'+limit[0]+'-'+limit[1]+'个字之内');
                 return false;
             }
*/
             return true;
             
             
         },
         
         /**
          * select检查
         */
         selectValid: function(field, value, msg){
             var field = Dom.get(field);
             if(!field) return true;
             
             //取得表单元素和输入反馈区域
             var select = field.getElementsByTagName('SELECT')[0];
             if(!select) return true;
             
             this.currItem = select;
             this.hideMsg();
             
             if (select.value != value) {
                return true;
             }
             else{
                this.showMsg(msg ? msg :'请选择此项','error', 'form-li');
                return false;
             }
             
             
             
         },
         
         /**
          * 重复出入检查
          */
         repeatValid: function(el0, el1, msg){

             var field0 = Dom.get(el0),
                 field1 = Dom.get(el1);
                 
             if(!field0 || !field1) {
                 return true;
             }
             
              var input0 = field0.getElementsByTagName('INPUT')[0],
                  input1 = field1.getElementsByTagName('INPUT')[0];
             
             if(!input0 || !input1) {
                 return true;
             }
             this.currItem = input1;
             this.hideMsg();
             if(Lang.trim(input0.value) === Lang.trim(input1.value)) {
                 return true;
             }

             this.showMsg(msg ? msg :'不一致，请检查');
             return false;
             
         },
         
         /**
          * radio选中检查mode
          */
         radioSelect : function(el, name, msg){

             var field = Dom.get(el);
             if(!field) return true;
             //取得表单元素和输入反馈区域
             var input = field.getElementsByTagName('INPUT')[0];
             if(!input) return false;

             this.currItem = input;
             this.hideMsg();
             if(!Ju.sys.Helper.getRadioValue(name, field)) {
                 this.showMsg(msg ? msg :'请选择此项');
                 return false;
             }
             
             return true;
             
         },
         
         /**
          * radio检查
          */
         radioCheck: function(el, name, msg){
             var field = Dom.get(el);
             if(!field) return true;
             
             //取得表单元素和输入反馈区域
             var input = field.getElementsByTagName('INPUT')[0];

             this.currItem = input;
             this.hideMsg();

             if(Ju.sys.Helper.getRadioValue(name, field) === null) {

                 this.showMsg(msg ? msg : '请选择一项');
                 return false;
             }
             
             return true;
             
         },
         
         /**
          * editor验证
          */
         editorValid : function(el, msg){
             var field = Dom.get(el);
             if(!field) return true;
             
             //取得表单元素和输入反馈区域
             var textarea = field.getElementsByTagName('TEXTAREA')[0];
             if(!textarea) return;
             this.currItem = textarea;
             this.hideMsg();
             if(Lang.trim(textarea.value).length === 0 || textarea.value === '<p>&nbsp;</p>') {
                 this.showMsg(msg ? msg : '请填写内容');
                 return false;
             }
             this.showMsg('尽量详细描述你的宝贝,可以提高审核通过的机会哦!', 'cont');
             return true;
         },
         
         /**
          * textarea字数检验
          */
         textAreaTest: function(el, len){
             
             var field = Dom.get(el);
             if(!field) return true;
             
             var textarea = field.getElementsByTagName('TEXTAREA')[0];
             if(!textarea) return true;
             
             this.currItem = textarea;
             this.hideMsg();
             if(Lang.trim(textarea.value).length > len) {
                 var msg = '最多输入' + len + '个字符'
                 this.showMsg(msg);
                 return false;
             }

             return true;

         },
         
         /*
          * 显示信息
          */
         showMsg : function(msg, type, cls){
             if(!type) {
                 type = 'error';
             }
             
             var divClass = (this.currItem.tagName === 'TEXTAREA') ? 'field-e' : 'field',
                 divClass = cls ? cls : divClass;
                 fieldDiv = Dom.getAncestorByClassName(this.currItem, divClass);
                 
             if(!fieldDiv) return;
             
             var msgBox = Dom.getElementsByClassName('msg', 'div', fieldDiv)[0];
             if(!msgBox) return;
             
             msgBox.innerHTML = '<p class="'+type+'">'+msg+'</p>';
             
         },


         /**
          * QS码验证
          */

         qsCodeValid: function(el, msg) {
             var field = Dom.get(el);
             if(!field) return true;

             var input = field.getElementsByTagName('INPUT')[0];

             if(!input) return;

             this.currItem = input;
             this.hideMsg();

             if (KISSY.trim(input.value) == "") {
                return true;
             }

             if(!this._checkRegx(input.value, regxs.qscode)) {
                 this.showMsg(msg ? msg : '请填写正确的QS码');
                 return false;
             }

             return true;
             
         },

         /**
          * 团购价格验证
          */
         jupriceValid: function(el, msg){
             var field = Dom.get(el);
             if(!field) return true;
             
             //取得表单元素和输入反馈区域
             var input = field.getElementsByTagName('INPUT')[0];
                 
             if(!input) return;
             this.currItem = input;
             this.hideMsg();
             
             if(!this._checkRegx(input.value, regxs.number)) {
                 this.showMsg(msg ? msg : '请填写正确格式的数字');
                 return false;
             }
             
             if(input.value <= 0) {
                 this.showMsg('团购价必须大于0元！');
                 return false;
             }
             
             if(input.value >= 100000) {
                 this.showMsg('团购价不能大于100000元！');
                 return false;
             }
             
             //var floatRex=/^\d+(\.\d{0,2})?$/g;
             
             if(!this._checkRegx(input.value, regxs.floatNum)) {
                 this.showMsg('请限制在2位小数！');
                 return false;
             }
             
             return true;
         },
         /**
          * 卖家协议验证
          */
         agreddmentValid: function(el){
             var field = Dom.get(el);
             if(!field) return true;
             
             //取得表单元素和输入反馈区域
             var input = field.getElementsByTagName('INPUT')[0];
                 
             if(!input) return;
             this.currItem = input;
             this.hideMsg();
             
             if(input.checked == false) {
                 this.showMsg('请阅读并同意此协议！');
                 return false;
             }
             return true;
         },
         pollDiscCountValid: function(){
             var el = Dom.get('J_FormDetPollDiscNum');
             if(!el || el.style.display=="none"){
                 return true;
             }
             var input = el.getElementsByTagName('INPUT')[0];
             if(!input) return true;
             
             this.currItem = input;
             this.hideMsg();
             
             if(!this._checkRegx(input.value, regxs.number)) {
                 this.showMsg('请填写正确格式的数字');
                 return false;
             }
             
             var itemCount = Dom.get('itemCount').value;
             if(input.value*1 > itemCount*1) {
                 this.showMsg('折上折商品数量不得超过报名参团数量！');
                 return false;
             }
             
             return true;
             
         },
         pollDiscPriceValid: function(){
             var el = Dom.get('J_FormDetPollDiscPrice');
             if(!el || el.style.display=="none"){
                 return true;
             }
             var input = el.getElementsByTagName('INPUT')[0];
             if(!input) return true;
             
             this.currItem = input;
             this.hideMsg();
             
             if(!this._checkRegx(input.value, regxs.number)) {
                 this.showMsg('请填写正确格式的数字');
                 return false;
             }
             
             var itemCount = Dom.get('activityPrice').value;
             if(input.value*1 > itemCount*1) {
                 this.showMsg('折上折商品价格不得高于团购价！');
                 return false;
             }
             
             if(input.value*1 < itemCount*0.85) {
                 this.showMsg('折上折商品价格不得低于团购价85%！');
                 return false;
             }
             //折上折数量不能大于999999999件或者小于等于0！
             if(input.value*1 <= 0 || input.value*1>999999999 ) {
                 this.showMsg('折上折数量不能大于999999999件或者小于等于0！');
                 return false;
             }
             
             return true;
             
         },
         /**
          * 隐藏信息
          */
         hideMsg : function(){
             var fieldDiv = Dom.getAncestorByClassName(this.currItem, 'field');
             if(!fieldDiv) {
                 fieldDiv = Dom.getAncestorByClassName(this.currItem, 'field-e');
             };
             if(!fieldDiv) {
                 fieldDiv = Dom.getAncestorByClassName(this.currItem, 'form-li');
             };
             if(!fieldDiv) {
                 return;
             }
             var msgBox = Dom.getElementsByClassName('msg', 'div', fieldDiv)[0];
             if(!msgBox) return;
             
             msgBox.innerHTML = '';
             
         },
        
        //正则
        _checkRegx : function(str, reg){
            //str = str.replace(/\s/g,"");
            str = Lang.trim(str);
            return reg.test(str);
        },
        
        //长度
         _checkLength : function(len, min, max){
             min = min || 0;
             if(max) {
                 return len >= min && len <= max;
             }
             else {
                 return len >= min;
             }
         },
         //字符安全
         _checkSafty : function(str){
             return this._checkRegx(str, regxs.safe);
         }
         
     };
     
     S.app.formValidator = formValidator;
    
});
/**
 * 数据提交
 * 
 * @param {Object} config
 */
Ju.add('app.dataSub', function(S) {
   var Event = YAHOO.util.Event, Dom = YAHOO.util.Dom, Lang = YAHOO.lang, Connect = YAHOO.util.Connect;
     
     var dataSub = function(config){
        var self = this,
            dataStr = '';
            
        //配置
        this.config = {
            subUrl: "",
            source: "form", //默认form; 或者某些表单ID值：['imgUrl', 'itemUrl']
            type: "POST", 
            params:{}, //数据
            formEl : null, //form表单
            editor : null,
            callback  : null, //回调函数
            failure : null
        };
         
        this.config = Lang.merge(this.config, config || {});
         

        this.init = function(){
        
            //是否有请求在跑
            if(Connect.isCallInProgress() || Ju.app.onPress) {
                //Connect.abort();
                return;
            }
            if(this.config.source === "form" && !this.config.formEl) {
                return;
            }
            Ju.app.onPress = 1;
            this.setDataStr();
            this.subForm();
            
        };
        
        //生成数据字串
        this.setDataStr = function(){
            if(this.config.source === "form") {
                Connect.setForm(this.config.formEl);
                //dataStr = encodeURI(dataStr);
                //alert(dataStr);
            }else {
                var valueArr = [];
                for (var ind=0, len=this.config.source.length; ind<len; ind++) {
                    var value = this.config.formEl[this.config.source[ind]].value;
                    valueArr.push (this.config.source[ind] + "=" + value);
                }
                dataStr = valueArr.join('&');
                dataStr = encodeURI(dataStr);
            }
        };
        
        //提交表单
        this.subForm = function(){
            self.config.subUrl += '?_input_charset=utf-8';
            //Connect.initHeader('Content-Type', 'text/html; charset=gb2312', 1);
            if(self.config.type === "GET") {
                Connect.asyncRequest('GET', self.config.subUrl + dataStr, {
                    success : function(response){
                        self.success(response);
                    },
                    failure : function(){
                        //alert(0);
                        self.failure();
                    }
                });
            }else {
                //self.config.subUrl += '?_input_charset=utf-8';
                if(self.config.subUrl == "/json/tg/buyItemAction.htm?_input_charset=utf-8") {
                    self.config.subUrl += "&tracelog=tuan01";
                }
                Connect.asyncRequest('POST', self.config.subUrl, {
                    success : function(response){
                        self.success(response);
                    },
                    failure : function(){
                        self.failure();
                    }
                }, dataStr);
            }
            
        };
        
        this.success = function(response){
            if(response.status != "200") {
                self.exception();
                return;
            }
            
            //回调处理函数
            if(self.config.callback) {
                self.config.callback(response.responseText);
            }
//            var jsonStr = response ? response.responseText : '',
//                jsonData =eval('(' + jsonStr + ')');
            //alert(response.responseText);
        };
        
        this.failure = function(){
            if(self.config.failure) {
                self.config.failure();
            }
            else {
                self.exception();
            }
        };
        
        //返回数据异常
        this.exception = function(){
            alert("系统异常，请重试");
        };
        
        
        this.init();
     }
     
     S.app.dataSub = dataSub;
    
});
/**
 * 团购交互组件
 * @param {Object} response
 */
Ju.add('app.buy', function(S) {
   var Event = YAHOO.util.Event, Dom = YAHOO.util.Dom, Lang = YAHOO.lang,
       K = KISSY;

     var buy = function(response){

        //html模板
        var _self = this,
            
        TPLS = {
            /**
             * 系统繁忙
             */
            systmeBusy : '系统繁忙: 人太多了, 休息一下, 等等吧… ',
            /**
             * 小二
             */
            xiaoEr : '小二？你可不能买, 发扬小二精神吧, 把有限的商品让给无限的用户吧：） ',
            /**
             * 信用
             * {rate} 信用
             */
            rate : '此宝贝规定买家信用在 {rate}心 以上, 你不能购买。',
            /**
             * 已买过
             */
            bought : '抱歉，你已经购买过这个宝贝了, 同一宝贝在当前团购活动中，只能购买一件。',
            /**
             * 到达数量上限
             * {num} 数量
             */
            limited : '抱歉，你今天在聚划算已经购买过{num}件宝贝了, 一天最多只能购买{num}件。 ',
            /**
             * 到达单个商品数量上限
             * {num} 数量
             */
            itemLimited : '抱歉，这件商品你已经购买了{num}件, 不能再参团了。这件商品每人最多可购买{num}件哦。 ',
            /**
             * 已结束
             */
            timeout : '抱歉，这个宝贝的团购结束了, 下回请早哦。 ',
            /**
             * 还有机会
             */
            chance : '还有人未付款, 30分钟内将陆续取消不付款订单, 也许你还有机会团到哦, 再等等吧。',
            /**
             * 卖完
             */
            soldOff : '抱歉，这个宝贝卖完了, 下回请早哦。',
            /**
             * 没有支付宝
             */
            noAlipay : '抱歉，您没有注册支付宝帐号，无法购买，请先<a href="https://lab.alipay.com/user/reg/index.htm" target="_blank">注册支付宝帐号</a>。',
            /**
             * 新下单成功
             * {checkTime} 付款时限
             */
            newOrder   : ['<div class="order">',
                         '<p>请务必在<strong>15分钟内</strong>下单, 并在下单后 <strong>{{checkTime}}分钟内</strong>完成支付, 否则您的订单将自动关闭。 </p>',
                         '<p class="error-content smile">你的下单时间还有:  </p>',
                         '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">',
                         '<p class="hour"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label hour">时</span>',
                         '<p class="min"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label">分</span>',
                         '<p class="sec"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label">秒</span></div>' ,
                         '{{#if hasSellerInfo}}<p class="popup-seller-info">{{seller}}商家是聚划算的高级认证商家，信誉良好，实力雄厚。您本次购买该商家的商品后，将{{receivingTime}}。</p>{{/if}}',
                       '</div>'].join(''),

             /**
              * 倒计时过期
              */
             orderTimeout  : ['<p>下单倒计时已经过期, </p><p>如果你还没有下单, 请重新选择聚划算团购宝贝。</p>',
                         '<p class="error-content cry">时间已经到了! </p>',
                         '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">',
                         '<p class="hour"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label hour">时</span>',
                         '<p class="min"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label">分</span>',
                         '<p class="sec"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label">秒</span></div>'].join(''),
              /**
               * 已下单未付款
               * {timeStr} 时间
               */
              ordered : '<div class="order"><p>你已下单, 但未付款, 请在<strong>{timeStr}</strong>前付款, 否则你将失去购买到此宝贝的机会。</p>'
                        + '<p class="error-content smile">你的付款时间还有:  </p>'
                        + '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">'
                        + '<p class="hour"><span class="t0"></span><span class="t0"></span></p>'
                        + '<span class="label hour">时</span>'
                        + '<p class="min"><span class="t0"></span><span class="t0"></span></p>'
                        + '<span class="label">分</span>'
                        + '<p class="sec"><span class="t0"></span><span class="t0"></span></p>'
                        + '<span class="label">秒</span></div></div>',

                /**
                 * 没有银行卡信息
                 */
                 nobankcard: '<div class="title"><img src="http://img04.taobaocdn.com/tps/i4/T1HFx5Xk0uXXXXXXXX-189-25.png" /></div>'
                        + '<div><span class="icon"></span>'
                        + '<p class="error-content poor" style="height:auto;margin:15px 0;padding:5px 0 5px 70px;line-height:2em;">你尚未开通{card}快捷支付  (含卡通)服务, 请开通后继续参团。<br />只需两步, 开通成功后即可专享优惠价格!</p></div>'
                        + '<div style="text-align:center"><a href="{cardurl}" target="_blank" class="j-lngbtn">立即开通<b></b></a>'
                        + '<a class="j-lngbtn j-greenbtn" style="margin-left:10px;" href="/tg/today_items.htm" >更多团购<b></b></a></div>'
                        + '<a class="btn-close" title="关闭此窗口" href="#">×</a>',

                 /**
                  * 白名单验证成功
                  * @modified etai 2011.06.30
                  */
                 WHITELIST_OK: '<div class="tips"><p>{tipCount}</p></div>',
                 /**
                  * 白名单验证失败
                  */
                 WHITELIST_FAIL: '很遗憾，您不能参加该商品的团购。<br />{msg}',

                 /**
                  * 回答错误
                  */
                  ANSWER_FAIL: '很遗憾, 回答错误!',
                  
                  /**
                   * 折上折抢购
                   */
                  DD_NOTPOLLUSER: '很遗憾，你不能参与此折上折抢购，只有在我想团中给此商品投过票的人才能参与。'
                                   + '<p class="tip">你可以正式开团时用聚划算价购买。</p>',
                  
                  DD_GRABOVER: '很遗憾，你来晚了，折上折机会已经被抢光了。'
                               + '<p class="tip">你可以正式开团时用聚划算价购买，购买后将获得<em>5张选票奖励</em>。</p>',
                  
                  DD_SUCCESS: '<div class="dd-order">'
                        + '<p>恭喜你抢到了折上折购买机会！可以用折上折价<strong>&yen;{price}</strong> 购买，并将获得<strong>{poll}张选票奖励</strong>。</p>'
                        + '<p class="tip"><strong class="label">提示</strong>：请务必在10分钟内下单, 并在下单后30分钟内完成支付, 否则您的折上折机会将被取消。</p>'
                        + '<p class="time-tit">你的下单时间还有:  </p>'
                        + '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">'
                        + '<p class="hour"><span class="t0"></span><span class="t0"></span></p>'
                        + '<span class="label hour">时</span>'
                        + '<p class="min"><span class="t0"></span><span class="t0"></span></p>'
                        + '<span class="label">分</span>'
                        + '<p class="sec"><span class="t0"></span><span class="t0"></span></p>'
                        + '<span class="label">秒</span></div></div>',
                        
                  ddOrderTimeout  : ['<p>下单倒计时已经过期, </p><p>如果你还没有下单, 请重新选择聚划算团购宝贝。</p>',
                         '<div class="ju-timer J_juItemTimer" data-servertime="" data-targettime="">',
                         '<p class="min"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label">分</span>',
                         '<p class="sec"><span class="t0"></span><span class="t0"></span></p>',
                         '<span class="label">秒</span></div>'].join(''),
                  DD_HASGRABITEM: '亲，你已经享用了一次折上折价购买机会。如果还想购买，你可以在正式开团时用聚划算价购买。'


        };

        //配置
        this.config = {

        };

        //this.config = Lang.merge(this.config, config || {});
        //var self = this;

        this.init = function(response){
            if(!response) {
                this.systemBusy();
                return;
            }

            //alert(response);
            var jsonStr = response.responseText ? response.responseText : response,
                jsonData = null;
            if(jsonStr !== "") {
                try {
                    jsonData = Lang.JSON.parse(jsonStr);
                } catch (e) {
                    this.systemBusy();
                }
            }
            if(!jsonData) return;

            //判断类型
            switch(jsonData.type) {
                case "BUSY" :
                    this.systemBusy();
                    break;
                case "HONOR_BUSY" :
                    this.normalMsg(jsonData.data.msg, 'smile', jsonData);
                    break;
                case "XIAOER" :
                    this.normalMsg(TPLS.xiaoEr, 'laugh');
                    break;
                case "BOUGHT" :
                    this.normalMsg(TPLS.bought, 'smile');
                    break;
                case "RATE" :
                    var content = TB.common.formatMessage(TPLS.rate, {rate : jsonData.data.rate});
                    this.normalMsg(content, 'cry');
                    break;
                case "LIMITED" :
                    var content = TB.common.formatMessage(TPLS.limited, {num : jsonData.data.limit});
                    this.normalMsg(content, 'smile');
                    break;
                case "ITEMLIMITED" :
                    var content = TB.common.formatMessage(TPLS.itemLimited, {num : jsonData.data.limit});
                    this.normalMsg(content, 'smile');
                    break;
                case "TIMEOUT" :
                    this.normalMsg(TPLS.timeout, 'cry');
                    break;
                case "CHANCE" :
                    this.normalMsg(TPLS.chance, 'smile');
                    break;
                case "SOLDOFF" :
                    this.normalMsg(TPLS.soldOff, 'cry');
                    break;
                case "NOALIPAY" :
                    this.normalMsg(TPLS.noAlipay, 'cry');
                    break;
                case "NEWORDER" :
                //console.log(jsonData.data);
                	var data = jsonData.data;
                	//url:商品URL 付款时间:checktime 卖方名称:data.seller  到账时间:receivingTime
                    this.newOrder(data.url, data.checktime, null ,data.seller  ,data.receivingTime);
                    break;
                case "ORDERED" :
                    this.ordered(jsonData.data.ordertime, jsonData.data.currtime, jsonData.data.url);
                    break;
                case "OK_REDIRECT" :
                    this.redirectTo(jsonData.data.url);
                    break;
                case "NOBANKCARD" :
                    this.noBankCard(jsonData.data);
                    break;
                case "WHITELIST_OK" :
                    this.newOrder(jsonData.data.url, jsonData.data.checktime, "whitelist");
                    break;
                case "WHITELIST_FAIL" :
                    var content = TB.common.formatMessage(TPLS.WHITELIST_FAIL, {msg : jsonData.data.msg});
                    this.normalMsg(content, 'cry', '回馈团购');
                    break;
                case "ANSWER_FAIL" :
                    var content = TB.common.formatMessage(TPLS.ANSWER_FAIL);
                    this.normalMsg(content, 'cry');
                    break;
                case "NOT_ENOUGHT_HONOR":
                    this.medalHandle.notEnoughMedal(jsonData.data);
                    break;
                case "NOT_ENOUGHT_HONOR_NUM":
                    this.medalHandle.notEnoughMedalNum(jsonData.data);
                    break;
                case "ERROR" :
                    this.normalMsg(jsonData.data.msg, 'cry', jsonData);
                    break;
                case "ASSOCIATION_TG" :
                    this.buyAssociate(jsonData.data.masterItemId);
                    break;
                case "BUY_CHECKCODE_ERROR" :
                    this.captchaHandler.errorHandle();
                    break;
				case "VIP" :
                    var limitCode = jsonData.data.limit || 1;
                    this.buyLimit(limitCode);
                    break;	
                    
                /**
                 * 折上折抢购
                 * //DDGRAB_OVER DDSUCCESS DDHASGRABITEM
                 */
                case "DD_NOTPOLLUSER": 
                    this.normalMsg(TPLS['DD_NOTPOLLUSER'], 'cry');
                    break;
                case "DD_GRABOVER":
                    this.normalMsg(TPLS['DD_GRABOVER'], 'cry');
                    break;
                case "DD_HASGRABITEM":
                    this.normalMsg(TPLS['DD_HASGRABITEM'], 'smile');
                    break;
                case "DD_SUCCESS":
                    this.newDDOrder(jsonData.data);
                    break;
                
                default :
                    this.systemBusy();
            }


        };

            /*
             * 验证码错误句柄
             */

            this.captchaHandler = (function() {

                var _ = _self, includeMethods = ['normalMsg', 'newOrder', 'buyAssociate', 'ordered', 'noBankCard'];


                function buyHandlerDecorator(decorator) {
                
                    for (handler in _) {

                        ;(function(methodName) {

                            var method = _[methodName];
                        
                            if (methodName && K.isFunction(method)) {
                                
                                if (K.indexOf(methodName, includeMethods) != "-1") {
                                    
                                    var origHandler = method;

                                    _[methodName] = function() {

                                        var args = [].slice.call(arguments);
                                        decorator();
                                        origHandler.apply(_, args);

                                    }
                                }
                            }

                        })(handler);
                    }
                }

                function successHandle() {
                    Ju.app.captcha.closeCCPopup();
                }

                return {
                    'init': init,
                    'errorHandle': function() {
                        Ju.app.captcha.showErrorMessage();
                    }
                }

                function init() {
                    buyHandlerDecorator(successHandle);
                }

            })();

            
		     /* VIP购买通道*/

            this.buyLimit = function(limit) {
             
                var content = {
                                "1": "该商品仅限vip会员购买",
                                "2": "该商品仅限<a class='vip v1'></a>级及以上会员购买",
                                "3": "该商品仅限<a class='vip v2'></a>级及以上会员购买",
                                "4": "该商品仅限<a class='vip v3'></a>级及以上会员购买",
                                "5": "该商品仅限<a class='vip v4'></a>级及以上会员购买",
                                "6": "该商品仅限<a class='vip v5'></a>级及以上会员购买",
                                "7": "该商品仅限<a class='vip v6'></a>级会员购买"
                }[limit];

               this.normalMsg(content, 'cry');
            };

            /**
             * 关联商品
             */

            this.buyAssociate = function(itemId) {
               
                var assApi = '/json/tg/buyItemAssociation.htm', popupRef = null;

                function renderPopup(popupRef) {
                }

                function bindEvent(popup) {
                }

                function systemBusy() {
                    //todo      
                }

                function sanitizeResponse(jsonString) {

                    var jsonString = jsonString.replace(/\r|\n|\\|\t/g, ''),
                        jsonData = null;

                    try {
                        jsonData = K.JSON.parse(jsonString);
                    } catch(e) {
                        //ignore
                    }

                    return jsonData;
                       
                }

                function onPopupClose() {
                    //noop
                }

                function popup(content) {

                     var popup = new Ju.sys.Popup({
                           width: 570,
                           content: content,
                           title: '提示',
                           type: 'pop-associate',
                           buttons: [{
                               text: '关闭',
                               func: function(){
                                   this.hide();
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });

                    popup.show();

                    return popup;
                }

                function responseHandler(jsonString) {

                    var jsonData = sanitizeResponse(jsonString),
                        type = jsonData.type,
                        content = jsonData.data.content;
                

                    if (type && type == 'OK') {
                        if (K.trim(content)) {
                            renderPopup(popup(content));
                        }   
                    } else {
                        systemBusy();
                    }             

                }
               
                function getUserToken() {
                    return document.getElementsByName('_tb_token_')[0].value;
                }

                function requestAssociation(api) {

                     K.io({
                        type : 'GET',
                        url  : api, 
                        data : {
                            '_tb_token_': getUserToken(),
                            '_input_charset': 'utf-8'
                        },
                        success: function(jsonString){
                            responseHandler(jsonString);
                         },
                        error: function(){systemBusy()}
                     });
                }

                (function init(itemId) {
                    var api = assApi + '?masterItemId=' + itemId;
                    requestAssociation(api);
                })(itemId);


            };



            /**
             * 普通提示
             * @param {String} content 内容html
             * @param {String} type  类型cry smile laugh
             */
            this.normalMsg= function(content, type, title){
                var content = '<p class="error-content ' + type + '">' + content + '</p>',
                    self = this,
                    popTitle = title || '小提示';
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: popTitle,
                           type: 'pop-ju',
                           buttons: [{
                               text: '确定',
                               func: function(){
                                   this.hide();
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                               //self.reloadToTab();
                           }
                       });
                popup.show();
            };


            /**
             * 勋章Handler
             * 
             */

             this.medalHandle = (function() {

                var K = KISSY,
                    hrefMore = Ju.sys.Helper.getServerURI('i') + '/activity/activity.htm',
                    dom = document;

                var content = {

                    'lackMedal': '<div class="md-detail">'
                               + '<p>很遗憾，你不能享受勋章活动专享价，你还<br/>缺少：'
                               + '#{medalList}</p>'
                               + '<p class="md-tips state#{channelType}">你可以以普通聚划算价购买</p></div>',

                    'lackSum': '<div class="md-detail">' 
                              + '<p>很遗憾，你不能享受勋章活动专享价，你还<br/>缺少：'
                              + '<em class="J_MedalSum">#{lackHonorNum}</em>枚勋章。</p>' 
                              + '<p class="md-tips state#{channelType}">你可以以普通聚划算价购买</p></div>'
            }

                function isSingle() {
                    return false;
                }

                function tinyTemplate(template, source, strOnly) {
                    return template.replace(/#\{(.*?)\}/g, function(all, key) {
                        return strOnly ? source : (source[key] || '');
                    });
                }

                function concatMedalAnchor(medalList) {

                    var span = dom.createElement('SPAN');
            
                    span.className = 'md';
            
                    K.each(medalList, function(item) {
                        
                        span.appendChild(anchorGenerator(item));
                    });
                
                    return span.outerHTML || new XMLSerializer().serializeToString(span)
                    
                }

                function anchorGenerator(item) {

                   var anchor = dom.createElement('A'),
                       img = dom.createElement('IMG');

                   img.setAttribute('src', item.honorImgUrl);
                   img.setAttribute('alt', item.honorName);
                   img.style.width = '24px';
                   img.style.height = '24px';
                   anchor.setAttribute('target', '_blank');
                   anchor.setAttribute('href', Ju.sys.Helper.getServerURI('i') + '/honor/honor.htm?honorRule=' + item.honorRule);
                   anchor.setAttribute('title', item.honorName);
                   anchor.appendChild(img);

                   return anchor;
                }


                function popupGenerator(content) {

                    Ju.app.captcha.closeCCPopup();

                    return new Ju.sys.Popup({
                           width: 400,
                           content: content,
                           title: '提示',
                           hideHd: false,
                           hideFt: false,
                           type: 'pop-medal-buy',
                           autoShow: false,
                           useAnim: true,
                           buttons: [
                               {
                                   text: '查看更多活动',
                                   func: function(){
                                       window.open(hrefMore);
                                       this.hide();
                                   }
                           },
                               {
                                   text: '确定',
                                   func: function(){
                                       this.hide();
                                   }
                                }
                           ],
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                }



                 return {
                    'notEnoughMedal': notEnoughMedal,
                    'notEnoughMedalNum': notEnoughMedalNum
                 }

                 function notEnoughMedal(data) {

                    var medalList = concatMedalAnchor(data.lackHonorList),
                        htmlSnippet = tinyTemplate(content['lackMedal'], {'medalList': medalList, 'channelType': data.channelType}),
                        popup = popupGenerator(htmlSnippet);
                        
                        popup.show();
                 }


                 function notEnoughMedalNum(data) {
                    
                    var htmlSnippet = tinyTemplate(content['lackSum'], data),
                        popup = popupGenerator(htmlSnippet);

                        popup.show();
                 }

             })();


            /**
             * 没有支付宝卡通
             * data={"card":"招商银行卡通", "cardurl":"http://开通地址"}
             */
             this.noBankCard = function(data){
                var content = TB.common.formatMessage(TPLS.nobankcard, {card : data.card, cardurl: data.cardurl}),
                    self = this;
                var popup = new Ju.sys.Popup({
                           width: 485,
                           content: content,
                           title: '小提示',
                           hideHd: true,
                           hideFt: true,
                           type: 'pop-ju',
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();

             };
            /**
            this.reloadToTab = function(){
              //刷新页面定位到当前tab
                var urlHash = location.search,
                    theUl = Dom.getElementsByClassName('itemtabs', 'ul')[0],
                    theLis = theUl.getElementsByTagName('LI'),
                    juUrl = 'http://ju.' + Ju.sys.Helper.getDomain() + '/index.htm';

                for(var ind=0,len=theLis.length; ind<len; ind++) {
                   if(Dom.hasClass(theLis[ind], 'on')){
                       var theId = theLis[ind].getAttribute('data-tabid');

                       if(location.search !== "" ) {
                           var tabOn = Ju.sys.Helper.getQuery('itemId') || Ju.sys.Helper.getQuery('item_id');
                           if(!Ju.sys.Helper.getQuery('itemId') && !Ju.sys.Helper.getQuery('item_id')) {

                               var addOnSearch = "&item_id=" + theId;
                               if(!Ju.sys.Helper.getQuery('tracelog')) {
                                   addOnSearch = "&tracelog=jualert" + addOnSearch;
                               }
                               location.href = juUrl + location.search + addOnSearch;
                           }
                           else{
                               location.reload();
                           }
                       }
                       else{
                           location.href = juUrl + "?tracelog=jualert&item_id=" + theId;
                       }
                       break;
                   }
               }
            };
            */
            /**
             * 跳转
             */
             this.redirectTo = function(url){
                location.href=url;
             };

            /**
             * 系统繁忙提示
             */
            this.systemBusy = function(){
                var content = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p>'
                            + '<p class="busy"></p>',
                    self = this;

                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           keepShow:true,
                           buttons: [{
                               text: '继续团购',
                               func: function(){
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
                //添加倒计时
                var tuanBtn = popup.popup.getElementsByTagName('button')[0],
                    activeTime = (Math.floor(Math.random() * 6) + 3) * 1000;
                Dom.addClass(tuanBtn, 'unavil');
                //清除事件
                Event.purgeElement(tuanBtn, false, 'click');

                setTimeout(function(){
                    var contP = popup.popup.getElementsByTagName('p'),
                        closeButton = Dom.getElementsByClassName('btn-close', 'a', popup.popup)[0];
                    contP[0].innerHTML = "OK，你可以继续团购了。";
                    Dom.setStyle(contP[1], 'display', 'none' );
                    Dom.removeClass(tuanBtn, 'unavil');
                    Dom.setStyle(closeButton, 'display', 'block' );

                    Event.on(tuanBtn, 'click', function(){
                        popup.hide();
                        location.reload();
                        //刷新页面定位到当前tab
                        //self.reloadToTab();
                    });


                }, activeTime);
            };

            /**
             * 下单提示
             * 	url:商品URL 付款时间:checktime 卖方名称:data.seller 保证金:money  到账时间:receivingTime update fangyuan.yzh 20111220
             */
            this.newOrder = function(url, time, type,seller,receivingTime){
//            	seller='XXX';
//            	receivingTime = '即可到账';
                var outTime = new Date(),
                    theMin = outTime.getMinutes(),
                    self = this;
                //15分钟后过期
                outTime.setMinutes(theMin + 15);

                var timeStr = outTime.getHours() + ":" + outTime.getMinutes();

                var content ,
                	formatData = {checkTime : time },
                    popTitle = "小提示";
				if(seller  && receivingTime){
					formatData.seller = seller;
					formatData.receivingTime = receivingTime;
					formatData.hasSellerInfo = true;
				}
				else{
				    formatData.hasSellerInfo = false;
				}			
				TPLS.newOrder = KISSY.Template(TPLS.newOrder);//不会被重新编译而会去取缓存 fangyuan.yzh
				content = TPLS.newOrder.render(formatData);
                if(type == "whitelist"){
                    content = this.getWhiteListTip() + content;
                    popTitle = "回馈团购";
                }

                var popup = new Ju.sys.Popup({
                           width: 570,
                           content: content,
                           title: popTitle,
                           type: 'pop-ju',
                           buttons: [{
                               style:'check order',
                               text: '',
                               func: function(){
                                   this.hide();
                                   //跳至detail页面 @param url
                                   window.open(url);
                               }
                           }],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                               //self.reloadToTab();
                           }
                       });
                popup.show();


                TPLS.orderTimeout=  KISSY.Template(TPLS.orderTimeout);// TB.common.formatMessage(TPLS.orderTimeout);
				var timeoutCont = TPLS.orderTimeout.render({}),
                	TimoutBtn = '<button><span>确定</span></button>';

                var theTimer = Dom.getElementsByClassName('J_juItemTimer', 'div', popup.popup)[0];
                //倒计时
                //new Ju.app.timer(
                Ju.app.timer.create(
                        {
                            timeEnd: 0,
                            style:'1',
                            timeCurrent: 0,
                            timeLeft: 900000,
                            container: theTimer,
                            callback: function(){
                                var content = Dom.getElementsByClassName('order', 'div', popup.popup)[0];
                                content.innerHTML = timeoutCont;
                                var buttonDiv = Dom.getElementsByClassName('buttons', 'div', popup.popup)[0];
                                buttonDiv.innerHTML = TimoutBtn;
                                var theBtn = buttonDiv.getElementsByTagName('BUTTON')[0];
                                Event.on(theBtn, 'click', function(){
                                    popup.hide();
                                })
                            }
                        }
                    );
            };
            
            
            /**
             * 抢购下单提示
             */
            this.newDDOrder = function(data){
                var url = data.url,
                    self = this;

                var content =  TB.common.formatMessage(TPLS['DD_SUCCESS'],{
                    price:data.price,
                    url: data.url,
                    poll: data.poll
                }),
                    popTitle = "提示";

                var popup = new Ju.sys.Popup({
                           width: 410,
                           content: content,
                           title: popTitle,
                           type: 'pop-ju',
                           buttons: [{
                               style:'check order',
                               text: '',
                               func: function(){
                                   this.hide();
                                   //跳至detail页面 @param url
                                   window.open(url);
                               }
                           }],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                               //self.reloadToTab();
                           }
                       });
                popup.show();


                var timeoutCont = TB.common.formatMessage(TPLS.ddOrderTimeout);

                var TimoutBtn = '<button><span>确定</span></button>';

                var theTimer = Dom.getElementsByClassName('J_juItemTimer', 'div', popup.popup)[0];
                //倒计时
                //new Ju.app.timer(
                Ju.app.timer.create(
                        {
                            timeEnd: 0,
                            style:'1',
                            timeCurrent: 0,
                            timeLeft: 600000,
                            container: theTimer,
                            callback: function(){
                                var content = Dom.getElementsByClassName('dd-order', 'div', popup.popup)[0];
                                content.innerHTML = timeoutCont;
                                var buttonDiv = Dom.getElementsByClassName('buttons', 'div', popup.popup)[0];
                                buttonDiv.innerHTML = TimoutBtn;
                                var theBtn = buttonDiv.getElementsByTagName('BUTTON')[0];
                                Event.on(theBtn, 'click', function(){
                                    popup.hide();
                                })
                            }
                        }
                    );
            };
            
            /**
             * 已下单未付款
             * @param endTime 付款结束时间
             * @param startTime 当前时间
             */
            this.ordered = function(endTime, startTime, url){
                var leftTime = 0,
                    self = this;

                if(!endTime) {
                    leftTime = 900000;
                }
                else{
                    if(!startTime) {
                        startTime = new Date().getTime();
                    }
                    leftTime = endTime - startTime;
                }

//                var endDate = new Date();
//                endDate.setTime(endTime);
//                var timeStr = endDate.getHours() + ":" + endDate.getMinutes();
//
                var endDate = new Date();
                endDate.setTime(endTime);
                var minuteStr = endDate.getMinutes() + '';
                if(minuteStr.length==1) {
                    minuteStr = '0'+minuteStr;
                }
                var timeStr = endDate.getHours() + ":" + minuteStr;

                var content = TB.common.formatMessage(TPLS.ordered, {timeStr: timeStr});

                var popup = new Ju.sys.Popup({
                           width: 570,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           buttons: [{
                               style:'check',
                               text: '',
                               func: function(){
                                   this.hide();
                                   //去支付宝付款页面 @param url
                                   window.open(url);
                               }
                           }],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                               //self.reloadToTab();
                           }
                       });
                popup.show();

                if(leftTime < 0) {
                    var buttonDiv = Dom.getElementsByClassName('buttons', 'div', popup.popup)[0],
                        theBtn = buttonDiv.getElementsByTagName('BUTTON')[0];

                    Dom.addClass(theBtn,'unvil');
                    Event.removeListener(theBtn, 'click');
                }

                var theTimer = Dom.getElementsByClassName('J_juItemTimer', 'div', popup.popup)[0];
                //倒计时
                //new Ju.app.timer(
                Ju.app.timer.create(
                        {
                            timeEnd: 0,
                            timeCurrent: 0,
                            style:'1',
                            timeLeft: leftTime,
                            container: theTimer,
                            callback: function(){
                                var buttonDiv = Dom.getElementsByClassName('buttons', 'div', popup.popup)[0],
                                    theBtn = buttonDiv.getElementsByTagName('BUTTON')[0];

                                Dom.addClass(theBtn,'unvil');
                                Event.removeListener(theBtn, 'click');
                            }
                        }
                    );
            };
            /**
             * 异常
             */
            this.exception = function(){
                var content = '<p class="error-content cry"></p>'
                            + '<p class="busy"></p>';
                 var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '系统异常',
                           type: 'pop-ju',
                           buttons: [{
                               //style:'check',
                               text: '确定',
                               func: function(){
                                   //去支付宝付款页面 @param url
                                   //window.open(url);
                                   this.hide();
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
            };

            /**
             * 白名单
             */
            this.whitelist = function(){

            }

            /**
             * 取得白名单文案
             */
            this.getWhiteListTip = function(){
                //待改进
                var theTip = K.DOM.get('.J_TipTask');

                if(!theTip) return("");

                return (theTip.innerHTML);

            }

        this.captchaHandler.init();
        this.init(response);
        }




     S.app.buy = buy;
});/**
 * 商家交互组件
 * @param {Object} response
 */

Ju.add('app.seller', function(S) {
   
   var Event = YAHOO.util.Event, Dom = YAHOO.util.Dom, Lang = YAHOO.lang,
       K = KISSY, K_Dom = K.DOM, K_$ = K_Dom.get;

     var seller = function(config){
         
        var TPLS = {
            
        };
        
        //配置
        this.config = {
            uri : '',
            response : null,
            $signElems : {
                'signForm' : K_$('#J_SellerRegister'),
                'signMsgErr' : K_$('#J_SellerRegisterError'), 
                'signMsgSuc' : K_$('#J_SellerRegisterSuccess')
            }
        };

        /* add @ 11.05.04 */

        function isElement(elem) {
            return elem && elem.nodeType == 1;
        }

        function hideItem(elem) {
            isElement(elem) && K_Dom.addClass(elem, 'hideItem');
        }

        function showItem(elem) {
            isElement(elem) && K_Dom.removeClass(elem, 'hideItem');
        }

        this.onSignSuccess = function() {
            var elems = this.config.$signElems;
            hideItem(elems.signForm);
            showItem(elems.signMsgSuc);
        }

        this.onSignError = function() {
            var elems = this.config.$signElems;
            hideItem(elems.signForm);
            showItem(elems.signMsgErr);
        }
        
        this.config = Lang.merge(this.config, config || {});

        this.init = function(){
            var response = this.config.response,
                jsonStr = response.responseText ? response.responseText : response,
                jsonData = null;
            if(jsonStr !== "") {
                try {
                    jsonData = Lang.JSON.parse(jsonStr);
                    } catch (e) {
                        this.systemBusy();
                    }
            }
            if(!jsonData) return;
            //判断类型
            switch(jsonData.type) {

				case "SIGNERROR":
                    this.onSignError();
					break;

				case "SIGNSUCCESS":
                    this.onSignSuccess();
					break;

                case "ERROR" :
                    /*
                    if (this.config == ajaxUri.urlFirst) {
                        ItemUrlValidator.showErrorMsg();
                        break;
                    }
                    */
                    this.normalMsg(jsonData.msg, 'cry', jsonData);
                    break;

                case "SIGNSUCCESS" :
                    this.signSuccess();
                    break;
                    
                case "INFOEDITSUCCESS" :
                    this.infoEditSuccess();
                    break;
                    
                case "ADDSUCCESS" :
                    this.addSuccess(jsonData.msg.imgUrl, jsonData.msg.itemUrl);
                    break;
                    
                case "DETAILSUCCESS" :
                    this.detailSuccess();
                    break;
                    
                case "EDITSUCCESS" :
                    this.editSuccess();
                    break;
                    
                default : 
                    //this.systemBusy();
            }
            
             
        };
        
        
            /**
             * 普通提示
             * @param {String} content 内容html
             * @param {String} type  类型cry smile laugh
             * @param {Object} data 全部jsonData
             */
            this.normalMsg = function(content, type, data){

                /* @modify liuling 0520 */

                var plusMsg = ' <a href="http://bangpai.taobao.com/group/thread/613552-259312177.htm" target="_blank">查看报名要求</a>';
            
                if ('infoTag' in data && data.infoTag == 'true') {
                    content += plusMsg;
                }
                
                var content = '<p class="error-content ' + type + '">' + content + '</p>';



                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           buttons: [{
                               text: '确定',
                               func: function(){
                                   this.hide();
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
            };
            
            /**
             * 报名成功
             */
            this.signSuccess = function(){
                var self = this,
                    content = '<p class="error-content smile">恭喜您，报名成功。现在您可以立即发布参加聚划算的商品。</p>';
                
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           keepShow:true,
                           buttons: [{
                               text: '马上去发布',
                               func: function(){
                                   location.href = self.config.uri;
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
                //添加倒计时
                
                setTimeout(function(){
                    //alert(self.config.uri);
                    location.href = self.config.uri;
                }, 3000);
            };
            
            /**
             * 修改信息成功
             */
            this.infoEditSuccess = function(){
                var content = '<p class="error-content smile">个人信息编辑成功!</p>';
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           buttons: [{
                               text: '确定',
                               func: function(){
                                   this.hide();
                                   location.reload();
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
            };
            
            /**
             * 添加成功第一步
             */
            this.addSuccess = function(url, id){
                
                //提交隐藏表单
                var dataForm = Dom.get('J_GoodsAddData');
                
                dataForm['imgUrl'].value = url;
                dataForm['itemUrl'].value = id;
                dataForm.submit();
                //location.href = this.config.uri;
            };
            
            /**
             * 添加成功第二步
             */
            this.detailSuccess = function(){
                
                var formDetail = K_$('#J_SellerDetailForm'),
                    msgVerify = K_$('#J_MsgVerify'),
                    lis = K.makeArray(K_$('.j-auth-step').getElementsByTagName('LI')),
                    l = lis.length,
                    lastLi = lis[l - 1];

                K.each(lis, function(li) {
                    K_Dom.removeClass(li, 'current');
                });

                K_Dom.addClass(lastLi, 'current');

                hideItem(formDetail);
                showItem(msgVerify);
                
//                setTimeout(function(){
//                    location.href = self.config.uri;
//                }, 3000);
            };
            
            /**
             * 编辑商品
             */
            this.editSuccess = function(){
                var self = this,
                    content = '<p class="error-content smile">恭喜您，商品编辑成功成功。请等待审核，您可以在<a href="'+self.config.uri+'">“我的宝贝”</a>中看到商品审核进度。</p>';
                
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           keepShow:true,
                           buttons: [{
                               text: '去“我的宝贝”',
                               func: function(){
                                   location.href = self.config.uri;
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
                //添加倒计时
                
                setTimeout(function(){
                    location.href = self.config.uri;
                }, 3000);
            }
            
            /**
             * 系统繁忙提示
             */
            this.systemBusy = function(){
                var content = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p>'
                            + '<p class="busy"></p>';
                
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           keepShow:true,
                           buttons: [{
                               text: '继续操作',
                               func: function(){
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
                //添加倒计时
                var tuanBtn = popup.popup.getElementsByTagName('button')[0],
                    activeTime = (Math.floor(Math.random() * 6) + 3) * 1000;
                Dom.addClass(tuanBtn, 'unavil');
                //清除事件
                Event.purgeElement(tuanBtn, false, 'click');
                
                setTimeout(function(){
                    var contP = popup.popup.getElementsByTagName('p'),
                        closeButton = Dom.getElementsByClassName('btn-close', 'a', popup.popup)[0];
                    contP[0].innerHTML = "OK，你可以继续操作了。";
                    Dom.setStyle(contP[1], 'display', 'none' );
                    Dom.removeClass(tuanBtn, 'unavil');
                    Dom.setStyle(closeButton, 'display', 'block' );
                    
                    Event.on(tuanBtn, 'click', function(){
                        popup.hide();
                        //重新请求
                    });
                    
                    
                }, activeTime);
            };

        
        this.init(config);
        }


	var ajaxUri =  {
                buySubmit : '/json/tg/buyItemAction.htm', //API-购买提交地址
                sellerSign: '/json/tg/sellerAction.htm', //API-商家报名
                sellerEdit: '/json/tg/sellerEditAction.htm',
                goodsAdd : '/json/tg/uploadFirst.htm', //API-添加商品第一步
                goodsAdd2 : '/json/tg/itemPublishAction.htm', //API-添加商品第二步，详情
                goodsEdit : '/json/tg/itemEditAction.htm', //API-编辑商品
                pageGoodsAdd : '/tg/itemPublishFirst.htm', //PAGE-添加商品
                pageGoodsAdd2 : '/tg/itemPublishSecond.htm', //PAGE-添加商品第二步
                pageMyGoods  : '/tg/myItem.htm', //我的商品
                subscribeWidget: '/json/tg/subcribeWidget.htm', //收藏html异步请求
                cityList: '/json/tg/cityList.htm', //城市列表接口  /json/tg/cityList.htm 
                itemBuyCount: '/json/tg/cityList.htm', //城市列表接口  /json/tg/cityList.htm   
                listLocalApi : '/json/tg/lifeMore.htm', //拖动加载list ../api/lifeMore.htm
                urlFirst: '/json/tg/urlFirst.htm', //API-添加商品第一步itemUrl鉴证
                wangwangValidator: '/json/tg/wangWangCheck.htm?_input_charset=utf-8',//API-验证旺旺名是否存在
		    	checkLocalItemUrl:'/json/tg/localItemUrlCheck.htm'//本地化商品商品链接验证				
            },
        editorHandler = null,
        /**
         * 当前KISSY编辑器 fangyuan.yzh 2011 12 30 1.1.6
         */
        currentEditor = null,
		validate = {
		'init': function () {
		    
		    this.showEditor();

            this.formSign();
            
            this.formSignEdit();
            
            this.formAdd();
            
            this.formAddDet();
            
            this.formEdit();
			
			this.formAddLifeItem();

			this.formModify();
		},
		
		'showEditor': function(){
		    editorHandler = this.initEditor('#J_GoodsEditor');
		},

		'formSign': function() {

			var signSubmit = Dom.get('J_SellerSignSubmit');

            if(!signSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(signSubmit, 'form');
            if(!theForm) return;
            
            Event.on(signSubmit, 'click', function(e){
            Event.stopEvent(e);
                


                
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                })) {
                    return;
                }
                   
                var signValid = new Ju.app.formValidator();
                if(signValid.signValid()){
                    var testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.sellerSign,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :theForm, //form表单
                        callback : function(response){
                            Ju.app.seller({
                                uri : ajaxUri.pageGoodsAdd,
                                response:response
                            });
                        }
                    });
                }
    
            });
		},

		initEditor: function(textId) {
			//rebuild 2011 12 29 fangyuan.yzh 升级编辑器为1.1.6
			 Ju.sys.Helper.initEditor(textId,function(ed){
				currentEditor = ed[0];			 	
			 },{maxLen:25000});
//			var S= KISSY ,node = S.one(textId);
//			if(node && node.length){
//				var cfg = {
//			            attachForm:true,
//			            baseZIndex:10000,
//			            pluginConfig: {
//			                "flash":{
//			                    defaultWidth:"300",
//			                    defaultHeight:"300"
//			                },
//			                "resize":{
//			                    direction:["y"]
//			                }
//			            }
//		        } ;
//				KISSY.use("editor",function(S,Editor){
//					(KISSY.EditorPlugins && KISSY.EditorPlugins.Wordcount) || Ju.sys.Helper.initEditorWordcountPlugin();
//					//必须以node[0]传入Editor否则报错
//				    currentEditor = S.Editor(node[0],cfg).use(
//				    		"sourcearea,separator," +
//				    		"font,elementpaths,separator,color,separator," +
//				    		"image,smiley,link,separator," +
//				    		"list,indent,justify,preview,resize" 
//	                );
//	                KISSY.EditorPlugins.Wordcount.bind(n,25000,currentEditor);
//				});
//			}
//			return;
//			  //富文本框
//            var detailTextarea = Dom.get(textId);
//            if(!detailTextarea || (typeof KISSY === 'undefined')) {
//                return;
//            }
//            
//            //editorHandler.getContentDocData(); 
//            var editorHandler = KISSY.Editor(textId, {
//                base: "http://a.tbcdn.cn/kissy/1.0.4/build/editor/",
//                toolbar: [
//                    "source",
//                    "",
//                    "fontName", "fontSize", "bold", "italic", "underline", "strikeThrough", "foreColor", "backColor",
//                    "",
//                    "link", "smiley", "image",
//                    "",
//                    "insertOrderedList", "insertUnorderedList", "outdent", "indent", "justifyLeft", "justifyCenter", "justifyRight"
//                ],
//                statusbar: ["resize"],
//                pluginsConfig: {
//                    image: {
//                        tabs        : ["link"],
//                        upload: {
//                            actionUrl      : "/json/image_upload.htm",
//                            extraCode      : '<label><input name="waterMark" type="checkbox" checked="checked" />图片加水印，防盗用</label>'
//                        }
//                    },
//                    smiley: {
//                        tabs        : ["wangwang"]
//                    }
//                }
//            });
//            
//            //预览
//            Event.on('J_EditorPreview', 'click', function(e){
//                Event.stopEvent(e);
////                var iWidth = 640,    // 800 * 0.8,
////                    iHeight = 420,    // 600 * 0.7,
////                    iLeft = 80,	// (800 - 0.8 * 800) /2 = 800 * 0.1.
////                    HTML5_DTD = '<!doctype html>',
////                    DTD = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
////
////                try {
////                    var screen = window.screen;
////                    iWidth = Math.round(screen.width * 0.8);
////                    iHeight = Math.round(screen.height * 0.7);
////                    iLeft = Math.round(screen.width * 0.1);
////                } catch (e) {
////                }
////                var sHTML = editorHandler._prepareIFrameHtml().replace(/<body[^>]+>.+<\/body>/, "<body>\n" + editorHandler.getData() + "\n</body>");
////                var sOpenUrl = '';
////                var oWindow = window.open(sOpenUrl, null, 'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=' +
////                    iWidth + ',height=' + iHeight + ',left=' + iLeft);
////                oWindow.document.open();
////                oWindow.document.write(sHTML);
////                oWindow.document.close();
//
//
//                    var previewForm = Dom.get('J_PreviewForm');
//                    if(!previewForm) {
//                        return;
//                    }
//                    
//                    var previewTxt = previewForm.desc;
//                    
//                    previewTxt.value = editorHandler.getContentDocData(); 
//                    
//                    previewForm.submit();
//                    
//                    
//            })
//
//            
//            return editorHandler;
		},
	
		'formSignEdit': function() {
			var signSubmit = Dom.get('J_SellerSignEdit');

            if(!signSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(signSubmit, 'form');
            if(!theForm) return;
            
            Event.on(signSubmit, 'click', function(e){
                Event.stopEvent(e);
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                })) {
                    return;
                }

                
                var signValid = new Ju.app.formValidator();
                if(signValid.signValid()){
                    var testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.sellerEdit,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :theForm, //form表单
                        callback : function(response){
                            Ju.app.seller({
                                response:response
                            });
                        }
                    });
                }
                
                
            });
		},
		
		'formAddLifeItem': function() {
			//提交表单J_GoodsAddSubmit
            var addSubmit = Dom.get('J_LocalGoodsAddSubmit');
            if(!addSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(addSubmit, 'form');
            if(!theForm) return;
            
            Event.on(addSubmit, 'click', function(e){
                Event.stopEvent(e);
                
                
                if(Dom.hasClass(addSubmit, 'sub-unavil')) {
                    return;
                }
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback:true
//                    autoCallback: false,
//                    callback : function(){
//                        location.reload();
//                    }
                })) {
                    return;
                }
                var formValidator = new Ju.app.formValidator();
				if (formValidator.checkValue('url',Dom.get('localItemUrl').value)) {
					//提交表单 
					var dataForm = Dom.get('itemApplyAddItemForm');
					dataForm['itemUrl'].value = theForm['itemUrl'].value;
					dataForm['imgUrl'].value = theForm['imgUrl'].value;
					dataForm['picId'].value = theForm['picId'].value;
					dataForm.submit();

				}else{
					Dom.get('errItemMsgDiv').innerHTML = '<p id="J_LocalItemUrlMsg" class="error">请输入正确的商品链接</p>';
				}

				/*
                if (signValid.addValid()) {
                    var testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.goodsAdd,
                        source: ['imgUrl', 'itemUrl', 'picId', '_tb_token_'], //默认form
                        type: "POST", 
                        formEl :theForm, //form表单
                        callback : function(response){
                                        Ju.app.seller({
                                            uri : ajaxUri.pageGoodsAdd2,
                                            response:response
                                        });
                                    }
                    });
                }*/
                
                
            });
		},

		'formAdd': function() {
			//提交表单J_GoodsAddSubmit
            var addSubmit = Dom.get('J_GoodsAddSubmit');
            if(!addSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(addSubmit, 'form');
            if(!theForm) return;
            
            Event.on(addSubmit, 'click', function(e){
                Event.stopEvent(e);
                
                
                if(Dom.hasClass(addSubmit, 'sub-unavil')) {
                    return;
                }
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback:true
//                    autoCallback: false,
//                    callback : function(){
//                        location.reload();
//                    }
                })) {
                    return;
                }
                var signValid = new Ju.app.formValidator();
                if (signValid.addValid()) {
                    var testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.goodsAdd,
                        source: ['imgUrl', 'itemUrl', 'picId', '_tb_token_'], //默认form
                        type: "POST", 
                        formEl :theForm, //form表单
                        failture : function(){},
                        callback : function(response){
                                        Ju.app.seller({
                                            uri : ajaxUri.pageGoodsAdd2,
                                            response:response
                                        });
                                    }
                    });
                }
                
                
            });
		},

		'formAddDet': function() {
			 //提交表单J_GoodsDetSubmit
            var addSubmit = Dom.get('J_GoodsDetSubmit');
            if(!addSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(addSubmit, 'form');
            if(!theForm) return;
            
            this.setPriceOff();
            
            Event.on(addSubmit, 'click', function(e){
                
                Event.stopEvent(e);
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                })) {
                    return;
                }
                currentEditor && currentEditor.sync();
                //
                //alert(editorHandler.getData());
                //editorHandler.textarea.value = editorHandler.getContentDocData(); 
                //Dom.get('J_GoodsEditor').value = editorHandler.getData(); 
                var signValid = new Ju.app.formValidator();

                if (signValid.detailValid()) {
                    var testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.goodsAdd2,
                        source: "form", //字段name
                        type: "POST", 
                        formEl :theForm, //form表单
                        failture : function(){},
                        callback : function(response){
                                    Ju.app.seller({
                                        uri : ajaxUri.pageMyGoods,
                                        response:response
                                    });
                                }
                        
                    });
                }
                
            });
            
		},

		'formEdit': function() {
			 //提交表单J_GoodsDetEdit
            var addSubmit = Dom.get('J_GoodsDetEdit');
            if(!addSubmit) {
                addSubmit = Dom.get('J_GoodsReSubmit');
            };
            if(!addSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(addSubmit, 'form');
            if(!theForm) return;
            
            this.setPriceOff();
            

            Event.on(addSubmit, 'click', function(e){

             
                Event.stopEvent(e);
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                })) {
                    return;
                }
                
                currentEditor && currentEditor.sync();
                //
                //alert(editorHandler.getData());
                ///editorHandler.textarea.value = editorHandler.getContentDocData(); 
                //Dom.get('J_GoodsEditor').value = editorHandler.getData(); 
                var signValid = new Ju.app.formValidator();
                if (signValid.detailValid()) {
                    var testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.goodsEdit,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :theForm, //form表单
                        failture : function(){},
                        callback : function(response){
                                    Ju.app.seller({
                                        uri : ajaxUri.pageMyGoods,
                                        response:response
                                    });
                                }
                    });
                }
                
            });
		},



        'formModify': function() {

             var modSubmit = Dom.get('J_SellerModSubmit'),
                 modCancel = Dom.get('J_SellerModCancel');

             if(!modSubmit) return;
            
            var theForm = Dom.getAncestorByTagName(modSubmit, 'form');
            if(!theForm) return;


             Event.on(modSubmit, 'click', function(e){
                
                Event.stopEvent(e);
                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                })) {
                    return;
                }
              

                var modifyValid = new Ju.app.formValidator();

                if (modifyValid.modifyValid()) {
                    submitFormWithAsyn();
                }
            });


            Event.on(modCancel, 'click', function(e) {

                Event.stopEvent(e);
                window.close(true);
    
            });
        },

		'setPriceOff': function() {
			   
            var priceInp = Dom.get('J_FormDetPrice').getElementsByTagName('INPUT')[0],
                juPriceInp = Dom.get('J_FormDetJuPrice').getElementsByTagName('INPUT')[0];
            
            function setOff(){
                var priceReg = /^\d+(\.\d+)?$/;
                if(!juPriceInp.value || !priceInp.value) {
                    return;
                }
                if(priceReg.test(juPriceInp.value) && priceReg.test(priceInp.value)) {
                    var saleOff = Ju.sys.Helper.decimalDiv(juPriceInp.value, priceInp.value);
                    saleOff = saleOff * 10;
                    saleOff = saleOff.toString();
                    if(saleOff.indexOf('.') != -1) {
                        saleOff = saleOff.substring(0,saleOff.indexOf('.')+2);
                    }
                    
                    Dom.get('J_JuSaveOff').value = saleOff;
                }
            }
            if(priceInp && juPriceInp) {
                Event.on(priceInp, 'blur', function(){
                    setOff();
                })
                Event.on(juPriceInp, 'blur', function(){
                    setOff();
                })
            }
		}
		
	}
   

	/**
     * 剩余文字
     */

	;
	var textCounter = (function(global, K, Native, isIE, undef) {

		"use liuling.wb@taobao.com@11.04.28"

		var E = K.Event, D = KISSY.DOM, L = KISSY.lang, SLICE = Native.slice, debug = false,
		  

		TextCountDown = (function(global) {

			/**
			 * @Class: CountDown
			 */

			function _CountDown() {
				this.__init__.apply(this, SLICE.call(arguments));
			}
			
			_CountDown.prototype = {

				'constructor': _CountDown,

				'__init__': function(ancestor) {
					
					this.nodes = this.query(ancestor);
                    this.hooks = [];

					if (debug) {
						console.debug(this.nodes);
					}

					this.prepare();
				},

				'prepare': function() {

					var self = this;

					K.each(this.nodes, function(nodeInf) {

						var node = nodeInf.node;
						nodeInf.responder = TextCountDown.Utils.$(node.getAttribute('hook'));
						nodeInf.count = node.getAttribute('countDown');
						
						self.bind(nodeInf);
						
						self.sync(null, nodeInf);

					});
				},

				'sync': function(ev, nodeInf) {

					var text = nodeInf.node.value,
						remain = nodeInf.count - text.length;

					
					if (text.length > nodeInf.count) {
						this.onLimit(nodeInf);
						return;
					}

					nodeInf.responder.getElementsByTagName('strong')[0].innerHTML = remain;
                    nodeInf.responder.getElementsByTagName('i')[0].innerHTML = remain + '/' + nodeInf.count;

				},

                'addHook': function(fn) {

                    if ([].indexOf && this.hooks.indexOf(fn) == -1) {
                        this.hooks.push(fn);
                        return;
                    } 

                    this.hooks.push(fn);
                },

				'handler': function(ev, nodeInf) {
					this.sync(ev, nodeInf);
				},

				'bind': function(nodeInf) {
					var self = this;
					TextCountDown.Utils.addEvent(nodeInf.node, (isIE ? (isIE < 9 ? 'propertychange' : 'input') : 'input'), function(ev){self.handler(ev, nodeInf)}, false);
				},

				'query': function(ancestor) {

					var all = ancestor.getElementsByTagName('*'),
						settings = TextCountDown.defaultConfig,
						tgtAttr = settings.targetAttr,
						l = all.length;
						ret = [],
						cnt = null;

					(function __setup__(attr){

						while(l--) {
							if ((cnt = all[l]).getAttribute(attr) != null) {
								ret.push({
									'node': cnt,
									'responder': null,
									'count': 0
								});
							}
						}

					})(tgtAttr);

					return ret;
				},

				'onLimit': function(nodeInf) {
					
                    nodeInf.node.value = nodeInf.node.value.substring(0, nodeInf.count);
                    
                    K.each(this.hooks, function() {
                        //launch hooks...
                    });
				}

			}
	
			return {
				'create': init
			}

			function init(nodeList) {

                function _filter(arrayLike) {
                    
                   return K.filter(arrayLike, function(item) {
                        return item != undef;
                    });

                }

				if (!_filter(nodeList).length) {
				    
                    //throw new Error('TextCountDown(): 参数不能为空');
				    return;
                }

				var nodeList = TextCountDown.Utils.$A(nodeList),
					cntNode = null,
					l = nodeList.length,
					i = 0;

				 if(nodeList instanceof Array && nodeList.length) {

					for (; i < l; i++) {
						new _CountDown(nodeList[i]);
					}

				}	
			}

		 })(global);


		/**
		 * @Static
		 */

		TextCountDown.defaultConfig = {
			'targetAttr': 'countDown',
			'hookAttr': 'hook'
		}

		TextCountDown.Utils = {

			'addEvent': (function() {

				return window.attachEvent ? 
					function(elem, evType, handler) {

						var _fn = function() {
							handler.apply(elem, [global.event].concat(SLICE.call(arguments)));
						}

						elem.attachEvent('on' + evType, _fn);
					} :
					function(elem, evType, handler, isCapture) {
						elem.addEventListener(evType, handler, !!isCapture);	
					}

			})()
			,

			'$': function(elem) {
				return typeof elem == 'string' ? document.getElementById(elem) : elem;
			},
			
			'$A': K.makeArray,
	
			'trim': String.prototype.trim ? 
					function(string) {
						return String.prototype.trim.call(string);
				} : function(string) {
						return (string || '').replace(/^\s+|\s+$/g, '');
			}
		}


		function setup() {
			var $ = TextCountDown.Utils.$, parents = [$('J_FormDetName'), $('J_FormDetShortName')];		
			TextCountDown.create(parents);
		}

		
		return {
		    init : setup
		}


	})(window, KISSY, Array.prototype, (function(){return KISSY.UA.ie || false})(), undefined);

	 
	 
    /**
     * 本地化补充商品第一步itemUrl校验
     */
	 
	 var LifeItemUrlValidator = new function() {
          
        var router = ajaxUri['checkLocalItemUrl'],
            msgElem = null,
            inputElem = null,
            timer = null,
            interval = 2,
            preValue = '',
            self = this,
            addSubmit = null,
            theForm = null;
        
        function request() {

            var testRysc = new Ju.app.dataSub({
                subUrl: router,
                source: ['localItemUrl'], //only itemUrl
                type: "POST", 
                formEl :theForm, //form表单
                callback : callBack
            });
        }

        function bind() {
            Event.on(inputElem, 'blur', function() {
                checkSum();
            });
        }

        function render() {

            msgElem = K_$('#J_LocalItemUrlMsg');
            inputElem = K_$('#localItemUrl');
            addSubmit = Dom.get('J_LocalGoodsAddSubmit');
            theForm = Dom.get('addLocalItemActionForm');
        
        }

        function callBack(response) {
            
            /* @modify etai 0513 */
            
            /*
             Ju.app.seller({
                uri : router,
                response:response
             });
             */
             
             var jsonStr = response.responseText ? response.responseText : response,
                 jsonData = null;
                
                
	            if(jsonStr !== "") {
	                try {
	                    jsonData = KISSY.JSON.parse(jsonStr);
	                    } catch (e) {
	                        //this.systemBusy();
	                    }
	            }
	            if(!jsonData) return;
	            //判断类型
	            switch(jsonData.type) {
	            	case "ERROR" :
                        self.showErrorMsg(jsonData);
                        break;
                    case "SUCCESS" :
                        hideErrorMsg();
                        break;
                    default : 
                        this.systemBusy();
	            }
	            
	            
	           Ju.app.onPress = 0;
             
        }

        function hideErrorMsg() {
            K_Dom.removeClass(msgElem, 'error');
            K_Dom.removeClass(msgElem, 'tips');
            K_Dom.addClass(msgElem, 'cont');
            msgElem.innerHTML = '';
        }

        function checkSum() {

            var cntValue = K.trim(inputElem.value);
            
            if (!self.isFirstRequest) {
                if (!compare(cntValue)) {
                    request();
                }
            } else {
                self.isFirstRequest = false
                if (!compare(cntValue)) {
                    request();
                }
            }

            preValue = cntValue;    

        }   

        function compare(val) {
            return preValue == val;
        }

        this.isFirstRequest = true;

        this.showErrorMsg = function(jsonData) {

            var plusMsg = ' <a href="http://bangpai.taobao.com/group/thread/613552-259312177.htm" target="_blank">查看报名要求</a>',
                msg = jsonData.msg ? jsonData.msg : '请填写正确的url地址';

            if ('infoTag' in jsonData && jsonData.infoTag == "true") {
                msg += plusMsg;
            }

            K_Dom.removeClass(msgElem, 'cont');
            K_Dom.removeClass(msgElem, 'tips');
            K_Dom.addClass(msgElem, 'error');
            msgElem.innerHTML = msg;
            
            //timer = setTimeout(function() {
            //    hideErrorMsg();
            //}, interval * 1000)
        }

        this.init = function() {
			
            render();
            bind();
        }
    };
	
	
    /**
     * 添加商品第一步itemUrl校验
     */

     var ItemUrlValidator = new function() {
          
        var router = ajaxUri['urlFirst'],
            msgElem = null,
            inputElem = null,
            timer = null,
            interval = 2,
            preValue = '',
            self = this,
            addSubmit = null,
            theForm = null;
        
        function request() {

            var testRysc = new Ju.app.dataSub({
                subUrl: router,
                source: ['itemUrl'], //only itemUrl
                type: "POST", 
                formEl :theForm, //form表单
                callback : callBack
            });
        }

        function bind() {
            Event.on(inputElem, 'blur', function() {
                checkSum();
            });
        }

        function render() {

            msgElem = K_$('#J_ItemUrlMsg');
            inputElem = K_$('#itemUrl');
            addSubmit = Dom.get('J_GoodsAddSubmit');
            theForm = Dom.get('itemPublishFirstAction');
        
        }

        function callBack(response) {
            
            /* @modify etai 0513 */
            
            /*
             Ju.app.seller({
                uri : router,
                response:response
             });
             */
             
             var jsonStr = response.responseText ? response.responseText : response,
                 jsonData = null;
                
                
	            if(jsonStr !== "") {
	                try {
	                    jsonData = KISSY.JSON.parse(jsonStr);
	                    } catch (e) {
	                        //this.systemBusy();
	                    }
	            }
	            if(!jsonData) return;
	            //判断类型
	            switch(jsonData.type) {

	            	case "ERROR" :
                        self.showErrorMsg(jsonData);
                        break;

                    case "SUCCESS" :
                        hideErrorMsg();
                        break;

                    case "QCWARN":
                        qualityMsg(jsonData.qcType);
                        break;

                    default : 
                        this.systemBusy();
	            }
	            
	            
	           Ju.app.onPress = 0;
             
        }
        /*
         * 商家报名第二步，质检弹出层
         */

        function qualityMsg(qcType) {

            if(!qcType) return;

            var moreHref = qcType == 3 ? 'http://lp.taobao.com/go/act/lp-new/renzheng.php' : 'http://bangpai.taobao.com/group/thread/613552-264119526.htm',
                joinHref = qcType == 3 ? 'http://lp.taobao.com/go/act/loo/renzheng.php' : 'http://fuwu.taobao.com/serv/list.htm?tab_cat_id=50049405&style=list&current=0&is_multi_list=1&primary_sort_desc=true&cat_map_id=50049405&pv_list=13437630:117381303';    

            var tit = '<div class="ju-qc-msg">'
                    + '<h5>'
                    + '宝贝中若包含以下材质，则必须通过聚划算官方合作的质检公司质检合格 才能成功报名聚划算：</br>'
                    + '<span class="qc-item">'
                    + '真丝，桑蚕丝，羽绒，羊毛，羊绒，100%纯棉，猪，牛，羊皮'
                    + '</span></h5>';
            
            var content = '<p>现阶段聚划算质检暂时只针对高危材质商品，为了进一步把控产品品质，给消费者良好客户体验以及营造良好的市场环境，后续聚划算将进一步扩大质检，抽检范围，产品必须质检合格，才能通过审核，参加聚划算。'
                        + '<a href="' 
                        + moreHref
                        + '" target="_blank">详情请点击</a></p></div>';
            
            var popup = new Ju.sys.Popup({
                       width: 530,
                       content: tit + content,
                       title: '小提示',
                       type: 'pop-ju',
                       buttons: [{
                           text: '参加质检',
                           func: function(){
                               window.location.href = joinHref;
                           }
                       },{
                           text: '继续报名',
                           func: function(){
                               this.hide();
                           }
                       }],
                       autoShow: false,
                       useAnim: true,
                       onHide : function(){
                           Ju.app.onPress = 0;
                       }
                   });

            popup.show();
        };

        function systemBusy() {
            //alert('系统繁忙！请重试！');
        }

        function hideErrorMsg() {
            K_Dom.removeClass(msgElem, 'error');
            K_Dom.removeClass(msgElem, 'tips');
            K_Dom.addClass(msgElem, 'cont');
            msgElem.innerHTML = '';
        }

        function checkSum() {

            var cntValue = K.trim(inputElem.value);
            
            if (!self.isFirstRequest) {
                if (!compare(cntValue)) {
                    request();
                }
            } else {
                self.isFirstRequest = false
                if (!compare(cntValue)) {
                    request();
                }
            }

            preValue = cntValue;    

        }   

        function compare(val) {
            return preValue == val;
        }

        this.isFirstRequest = true;

        this.showErrorMsg = function(jsonData) {

            var plusMsg = ' <a href="http://bangpai.taobao.com/group/thread/613552-259312177.htm" target="_blank">查看报名要求</a>',
                msg = jsonData.msg ? jsonData.msg : '请填写正确的url地址';

            if ('infoTag' in jsonData && jsonData.infoTag == "true") {
                msg += plusMsg;
            }

            K_Dom.removeClass(msgElem, 'cont');
            K_Dom.removeClass(msgElem, 'tips');
            K_Dom.addClass(msgElem, 'error');
            msgElem.innerHTML = msg;
            
            //timer = setTimeout(function() {
            //    hideErrorMsg();
            //}, interval * 1000)
        }

        this.init = function() {
            render();
            bind();
        }
    };


    var WangWangValidator = new function() {
        
        var targetInput = null,
            handle = function(){},
            router = ajaxUri['wangwangValidator'];

        this.init = function() {
            render();
            bind();
        }

        function bind() {

            Event.on(targetInput, "blur", function(e) {

                var wwName = K.trim(targetInput.value);
                io(wwName);
            });
        }

        function render() {
            targetInput = K_$('#wwNick');
        }

        function io(name) {
           
             K.io.post(router,{ 

              "_tb_token_": getTokenValue(),
               "wwNick": name
                        
               }, function(response) {
                    handle(response, targetInput);
               });

        }

        this.registerHandle = function(fn) {
            handle = fn;
        }        

    }

    WangWangValidator.registerHandle(function(data, input) {

            K_$('#J_WWTips').innerHTML = '<p class="cont"></p>';

            var data = K.JSON.parse(data),
                msgElem = K_$('#J_WWTips').getElementsByTagName('p')[0],
                errMsg = '';

            if (data && "isWWExist" in data && data.isWWExist != 'true') {

                if (K.trim(input.value) == '') {
                    errMsg = '旺旺名不能为空';
                } else {
                    errMsg = '旺旺名不存在';
                }

                K_Dom.removeClass(msgElem, 'cont');
                K_Dom.removeClass(msgElem, 'tips');
                K_Dom.addClass(msgElem, 'error');
                msgElem.innerHTML = errMsg;
            } else {
                K_Dom.removeClass(msgElem, 'error');
                K_Dom.removeClass(msgElem, 'tips');
                K_Dom.addClass(msgElem, 'cont');
                msgElem.innerHTML = '';
            }

    });


        /* get Token */

    function getTokenValue() {
        return window.document.getElementsByName('_tb_token_')[0].value || '';          
    }


    
    /**
     * 外部调用
     */
    function sellerInit(){
        //poll折上折判断
        pollDiscount();
        validate.init();
        ItemUrlValidator.init();
		LifeItemUrlValidator.init();
        textCounter.init();
        WangWangValidator.init();
        Plus();
        Coupon.init();
    }
    
    /**
     * 处理poll discount
     */
    function pollDiscount(){
        
        if(!K_Dom.get('#J_FormDetPollDisc')) return;
        
        //check
        var check = K_Dom.get('#doubleDiscountSetting');
        //check.checked = false;
        
        K.Event.on(check, 'click', function(){
            if(check.checked){
                K_Dom.show('#J_FormDetPollDiscNum');
                K_Dom.show('#J_FormDetPollDiscPrice');
            }
            else{
                K_Dom.hide('#J_FormDetPollDiscNum');
                K_Dom.hide('#J_FormDetPollDiscPrice');
            }
        });
        
    }


    function Plus() {

        var E = K.Event;

        this.init = function() {
            bindGoodReSubmit();
        }

        //重新报名弹窗
        function bindGoodReSubmit() {

            var targetId = K_$('#J_GoodsReSubmit');

            if (targetId) {

                E.on(targetId, 'click', function(e) {

                    e.preventDefault();
                     
                     var plusAnchor = ' <a href="http://bangpai.taobao.com/group/thread/613552-259312177.htm" target="_blank">查看报名要求</a>',
                         content = '<p class="error-content smile">' + '注意！重新报名将不保存当前报名宝贝的任何信息，确定要重新报名么。'
 + plusAnchor + '</p>',
                         popup = new Ju.sys.Popup({
                               width: 394,
                               content: content,
                               title: '小提示',
                               type: 'pop-ju',
                               buttons: [{
                                   text: '确定',
                                   func: function(){
                                       window.location.href = '/tg/itemPublishFirst.htm';
                                   }
                               },{
                                   text: '取消',
                                   func: function() {
                                       this.hide();
                                   }
                               }],
                               autoShow: false,
                               useAnim: true,
                               onHide : function(){
                                   Ju.app.onPress = 0;
                               }
                       });
                      popup.show();

            
                });
            }
                         

        }
        

        this.init();

    }

    var Coupon = (function(K) {

        var Dom = K.DOM, $get = Dom.get , $query = Dom.query, Event = K.Event;

        var couponArea = null, hookEnabled = null, hookDisabled = null, couponItem = null, btnReset = null, hiddenItem = null;
    
        function condition() {
            return !!(couponArea = $get("#J_Coupon"));
        }

        function render() {
            hookEnabled = $get("#J_CouponSelect");
            hookDisabled = $get("#J_CouponDisable");
            cpItem = $get(".cp-item", couponArea);
            btnReset = $get(".btn-reset", couponArea);
            hiddenItem = $get("#cpId");
            bind();
        }

        function chooseCouponItem(popup) {    
            
            var couponLi = $get('.selected', popup),
                couponItem = $get('.lis-item', couponLi).innerHTML,
                dataId = couponLi.getAttribute('data-cpId');

            cpItem.innerHTML = couponItem;
            Dom.show(cpItem.parentNode);

            if (dataId) {
                hiddenItem.value = dataId;
            }
        }

        function bindEvent(popup) {

            var couponList = $query('li', popup);

            Event.on(couponList, 'click', function(e) {
                Dom.removeClass(couponList, 'selected');
                Dom.addClass(this, 'selected');
            });

            Event.on(couponList, 'mouseover', function(e) {
                Dom.addClass(this, 'hover');
            });

            Event.on(couponList, 'mouseout', function(e) {
                Dom.removeClass(this, 'hover');
            });
        }

        function bind() {
            Event.on(hookEnabled, 'click', handler);
            Event.on(hookDisabled, 'click', disabled);    
            Event.on(btnReset, 'click', function(e) {
                e.preventDefault();
                handler();
            });
        }

        function disabled() {
            hiddenItem.value = "";
            Dom.hide(cpItem.parentNode);
        }

        function handler() {

            var popupSnippet = $get('.cp-popup', couponArea).innerHTML;

            var popup = new Ju.sys.Popup({
                   width: 600,
                   content: popupSnippet,
                   title: '店铺优惠券',
                   type: 'pop-coupon',
                   buttons: [{
                       text: '确定',
                       func: function(){
                           chooseCouponItem(this.popup);
                           this.hide();
                       }
                   },{
                       text: '取消',
                       func: function(){
                           this.hide();
                       }
                   }],
                   autoShow: false,
                   useAnim: true,
                   onHide : function(){
                       
                   }
               });
             popup.show();

             bindEvent(popup.popup);
        }

        return {
            'init': init
        }

        function init() {
            if (condition()) {
                render();
            }
        }

    })(KISSY);
	//fangyuan.yzh daily 2011 12 21 
	K.ready(function(){
		var city = K.one('.ju-city');
		city && city.on('change',function(e){
			var node = K.one(this),
				dom = node[0],
				v = node.val(),
				key = 'data-url'
				dataURL = K.DOM.attr(dom.options.item(dom.selectedIndex),key),
				param = {};
			param[dom.name] = v;
			param = K.param(param);
			location.href = dataURL + param;
		});
		var statuss = K.one('.ju-status');
		statuss && statuss.on('change',function(e){
			var node = K.one(this),
				dom = node[0],
				v = node.val();
			var urlPra = K.unparam(location.search.slice(1));
			urlPra.status = v;
			location.search = K.param(urlPra);
			//location.href = location.path + K.param(urlPra);
			//location.href += ('&status=' + v);
		});
		
	});
	//fangyuan.yzh daily 2011 12 21
	S.app.seller = seller;
	
	S.app.sellerInit = sellerInit;


});
/**
 * 保证金
 * @param {Object} response
 */

Ju.add('app.deposit', function(S) {
   var K = KISSY, DOM = K.DOM, Event = K.Event;
   
     //var depositManager = (function(config){
         
        var depositSubUri = "/json/tg/freeningScreen.htm"; //保证金冻结接口
        var depositSupplementUri = "/json/tg/depositSupplementScreen.htm";  //保证金补缴接口
         
        var TPLS = {
            OK : '冻结成功!',
            SUPPLE_OK : '补缴成功!'
        };
        
        var deposit = {
            
            popup: null,
            onPress: 0,
            
            init : function(){
                this.depositSub();
                this.depositSupplentSub();
            },
            
            depositSub : function(){
                
	            var hooks = DOM.query('.J_DepositSubmit');
                if(!hooks) return;
                var self = this;
                Event.on(hooks, 'click', function(ev){
                    
                    ev.halt();
                    
					var hook  = this,
					warning   = hook.getAttribute('data-warning'),
					depositId = hook.getAttribute('data-depositid');
                    

                    if(!warning || !depositId) return;
                    
                    //登录判断
                    if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                    })) {
                        return;
                    }
                    
                    var content = "<p class='error-content smile' style='height:auto'>" + warning + "</p>";
                        self.popup = new Ju.sys.Popup({
                               width: 394,
                               content: content,
                               title: '小提示',
                               type: 'pop-ju',
                               buttons: [{
                                   text: '确定',
                                   func: function(){
                                       self.getFreezed(depositId);
                                   }
                               },{
                                   text: '取消',
                                   func: function(){
                                       this.hide();
                                   }
                               }],
                               autoShow: false,
                               useAnim: true
                           });
                    self.popup.show();
                    
    
                })
                
            },
            
            getFreezed: function(depositId){
                var self = this;
                
                if(self.onPress) return;
                
                self.onPress = 1;
                K.io.get(depositSubUri,
                    {
                        depositId : depositId,
                        time: (new Date()).getTime()
                    }, function(data) {
                        self.response(data);
                        self.onPress = 0;
                    });
            },
            
            response : function(response){
                
                if(!response) return;
                //console.log(response);
                var jsonStr = response.responseText ? response.responseText : response,
                    self = this,
                    jsonData = null;
                    
                if(jsonStr !== "") {
                    try {
                        jsonData = K.JSON.parse(jsonStr);
                        } catch (e) {
                            this.systemBusy();
                        }
                }
                if(!jsonData) return;
                
                if(self.popup){
                    self.popup.hide();
                }
                
                //判断类型
                switch(jsonData.type) {
                    case "OK":
                        this.normalMsg(TPLS.OK, 'smile', function(){
                            location.reload();
                        });
                        break;
                        
                    case "ERROR":
                        this.normalMsg(jsonData.data.msg, 'cry');
                        break;
                        
                    default : 
                        this.systemBusy();
                }
                
                 
            },
            
            depositSupplentSub : function(){
                
                var hooks = DOM.query('.J_DepositSupplementSubmit');
                if(!hooks) return;
                var self = this;
                Event.on(hooks, 'click', function(ev){
                    
                    ev.halt();
                    
                    var hook = this,
                        warning = hook.getAttribute('data-warning'),
                        depositId = hook.getAttribute('data-depositid');
                        depositMoney = hook.getAttribute('data-depositmoney');
                    
                    if(!warning || !depositId) return;
                    
                    //登录判断
                    if (!Ju.sys.Helper.checkAndShowLogin({
                    autoCallback: true
                    })) {
                        return;
                    }
                    
                    var content = "<p class='error-content smile' style='height:auto'>" + warning + "</p>";
                        self.popup = new Ju.sys.Popup({
                               width: 394,
                               content: content,
                               title: '小提示',
                               type: 'pop-ju',
                               buttons: [{
                                   text: '确定',
                                   func: function(){
                                       self.getSuppled(depositId, depositMoney);
                                   }
                               },{
                                   text: '取消',
                                   func: function(){
                                       this.hide();
                                   }
                               }],
                               autoShow: false,
                               useAnim: true
                           });
                    self.popup.show();
                    
    
                })
                
            },
            
            getSuppled: function(depositId, depositMoney){
                var self = this;
                
                if(self.onPress) return;
                
                self.onPress = 1;
                K.io.get(depositSupplementUri,
                    {
                        depositId : depositId,
                        depositMoney : depositMoney,
                        time: (new Date()).getTime()
                    }, function(data) {
                        self.supplementResponse(data);
                        self.onPress = 0;
                    });
            },
            
            supplementResponse : function(response){
                
                if(!response) return;
                //console.log(response);
                var jsonStr = response.responseText ? response.responseText : response,
                    self = this,
                    jsonData = null;
                    
                if(jsonStr !== "") {
                    try {
                        jsonData = K.JSON.parse(jsonStr);
                        } catch (e) {
                            this.systemBusy();
                        }
                }
                if(!jsonData) return;
                
                if(self.popup){
                    self.popup.hide();
                }
                
                //判断类型
                switch(jsonData.type) {
                    case "OK":
                        this.normalMsg(TPLS.SUPPLE_OK, 'smile', function(){
                            location.reload();
                        });
                        break;
                        
                    case "ERROR":
                        this.normalMsg(jsonData.data.msg, 'cry');
                        break;
                        
                    default : 
                        this.systemBusy();
                }
                
                 
            },
                /**
                 * 普通提示
                 * @param {String} content 内容html
                 * @param {String} type  类型cry smile laugh
                 * @param {Object} data 全部jsonData
                 */
                normalMsg : function(content, type, callback){
                    
                    var content = '<p class="error-content ' + type + '">' + content + '</p>';
    
                    self.popup = new Ju.sys.Popup({
                               width: 394,
                               content: content,
                               title: '小提示',
                               type: 'pop-ju',
                               buttons: [{
                                   text: '确定',
                                   func: function(){
                                       this.hide();
                                       
                                       if(callback){
                                           callback && callback.call(this);
                                       }
                                       
                                   }
                               }],
                               autoShow: false,
                               useAnim: true,
                               onHide : function(){
                                   Ju.app.onPress = 0;
                               }
                           });
                    self.popup.show();
                },
                
                /**
                 * 系统繁忙提示
                 */
                systemBusy : function(){
                    var content = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p>'
                                + '<p class="busy"></p>';
                    
                    self.popup = new Ju.sys.Popup({
                               width: 394,
                               content: content,
                               title: '小提示',
                               type: 'pop-ju',
                               keepShow:true,
                               buttons: [{
                                   text: '继续操作',
                                   func: function(){
                                   }
                               }],
                               autoShow: false,
                               useAnim: true,
                               onHide : function(){
                                   Ju.app.onPress = 0;
                               }
                           });
                    self.popup.show();
                    //添加倒计时
                    var tuanBtn = self.popup.popup.getElementsByTagName('button')[0],
                        activeTime = (Math.floor(Math.random() * 6) + 3) * 1000,
                        YEvent = YAHOO.util.Event;
                    DOM.addClass(tuanBtn, 'unavil');
                    //清除事件
                    YEvent.purgeElement(tuanBtn, false, 'click');
                    
                    setTimeout(function(){
                        var contP = self.popup.popup.getElementsByTagName('p'),
                            closeButton = DOM.getElementsByClassName('btn-close', 'a', self.popup.popup)[0];
                        contP[0].innerHTML = "OK，你可以继续操作了。";
                        DOM.setStyle(contP[1], 'display', 'none' );
                        DOM.removeClass(tuanBtn, 'unavil');
                        DOM.setStyle(closeButton, 'display', 'block' );
                        
                        YEvent.on(tuanBtn, 'click', function(){
                            self.popup.hide();
                            //重新请求
                        });
                        
                        
                    }, activeTime);
                }
                
        };
        
        // return {
        //     
        //     init: deposit.init,
        //     
        //     response: deposit.response
        //     
        // }
        
        //})();

	S.app.deposit = deposit;

});
Ju.use(function() {
    var D = YAHOO.util.Dom,
        E = YAHOO.util.Event;

    var UserCheck = window.UserCheck = TB.namespace("UserCheck"),
        snsDomain = 'jianghu.' + Ju.sys.Helper.getDomain(),

        SPI = Ju.sys.Helper.getServerURI('ju')+"/json/tg/isLogin.htm" + "?callback=TB.UserCheck.onload&t=" + new Date().getTime(),

        // 弹出框的配置
        checkConfig = {
        invitekey:0,
        inviterId:0,
        appId:0,
            width : 750,
            height : 518
        };


    var popupDialog = null;


    YAHOO.lang.augmentObject(UserCheck, {
        /**
         * 初始化
         * @param   {Object}    config      这个参数会原样传送给 callback，字段如下：
         *                                  callback    回调函数
         *                                  width       iframe 的宽度
         *                                  height      iframe 的高度
         *                                  isLogin     检查是否登录
         */
        init : function(config) {
        
            YAHOO.lang.augmentObject(checkConfig, config, true);

            YAHOO.util.Get.script(TB.common.formatMessage(SPI, checkConfig), {
                charset: 'gbk',
                timeout: 1000
            });
        },

        onload : function(data) {
            
            //@modified etai 2011.11.25
            //if (data.result === "true") {
                //checkConfig.callback && checkConfig.callback(checkConfig);

            //} else {
                // 重写向地址
                //var iframeUrl = 'http://'+snsDomain+'/interact/invite_real_name.htm?invitekey={invitekey}&inviterId={inviterId}&appId={appId}&isHeadSet={isHeadSet}&url='+location.href;

                //var iframeUrl = 'https://login.'+ Ju.sys.Helper.getDomain() +'/member/miniLogin.htm?TPL_redirect_url='+encodeURIComponent('http://ju.'+Ju.sys.Helper.getDomain()+'/tg/loginSuccess.htm');
                
                var iframeUrl = 'https://login.'+ Ju.sys.Helper.getDomain() +'/member/login.jhtml?style=mini&is_ignore=false&redirect_url='+encodeURIComponent('http://ju.'+Ju.sys.Helper.getDomain()+'/tg/loginSuccess.htm');

                
                popupDialog = new Ju.sys.Popup({
                    iframeShim:YAHOO.env.ua.ie>0?true:false,  
                    title : "",
                    wrapId : 'J_LoginPopup',
                    width: checkConfig.width,
                    // 对话框宽度
                    hideMask: false,
                    // 是否显示遮层
                    content: TB.common.formatMessage('<iframe width="{width}" height="{height}" style="width:{width}px;height:{height}px;" frameborder="0" scrolling="no" src="{url}" name="frameContent" id="frameContent"></iframe>', {
                        width : checkConfig.width,
                        height : checkConfig.height,
                        url : TB.common.formatMessage(iframeUrl, checkConfig)
                    }),
                    // 模态框文案，支持 HTML
                    type: 'white',
                    // 模块框额外样式
                    focus: 1,
                    // 焦点的按钮位置
                    buttons: [],
                    autoShow: true,
                    // 是否立即弹出
                    useAnim: true,
                    // 是否显示动画
                    onShow: function() {
                        var icon = D.getElementsByClassName("icon", "SPAN", this.popup);
                        D.setStyle(icon, "display", "none");
                        D.setStyle(this.popup, 'top', '10%');

                        var bd = D.getElementsByClassName('bd', 'div', this.popup);
                        D.setStyle(bd, 'padding', '0px');
                        D.setStyle(bd, 'overflow', 'hidden');

            //var hd = D.getElementsByClassName('hd', 'div', this.popup);
                        //D.setStyle(hd, 'display', 'none');

            var closeBtn = D.getElementsByClassName("btn-close", "A", this.popup);
            D.setStyle(closeBtn, "display", "block");
                    },
            onHide : function() {
            //var iframe = this.popup.getElementsByTagName("iframe")[0];
            //iframe.parentNode.removeChild(iframe);

            //document.body.removeChild(this.wrapper);
            }
                });
            //}
        },

        show : function() {
            popupDialog.show();
        },

        /**
         * 隐藏弹出框
         */
        hide : function() {
            if(D.get('isLoginForJu')){
                D.get('isLoginForJu').value = "1";
            }
            popupDialog.hide();
        checkConfig.callback && checkConfig.callback(checkConfig);
        },

        /**
         * 显示头部及关闭按钮
         */
        showClose : function() {
            var closeBtn = D.getElementsByClassName("btn-close", "A", popupDialog.popup);
            D.setStyle(closeBtn, "display", "block");
        },

        /**
         * 隐藏头部及关闭按钮
         */
        hideClose : function() {
            var closeBtn = D.getElementsByClassName("btn-close", "A", popupDialog.popup);
            D.setStyle(closeBtn, "display", "none");
        }
    });
    
});
YAHOO.util.Event.throwErrors = true;/**
 * 聚划算本地化服务组件
 * @author etai
 * @author yumen 2010.12.30 添加地图大图功能
 */

Ju.add('app.local', function(J) {
    var S = KISSY, DOM = S.DOM, Event = S.Event,
    
        localService = function(config){
        
        var mapObj = {}, mapPois = [], mapMarkers = [] ,btnBigMap;

        /**
         * 图标
         */
        var imgIcons = [
                        'http://img04.taobaocdn.com/tps/i4/T1YRdQXhlpXXXXXXXX.png',
                        'http://img03.taobaocdn.com/tps/i3/T1ok4QXclBXXXXXXXX.png',
                        'http://img01.taobaocdn.com/tps/i1/T1lQ4QXc0BXXXXXXXX.png',
                        'http://img04.taobaocdn.com/tps/i4/T1jk4QXdxBXXXXXXXX.png',
                        'http://img04.taobaocdn.com/tps/i4/T1pQ4QXb8BXXXXXXXX.png',
                        'http://img02.taobaocdn.com/tps/i2/T1lk4QXc8BXXXXXXXX.png'
        ];        
            
        var self = this;
        
        /**
         * 代理
         */    
        function delegate(ind) {
            this.clickFunc = function() {
                self.onMarkerClick(ind);
            }
            this.outFunc = function(){
                self.onMarkerOut(ind);
            }
        } 
        
        /**
         * 初始化
         */
        this.init = function(){

                //地图初始化
                self.mapInit();
                
                //处理列表
                self.dealList();
            
        };
        
        /**
         * 初始化地图
         */
        this.mapInit = function(){
            mapObj = new AliMap("J_MapBox");
            var control=new AliMapLargeControl({hidePanBtn:true,hideZoomBtn:false,hideZoomBar:false});
			
            mapObj.addControl(control);
            control.setPosition({x:5,y:5});
            
            var mControl=new AliMapMouseWheelControl();
            mapObj.addControl(mControl);
//            
//            S.Event.on('#J_MapBox', 'focusin', function(ev){
//                ev.stopPropagation();
//                mapObj.addControl(mControl);
//            });
//            S.Event.on('#J_MapBox', 'focusout', function(){
//                ev.stopPropagation();
//                mapObj.removeControl(mControl);
//            });
            
		    

                
            if(!self.getPois()) {
                mapObj.centerAndZoom(new AliLatLng(30.238747,120.14532),15);
                return;
            };
            //增加地图标注
            self.addMarkers();
            //地图中心与缩放级别
            mapObj.centerAndZoom(self.getCenter(),self.getZoom());
            
            //IE的scroll问题
            Event.on(document, 'mousewheel', function(ev){
                if( DOM.contains('#J_MapBox', ev.target) || ev.target == DOM.get('#J_MapBox')){
                    ev.halt();
                }
            })
			
			//添加按钮，全屏显示大地图
			self.addBtnBigMap();
			
        };
        
        /**
         * 信息列表处理
         */
        this.dealList = function(showInd){
            var theList = S.DOM.get('#J_MapList');
            if(!theList) return;
            
            var listConts = S.DOM.query('.info', theList),
                listLis = S.DOM.query('li', theList);
                
            function showOne(ind){
                S.DOM.hide(listConts);
                S.DOM.removeClass(listLis, 'on');
                S.DOM.show(listConts[ind]);
                S.DOM.addClass(listLis[ind], 'on');
            }
            
            if((typeof showInd) !== 'undefined') {
                showOne(showInd);
                return;
            }
            
            showOne(0);
            
            for(var ind=0, len = listLis.length; ind < len; ind++) {
                var dele = new delegate(ind);
                AliEvent.bind(listLis[ind],"click",mapMarkers[ind],dele.clickFunc);

            }
            
            if(listConts.length == 1) {
                return;
            }
            else if(listConts.length > 4) {
                this.showMoreSub();
            }
            
            S.Event.on(theList, 'click', function(ev){
                
                var target = ev.target;
                if(target.tagName === 'H4') {
                    S.DOM.hide(listConts);
                    S.DOM.removeClass(listLis, 'on');
                    S.DOM.addClass(target.parentNode, 'on');
                    S.DOM.show(S.DOM.get('.info', target.parentNode));
  
                }
                
            });
            
        }
        /**
         * 显示更多分店
         */
        this.showMoreSub = function(){
            var theList = S.DOM.get('#J_MapList');
            if(!theList) return; 
            
            var theMore = S.DOM.get('.more-branches', theList.parentNode);
            if(!theMore) return;
            
            S.DOM.show(theMore);
            var theLink = theMore.getElementsByTagName('A')[0],
                self = this,
                listLis = S.DOM.query('li', theList);
                
            function toggleList(show){
            
                if(show) {
                    for(var ind=4, len = listLis.length; ind< len; ind++) {
                        S.DOM.show(listLis[ind]);
                    }
                }
                else{
                    for(var ind=4, len = listLis.length; ind< len; ind++) {
                        S.DOM.hide(listLis[ind]);
                    }
                }
                
            }
            
            toggleList(0);
            
            S.Event.on(theMore, 'click', function(ev){
                ev.preventDefault();
                if(theLink.innerHTML == '收起') {
                    toggleList(0);
                    self.dealList(0);
                    
                    //处理视窗显示
                    if(S.DOM.scrollTop()>930) {
                        S.DOM.scrollIntoView('#J_MapBox');
                    }
                    
                    
                    theLink.innerHTML = '更多分店';
                }
                else{
                    toggleList(1);
                    theLink.innerHTML = '收起';
                }
                
            })
            
            
        }
        
        /**
         * 点击marker响应
         */
        this.onMarkerClick = function(ind) {
            var theTitle = config.pois[ind].n ? config.pois[ind].n : '',
                theDesc = (config.pois[ind].a ? '地址: ' + config.pois[ind].a + '<br />' : '')
                        + (config.pois[ind].t ? '电话: ' + config.pois[ind].t + '<br />' : '')
                        + (config.pois[ind].j ? '交通: ' + config.pois[ind].j : '');
                
            mapMarkers[ind].openInfoWindow(theTitle, '<div style="width:200px">'+theDesc+'</div>');
            mapObj.panTo(mapPois[ind]);
        };
        
        this.onMarkerOut = function(ind) {
            apMarkers[ind].closeInfoWindow();
        }
        
        /**
         * 获取点坐标
         */
        this.getPois = function(){
            if(!config.pois || config.pois.length == 0) {
                return false;
            }
            
            for(var ind=0, len=config.pois.length; ind<len; ind++) {
                var latlng = config.pois[ind].p.split(',');
                mapPois.push(new AliLatLng(latlng[0], latlng[1]));
            }
            
            return true;
            
        }
        
        /**
         * 地图加点
         */
        this.addMarkers = function(){
        

            for(var ind = 0, len = mapPois.length; ind<len; ind++) {
                
                //var theIcon = new AliIcon(imgIcons[0], new AliPoint(27,29), new AliPoint(0,29));
               
				//var marker = new AliMarker(mapPois[ind], {
                //    icon : theIcon
                //});    
				//原先的Icon mark 修改为 div + style.background-image
				var marker = new AliPointOverlay(mapPois[ind],ind+1,{
				    offset:{x:0,y:-29},
					style:{
						width:'27px',
						height:'29px',
						lineHeight:'24px',
						textAlign:'center',
						background:'url('+imgIcons[0]+')',
						cursor:'pointer',
						fontWeight:'bold',
						color:'#FFFFFF'}
				});
				
				
                mapMarkers[ind] = marker;
                //将该标记添加到地图
                mapObj.addOverlay(marker);
                var dele = new delegate(ind);
                AliEvent.bind(marker,"click",marker,dele.clickFunc);
            }
            //var theInd = document.createElement('span');
            //theInd.innerHTML = '1';
            //mapMarkers[0].div.innerHTML = '1';
        }
        
		/**
		 * 地图加按钮，点击显示全屏大地图
		 */
		this.addBtnBigMap = function(){
			var __btnBigMap = DOM.create('<div class="btn-bigmap">查看大图</div>');
			Event.add(__btnBigMap,'click',self.onBigMapClick);
			document.getElementById('J_MapBox').appendChild(__btnBigMap);
			
			//暂时这么处理 保存按钮对象
			btnBigMap = __btnBigMap;
		}
		
		/*
		 *点击全屏按钮响应
		 */
		this.onBigMapClick = function(){

			var smallMapContainer = S.get('.infomap'),
				bigMapContainer = DOM.create('<div class="infomap clearfix"></div>');
			//进入大地图模式		
			self.modeBigMap(smallMapContainer,bigMapContainer);
				
			var popup = new Ju.sys.Popup({
				width:850,
				content:bigMapContainer,
				type:'pop-map',
				buttons:[{
					text:'关闭',
					func:function(){
						this.hide();
					}
				}],
				onHide: function(){
					//进入小地图模式
					self.modeSmallMap(smallMapContainer,bigMapContainer);
					
					//移除  需优化
					document.body.removeChild(document.body.childNodes[document.body.childNodes.length-1]);
				}
			});
			
			popup.show();
		}
		/*
		 *进入小地图模式
		 */
		this.modeSmallMap = function(smallMapContainer,bigMapContainer){
			//找到地图节点
			var mapBody = S.get('#J_MapBox',bigMapContainer),
				style_bigMapContainer = bigMapContainer.style;
			//店铺列表节点		
			//	mapList = S.get('.maplist',bigMapContainer);
			
			//为地图的容器设高度，避免地图被移除时，容器失去高度，破坏原来流布局
			smallMapContainer.style.height = 'auto';
			
			smallMapContainer.appendChild(mapBody);
			//smallMapContainer.appendChild(mapList);
			
			//进行小地图特有属性配置
			btnBigMap.style.display = 'block';
			mapBody.style.width = '';
			mapBody.style.height= '';
            setTimeout(function(){
                mapObj.setViewSize(new AliPoint((mapBody.offsetWidth-2),210));
            }, 100);
			
		
			//注销window 的 resize事件
			Event.remove(window, 'resize', self.resizeMapBody);
		}
		
		/*
		 *进入大地图模式
		 */
		this.modeBigMap = function(smallMapContainer,bigMapContainer){
			//找到地图节点
			var mapBody = S.get('#J_MapBox',smallMapContainer),
				currentHeight = 0,
				style_bigMapContainer = bigMapContainer.style;
			//店铺列表节点
			//	mapList = S.get('.maplist',smallMapContainer);
			
			smallMapContainer.style.height =  mapBody.offsetHeight + 22 + 'px';
			
			bigMapContainer.appendChild(mapBody);
			//bigMapContainer.appendChild(mapList);
			//进行大地图特有属性配置
			btnBigMap.style.display = 'none';
			style_bigMapContainer.width = 'auto';
			style_bigMapContainer.padding = '0';
			style_bigMapContainer.border = 'none';
			style_bigMapContainer.margin = '0';
			currentHeight = document.documentElement.clientHeight;
			mapBody.style.width = '800px';
			if(currentHeight < 780 && currentHeight > 350 ){
				mapBody.style.height = currentHeight - 180 + 'px';
				mapObj.setViewSize(new AliPoint(800,currentHeight-180));
			}
			else{
				mapBody.style.height = '800px';
				mapObj.setViewSize(new AliPoint(800,600));
			}
			
			//注册window 的 resize事件
			Event.on(window , 'resize', self.resizeMapBody);
		}
		/**
		  * window 的 resize 函数
		  */
		this.resizeMapBody = function(){
			var currentHeight = document.documentElement.clientHeight,
				mapBox = S.get('#J_MapBox');
				
			if(currentHeight > 780){
				if(parseInt(mapBox.style.height) < 600 ){
					mapBox.style.height = '600px';
					mapObj.setViewSize(new AliPoint(800,600));
				}
				return;
			}
			else if(currentHeight < 350 ){
				if(parseInt(mapBox.style.height) > 170 ){
					mapBox.style.height = '170px';
					mapObj.setViewSize(new AliPoint(800,170));
				}
				return ;
			}
			mapBox.style.height = currentHeight - 180 + 'px';
			mapObj.setViewSize(new AliPoint(800,currentHeight-180));
		}
		
		
        /**
         * 返回所有点的中心点
         */
        this.getCenter = function(){
           if(!mapPois || mapPois.length <= 0)
           {
              return new AliLatLng(30.261875,120.155679);
           }
           var bounds = AliBounds.getLatLngBounds(mapPois);
           return bounds.getCenter();
        }
        
        /**
         * 返回所有点的缩放比例
         */
        this.getZoom = function(){
           if(!mapPois || mapPois.length <= 0)
           {
              return "15";
           }
           var bounds = AliBounds.getLatLngBounds(mapPois);
           return mapObj.getBoundsZoom(bounds, 10) ;
        }


        S.getScript('http://api.ditu.aliyun.com/map.js', function(){
            //alert(1);
            setTimeout(function(){
                self.init();
            },0)
        });
        
        
    }
    
    J.app.local = localService;
});/**
 * 更多团购
 */

Ju.add('app.more', function(J) {

    var S = KISSY, DOM = S.DOM,
    itemCountApi = '/json/itemPaidCount.htm'; ///../api/item-count.php

    var more = function() {

        var listGroups = S.query('.more-group');

        //添加滚动加载事件
        function loadList() {
            S.use('datalazyload', function() {
                var lazy0 = new S.DataLazyload();
                var lazy = new S.DataLazyload(
                {
                    diff:-50
                }
                );

                //
                S.each(listGroups, function(group, ind) {

                    //奇数触发
                    if(ind % 2 == 0) {

                        lazy.addCallback(group, function(el) {

                            getListData(ind);

                        })
                    }

                })
            });
        }

        //取得数据
        function getListData(ind) {

            var idArray = [],
            countSpans = S.DOM.query('.J_BuyCount', listGroups[ind]);

            if(listGroups[ind+1]) {
                countSpans = countSpans.concat(S.DOM.query('.J_BuyCount', listGroups[ind+1]));
            }

            S.each(countSpans, function(el) {
                if(el.getAttribute('data-ItemId') !== "") {
                    idArray.push(el.getAttribute('data-ItemId'));
                }

            })
            //alert(ind);
            //jsonp取购买数
            var keyStr = idArray.join('_');
            
            if(keyStr == ""){
                return;
            }
            
            S.io({
                url: itemCountApi,
                data: {keys:keyStr},
                success: function(data) {
                    S.each(countSpans, function(el) {
                        var itemId = el.getAttribute('data-ItemId');
                        if(itemId !== "" && data[itemId]!="0") {
                            el.innerHTML = '<strong>'+ data[itemId] +'</strong>人已购买';
                        }
                    })
                },
                dataType:'jsonp',
                jsonpCallback :'jsonp'+S.now()+ind
            });
            
            // S.jsonp(itemCountApi,
            //             {keys:keyStr, jsonpCallback:'jsonp'+S.now()+ind}, function(data) {
            //                 S.each(countSpans, function(el) {
            //                     if(el.getAttribute('data-ItemId') !== "") {
            //                         el.innerHTML = '<strong>'+ data[el.getAttribute('data-ItemId')] +'</strong>候-p';
            //                     }
            //                 })
            //             }
            //             );

        }

        //分割价格小数点
        function splitPrice() {
            DOM.query('.J_MorePrice').each( function(item) {

                var price = item.innerHTML + "",
                prices = price.split('.');

                item.innerHTML = prices[0] + '<span>.' + prices[1] + '</span>';

                if(prices[0].substr(10) * 1 >= 1000000) {
                    DOM.addClass(item,'large');
                }

            });
        }
        

        function init() {
            S.ready( function(S) {

                splitPrice();
                //
                S.use('datalazyload', function() {
                    
                    var lazy0 = new S.DataLazyload();
                    
                });


                addTagTitle();
                
                //firstLoad();
                //loadList();
                
            });
        }

        //添加图标title

        function addTagTitle() {

            var slice = function(){},
                itemTags = null,
                titleMap = {
                    'lp'  : '良品',
                    'sc'  : '淘宝商城',
                    'jxx' : '聚孝顺',
                    'd2c' : '聚定制',
                    'jjz' : '聚家装',
                    'jmp' : '聚名品',
                    'sdfh': '闪电发货',
                    'zj'  : '该商品通过第三方质检',
                    'dqs' : '品牌厂商授权销售，厂商直接发货',
                    'xb-qtth' : '七天退货',
                    'xb-sstbx': '30天保修',
                    'xb-sdfh' : '闪电发货',
                    'xb-jyps' : '假一赔三',
                    'xb-rsms' : '如实描述',
                    'xb-zpbz' : '正品保障'
            };

            renderUI();

            function renderUI() {

                itemTags = $$('.item-tags');

                if (itemTags.length) {


                    S.each(itemTags, function(item) {
                        
                        var anchors = $$('a', item);

                        if (anchors && anchors.length) {
                            addTitle(anchors);
                        }
                    });
                }

            }

            function showTag(anchor) {
                anchor.style.display = 'block';
            }

            function addTitle(anchors) {

                var xbLength = 3;

                for (var i = 0, l = anchors.length; i < l; i++) {
                    
                    var anchor = anchors[i], className = anchor.getAttribute('class') || anchor.className;

                    anchor.setAttribute('title', titleMap[className] || '');
                    checkIsXb(anchor, className);
                }

                function checkIsXb(anchor, className) {
          
                    if (className.indexOf('xb-') != -1) {
                        
                        if (xbLength > 0) {
                            xbLength--;
                            showTag(anchor);
                        } else {
                            return;
                        }
                    }

                    showTag(anchor);
                }
            }
            
            function $$(expr, ctx) {
                var collection = document.querySelectorAll ? (ctx || document).querySelectorAll(expr) : DOM.query(expr, ctx || document);
                return collection;
            }

            function $(expr, ctx) {
                return DOM.get(expr, ctx || document);
            }
        }

        init();

    }
    J.app.more = more;
});/**
 * 分享组件
 */

Ju.add('app.share', function(J) {
    var S = KISSY, DOM = S.DOM, Event = S.Event;

    //配置信息
    
    var share = function(hooks, container){
        
        hooks = DOM.query(hooks, container);
        if(hooks.length == 0) {
            return;
        }
        
        this.init(hooks, this.bindLinkEvents);
        
    }
    /**
     * url格式配置
     * item_url
     * item_url_enc
     * item_title
     * item_title_enc
     * item_img_enc
     * slogan_enc
     */
    var urlTpl = {
        'ww'  : ['旺旺/QQ', '{item_url}&trcelog=ju_share_url'],
        'tao' : ['淘江湖', 'http://share.jianghu.taobao.com/share/addShare.htm?url={item_url_enc}%26tracelog%3Dju_share_tao&title={item_title}'],
        'kx'  : ['开心', 'http://www.kaixin001.com/repaste/bshare.php?rtitle={slogan_enc}&rcontent={item_title_enc}&rurl={item_url_enc}%26trcelog%3Dju_share_kaixin'],
        'ren' : ['人人', 'http://share.renren.com/share/buttonshare.do?link={item_share_url}'],
        'qqwb':['腾讯微博', 'http://v.t.qq.com/share/share.php?title={item_title_enc}&source=1000001&pic={item_img_enc}&url={item_url_enc}'],
        'sina': ['新浪微博', 'http://v.t.sina.com.cn/share/share.php?url={item_url_enc}%26trcelog%3Dju_share_sina&title={item_title_enc}&pic={item_img_enc}']
        //'mail': ['邮件', 'mailto:?subject={item_title_enc}&body={item_title_enc} {item_url_enc}']
    };
    
    /**
     * 投票url
     */
    var candUrlTpl = {
        'ww'  : ['旺旺/QQ', '{item_url}&trcelog=hx_share_in'],
        'tao' : ['淘江湖', 'http://share.jianghu.taobao.com/share/addShare.htm?url={item_url_enc}%26tracelog%3Dhx_share_in&title={item_title}'],
        'kx'  : ['开心', 'http://www.kaixin001.com/repaste/bshare.php?rtitle={slogan_enc}&rcontent={item_title_enc}&rurl={item_url_enc}%26trcelog%3Dhx_share_in'],
        'ren' : ['人人', 'http://share.renren.com/share/buttonshare.do?link={item_share_url}%26tracelog%3Dhx_share_in'],
        'qqwb':['腾讯微博', 'http://v.t.qq.com/share/share.php?title={item_title_enc}&source=1000001&pic={item_img_enc}&url={item_url_enc}%26tracelog%3Dhx_share_in'],
        'sina': ['新浪微博', 'http://v.t.sina.com.cn/share/share.php?url={item_url_enc}%26trcelog%3Dhx_share_in&title={item_title_enc}&pic={item_img_enc}']
    };
    
    /**
     * d2c url
     */
    var d2cUrlTpl = {
        'ww'  : ['旺旺/QQ', '{item_url}?trcelog=ju_share_url'],
        'tao' : ['淘江湖', 'http://share.jianghu.taobao.com/share/addShare.htm?url={item_url_enc}%3Ftracelog%3Dju_share_tao&title={item_title}'],
        'kx'  : ['开心', 'http://www.kaixin001.com/repaste/bshare.php?rtitle={slogan_enc}&rcontent={item_title_enc}&rurl={item_url_enc}%3Ftrcelog%3Dju_share_kaixin'],
        'ren' : ['人人', 'http://share.renren.com/share/buttonshare.do?link={item_url}'],
        'qqwb':['腾讯微博', 'http://v.t.qq.com/share/share.php?title={item_title_enc}&source=1000001&pic={item_img_enc}&url={item_url_enc}'],
        'sina': ['新浪微博', 'http://v.t.sina.com.cn/share/share.php?url={item_url_enc}%3Ftrcelog%3Dju_share_sina&title={item_title_enc}&pic={item_img_enc}']
    };
    
    var isDaily = Ju.sys.Helper.getDomain() == 'daily.taobao.net',
        urlBaseI = isDaily ? 'http://i.ju.daily.taobao.net' : 'http://i.ju.taobao.com',
        urlBase = isDaily ? 'http://ju.daily.taobao.net' : 'http://ju.taobao.com';
    
    share.prototype = {
        
        itemData: {},
        
        style:0,
        
        /**
         * init
         */
        init: function(containers, callback){
            var self = this;

            S.each(containers, function(container){
                
                container.innerHTML = self.htmlRender(container);
                if(callback) {
                    callback && callback.call(self, container);
                }
            })
        },
        
        /**
         * 组装HTML
         */
        htmlRender: function(container){
            var urlArr = [],
                theTpls = urlTpl,
                itemType = container.getAttribute('data-type'),
                itemData = this.getParams(container),
                itemId = itemData.itemId,
                itemTitle = itemData.itemTitle,
                itemPrice = itemData.itemPrice,
                itemPic = itemData.itemPic,
                itemUrl = itemData.itemUrl,
                shareProps = itemData.shareProps,
                itemDesc = (itemType == 'candidate' ? '[聚划算我想团]团什么，你决定！给你想团的商品投票，你就有机会团到自己喜欢的物美价廉的商品。' : '淘宝聚划算今日团购: ') + itemTitle,
                comm = (itemType == 'candidate') ? '我参加了聚划算“我想团”给喜欢的商品投票，如果商品入选，我不但能买到心仪的宝贝，还能获得奖励和折上折机会哦，你也投票吧：） ':'宝贝给不给力，给大家说两句吧...',
                slogan = '淘宝网聚划算，品质团购每一天！';
                
            var params = {
                title: Ju.sys.Helper.cutStr(itemTitle, 100), //分享的标题
                linkurl: itemUrl, //分享的链接
                itempic: itemPic, //分享的图片(feed 中显示)
                comment: comm,
                details: shareProps,
                client_id : "009"
            }
            //for(var site in theTpls) {
            var siteHtml = '';
            if(itemData.itemType == 'candidate' || itemData.itemType == 'cand-buy'){
                siteHtml += '<input class="item_url J_shareUrlInput" type="text" /><a href="#" class="btn-small small-blue-new J_shareUrlCopy">复制<b></b></a>';
                siteHtml += '<a class="btn-small small-blue-new share-friend J_jianghuShare" data-shareparam=\''+S.JSON.stringify(params)+'\' href="#">分享给好友<b></b></a>';
            }
            else{
                siteHtml += '<input class="item_url J_shareUrlInput" type="text" /><a href="#" class="btn-small small-blue btn-width J_shareUrlCopy">复制<b></b></a>';
                siteHtml += '<a class="share-widget-btn J_jianghuShare" data-shareparam=\''+S.JSON.stringify(params)+'\' href="#">分享</a>';
            }
                    
                //urlArr.push(siteHtml);
            //}

            return siteHtml;
        },
        
        /**
         * 获取参数
         */
        getParams: function(container){
            //参数
            var itemId = container.getAttribute('data-itemid'),
                candidateId = container.getAttribute('data-candidateId'),
                itemType = container.getAttribute('data-type'),
                itemTitle = container.getAttribute('data-itemname'),
                itemOriginalPrice = container.getAttribute('data-originalprice'),
                itemPrice = container.getAttribute('data-itemprice'),
                itemPollDiscount = container.getAttribute('data-polldiscount'),
                itemDesc = (itemType == 'candidate' ? '[聚划算我想团]团什么，你决定！给你想团的商品投票，你就有机会团到自己喜欢的物美价廉的商品。' : '淘宝聚划算今日团购: ') + itemTitle,
                shareComm = (itemType == 'candidate') ? '我参加了聚划算“我想团”给喜欢的商品投票，如果商品入选，我不但能买到心仪的宝贝，还能获得奖励和折上折机会哦，你也投票吧：） ':'宝贝给不给力，给大家说两句吧...',
                slogan = '淘宝网聚划算，品质团购每一天！',
                itemPic = container.getAttribute('data-itempic'),
                itemUrl = urlBase + '/tg/home.htm?item_id=' + itemId,
                shareUrl = urlBase + '/tg/item_share.htm?item_id=' + itemId,
                shareProps = [
                    '原&nbsp;&nbsp;价: &yen;' + itemOriginalPrice, 
                    '团购价: &yen;' + itemPrice
                    ],
                //cand url
                self = this,
                jukePid = container.getAttribute('data-pid'),
                jukeId = container.getAttribute('data-jukeid'),
                jukePrefixUrl = function(pid) {
                    return ((isDaily ? "http://s.click.daily.taobao.net/t_9?" : "http://s.click.taobao.com/t_9?") + "p=mm_#{pid}_0_0&l=").replace(/#\{pid\}/, pid);
                };
            
            //海选分享
            if(itemType == 'candidate'){
                
                itemUrl = urlBaseI + '/poll/item_candidate_detail.htm?candidate_id=' + candidateId;
                shareUrl = itemUrl;
                theTpls = candUrlTpl;
                
                shareProps[1] = '预期折扣: &yen;' + itemPollDiscount + '折';
                
            }
            //d2c分享
            else if(DOM.hasClass(document.body, 'ju-d2c')){
                itemUrl = urlBase + '/tg/dtoc_home.htm?item_id=' + itemId;
                shareUrl = itemUrl;
                theTpls = d2cUrlTpl;
            } 

            //juke分享            
            else if(itemType == 'juke') {
                itemUrl = jukePrefixUrl(jukePid) +  encodeURIComponent(urlBase + '/tg/jukeHome.htm?itemId=' + itemId + '&pid=' + jukePid + '&jukeId=' + jukeId);  
            }
            //品牌
            else if(DOM.hasClass(document.body, 'ju-taglist')) {
                var juTagId = Ju.sys.Helper.getQuery('juTagId');
                itemUrl = urlBase + '/tg/ju_tag_home.htm?item_id=' + itemId + '&juTagId=' + juTagId;
            }
            //卖家团
            else if(DOM.hasClass(document.body, 'ju-sellergroup')) {
                itemUrl = urlBase + '/tg/sellergroup_home.htm?item_id=' + itemId;
            }
            
            
            this.itemData = {
                
                itemId: itemId,
                itemTitle: itemTitle,
                itemPrice: itemPrice,
                comment: shareComm,
                itemUrl: itemUrl,
                itemPic: itemPic,
                itemType: itemType,
                shareProps:shareProps
                
            };
            return this.itemData;
        },
        
        /**
         * 事件
         */
        bindLinkEvents : function(container){
            
            var self = this;
            
            //淘江湖分享组件
             if('undefined' !== typeof TS) {
                  self.jianghuShare(container, self.itemData);
                } else {
             S.IO.getScript('http://a.tbcdn.cn/apps/snstaoshare/widget/ts/ts.js?t=' + new Date().getTime(), function() {
                  self.jianghuShare(container, self.itemData);
                });
             }   
            
            
            //复制链接输入框
            //if(this.style){
                this.showCopyInput(container);
                return;
            //}

        },
        
        /**
         * 江湖share组件
         * J_jianghuShare
         */
        jianghuShare: function(container, itemData){
             var shareBtn = DOM.get('.J_jianghuShare', container),
                self = this;
                
            if(!shareBtn){
                return;
            }
            
            
            Event.on(shareBtn, 'click', function(ev){
                ev.halt();
                TS.require('Share', '2.0', function() {
                    new TS.Share(shareBtn).show();
                });
            });

        },
        
        /**
         * 显示链接并添加复制事件
        */
        showCopyInput: function(container){
            var urlInp = DOM.get('.J_shareUrlInput', container),
                urlCopy = DOM.get('.J_shareUrlCopy', container),
                self = this;
                
            if(!urlInp || !urlInp){
                return;
            }
            
            var copyUrl = self.itemData.itemUrl;
            
            urlInp.value = copyUrl;
            
            Event.on(urlInp, 'click', function(ev){
                urlInp.select();
            });
            
            Event.on(urlCopy, 'click', function(ev){
                ev.halt();
                self.copyLink(copyUrl, urlInp);
            });
            
        },
        
        /**
         * 复制链接
         */
        copyLink: function(url, inp){
            inp.select();
            Ju.sys.Clipboard.clip(url, function(){
                //Ju.sys.Helper.showMessage('复制成功, 马上发给阿里旺旺、QQ、MSN好友, 人多组团快!');
                alert('复制成功, 马上发给阿里旺旺、QQ、MSN好友, 人多组团快!');
            });
        }
        
        
    }
    
    J.app.share = share;
});/**
 * 淘分享显示
 */

Ju.add('app.taoshare', function(J) {

    var S = KISSY, DOM = S.DOM, Event = S.Event;
    

//http://fx.taobao.com/view/item_share.htm?item_id=
    var taoShare = function(){

        var shareSelecter = ".J_ItemTaoshare",
            shareCont = DOM.get(shareSelecter);
            
        this.init = function(){
            
            if(!shareCont) return;
            
            this.hideIfEmpty();
            
        }
        
        //为空则隐藏
        this.hideIfEmpty = function(){
            var theFrame = DOM.get('#share', shareCont);
            if(!theFrame) return;
            
            try{
                var theFrame = KISSY.DOM.get('#share');
                
                if (theFrame.attachEvent) {
                    theFrame.src += '&r=' + (new Date()).getTime(); //IE hack
                    theFrame.attachEvent("onload", function() {
                        if(!DOM.get('#J_FeedsContainer', theFrame.contentWindow.document.body)) {
                            DOM.hide(shareCont);
                        };
                    });
                } else {
                    theFrame.onload = function() {
                        if(!DOM.get('#J_FeedsContainer', theFrame.contentDocument.body)) {
                            DOM.hide(shareCont);
                        };
                    };
                }
            }
            catch(e){
                
            }
            
        }
        this.init();
        
    }
    
    J.app.taoshare = taoShare;
    
    
})/**
 * 阶梯价格操作
 * - 价格阶梯计算与显示（首页、定金、尾款页面）
 * - 
 */

Ju.add('app.stair', function(J) {
    
    var K = KISSY, DOM = K.DOM, Event = K.Event;
    
    var stair = function(config){
        
        var tpls = {
            //XXX人已参团，当前已是最低价，宝贝剩余数量有限哦！ 

            style0 : '<div class="grad-num style{style_ind}-num">{numliStr}</div>'
                   + '<div class="grad-bar style{style_ind}-bar"><ul>{priceliStr}</ul></div>'
                   + '<div class="grad-info style{style_ind}-tip clearfix">{tip_cont}</div>'
                   + '<s class="grad-pointer style{style_ind}-poi"></s>'
                   ,
            style1 : '<div class="grad-num style1-num">'
                   + '<div class="min"><p>1人</p><p class="price">&yen;3889</p></div>'
                   + '<div><p>1000人以上</p><p class="price">&yen;3289</p></div>'
                   + '<div class="pricetip"><p>100人</p><p class="price">&yen;3389</p></div></div>'
                   
                   + '<div class="grad-bar style1-bar"><ul>{priceliStr}</ul></div>'
                   
                   + '<div class="grad-info style1-tip"><strong>1980</strong>人已参团,距最低价还差<strong>210</strong>人</div>'
                   
                   + '<s class="grad-pointer"></s>'
                   ,
                   
                   
            css0 : '.price-grads{ind} .grad-bar li{width:{bar_width}px} '
                   + '.price-grads{ind} .grad-num li{width:{bar_width}px} '
                   + '.price-grads{ind} .grad-pointer{left:{pointer_left}px}'
                   + '.price-grads{ind} .grad-info{margin-left:{info_left}px}',
            tipCon : '<p>{num}人</p><p class="price">&yen;{price}</p>'
                                
        },
        gradInd = 0,
        self = this;
        
        this.config = {
                container: '',
                width:232,
                longStyle:0
            };

        /**
         * 数据
         */
        this.stairData = {};
        
        this.container = null;
        
        /**
         * 初始化
         */
        this.init = function(config){

            this.config = K.merge(this.config, config || {});

            if(!this.config.container) {
                return;
            }
            
            for(var ind = 0, len = this.config.container.length; ind < len; ind++) {
                
                this.container = this.config.container[ind];
                this.processData();
                this.container.innerHTML = this.parseHTML();
                
                this.addStyle();
                
                this.bindEvent();
            }
            
            

        };
        
        /**
         * 取得数据
         */
        this.getParams = function(){
            
            var dataJson = this.container.getAttribute('data-params');
            
            if(!dataJson) {
                return;
            }
            
            return K.JSON.parse(dataJson);
            
        };
        
        /**
         * 处理数据
         * {"num-curr":"300", "num-need":"700", "num-grads":"1,100,300,1000", "price-grads":"600,500,400,300", "grad-curr":"2", "price-curr":"12.00"}
         */
        this.processData = function(){
            
            this.stairData = this.getParams();
            
            this.stairData['num-grads'] = this.stairData['num-grads'].split(',');
            this.stairData['price-grads'] = this.stairData['price-grads'].split(',');
            
            //阶梯数
            this.stairData.stairNum = this.stairData['num-grads'].length;
            
        };
        
        /**
         * 组装html  
         */
        this.parseHTML = function(){
            
            var self = this;
            
            /**
             * priceliStr num-curr
             * <li class="pass"></li>
                                <li class="pass"></li>
                                <li class="pass"></li>
                                <li class="curr"></li>
                                <li class="next"></li>
                                <li class="next"></li>
                                
                                <li>1人</li>
                                <li>100人</li>
                                <li>300人</li>
                                <li>1000人以上</li>
             */
            var priceliStr = '', numliStr = '', htmlResult = '', styleInd = 0, tipCont = '';
            
            for(var ind = 0, len = self.stairData['num-grads'].length; ind < len; ind++) {
                var barClass = '';
                if(ind < self.stairData['grad-curr']) {
                    barClass = 'pass';
                }
                else if(ind == self.stairData['grad-curr']) {
                    barClass = 'curr';
                }
                else{
                    barClass = 'next';
                }
                
                priceliStr += '<li class="'+barClass+'">&yen;' + self.stairData['price-grads'][ind] + '</li>';
                
                numliStr += '<li><span>' + self.stairData['num-grads'][ind] + (ind == (len-1) ? '人以上' : '人') + '</span></li>';
            }
            
            if(this.stairData.stairNum < 5 || this.config.longStyle){
                numliStr = '<ul>' + numliStr + '</ul>';
            }
            else{
                /**
                 * <div class="min"><p>1人</p><p class="price">&yen;3889</p></div>'
                   + '<div><p>1000人以上</p><p class="price">&yen;3289</p></div>'
                   + '<div class="pricetip"><p>100人</p><p class="price">&yen;3389</p></div>
                 * 
                 */
                numliStr = '<div class="min"><p>'+this.stairData['num-grads'][0]+'人</p><p class="price">&yen;'+ this.stairData['price-grads'][0] +'</p></div>'
                   + '<div><p>'+ this.stairData['num-grads'][this.stairData.stairNum -1] +'人以上</p><p class="price">&yen;'+ this.stairData['price-grads'][this.stairData.stairNum -1] +'</p></div>'
                   + '<div class="pricetip" style="display:none"></div>';
                styleInd = 1;
            }
            
            /**
             * 组装tip内容
             */
            //判断是否成团
            if(self.stairData['item-out'] == '1') {
                tipCont = '共有<strong>'+ self.stairData['num-curr'] +'</strong>人参团, 成交价为<strong>' + self.stairData['price-grads'][self.stairData['grad-curr']] + '</strong>元';
                    
            }
            else{
                //判断是否到最后阶梯
                if(self.stairData['num-grads'].length == parseInt(self.stairData['grad-curr']) + 1){
                    tipCont = '<strong>'+ self.stairData['num-curr'] +'</strong>人已参团,当前已是最低价,请尽快参团!'
                }
                else{
                    tipCont = '<strong>'+ self.stairData['num-curr'] +'</strong>人已参团,距最低价还差<strong>'+ self.stairData['num-need'] +'</strong>人'
                }
            }
            
            
            /**
             * 根据模板组装html
             */
            htmlResult = Ju.sys.Helper.formatMessage(tpls.style0, {
                num_curr : self.stairData['num-curr'],
                num_need : self.stairData['num-need'],
                priceliStr : priceliStr,
                numliStr : numliStr,
                style_ind : styleInd,
                tip_cont: tipCont
            });
              
            return htmlResult;
        };
        
        /**
         * 处理样式，计算宽度，添加style标签
         */
        this.addStyle = function(){
            
            /**
             * bar宽度、游标位置
             */
            var boxWidth = this.config.width + 1,
                barWidth = Math.floor(boxWidth / this.stairData.stairNum),
                pointerLeft = (this.stairData['grad-curr'] * 1 + 0.4) * barWidth + 4,
                infoLeft = this.config.width < 400 ? '' : ((this.stairData['grad-curr']*1 + 0.5) * barWidth - 120),
                infoLeft = infoLeft > this.config.width - 230 ? this.config.width - 230 : infoLeft,
                infoLeft = infoLeft < 0 ? 0 : infoLeft;

            cssText = Ju.sys.Helper.formatMessage(tpls.css0, {
                bar_width : barWidth,
                pointer_left : pointerLeft,
                ind : gradInd,
                info_left : infoLeft
            });

            DOM.addClass(this.container, 'price-grads' + gradInd);
            DOM.addStyleSheet(cssText);
            gradInd ++;
            
            this.stairData.barWidth = barWidth;
            
        }
        
        this.eventDele = function(ind, theTip) {
            //var self = this;
            var elData = self.stairData;
            this.mouseFunc = function() {
                
                var tipCont = Ju.sys.Helper.formatMessage(tpls.tipCon, {
                    num : elData['num-grads'][ind],
                    price: elData['price-grads'][ind]
                    
                });
                theTip.innerHTML = tipCont;
                if(elData['num-grads'].length == ind+1){
                    DOM.css(theTip, 'right', '0px');
                    DOM.css(theTip, 'left', 'auto');
                }
                else{
                    DOM.css(theTip, 'left', elData.barWidth * ind + 'px');
                    DOM.css(theTip, 'right', 'auto');
                }
                
                DOM.show(theTip);
            }
            
            this.mouseoutFunc = function(){
                
                DOM.hide(theTip);
            }
        } 
        
        /**
         * 事件
         */
        this.bindEvent = function(){
            if(this.stairData.stairNum < 5 || this.config.longStyle) {
                return;
            }
            //
            var theLis = DOM.query('li', DOM.get('.grad-bar', this.container));
                theTip = DOM.get('.pricetip', this.container);

            for(var ind=0, len=theLis.length; ind<len; ind++) {
                var dele = new self.eventDele(ind, theTip);
                Event.on(theLis[ind], 'mouseover', dele.mouseFunc);
                Event.on(theLis[ind], 'mouseout', dele.mouseoutFunc);
                
            }
            
        }
        
        /**
         * 调用
         */
        this.init(config);
        
    }
    
    J.app.stair = stair;
    
});/**
 * 阶梯付款
 * 页面操作 + 数据交互
 * 定金页面、尾款确认页面、尾款支付页面、首页尾款支付按钮
 * Ju.stairPay.pageFront
 */

Ju.add('app.stairpay', function(J) {
    
    var K = KISSY, DOM = K.DOM, Event = K.Event;
    var popObj = null,
        ajaxUri = {
            frontPay : '/json/tg/frontPageAction.htm', //API-购买提交地址
            frontPayCheck : '/json/tg/frontFrameAction.htm', //检查定金是否支付
            finalSubmit : '/json/tg/finalHomeAction.htm', //首页尾款请求地址
            finalPay : '/json/tg/finalConfirmAction.htm', //尾款页面提交
            finalPayCheck : '/json/tg/finalFrameAction.htm', //检查是否支付尾款
            getPayUrl: '/tg/payUrlScreen.htm' //取得付款链接
           };

    var stairPay = function(page, config){

        
        this.init = function(page, config){
            
            //尾款页面
            if(page === 'final') {
                //处理地址列表
                addressList.init();
                //付款按钮
                this.onFinalPay();
                //输入框处理
                this.textareaTest();
            }
            //首页逻辑
            else if(page === 'homeFinal') {
                //首页尾款按钮
                this.onHomeFinal(config.container);
            }
            //我的聚划算页面付款
            else if(page === 'myItems') {
                //tip处理
                this.showSavePop();
                //付款按钮处理
                this.myItemsPay();
                //输入框文案
                this.defaultValue(['#J_MyOrderNum']);
                //this.inputText();//J_MyOrderNum
            }
            //定金支付页面
            else{
                //页面特效渲染
                this.renderPage();
                //购买按钮处理
                this.onPay();
            }
            
        }
        
        /**
         * 输入框处理
         */
        this.textareaTest = function(){
            Event.on('#J_msgtosaler', 'blur', function(){
                
                var msgBox = DOM.get('.msg', DOM.parent(this, 'td')),
                    msg = '最多输入500个字符';
                if(!msgBox) return;
                
                if(this.value.length > 500) {
                    msgBox.innerHTML = '<p class="error">'+msg+'</p>';
                }
                else{
                    msgBox.innerHTML = '';
                }
                
            })
        }

        /**
         * 我的聚划算
         */
        this.myItemsPay = function(){
            var payButtons = DOM.query('.J_PayFront');

            Event.on(payButtons, 'click', function(ev){
                //data-bizOrderId="" data-bizType
                ev.halt();
                var bizOrderId = this.getAttribute('data-bizOrderId'),
                    bizType = this.getAttribute('data-bizType');
                    
                if(bizOrderId && bizType){
                    K.io.get(ajaxUri.getPayUrl,{bizOrderId:bizOrderId, bizType:bizType}, function(data) {
                        if(data !== '0'){
                            window.open(data);
                        }
                        else{
                            
                        }
                    })
                }
            })
            
        }
        
        /**
         * 处理pop
         */
        this.showSavePop = function(){
            var popTriggers = DOM.query(".J_SavePopTrigger");
            if(!popTriggers) return;
            
            
            
            K.each(popTriggers, function(trigger, index){
                var thePop = DOM.next(trigger),
                    offsetL = DOM.offset(trigger).left - DOM.offset(DOM.parent(trigger)).left;
                
                Event.on([trigger, thePop],'mouseover', function(){
                    DOM.show(KISSY.DOM.next(trigger));
                    var popWidth = DOM.width(thePop);
                    DOM.css(thePop, 'left', parseInt(offsetL - popWidth / 2 - 10) + 'px');
                })
                Event.on([trigger, thePop],'mouseout', function(){
                    DOM.hide(KISSY.DOM.next(trigger));
                })
            })
            
        }
        /**
         * 页面元素处理
         */
        this.renderPage = function(){
            var self = this;
            //价格阶梯条
            new Ju.app.stair({container: KISSY.DOM.query('.J_PriceGrads'), width:875, longStyle:1});
            
            //服务条款处理
            this.termsConfirm();
            Event.on('#J_FrontTerms', 'click', function(ev){
                self.termsConfirm();
            })

            //表单默认值
            this.defaultValue(['#J_FrontPhone', '#J_FrontPhoneRepeat']);
        }
        
        /**
         * 服务条款
         */
        this.termsConfirm = function(){
            var terms = DOM.get('#J_FrontTerms'),
                button = DOM.get('#J_FrontPagePay');
            
            if(!terms || !button) return;
            
            if(!!terms.checked) {
                DOM.removeClass(button, 'big-unavil');
                return true;
            }
            else{
                
                DOM.addClass(button, 'big-unavil');
                return false;
            }
            
        }
        /**
         * input默认值
         */
        this.defaultValue = function(arr){
            
            K.each(arr, function(item) {
                var input = DOM.get('input', item);
                if(input && !input.value) {
                    input.value = input.title;
                    DOM.addClass(input, 'unavil');
                    
                    Event.on(input, 'focus', function(){
                        if(input.value === input.title) {
                            input.value = '';
                            DOM.removeClass(input, 'unavil');
                        }
                    });
                    Event.on(input, 'blur', function(){
                        if(!input.value) {
                            input.value = input.title;
                            DOM.addClass(input, 'unavil');
                        }
                    });
                    
                }
            })
        }
        
        /**
         * 付款按钮
         */
        this.onPay = function(){
            var payButton = DOM.get('#J_FrontPagePay'),
                self = this;
            if(!payButton) {
                return;
            }
            
            Event.on(payButton, 'click', function(ev){
                
                ev.halt();
                
                if(!self.termsConfirm()) {
                    return;
                }

                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
//                    autoCallback: true
                    autoCallback: false,
                    callback : function(){
                        location.reload();
                    }
                })) {
                    return;
                }
                
                
                //表单验证
                var signValid = new Ju.app.formValidator();

                if (!signValid.frontValid()) {
                    return;
                }
                
                self.paySubmit();
                
                
            })
            
            var autoSub = DOM.get('#J_AutoSubmit');
            if(autoSub && autoSub.value === 'true') {
                self.paySubmit();
            }
        }
        /**
         * 处理提交按钮
         */
        this.paySubmit = function(){
            //提交请求
            var theForm = DOM.get('#J_paySubForm'),
                responseFn = new payResponse();
            new Ju.app.dataSub({
                subUrl: ajaxUri.frontPay,
                source: "form", //默认form
                type: "POST", 
                formEl :theForm, //form表单
                callback : function(response){
                    responseFn.showResponce(response);
                },
                failure : function(){
                    responseFn.showResponce();
                }
            }); 
        }
        
        /**
         * 首页尾款按钮
         */
        this.onHomeFinal = function(container){
            //提交表单
            //console.log([container, DOM.get('.J_BuySubForm', container.parentNode)]);
            var theForm = DOM.get('.J_BuySubForm', DOM.parent(container, '.meta')),
            
                responseFn = new payResponse(),
                
                testRysc = new Ju.app.dataSub({
                subUrl: ajaxUri.finalSubmit,
                source: "form", //默认form
                type: "POST", 
                formEl :theForm, //form表单
                callback : function(response){
                    responseFn.showResponce(response);
                },
                failure : function(){
                    //Ju.app.buy();
                }
            });
        }
        
        /**
         * 尾款页面支付
         */
        this.onFinalPay = function(){
            var payButton = DOM.get('#J_finalPagePay'),
                self = this;
            if(!payButton) {
                return;
            }
            
            Event.on(payButton, 'click', function(ev){
                
                ev.halt();

                //登录判断
                if (!Ju.sys.Helper.checkAndShowLogin({
//                    autoCallback: true
                    autoCallback: false,
                    callback : function(){
                        location.reload();
                    }
                })) {
                    return;
                }
                
                
                //表单验证
                var signValid = new Ju.app.formValidator();

                if (!signValid.finalValid()) {
                    return;
                }
                
                self.finalPaySubmit();
                
                
            })
        }
        this.finalPaySubmit = function(){
            //提交请求
            var theForm = DOM.get('#J_FinalPayForm'),
                responseFn = new payResponse();
            new Ju.app.dataSub({
                subUrl: ajaxUri.finalPay,
                source: "form", //默认form
                type: "POST", 
                formEl :theForm, //form表单
                callback : function(response){
                    responseFn.showResponce(response);
                },
                failure : function(){
                    responseFn.showResponce();
                }
            }); 
        }
        
        this.init(page, config);
    }
    
    
    /**
     * 地址列表处理
     * 数据格式：
     * Ju.addressData = {'add423711104' : [{'mode':'1','fee':'10.1','incr':'3.1'},{'mode':'4','fee':'15.0','incr':'6'}]};
     */
    var addressList = (function(){
        
        var ADDRESS_EID = '#J_Address',
            POSTAGE_URL = 'http://ju.daily.taobao.net/json/tg/feeDetail.htm';
            
        if (K.UA.ie >= 6 && K.UA.ie <= 8) {
            Number.prototype.toFixed = function(precision) {
                var power = Math.pow(10, precision || 0);
                var n = String(Math.round(this * power) / power);
                var nf = n.split(".")[1];
                var suffixLeng = 0;
                if (nf) {
                    suffixLeng = nf.length;
                } else if (precision != suffixLeng) {
                    n = n + ".";
                }
                for (var i = 0; i < precision - suffixLeng; i++) {
                    n = n + "0";
                }
                return n;
            }
        }
        
        var parseQueryString = function(string, overwrite, separator) {
            if (!string || !string.length) {
                return { };
            }

            var obj = { };
            var pairs = string.split(separator || '^^');

            var pair, name, value;
            for (var i = 0, len = pairs.length; i < len; ++i) {
                pair = pairs[i].split('=');
                name = pair[0];
                value = pair[1];
                if (value === '' || value === 'undefined') {
                    value = undefined;
                } // &k 和 &k= 都还原成 undefined

                if (overwrite !== true) {
                    if (typeof obj[name] == 'undefined') {
                        obj[name] = value;
                    } else {
                        if (typeof obj[name] == 'string') {
                            obj[name] = [obj[name]];
                            obj[name].push(value);
                        } else {
                            obj[name].push(value);
                        }
                    }
                } else {
                    obj[name] = value;
                }
            }
            return obj;
        };
        
        return {
            
            /**
             * radio数组
             */
            address : null,
            /**
             * 当前li
             */
            current : null,
            /**
             * 邮费数据缓存
             */
            postFeeCache : [],
            /**
             * 邮费数据
             */
            addressData:null,
            
            /**
             * 是否包邮
             */
            noPostage:false,
            
            /**
             * 当前地址城市代码
             */
            destCode : 0,
            
            /**
             * 省份
             */
            provName : '',
            
            /**
             * 当前商品ID
             */
            itemId : 0,
            /**
             * 成交单价
             */
            itemPrice: 0,
            /**
             * 单件定金
             */
            itemFront: 0,
            /**
             * 购买数量
             */
            itemCount: 1,
            /**
             * 邮费总价
             */
            postFee: 0 ,
            /**
             * 事件
             */
            bindEvent : function(){
                
                var that = this,
                    freshPop = null;
                
                //点击地址项：背景效果、表单填充
                Event.on(this.address, 'click', function() {

                    that.addressSelect(this);
    
                });
                
                //发票抬头
                Event.on("#J_EditInvTitle", "click", function(ev) {
                    ev.halt();
                    var _invoice = DOM.parent(ev.target, ".J_Inv");
                    DOM.addClass(_invoice, "invoice-edit");
                });
                
                //点击邮费radio
                Event.on(DOM.query(".J_General_Ra", "#J_Post"), 'click', function() {

                       that.selectPostage(this);

                });
                
                /**
                 * 折叠地址列表
                 */
                Event.on('#more-addresses', 'click', function(){
                    DOM.addClass('#J_Address', 'expand');
                });
                Event.on('#less-addresses', 'click', function(){
                    DOM.removeClass('#J_Address', 'expand');
                });
                
                //添加新地址
                Event.on(DOM.get('a', '#other-address-li'), 'click', function(ev){
                    //ev.halt();
                    
                    if(!freshPop) {
                        freshPop = new Ju.sys.Popup({
                               width: 394,
                               content: '在你确保完成新地址添加后, 请点击确定刷新。',
                               title: '小提示',
                               type: 'pop-ju',
                               buttons: [{
                                   text: '确定',
                                   func: function(){
                                       this.hide();
                                       location.reload();
                                   }
                               }],
                               autoShow: false,
                               useAnim: true
                           });
                           
                           freshPop.show();
                    }
                    else{
                        freshPop.show();
                    }

                })
                
                
            },
            
            /**
             * 选中地址项
             */
            addressSelect : function(el){
            
                var that = this;
                
                if (that.current === el || that.noPostage) {
                    return;
                }

                that.current = el;
                
                that.fillForm(true);
                DOM.removeClass(DOM.query('#address-collection li'), 'selected');
                DOM.addClass(DOM.parent(el, 'li'), 'selected');
                
                that.destCode = el.value;
                
                //更新邮费
                that.updatePostFee();
            },
            
            /**
             * 取得页面参数
             */
            getForm: function(){
                //商品ID
                this.itemId = DOM.get('#J_ItemId').value;
                
                //成交单价
                this.itemPrice = DOM.get('#J_ItemPrice').value;
                
                //单件定金
                this.itemFront = DOM.get('#J_ItemFront').value;
                
                //购买数量
                this.itemCount = DOM.get('#J_ItemCount').value;

            },
            
            /**
             * 填充数据
             * 待确认字段
             */
            fillForm: function(){
                var addressDetail = parseQueryString(this.current.getAttribute('ah:params'));
                    _area = addressDetail.areaCode;
                
                
                //发票抬头
                this.updateInvTitle(addressDetail.addressee);
                    
            },
            
            /**
             * 更新邮费相关操作
             */
            updatePostFee : function(){
                
                if(!this.noPostage) {
                    this.getPost();
                 }
                

            },
            
            
            /**
             * Ajax获取邮费
             * 参数： itemId、addressId
             */
            getPost : function(callback) {
                
                //this.addressData
                //Ju.addressData = {'add423711104' : [{'mode':'1','fee':'10.1','incr':'3.1'},{'mode':'4','fee':'15.0','incr':'6'}], 'adddefault':[{'mode':'1','fee':'10.1','incr':'3.1'},{'mode':'4','fee':'15.0','incr':'6'}]};
                //先查找缓存的省份邮费
                
                var perFee = (this.addressData.hasPostage === 'true') ? this.addressData['add' + this.destCode] : this.addressData['adddefault'],
                    that = this;

                //取运费
                
                that.postFeeCache[that.destCode] = perFee.postage;
                that.provName = perFee.province;
                that.fillPostFee();
                
                //回调
                callback && callback();
                
//                var perFee = this.postFeeCache[this.destCode],
//                    that = this;
//                if (perFee) {
//                    this.fillPostFee();
//                } else {
//                    
//                    var params = {
//                            itemId : that.itemId,
//                            addressId : that.destCode
//                        };
//                    
//                    K.IO.get(POSTAGE_URL,params , function(data) {
//                        
//                        if(data.hasPostage === 'true') {
//                            that.postFeeCache[that.destCode] = data.postage;
//                            that.provName = data.province;
//                            that.fillPostFee();
//                            
//                            //回调
//                            callback && callback();
//                        }
//
//                    },'jsonp');
//
//                }

            },
            /**
             * 更新显示邮费
             */
            fillPostFee : function() {
                
                //return;
                if (this.postFeeCache[this.destCode]) {

                    DOM.hide(DOM.query('li', DOM.get('#J_General')));
                    
                    for (var i = 0,l = this.postFeeCache[this.destCode].length; i < l; i++) {
                        var _cache = this.postFeeCache[this.destCode][i],
                            theInp = DOM.get('#shipping' + _cache.mode);
                        //console.log(_cache);

                        if(theInp) {
                            theInp.setAttribute('data-fee', _cache.fee);
                            theInp.setAttribute('data-incr', _cache.incr);
                            DOM.show(theInp.parentNode);
                        }
                        if(DOM.get('#ppostfee' + _cache.mode)) {
                            DOM.get('#ppostfee' + _cache.mode).innerHTML = _cache.fee;
                        }
                        if(DOM.get('#incr' + _cache.mode)) {
                            DOM.get('#incr' + _cache.mode).innerHTML = _cache.incr;
                        }
                        if(DOM.get('#postfee' + _cache.mode)) {
                            
                            //邮费总价 = 单件邮费 + 加件 * (件数 - 1)
                            this.postFee = _cache.fee * 1 + _cache.incr * (this.itemCount - 1);
                            
                            DOM.get('#postfee' + _cache.mode).innerHTML = this.postFee;
                        }

                    }
                    
                    //更新省份
                    if (DOM.get('#destName')) {
                        DOM.get('#destName').innerHTML = this.provName;
                    }
                    
                }
                
                //写表单值
                
                //this.updateFee();
                var curPostEl = DOM.filter(DOM.query(".J_General_Ra", "#J_Post"), function(el) {
                    return el.checked
                });
                
                if(curPostEl[0]) {
                    this.selectPostage(curPostEl[0]);
                }
                
            },
            
            selectPostage: function(el){
                
                var fee = el.getAttribute('data-fee'),
                    incr = el.getAttribute('data-incr');
                    
                //更新邮费
                this.postFee = fee*1 + incr * (this.itemCount - 1);
                
                //更新显示总价
                this.updateFee();
                
            },
            
            /**
             * 计算更新总价
             * ( 215.00[成交单价] - 15.00[单件定金] ) x 5[数量] + 5.00[邮费] = 尾款:  200.00
             */
            updateFee : function(){
                //J_FinalPayPost  J_FinalPaySum
                
                var post = DOM.get('#J_FinalPayPost'),
                    sum = DOM.get('#J_FinalPaySum');
                    
                if(!post || !sum) return;
                
                /**
                 * this.itemId = DOM.get('#J_AddrsssItemId').value;
                
                //成交单价
                this.itemIdPrice = DOM.get('#J_ItemIdPrice').value;
                
                //单件定金
                this.itemFront = DOM.get('#J_ItemFront').value;
                
                //购买数量
                this.itemCount = DOM.get('#J_ItemCount').value;
                ["156.00", "15.00", "2", "420.00"]
                 */

                var newFee = (this.itemPrice - this.itemFront) * this.itemCount + this.postFee * 1;
                
                post.innerHTML = this.postFee.toFixed(2);
                sum.innerHTML = newFee.toFixed(2);
                
            },
            /**
             * 更新发票抬头
             */
            updateInvTitle: function(title){
                var el = DOM.get("#J_EditInvInput");
                
                if(!el) return;
                
                el.value = title;
                var sp = DOM.get("#J_EditInvShow");
                if (sp) {
                    sp.innerHTML = title;
                }
            },
            
            
            /**
             * 初始化
             */
            init: function(){
                
                if(!DOM.get(ADDRESS_EID)) {
                    return;
                }
                
                //取得参数
                
                if(Ju.addressData && Ju.addressData !== 'null') {
                    this.addressData = K.JSON.parse(Ju.addressData);
                }
                else{
                    this.noPostage = true;
                    //DOM.hide('#J_Post');
                }
                
                
                this.getForm();
                
                this.address = DOM.filter(DOM.query('input'), function(el) {
                    return el.name === 'address'
                });
                
                this.bindEvent();
                
                //邮费获取与显示
                
                //添加新地址
                
                //默认项显示
                K.each(DOM.query(".J_General_Ra", "#J_Post"), function(li){
                    li.checked = false;
                })
                this.addressSelect(this.address[0]);
                
                
            }
            
        }
    })();
    
    
    /**
     * 付款返回状态处理
     */
    var payResponse = function(){
        
         var TPLS = {
            /**
             * 定金正常可支付
             */
            OK_REDIRECT : '<div class="pop_pay"><p class="tit"><strong>请在新打开的宝贝页面拍下并支付定金! </strong></p>'
                      + '<div class="desc"><p>1. 在你支付定金时, 此宝贝的最终价格未确定, 最终价格将根据参团人数而定, 参团人数越多, 价格越低!</p>'
                      + '<p>2. 定金支付后, 不退定金。（除宝贝质量、发货等问题外）</p>'
                      + '<p>3. 在你支付定金后, 才算正式参团。</p></div>'
                      + '<div style="text-align:center; margin-top:5px;"><a class="j-bigbtn J_PopFrontCheck" href="#" id="">我已支付定金</a> <a class="j-bigbtn" href="{url}" target="_blank">去支付定金</a><div class="tip-blue">如果你没看到新打开的宝贝页面,请点击此处!</div></div>'
                      + '</div><a class="btn-close" title="关闭此窗口" href="#">&times</a>',
             BUSY : '',
             
             /**
              * 尾款正常可支付
              */
             OK_FINAL_REDIRECT : '<div class="pop_pay"><p class="tit"><strong>请在新开的支付页面支付尾款! </strong></p>'
                      + '<div class="desc"><p>1. 在你支付尾款后, 才算真正完成本次团购。</p>'
                      + '<p>2. 尾款支付期限为3天, 3天内不支付, 系统将关闭本次交易，并不退还定金。</p>'
                      + '<p>3. 不支付尾款, 卖家不发货, 并不退还定金 (除宝贝质量、发货等客观问题外) </p></div>'
                      + '<div style="text-align:center; margin-top:5px;"><a class="j-bigbtn J_PopFinalCheck" href="#" id="">我已支付尾款</a> <a class="j-bigbtn" href="{url}" target="_blank">去支付尾款</a><div class="tip-blue">如果你没看到新打开的支付页面, 请点击此处!</div></div>'
                      + '</div><a class="btn-close" title="关闭此窗口" href="#">&times</a>',
              /**
             * 信用
             * {rate} 信用
             */
            rate : '此宝贝规定买家信用在 {rate}心 以上, 你不能购买。',
            /**
             * 已买过
             */
            bought : '抱歉，你已经购买过这个宝贝了, 同一宝贝在当前团购活动中，只能购买一件。',
            /**
             * 到达数量上限
             * {num} 数量
             */
            limited : '抱歉，你今天在聚划算已经购买过{num}件宝贝了, 一天最多只能购买{num}件。 ',
            /**
             * 已结束
             */
            timeout : '抱歉，这个宝贝的团购结束了, 下回请早哦。 ',
            /**
             * 还有机会
             */
            chance : '还有人未付款, 30分钟内将陆续取消不付款订单, 也许你还有机会团到哦, 再等等吧。',
            /**
             * 卖完
             */
            soldOff : '抱歉，这个宝贝卖完了, 下回请早哦。',
            /**
             * 没有支付宝
             */
            noAlipay : '抱歉，您没有注册支付宝帐号，无法购买，请先<a href="https://lab.alipay.com/user/reg/index.htm" target="_blank">注册支付宝帐号</a>。',
            
            /**
             * 切换用户
             */
            switchUser : '无法支付尾款，可能的原因是: <br />1. 你未支付定金确认参团。<br />2. 如果你已支付定金, 请检查当前的登录帐号是否正确。',
            
            /**
             * 尾款确认过期
             */
            finalConfirmOut : '很抱歉，确认尾款时间已经截止，不能再确认并支付了。 ',
            
            /**
             * 尾款支付过期
             */
            finalTimeOut : '很抱歉，尾款支付时间已经截止，你不能再支付了。 ',
            
            /**
             * 小二
             */
            xiaoEr : '小二？你可不能买, 发扬小二精神吧, 把有限的商品让给无限的用户吧：） ',
            
            /**
             * 未下单
             */
            UNORDER : '对不起, 你未下单, 请重新点击"预付定金", 在宝贝页面拍下并支付定金。如遇问题, 请联系客服。',
            /**
             * 关闭
             */
            closed : '订单关闭',
            /**
             * 未付款
             */
            unpaied : '对不起, 你未付款, 请支付定金, 否则无法参团。如遇问题, 请联系客服。',
            
            finalUnpaied : '<p>对不起, 你未支付尾款, 请务必在{dateEnd}前完成尾款支付, 否则系统将关闭尾款订单, 定金不予退还。支付过程中, 如遇问题, 请联系客服。<br /></p>'
                         + '<div style="margin:15px 0 0 10px"><span class="tit">剩余时间: </span>'
                         + '<div data-targettime="" data-servertime="" class="ju-spltimer J_juItemTimer">'
                         +'<p class="hour">0</p><span class="label">小时</span><p class="min">0</p><span class="label">分</span><p class="sec">0</p><p class="dsec">.0</p><span class="label">秒</span></div></div>'
         };
         
         /**
          * 检查是否已支付
          */
         this.checkPay = function(){
             
            if (!Ju.sys.Helper.checkAndShowLogin({
                autoCallback: true
            })) {
                return;
            }
             
            //提交请求
                var theForm = DOM.get('#J_paySubForm'),
                    self = this;
                //var responseFn = new payResponse();
                Ju.app.onPress = 0;
                new Ju.app.dataSub({
                    subUrl: ajaxUri.frontPayCheck,
                    source: "form", //默认form
                    type: "POST", 
                    formEl :theForm, //form表单
                    callback : function(response){
                        self.showResponce(response);
                    },
                    failure : function(){
                        self.showResponce();
                    }
                }); 
         }
         
         this.showResponce = function(responce){
            KISSY.log(responce);
            
            var data = this.processJson(responce);
            if(!data) {
                return;
            }
            
            switch(data.type) {
                case "BUSY" : 
                    this.systemBusy();
                    break;
                case "OK_REDIRECT" :
                    this.goOnPay(data);
                    break;
                case "OK_FINAL_REDIRECT":
                    this.goOnFinalPay(data);
                    break;
                case "JUMP_DIRECT" : 
                    this.redirectTo(data.data.url);
                    break;
                case "ERROR" : 
                    this.showPop(data.data.msg, 'cry');
                    break;
                case "RATE" :
                    var content = TB.common.formatMessage(TPLS.rate, {rate : data.data.rate});
                    this.showPop(content, 'cry', data.data.url);
                    break;
                case "BOUGHT" :
                    var content = TB.common.formatMessage(TPLS.bought);
                    this.showPop(content, 'cry', data.data.url);
                    break;
                case "LIMITED" :
                    var content = TB.common.formatMessage(TPLS.limited, {num : data.data.limit});
                    this.showPop(content, 'cry', data.data.url);
                    break;
                case "TIMEOUT" :
                    this.showPop(TPLS.timeout, 'cry', data.data.url);
                    break;
                case "CHANCE" :
                    this.showPop(TPLS.chance, 'smile', data.data.url);
                    break;
                case "SOLDOFF" :
                    this.showPop(TPLS.soldOff, 'cry', data.data.url);
                    break;
                case "NOALIPAY" :
                    this.showPop(TPLS.noAlipay, 'cry', data.data.url);
                    break;
                case "UNORDER":
                    this.showPop(TPLS.UNORDER, 'cry');
                    break;
                case "UNPAID":
                    this.unpaiedGoOn(data.data.url);
                    break;
                case "UNPAID_FINAL":
                    this.finalUnpaiedGoOn(data.data);
                    break;
                case "CLOSED" :
                    this.showPop(TPLS.closed, 'cry', data.data.url);
                    break;
                case "SWITCH_USER" :
                    this.switchUser(data);
                    break;
                case "UNCONFIRM_TIMEOUT" :
                    this.showPop(TPLS.finalConfirmOut, 'cry', data.data.url);
                    break;
                case "UNPAID_TIMEOUT" :
                    this.showPop(TPLS.finalTimeOut, 'cry', data.data.url);
                    break;
                case "XIAOER" :
                    this.showPop(TPLS.xiaoEr, 'laugh');
                    break;
                default: this.systemBusy();
            }
            
         };
         
         /**
         * 跳转
         */
         this.redirectTo = function(url){
            location.href=url;
         };
         
         /**
          * 定金正常可支付
          */
         this.frontPayData = null;
         
         this.goOnPay = function(data){

             var payData = data || this.frontPayData;
             if(!payData) {
                 return;
             }
             
             this.frontPayData = payData;
             
            var content = TB.common.formatMessage(TPLS['OK_REDIRECT'], {url : payData.data.url}),
                self = this;
            if(popObj) popObj.hide();
            popObj = new Ju.sys.Popup({
                           width: 400,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           hideHd: true,
                           hideFt: true,
                           buttons: [],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                               //self.reloadToTab();
                           }
                       });
                popObj.show();

                Event.on('.J_PopFrontCheck', 'click', function(ev){
                    ev.halt();
                    self.checkPay(this);
                })
                
                if(data) {
                    window.open(data.data.url);
                }
                
            
         }
         /**
          * 尾款正常可支付
          */
         this.finalPayData = null;
         this.goOnFinalPay = function(data){
             
             var payData = data || this.finalPayData;
             if(!payData) {
                 return;
             }
             
            this.finalPayData = payData;
             
            var content = TB.common.formatMessage(TPLS['OK_FINAL_REDIRECT'], {url : payData.data.url}),
                self = this;
            if(popObj) popObj.hide();
            popObj = new Ju.sys.Popup({
                           width: 400,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           hideHd: true,
                           hideFt: true,
                           buttons: [],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                               //self.reloadToTab();
                           }
                       });
                popObj.show();
                
                Event.on('.J_PopFinalCheck', 'click', function(ev){
                    ev.halt();
                    self.checkFinalPay(this);
                })
                
                if(data) {
                    window.open(data.data.url);
                }
         }
         
         /**
          * 检查尾款是否已支付
          */
         this.checkFinalPay = function(){
             
            if (!Ju.sys.Helper.checkAndShowLogin({
                autoCallback: true
            })) {
                return;
            }
            //提交请求
                var theForm = DOM.get('#J_FinalPayForm'),
                    self = this;
                //var responseFn = new payResponse();
                Ju.app.onPress = 0;
                new Ju.app.dataSub({
                    subUrl: ajaxUri.finalPayCheck,
                    source: "form", //默认form
                    type: "POST", 
                    formEl :theForm, //form表单
                    callback : function(response){
                        self.showResponce(response);
                    },
                    failure : function(){
                        self.showResponce();
                    }
                }); 
         }
         
         /**
          * 未付款继续
          */
         this.unpaiedGoOn = function(url){
             
             var content = '<p class="error-content cry">' + TPLS['unpaied'] + '</p>',
                self = this;

             if(popObj) popObj.hide();
             popObj = new Ju.sys.Popup({
                           width: 400,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           buttons: [
                               {
                                   style:'',
                                   text: '立即支付',
                                   func: function(){
                                       window.open(url);
                                       self.goOnPay();
                                   }
                               }
                           
                           ],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popObj.show();
                
         }
         /**
          * 继续付尾款
          * {"type" : "UNPAID_FINAL", "data" : {"url":"http://taobao.alipay.net/trade/trade_payment.htm?trade_no=2011022101575432&sms_orderid=24013837610748&sms_buynumber=1&sms_price=17.00&sign_from=3000&already_check=1&sms_productid=null&sign_account_no=20881020083263250156","timeEnd":"1298805466000","timeNow":"1298275487311"}}
          */
         this.finalUnpaiedGoOn = function(data){
             
             var timeEnd = Ju.sys.Helper.timeFormat(new Date(parseInt(data.timeEnd)), 'yyyy年MM月dd日 hh:mm:ss'),
                content = TB.common.formatMessage(TPLS['finalUnpaied'], {dateEnd: timeEnd}),
                content = '<div  style="height:128px" class="error-content cry">' + content + '</div>',
                self = this;
                
             if(popObj) popObj.hide();
             popObj = new Ju.sys.Popup({
                           width: 400,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           buttons: [
                               {
                                   style:'',
                                   text: '支付尾款',
                                   func: function(){
                                       window.open(data.url);
                                       self.goOnFinalPay();
                                   }
                               }
                           
                           ],
                           autoShow: false,
                           adaptive: true,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popObj.show();
                
                //倒计时
                var theTimer = DOM.get('.J_juItemTimer', popObj.popup);
                
                var dsecAnim = DOM.create('<div class="dsec-anim J_Dsecond">秒</div>');
                DOM.insertAfter(dsecAnim, theTimer);
                Ju.app.timer.create(
                        {
                            timeEnd: parseInt(data.timeEnd),
                            style:'simple',
                            timeCurrent: parseInt(data.timeNow),
                            timeLeft: 0,
                            container: theTimer,
                            callback: function(){
                                
                                //倒计时结束后，改变按钮显示状态
                                if(!handler) {
                                    return;
                                }
                                
                                //隐藏毫秒
                                var dsecAnim = S.DOM.get('.dsec-anim', handler.parentNode);
                                if(dsecAnim){
                                    DOM.addClass(dsecAnim, 'no-anim');
                                }
                                
                            }
                        }
                    );
         }
         
         this.processJson = function(response){
            if(!response) {
                this.systemBusy();
                return false;
            }
            
            //alert(response);
            var jsonStr = response.responseText ? response.responseText : response,
                jsonData = null;
                
            jsonStr = jsonStr.replace(/\r|\n/g, '');
            if(jsonStr !== "") {
                try {
                    jsonData = KISSY.JSON.parse(jsonStr);
                } catch (e) {
                    this.systemBusy();
                }
            }
            if(!jsonData) {
                return false
            };
            
            return jsonData;
            
         }
         
         /*
          * var content = TB.common.formatMessage(TPLS.rate, {rate : jsonData.data.rate});
                    this.normalMsg(content, 'cry');
          */
         
         /**
         * 显示提示
         * @param {String} content 内容html
         * @param {String} type  类型cry smile laugh
         */
         this.popObj = null;
        this.showPop= function(content, type, url){
            var content = '<p class="error-content ' + type + '">' + content + '</p>',
                self = this;
                
            if(popObj) popObj.hide()
            popObj = new Ju.sys.Popup({
                       width: 394,
                       content: content,
                       title: '小提示',
                       type: 'pop-ju',
                       buttons: [{
                           text: '确定',
                           func: function(){
                               this.hide();
                               
                               if(url) {
                                location.href = url;
                               }
                               
                           }
                       }],
                       autoShow: false,
                       useAnim: true,
                       onHide : function(){
                           Ju.app.onPress = 0;
                           //self.reloadToTab();
                       }
                   });
            popObj.show();
        };
        
        /**
         * 切换用户
         */
        this.switchUser = function(data){
            var content = '<p style="height:80px" class="error-content cry">' + TPLS.switchUser + '</p>',
                self = this;
                
            if(popObj) popObj.hide()
            popObj = new Ju.sys.Popup({
                       width: 394,
                       content: content,
                       title: '小提示',
                       type: 'pop-ju',
                       buttons: [{
                           text: '确定',
                           func: function(){
                               this.hide();
                           }
                       }
//                       ,
//                       {
//                           text: '重新登录',
//                           func: function(){
//                               this.hide();
//                               if(data.data.url) {
//                                location.href = data.data.url;
//                               }
//                           }
//                           
//                       }
                       ],
                       autoShow: false,
                       useAnim: true,
                       onHide : function(){
                           Ju.app.onPress = 0;
                           //self.reloadToTab();
                       }
                   });
            popObj.show();
        }
        
        /**
             * 系统繁忙提示
             */
            this.systemBusy = function(){
                var content = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p>'
                            + '<p class="busy"></p>',
                    self = this;
                if(popObj) popObj.hide();
                popObj = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           keepShow:true,
                           buttons: [{
                               text: '继续团购',
                               func: function(){
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popObj.show();
                //添加倒计时
                var tuanBtn = popObj.popup.getElementsByTagName('button')[0],
                    activeTime = (Math.floor(Math.random() * 6) + 3) * 1000;
                DOM.addClass(tuanBtn, 'unavil');
                //清除事件
                Event.remove(tuanBtn, 'click');
                
                setTimeout(function(){
                    var contP = popObj.popup.getElementsByTagName('p'),
                        closeButton = DOM.get('.btn-close');
                    contP[0].innerHTML = "OK，你可以继续团购了。";
                    DOM.css(contP[1], 'display', 'none' );
                    DOM.removeClass(tuanBtn, 'unavil');
                    DOM.css(closeButton, 'display', 'block' );
                    
                    Event.on(tuanBtn, 'click', function(){
                        popObj.hide();
                        //刷新页面定位到当前tab
                        location.reload();
                    });
                    
                    
                }, activeTime);
            };
         

        
    }
    
    J.app.stairPay = stairPay;
})
/**
 * 任务式团购 @author etai 2011.6.30
 */
Ju.add('app.task', function(J) {
    var K = KISSY, DOM = K.DOM, Event = K.Event;
    
    var task = function(response, config){
        
        //html temps
        var Tpls = {
            
        };
        
        var buySubmitUri = '/json/tg/buyItemAction.htm';
        
        this.config = {
            'type' : 'question'
        }
        this.popup = null;
        //
        this.init = function(response, config){
            
            this.config = K.merge(this.config, config || {});
             if(!response) {
                this.systemBusy();
                return;
            }
            
            //alert(response);
            var jsonStr = response.responseText ? response.responseText : response,
                jsonData = null;
            if(jsonStr !== "") {
                try {
                    jsonData = KISSY.JSON.parse(jsonStr);
                } catch (e) {
                    this.systemBusy();
                }
            }
            if(!jsonData) return;
            
            //
            switch(jsonData.type) {
                
                case "QUESTION" : 
                    this.showQuestion(jsonData);
                    break;
                case "ERROR":
                    this.normalMsg(jsonData.data.msg, 'cry', jsonData);
                    break;
                default : 
                    this.systemBusy();
            }
            
        }
        
        //
        this.showQuestion = function(data){
            var html = data.data.html, self = this;
            if(!html) {
                return;
            }
            
            var popTitle = "问答团购";
            if(data.data.mode == "0"){
                popTitle = "密码团购";
            }
            
            this.popup = new Ju.sys.Popup({
                width: 410,
                content: html,
                title: popTitle,
                type: 'pop-ju',
                buttons: [{
                    style:'pop-btn-blue',
                    text: '提交',
                    func: function() {
                        self.questionSubmit();
                    }
                },{
                    style:'',
                    text: '关闭',
                    func: function() {
                        this.hide();
                    }
                }],
                autoShow: false,
                adaptive: true,
                useAnim: true,
                onHide : function() {
                    Ju.app.onPress = 0;
                    //self.reloadToTab();
                }
            });
            this.popup.show();
            
        }
        
        //
        this.questionSubmit = function(){
            
            //
            if (!Ju.sys.Helper.checkAndShowLogin({
                autoCallback: true
            })) {
                return;
            }
            var self = this;
            Ju.app.onPress = 0;
            var questionForm = DOM.get('.J_TaskPopForm', self.popup.popup),
                testRysc = new Ju.app.dataSub({
                subUrl: buySubmitUri,
                source: "form", //
                type: "POST",
                formEl :questionForm, //form
                callback : function(response) {
                    self.popup.hide();
                    Ju.app.buy(response);
                },
                failure : function() {
                    self.popup.hide();
                    Ju.app.buy();
                }
            });
            
        }
        
        /**
             * 普通提示
             * @param {String} content 内容html
             * @param {String} type  类型cry smile laugh
             */
            this.normalMsg= function(content, type) {
                var content = '<p class="error-content ' + type + '">' + content + '</p>',
                self = this,
                popTitle = '小提示';
                var popup = new Ju.sys.Popup({
                    width: 394,
                    content: content,
                    title: popTitle,
                    type: 'pop-ju',
                    buttons: [{
                        text: '确定',
                        func: function() {
                            this.hide();
                        }
                    }],
                    autoShow: false,
                    useAnim: true,
                    onHide : function() {
                        Ju.app.onPress = 0;
                        //self.reloadToTab();
                    }
                });
                popup.show();
            };
        
        /**
            
        */
        this.systemBusy = function(){
                var content = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p>'
                            + '<p class="busy"></p>',
                    self = this;
                
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-ju',
                           keepShow:true,
                           buttons: [{
                               text: '继续团购',
                               func: function(){
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
                //添加倒计时
                var tuanBtn = popup.popup.getElementsByTagName('button')[0],
                    activeTime = (Math.floor(Math.random() * 6) + 3) * 1000,
                    Dom = YAHOO.util.Dom, YEvent = YAHOO.util.Event;
                Dom.addClass(tuanBtn, 'unavil');
                //清除事件
                YEvent.purgeElement(tuanBtn, false, 'click');
                
                setTimeout(function(){
                    var contP = popup.popup.getElementsByTagName('p'),
                        closeButton = Dom.getElementsByClassName('btn-close', 'a', popup.popup)[0];
                    contP[0].innerHTML = "OK，你可以继续团购了。";
                    Dom.setStyle(contP[1], 'display', 'none' );
                    Dom.removeClass(tuanBtn, 'unavil');
                    Dom.setStyle(closeButton, 'display', 'block' );
                    
                    YEvent.on(tuanBtn, 'click', function(){
                        popup.hide();
                        location.reload();
                        //刷新页面定位到当前tab
                        //self.reloadToTab();
                    });
                    
                    
                }, activeTime);
            };
        
        this.init(response, config);
        
    }
    
    Ju.app.task = task;
    
})
/**
 * 聚划算订阅组件
 */

Ju.add('app.subscribe', function(J) {

    var S = KISSY;
    
    var subscribe = function(config){
    
        var defConfig = {},
            self = this,
            cityPop = null;
        
        this.init = function(){
            
            //改变城市
            this.changeCity();
            
            //激活邮件显示
            this.mailActived();
        };
        
        //更改订阅城市
        this.changeCity = function(){
            var changeHdl = S.DOM.get('#J_SubCityChange');
            if(!changeHdl ||!config.cities ) {
                return;
            }
            
            var current = config.current;
            //<input type="radio" id="subCity0" name="subCity" /> <label for="subCity0">杭州</label>
            
            var popCont = '<div class="pop-citychange"><p>';
            
            var cityInd = 0;
            for(city in config.cities){
                popCont += '<label for="subCity'+cityInd+'"><input type="radio" id="subCity'+cityInd+'" name="subCity" value="'+city+'" '
                        + (current[0] == city ? 'checked=""' : '')
                        +' />'+config.cities[city]+'</label>';
                cityInd++;
            }
            
            popCont += '</p>'
                     + '<p class="no-city"><input type="radio" id="subCityNull" name="subCity" value="none" '
                     + (current[1] == 'none' ? 'checked=""' : '')
                     + ' /> <label for="subCityNull">我所在的城市未开通</label></p></div>';
            
            if(!cityPop) {
            
                cityPop = new Ju.sys.Popup({
                           width: 545,
                           content: popCont,
                           title: '请选择城市',
                           type: 'pop-cityslct',
                           buttons: [{
                               text: '确定',
                               func: function(){
                                   //alert(Ju.sys.Helper.getRadioValue('subCity'));
                                   self.subCityUpdate();
                                   this.hide();
                               }
                           },{
                               text: '返回',
                               func: function(){
                                   this.hide();
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                           }
                       });
            
            }
                
            
            S.Event.on(changeHdl, 'click', function(ev){
                ev.preventDefault();
                cityPop.show();
            })
            
        };
        
        this.onCityPopHide = function(){
            
        };
        
        //更新页面城市显示
        this.subCityUpdate = function(){
            var cityTo = Ju.sys.Helper.getRadioValue('subCity');
            if(!cityTo) return;
            
            var cityCont = S.DOM.get('#J_SubCityChange').parentNode;
            if(!cityCont) return;
            if(cityTo == "none"){
                cityCont.innerHTML = '你将订阅聚划算最新宝贝团购信息及所在城市 (所在城市未开通 <a href="#" ID="J_SubCityChange">修改</a>) “吃喝玩乐”团购信息。';
                
            }
            else{
                cityCont.innerHTML = '你将订阅聚划算最新宝贝团购信息及<strong>'+config.cities[cityTo]+'</strong><a id="J_SubCityChange" href="#">(修改)</a>“吃喝玩乐”团购信息';
            }
            
            var cityInput = S.DOM.get('#J_NewSubCity');
            if(!cityInput) return;
            
            if(config.cities[cityTo]) {
                cityInput.value = config.cities[cityTo];
            }
            else{
                cityInput.value = cityTo;
            }

            self.changeCity();
            
            
            
        }
        //激活邮件
        this.mailActived = function(){
            var activedFlag = S.DOM.get('#J_MailActived');
            if(!activedFlag) return;
            
            if(activedFlag.value === "0") return;
            
            //显示弹层
            var mailCont = '<p class="error-content smile">邮箱激活成功!</p>';
            var mainPop = new Ju.sys.Popup({
                           width: 394,
                           content: mailCont,
                           title: '小提示',
                           type: 'pop-ju',
                           buttons: [{
                               text: '确定',
                               func: function(){
                                   this.hide();
                               }
                           }],
                           autoShow: false,
                           useAnim: true
                       });
            mainPop.show();
        }
        
        /**
         * 订阅表单处理
         */
        this.subFormSubmit = function(formId){
            formId = formId || 'subscribeform';
            var subForm = S.DOM.get('#'+formId);
            if(!subForm) return;
            
            var wwcheck = S.DOM.get('#wwcheck', subForm),
                emailcheck = S.DOM.get('#emailcheck', subForm),
                emailinput = S.DOM.get('#email', subForm),
                msgBox = S.DOM.get('.msg', subForm);

            function showMsg(msg){
                msgBox.innerHTML = '<p class="tips">'+msg+'</p>';
            }
            function hideMsg(msg){
                msgBox.innerHTML = '';
            }
            function validMail(mail){
                var reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                mail = S.trim(mail);
                return reg.test(mail);
            }
            
            var formSubmit = S.DOM.get('#J_saveSubInfo');
            if(!formSubmit) return;
            
            S.Event.add(formSubmit, 'click', function(ev) {
                ev.halt();
                hideMsg();
                if(!emailcheck.checked && !wwcheck.checked) {
                    showMsg('你还没有选择订阅方式，我们将无法定时给你发送你感兴趣的最新团购信息，请选择订阅方式。 ');
                    return;
                }
                else if(emailcheck.checked){
                    
                    if(emailinput.value.length==0) {
                        showMsg('对不起，邮箱不为能空，请正确输入你的邮箱。  ');
                        return;
                    }
                    else if(!validMail(emailinput.value)){
                        showMsg('对不起，邮箱输入不对哦：）请正确输入你的邮箱。 ');
                        return;
                    }
                }
                
                subForm.submit();
                
            })
            
        }
        
        
        this.init();
        return this;

    };
    
    /**
     * 首页wiget
     */
    subscribe.showWidget = function(html){

        var container = S.DOM.get('#J_SubWidget');
        if(!container) return;
        
        container.innerHTML = html;
        
        var subLinks = S.DOM.query('.J_SubsLink');
        if(subLinks.length >0 && Ju.app.mapData && Ju.app.mapData.ct) {
            for(var ind=0, len=subLinks.length; ind<len; ind++) {
                subLinks[ind].href += '?ct=' + Ju.app.mapData.ct;
            }
        }
        
    }
    
    //console.log(subscribe);
    Ju.app.subscribe = subscribe;

});
    
    (function(){
    var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Lang = YAHOO.lang, Connect = YAHOO.util.Connect, S = KISSY;
    
    var juhuasuan = function(){
        
        var snsUrl = 'http://jianghu.' + Ju.sys.Helper.getDomain(),
        
            defConfig = {
            
            },
        
            ajaxUri = {
                buySubmit : '/json/tg/buyItemAction.htm', //API-购买提交地址
                sellerSign: '/json/tg/sellerAction.htm', //API-商家报名
                sellerEdit: '/json/tg/sellerEditAction.htm',
                goodsAdd : '/json/tg/uploadFirst.htm', //API-添加商品第一步
                goodsAdd2 : '/json/tg/itemPublishAction.htm', //API-添加商品第二步，详情
                goodsEdit : '/json/tg/itemEditAction.htm', //API-编辑商品
                pageGoodsAdd : '/tg/itemPublishFirst.htm', //PAGE-添加商品
                pageGoodsAdd2 : '/tg/itemPublishSecond.htm', //PAGE-添加商品第二步
                pageMyGoods  : '/tg/myItem.htm', //我的商品
                subscribeWidget: Ju.sys.Helper.getServerURI('ju') + '/json/tg/subcribeWidget.htm', //收藏html异步请求
                cityList: Ju.sys.Helper.getServerURI('ju') + '/json/tg/cityList.htm', //城市列表接口  /json/tg/cityList.htm 
                itemBuyCount: '/json/tg/cityList.htm', //城市列表接口  /json/tg/cityList.htm   
                listLocalApi : '/json/tg/lifeMore.htm', //拖动加载list ../api/lifeMore.htm
                sellerMoreApi: '/json/tg/sellergroupMore.htm', //卖家团
                getQuestion : '/json/tg/getQuestionAction.htm', //任务式团购，取得问题接口
                getMenuInfo : Ju.sys.Helper.getServerURI('ju') + '/json/tg/menuWidget.htm', //头部以及导航数据异步加载
                recordCity : '/json/tg/jcCookie.htm',
                buyCheckCode : '/json/tg/buyCheckCode.htm', //验证码开关
                validateCheckCode : '/json/tg/validateCheckCode.htm' //验证码校验     
            },
            
            messageTpls = {
                
            },
            
            cityListPop = null,
            
            listLazy = null,
            
            localTabOn = 0; //定位在本地服务团
        /**
         * 执行
         */
        this.init = function(){
            var self = this;
            Event.onDOMReady(function(){

                //头部数据拉取
                self.headRender();
                
                //城市列表
                self.getCityList();

                //样式渲染
                //self.pageRender();
 
                //添加宝贝表单初始化
                //self.formInit();
                
                //上传文件
                self.uploadFiles();
                
                //排行榜
                //self.rankList();

                //品控
                self.qcRender();

            });
            
            
        };

        /*
         * 头部字段以及订阅部分异步获取
         */

        this.headRender = function() {
        
			var curryCity = S.get('.J_CurrCity');

			if (!curryCity) {
				return;
			}

            var city = curryCity.getElementsByTagName('span')[0],
                localGroup = S.get('.J_LocalGroup').getElementsByTagName('a')[0],
                logo = S.get('.logo'), ck = S.get('#layout').getAttribute('data-ck'),
                _self = this, suffix = '', timeout = 2800, loaded = false;

            if (ck) {
                suffix = '&ck=' + ck;
            }

            jsonp(ajaxUri.getMenuInfo, function(hrefCk, cityName, itemSum, subscribeSnippet) {

                var subDiv = S.DOM.create(subscribeSnippet);

                if (!isGlobal()) {
                    setCityName(cityName);
                }

                if (localGroup) {
                    localGroup.innerHTML = cityName + '团购<em>(' + itemSum + ')</em>';
                    localGroup.href += hrefCk;
                }

                logo.appendChild(subDiv);

                _self.pageRender();

                loaded = true;
                        
            }, errorCallback);

            function setCityName(cityName) {
                city.innerHTML = cityName || '全国';
            }

            function errorCallback() {
                setCityName('全国');        
            }

            function jsonp(api, success, error) {

                var expando = 'jsonpHd' + (+new Date()),
                    scriptUrl = api + '?callback=' + expando + suffix;

                window[expando] = function() {
                    success.apply(null, [].slice.call(arguments, 0));
                    //delete window[expando];
                }

                function createScript(url) {
                    var s = document.createElement('script');
                    s.type = "text/javascript";
                    s.async = "true";
                    s.src = url;
                    document.body.appendChild(s);
                }

                createScript(scriptUrl);
                
                setTimeout(function() {
                    if(!loaded) { error() }              
                }, timeout);
                
            }

            function isGlobal() {
                return S.trim(city.innerHTML) == '全国';
            }
           
        }
        
        /**
         * 排行榜
         */
        this.rankList = function(){
            KISSY.getScript(Ju.sys.Helper.getServerURI('assets')  + '/js/app-ranklist.js', function(){
                
            })
        }
        
        /**
         * 列表页样式渲染
         */
         this.pageRender = function(container){
             
            var self = this;

            container = container ? container : document;


            //拖动加载
            self.listLazyLoad(container);

            //价格样式处理
            self.divPrices(container);
            
            //处理tips
            self.showItemTip(container);

            //倒计时处理
            self.timeCounter(container);

            //分享组件调用
            new Ju.app.share('.item_share', container, 1);

            //处理按钮
            self.buyButtons(container);
            
            //购买交互
            self.buySubmit(container);

            //地图
            self.loadMap();
            
            //阶梯价格
            self.stairInit();
            
            self.pageEffects();

            //品控
            //self.qcRender();
            
            //淘分享
            new Ju.app.taoshare();
         };
         
         /**
          * 页面效果
          */
         this.pageEffects = function(){
             //投票用户列表滚动
             function pollDiscountUser(){
                 var area = S.DOM.get('.J_VoteUserScroll');
                 if(!area) return;

             var ul = S.DOM.get('ul', area),
                 lis = S.DOM.query('li', ul),
                 liscount = lis.length,
                 index=0;
             
             if(liscount <= 5) return;
                
               //翻滚
             setTimeout(function(){
                    
                    var anim = S.Anim(
                        ul,
                        {
                            'margin-left':'-52px'
                        },0.5,
                        '',function(){
                            var ind = index%liscount;
                            S.DOM.append(lis[ind], ul);
                            index++;
                            S.DOM.css(ul, 'margin-left', '0px');
                        });
                    anim.run();
                    
                    setTimeout(arguments.callee, 1500);
                    
                },1500);
             }
             
             pollDiscountUser();
         };
         
         /**
          * 滚动加载
          */
         this.listLazyLoad = function(container){
             
             //取得商品列表
             var itemBoxs = S.DOM.query('.main-box'),
                 boxCount = itemBoxs.length,
                 isOnLoading = 0,
                 hasMore = 1,
                 lifeSum = 0;
                 
             var lifeSumInp = S.DOM.get('#J_LifeSum');
             if(lifeSumInp) {
                 lifeSum = lifeSumInp.value * 1;
             }
             else{
                 return;
             }
             //alert( (!hasMore));
             //如果列表项等于总数，或者没有更多了
             if(boxCount == lifeSum || !hasMore) {
                 return;
             }
             
                 //取得当前城市
             var currCity = S.DOM.get('span', S.DOM.get('.J_CurrCity')).innerHTML,
                 //加载list接口地址
                 listLocalApi = ajaxUri.listLocalApi,
                 //loading状态层
                 loadingState = S.DOM.get('#J_ListLoading'),
                 //当前要加载的页码
                 pageSta = 0,
                 //每第四个tab加载的offset
                 scrollDiff = 100,
                 //加载中文案
                 loadErrorStr = '<a class="reload" onclick="location.reload();">你的网速似乎有点问题,刷新下试试吧</a>',
                 self = this;
             
             /**
              * 卖家团
              */
             if(S.DOM.hasClass(document.body, 'ju-sellergroup')){
                 listLocalApi = ajaxUri.sellerMoreApi;
             }
             
             /**
              * 取得列表
              */
             function getListLocal(sta, size, city){
                
                if(isOnLoading){
                    return;
                }
                
                    //加载状态
                    onLoading();

                    S.io({
                        type : 'GET',
                        url  : listLocalApi, 
                        data : {
                            start:sta,
                            size:size,
                            city:city,
                            r:(new Date()).getTime(),
                            _input_charset:'utf-8'
                        },
                        success: function(data){
                            
                            if(data === '') {
                                hasMore = 0;
                                return;
                            }
                            
                            showList(data);
                            
                            onLoading(1);
                            
                         },
                         error: function(){
                             onLoadError();
                         },
                         dataType : 'html'
                     });
                
                }
             
             /**
              * 加载中状态显示
              */
             function onLoading(isOver){
                 
                 if(isOver) {
                     S.DOM.hide(loadingState);
                     isOnLoading = 0;
                     return;
                 }
                 isOnLoading = 1;
                 S.DOM.show(loadingState);
                 
             }
             /**
              * 显示列表项
              */
              function showList(data){
                  var newDiv = S.DOM.create('<div id="J_ItemList'+pageSta+'">'+data+'</div>');
                  S.DOM.append(newDiv, S.DOM.get('.ju-main'));
                  //S.DOM.get('.ju-main').innerHTML += '<div id="J_ItemList'+pageSta+'">'+ data +'</div>';
                  
                  //加载个数情况
                  var items = S.DOM.query('.main-box', newDiv);
                  if(items.length < 4){
                      
                      hasMore = 0;
                      
                  }
                  
                  //加载事件
                  self.pageRender(S.DOM.get('#J_ItemList'+pageSta));
                  
                  //旺旺亮灯
                  try{
                      Light.light();
                  }
                  catch(e){
                      
                  }
              }
              /**
               * ajax返回错误，显示“刷新页面”
               */
              function onLoadError(){
                   loadingState.innerHTML = loadErrorStr;
              }
              /**
               * 预加载
               */
              function listPreLoad(){
                 //判断当前视口是否需要加载
                 if(S.DOM.offset(itemBoxs[3]).top < (S.DOM.scrollTop() + S.DOM.viewportHeight() - scrollDiff)){
                     //alert(1);
                     pageSta = boxCount / 4;
                     //alert(pageSta);
                     if(boxCount % 4 > 0) {
                          hasMore = 0;
                     }
                     //firstLoaded = 1;
                     getListLocal(pageSta, 4, currCity);
                 };
              }
             
             //预加载
             //var firstLoaded = 0;
             if(container == document) {
                //hack:触发
                
                setTimeout(function(){
                    
                    window.scrollBy(0,-1);
                },400)
                 //listPreLoad();
             }
             
             //使用datalazyload懒加载列表
             S.use('datalazyload',function(){
                
                //if(!listLazy) {
                //问题点
                    var listLazy = new S.DataLazyload({
                        diff:scrollDiff
                    }); 
                    
                //}
                
                S.each(S.DOM.query('.main-box', container), function(box, ind){
                    //第四个box加事件
                    var loadEdge = 0;
                    if(ind>loadEdge && ind % 3 == 0) {
                        listLazy.addCallback(box, function(el){
                           
                           pageSta = boxCount / 4;
                           if(boxCount % 4 > 0) {
                               
                               hasMore = 0;
                               
                           }
                           
                           getListLocal(pageSta, 4, currCity);
                           
                        })
                    }
                })
                
                            
            });
         };
        
        /**
         * 阶梯价格加载
         */
        this.stairInit = function(){
            //阶梯价格条处理
            new Ju.app.stair({container: KISSY.DOM.query('.J_PriceGrads', KISSY.DOM.get('.ju-main'))});
        };

        /**
         *  品控
         */
         this.qcRender = (function() {

            var $get = KISSY.DOM.get;

            //隐藏坏链图片
            function hideBrokenImgs() {

                var qcReport = $get('#J_QcReport');

                if (!qcReport) {
                    return;
                }

                var imgList = qcReport.getElementsByTagName('img'),
                    totalImg = imgList.length,
                    loaded = totalImg;

                    KISSY.each(imgList, function(img) {
                        
                        img.onerror = function() {
                            _hideImg(this);
                        }
                        
                        if (KISSY.UA.ie) {
                            
                            if (!img.complete) {
                                _hideImg(img);
                            }
                        }                    

                    });

                    function _imgIsExist() {
                        
                        if(loaded <= 0) {
                            _hideReport();
                        }
                    }

                    function _hideReport() {
                        hideElem(qcReport);
                    }

                    function _hideImg(img) {
                        loaded--;
                        hideElem(img);
                        _imgIsExist();
                    }
            }

           

            function hideElem(elem) {
                if (elem && elem.nodeType == 1) {
                    elem.style.display = 'none';
                }
            }

            function init() {        
                hideBrokenImgs();
            }

             return init;

         })();


        /**
         * 地图加载
         */
        this.loadMap = function(){
            if(Ju.app.mapData) {
                
                Ju.app.mapData = S.JSON.parse(Ju.app.mapData);
                if(Ju.app.mapData.pois && Ju.app.mapData.pois.length>0) {
                    new Ju.app.local(Ju.app.mapData);
                }
            }
        };
        
        /**
         * 城市列表
         */
         this.getCityList = function(){
             
             function getCities(){
                 if(cityListPop) {
                    
                    cityListPop.show();
                    
                    var cityPop = cityListPop.popup,
                    
                    cityLis = S.DOM.query('li', S.DOM.get('.pop-city-cont', cityPop));
                    
                    S.DOM.show(cityLis);
                    return;
                    
                }

                S.io({
                     'url': ajaxUri.cityList,
                     'success': function(data) {

                        var content = data;
                        cityListPop = new Ju.sys.Popup({
                           width: 652,
                           content: content,
                           title: '选择城市',
                           type: 'pop-city',
                           buttons: [],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){}
                           });

                        cityListPop.show();
                        
                        bindEvents();
                    },
                    'dataType': "jsonp",
                    'forceScript': true  //solve 1.20dev CurrCity-Btn Bug
                });
                

                /*

                S.jsonp(ajaxUri.cityList, function(data){
                    var content = data;
                    cityListPop = new Ju.sys.Popup({
                           width: 598,
                           content: content,
                           title: '选择城市',
                           type: 'pop-city',
                           buttons: [],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               
                           }
                       });
                    cityListPop.show();
                    
                    bindEvents();
                    
                });

                */
                 
             };
             
             //添加事件
             function bindEvents(){
                 //添加筛选事件
                 initialFilter();
				 initialSelecter();
                 
                 //切换城市事件
                 //recordCity();
             }
             /**
             //记录城市
             function recordCity(){
                 var cityPop = cityListPop.popup,
                     cityLinks = S.DOM.query('a', S.DOM.get('.pop-city-cont', cityPop));
                 
                 S.Event.on(cityLinks, 'click', function(ev){
                     ev.halt();
                     var link = this,
                         linkUrl = link.getAttribute('href', 2),
                         linkStr = link.innerHTML;
                     
                     S.io({
                        type:"get",
                        url: ajaxUri.recordCity,
                        data: {jc : linkStr},
                        complete: function(){
                            location.href = linkUrl;
                        },
                        error: function(){
                            location.href = linkUrl;
                        }
                     })
                         
                     
                 })
             }
             */

			 function initialSelecter() {
				 
				 var $get = S.DOM.get,
				 	 cityPro = $get('#J_CityPro'),
				 	 cityTown = $get('#J_CityTown');
					 cityList = S.DOM.query('ul', $get('.J_CityAssociate')),
					 btnGo = $get('.J_ChangeCity');

				btnGo.innerHTML = '去看看';

				S.Event.on(btnGo, 'click', function(e) {
					e.preventDefault();
					switchCity();
				});


				S.Event.on(cityPro, 'change', function(e) {
					var cityName = this.options[this.selectedIndex].innerHTML;
					addOptions(cityName);
				});
				

				function removeAllOptions(select) {
					select.options.length = 0;
				}

				function addOptions(cityName) {

					var towns = getTowns(cityName);

					removeAllOptions(cityTown);
					S.each(towns, function(el) {
						var townUrl = el.getAttribute('data-city-url'),
							townName = el.innerHTML;

						var opt = new Option(townName);
							opt.value = townUrl;

						cityTown.options.add(opt);
					});
				}

				function getTowns(cityName) {
					
					var towns = [];

					S.each(cityList, function(el) {
						var cn = el.getAttribute('data-city-pro');

						if (cn && cn == cityName) {
							towns = S.DOM.query('li', el);	
						}
					});

					return towns;
		
				}

				function switchCity() {
					var selectTownUrl = cityTown.options[cityTown.selectedIndex].value;
					window.location.href = selectTownUrl;
				}

			 }
             //按拼音首字筛选
             function initialFilter(){
                var cityPop = cityListPop.popup,

                cityInis = S.DOM.query('a', S.DOM.get('.city-initials', cityPop)),
                cityLis = S.DOM.query('dl', cityPop);
				cityItems = S.DOM.query('li', S.DOM.get('.city-list', cityPop));

                var currCity = S.DOM.get('span', S.DOM.get('.J_CurrCity')).innerHTML;

                S.each(cityItems, function(el) {

                    if(S.DOM.get('a', el).innerHTML === currCity) {

                        S.DOM.addClass(el, 'on');

                    }

                });
                S.Event.on(cityInis, 'click', function(ev) {
                    ev.halt();
                    var evTarget = ev.target,
                    evIni = evTarget.innerHTML;

                    if('全部' === evIni) {

                        S.DOM.show(cityLis);

                    } else {

                        S.each(cityLis, function(el) {
                            if(el.getAttribute('data-Initial') != null && el.getAttribute('data-Initial') != evIni) {
                                S.DOM.hide(el);
                            } else {
                                S.DOM.show(el);
                            }
                        });
                    }

                })
             }
           
             S.Event.on('.J_CurrCity', 'click', function(ev){
                ev.halt();
                
                getCities();
                
             });
            
             S.Event.on('.J_OtherCityList', 'click', function(ev){
                ev.halt();
                
                getCities();
                
             });
            
             
         };

        /**
         * 订阅widget
         */
        this.getSubscribe = function(){
            if(!S.DOM.get('#J_SubWidget')) return;
            
            S.getScript(ajaxUri.subscribeWidget + '?callback=Ju.app.subscribe.showWidget', function() {
                
            }, 'GBK');

        };

        /**
         * 本地团tab切换
         */
        this.toLocalTab = function(){
        
            localTabOn = 1;
            var itemConts = S.query('.iteminfo'),
                localItem = S.get('#J_LocalService'),
                itemTabs = S.query('li', S.get('.itemtabs')),
                localTab = S.DOM.get('#J_LocalTab');
            
            if(S.DOM.css(localItem, 'display') !== 'none'){
                return;
            }
            
            //tab显示切换
            S.DOM.removeClass(itemTabs, 'on');
            S.DOM.addClass(localTab, 'on');
            
            //主体内容切换
            S.DOM.hide(itemConts);
            S.DOM.show(localItem);
            
            //隐藏复制链接框
            S.DOM.css(S.DOM.query('.share-copy'), 'visibility', 'hidden');

        };
        
        /**
         * 价格小数点处理
         */
        this.divPrices = function(container){
            
            function divPrice(price){

                price = price + "";
                var prices = price.split('.');
                return prices;
                
            }
            
            //价格标签
            var prices = S.DOM.query('.J_juPrices', container);

            if(prices.length > 0) {

                S.each(prices, function(price, ind){
                    
                    var thePrice = price.innerHTML,
                        thePrices = divPrice(thePrice),
                        curPrice = thePrices[0].substr(8) * 1;

                        if(curPrice >= 10000 && curPrice <= 999999) {
                             S.DOM.addClass(price,'large');
                        }
                        else if(curPrice > 999999){
                            S.DOM.addClass(price,'large1');
                        }
                        
                        price.innerHTML = thePrices[0] + '<span>.'+ thePrices[1] +'</span>';
                })

            }
            
        }
        
        //tips
        this.showItemTip = function(container){
            //标题tips
            var tips = S.DOM.query('.J_MultiCity', container);
            tips.each(function(tip){
                
                var theH = S.DOM.parent(tip, 'h2');
                
                S.Event.on(theH, 'mouseover', function(){
                    
                    S.DOM.show(tip);
                    
                })
                S.Event.on(theH, 'mouseout', function(){
                    
                    S.DOM.hide(tip);
                    
                })
            })
        }
        
        /**
         * 倒计时初始化
         */
        this.timeCounter = function(container){
            var itemTimer = Dom.getElementsByClassName('J_juItemTimer', 'div', container);
            if(itemTimer.length < 1) {
                return;
            }
            
            for(var ind = 0, len = itemTimer.length; ind < len; ind++) {
                var theTimer    = itemTimer[ind],
                    timeEnd     = theTimer.getAttribute('data-targettime'),
                    timeCurrent = theTimer.getAttribute('data-servertime'),
                    timerHandler = [];
                
                var dsecAnim = S.DOM.create('<div class="dsec-anim J_Dsecond">秒</div>');
                S.DOM.insertAfter(dsecAnim, itemTimer[ind]);
                //new Ju.app.timer(
                Ju.app.timer.create(
                    {
                        timeEnd: timeEnd,
                        timeCurrent: timeCurrent,
                        timeLeft: 0,
                        container: theTimer,
                        style: 'simple',
                        callback: function(handler){

                            //倒计时结束后，改变按钮显示状态
                            if(!handler) {
                                return;
                            }
                            
                            //隐藏毫秒
                            var dsecAnim = S.DOM.get('.dsec-anim', handler.parentNode);
                            if(dsecAnim){
                                S.DOM.addClass(dsecAnim, 'no-anim');
                            }
                            
                            
                            var contDom = S.DOM.parent(handler, '.main-box'),
                                ddButton = S.DOM.get('.buy-qiang', contDom),
                                theButton = S.DOM.get('.J_juBuyBtns', contDom),
                                timeCount = S.DOM.get('.time-count', contDom);

                            //折上折抢购
                            if(ddButton){
                                S.DOM.removeClass(ddButton, 'notbegin');
                                S.DOM.addClass(ddButton, 'qiang-avil');
                                timeCount.innerHTML = '<p class="begin">抢购已经开始!</p>';
                            }
                            //预告：开始售卖
                            else if (S.DOM.hasClass(contDom, 'notbegin')) {
                                S.DOM.removeClass(contDom, 'notbegin');
                                S.DOM.addClass(contDom, 'avil');
                                timeCount.innerHTML = '<p class="begin">团购已经开始!</p>';
                            }
                            //阶梯
                            else if (S.DOM.hasClass(contDom, 'notbegin jieti')) {
                                S.DOM.removeClass(contDom, 'notbegin');
                                S.DOM.addClass(contDom, 'jieti-front');
                                timeCount.innerHTML = '<p class="begin">团购已经开始!</p>';
                            }
                            
                            //正常购买：结束倒计时
                            else if(S.DOM.hasClass(contDom, 'avil') || S.DOM.hasClass(contDom, 'chance') || S.DOM.hasClass(contDom, 'soldout')) {
                                if(S.DOM.hasClass(contDom, 'jieti-front') || S.DOM.hasClass(contDom, 'jieti-chance') || S.DOM.hasClass(contDom, 'jieti-final')) {
                                    
                                    S.DOM.removeClass(contDom, 'avil');
                                    S.DOM.addClass(contDom, 'timeout');
                                    
                                    Dom.removeClass(theButton, 'avil');
                                    
                                    var bottomBuy = S.DOM.get('.buy-bottom', contDom);
                                    if(bottomBuy){
                                        S.DOM.hide(bottomBuy);
                                    }
                                }
                                else{
                                    S.DOM.removeClass(contDom, 'avil');
                                    S.DOM.addClass(contDom, 'timeout');
                                    
                                    var bottomBuy = S.DOM.get('.buy-bottom', contDom);
                                    if(bottomBuy){
                                        S.DOM.hide(bottomBuy);
                                    }
                                }
                                
                                
                                
                            }

                            

                            
                        }
                    }
                );
                
            }
            
        };
        
        /**
         * 处理购买按钮
         */
        this.buyButtons = function(container){

                //tips
                var buyTips = S.DOM.query('.J_buyTips'),
                    hideTimeout = null;
                if(buyTips.length < 1) {
                    return;
                }

                S.each(buyTips, function(theTip) {
                    var theBtn = S.DOM.get('.buy', theTip.parentNode) || S.DOM.parent(theTip, '.buy');

                    Event.on([theBtn, theTip], 'mouseover', function(ev) {
                        Event.stopPropagation(ev);
                        S.DOM.css(theTip, 'display', 'block');
                    });
                    Event.on([theBtn, theTip], 'mouseout', function(ev) {
                        Event.stopPropagation(ev);
                        S.DOM.css(theTip, 'display', 'none');
                    });
                })
            

            
        };

        /*
         * 参团验证码
         */

        this.buyCaptcha = (function(K, exports) {

            var DOM = K.DOM, $get = DOM.get,
                
                apiCapSwitch = ajaxUri['buyCheckCode'], apiCapValidate = ajaxUri['validateCheckCode'], callback = function(){},
                
                container = null, theForm = null, thePopup = null, domPopup = null, ccSpan = null, ccImg = null, refreshInterval = 200, timer = null,

                rgCCImg = /(http:\/\/(.*?)\?sessionID=(.*?)&)/, ccApiPrefix = '';
                
                /* CC Snippet
                content = [
                    '<div class="cc-detail">',
                        '<p class="dt-title">请输入以下验证图片中显示的字符进行验证</p>',
                        '<div class="dt-field">',
                            '<form>',
                                '<label>验证码：</label>',
                                '<span class="term"><input name="checkcode" autofocus="true" placeholder="请输入验证码" type="text" /></span>',
                                '<span class="cc"></span>',
                                '<span class="refresh">看不清？<a class="btn-refresh">换一张</a></span>',
                            '</form>',
                        '</div>',
                        '<div class="dt-error-tips">',
                            '<span>验证码错误。</span>',
                        '</div>',
                    '</div>'].join("\n");              
                */

            function timeStamp() {
                return +new Date();
            }

            function generateCCUri() {
                return ccApiPrefix + '_ts=' + timeStamp();
            }

            function updateItemCCValue(ccValue) {
            
                if (theForm && theForm['checkcode']) {
                    theForm['checkcode'].value = ccValue;
                    return;
                }

                generateCCItem();

                function generateCCItem() {
                    var ccInput = document.createElement('INPUT');
                    ccInput.setAttribute('type', 'hidden');
                    ccInput.setAttribute('name', 'checkcode');
                    ccInput.setAttribute('value', ccValue);
                    theForm.appendChild(ccInput);
                }
            }

            function renderCaptchaPopup(popup) {

                thePopup = popup, domPopup = thePopup.popup;

                var btnRefresh = $get('.btn-refresh', domPopup);

                grabCCImgPrefix(domPopup);
                attachKeyBoardEvent();
                
                Event.on(btnRefresh, 'click', function(e) {
                    Event.preventDefault(e);    
                    refreshCaptcha();
                });
            }

            function refreshCaptcha() {

                clearTimeout(timer);

                timer = setTimeout(function() {
                    ccImg.src = generateCCUri();
                }, refreshInterval);

            }

            function validateCaptcha() {

                var ccForm = $get('form', domPopup),
                    ccValue = ccForm['checkcode'].value;
                    
                updateItemCCValue(ccValue);
                callback();

                    /*
                    validateRequest = new Ju.app.dataSub({
                        subUrl: apiCapValidate,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :ccForm, //form表单
                        callback : function(response){
                            Ju.app.onPress = 0;
                            responseHandler(response);
                        },
                        failure : function(){}
                    });
                    */
            }

            function grabCCImgPrefix(popup) {

                var ccUri = '';

                ccSpan = $get('.cc', popup), ccImg = $get('img', ccSpan);

                if (ccImg && ccImg.src) {
                    ccUri = ccImg.src;
                    ccApiPrefix = ccUri.match(rgCCImg)[1];
                }

            }

            function showErrorMessage() {
                var errorTip = $get('.dt-error-tips', domPopup);
                DOM.show(errorTip);
                refreshCaptcha();
            }

            function closeCCPopup() {

                if(thePopup) {
                    thePopup.hide(); 
                }

            }

            function responseHandler(jsonData, buyAction) {

                var data, type, content;

                jsonData = jsonData.replace(/\r|\n|\\|\t/g, '');

                try {

                    data = KISSY.JSON.parse(jsonData);
                    
                } catch(e) {}        

                     if (K.isBoolean(data)) {

                        if (data) {
                            thePopup.hide();
                            callback();
                        } else{
                            showErrorMessage(); 
                            refreshCaptcha();
                        }
                        return;
                    }

                
                type = data && data.type || 'ERROR';

                switch(type) {

                    case 'HAS_CHECKCODE':

                        content = data.data.content;
                        renderCaptchaPopup(popupCaptcha(content, validateCaptcha));

                        break;

                    case 'NO_CHECKCODE':
                        callback();
                        break;
                    break;

                    case 'ERROR':
                        systemError();
                        break;

                    default:
                        callback();
                        break;

                }                
            }

            function polluteGlobal() {
                exports.app = exports.app || {};
                exports.app.captcha = {
                    'closeCCPopup': closeCCPopup,
                    'showErrorMessage' : showErrorMessage
                };
            }

            function requestCaptcha() {

                var captchaRequest = new Ju.app.dataSub({
                        subUrl: apiCapSwitch,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :theForm || document.createElement('form'), //form表单
                        callback : function(response){
                            Ju.app.onPress = 0;
                            responseHandler(response);

                        },
                        failure : function(){}
                    });
            }

            function systemError() {
                //todo
            }

            function popupCaptcha(content, validateFn) {
              
              var popup = new Ju.sys.Popup({
                   width: 475,
                   content: content,
                   title: '请输入验证码',
                   type: 'pop-captcha',
                   buttons: [{
                       text: '确定',
                       func: function(){
                           validateFn();
                       }
                   }],
                   autoShow: false,
                   useAnim: true,
                   onHide : function(){ 
                       Ju.app.onPress = 0
                       detachKeyBoardEvent();
                   }
               });
               
               popup.show();

               return popup;
            }

            function detachKeyBoardEvent() {
                Event.removeListener(document, 'keydown', onKeyDown);
            }

            function attachKeyBoardEvent() {
                Event.on(document, 'keydown', onKeyDown);
            }

            function onKeyDown(e) {
                if (e && e.keyCode && e.keyCode == '13') {
                    Event.preventDefault(e);
                    validateCaptcha();
                }
            }

            function preprocess(eTarget, container, buyAction) {
               
                var btnParent = eTarget.parentNode;

                if (Dom.hasClass(eTarget, 'J_BankCardBuy')) {
                    theForm = S.DOM.get('.J_BuySubForm', S.DOM.parent(eTarget))
                           || S.DOM.get('.J_BuySubForm', S.DOM.get('.buy-shuang', container));
                } else {
                    theForm = Dom.getElementsByClassName('J_BuySubForm', 'form', btnParent)[0];
                }

                if (K.isFunction(buyAction)) {
                    callback = buyAction;
                }

                container = container || document;

                if (!theForm || !condition()) {
                   callback(); 
                   return;
                }

                requestCaptcha();

            }

            return {
                'handle': init
            }

            function condition() {
                var checkCodeFlag = theForm.getAttribute('data-ccb');
                return checkCodeFlag && checkCodeFlag == '1';
            }

            function init(eTarget, container, /* buyAction：验证码成功回调 */ buyAction) {
                polluteGlobal();
                preprocess(eTarget, container, buyAction);
            }

        })(KISSY, Ju);
        
        /**
         * 首页提交购买请求
         */
        this.buySubmit = function(container){

            var _self = this;

            //验证码成功时的回调

            function buyActionHandler(eTarget) {
                
                var contDom = S.DOM.parent(eTarget, '.main-box'),
                    contBox = S.DOM.parent(eTarget, '.item-buy');
                
                if(!S.DOM.hasClass(contDom, 'avil') && !S.DOM.hasClass(contDom, 'jieti jieti-front') && !S.DOM.hasClass(contDom, 'qianggou')) {
                    return;
                }
                var btnParent = eTarget.parentNode;
                //大购买按钮
                if(Dom.hasClass(contBox, 'qiang-avil') || ((Dom.hasClass(eTarget, 'J_BuySubmit') || Dom.hasClass(eTarget, 'J_JuSMSRemind')) && S.DOM.hasClass(contDom, 'avil'))) {
                    
                    if(!Dom.hasClass(contBox, 'qiang-avil') && !Dom.hasClass(contDom, 'avil') && !Dom.hasClass(contDom, 'jieti-front')) {
                        return;
                    }
                    
                    if(Dom.hasClass(contBox, 'buy-qiang') && !Dom.hasClass(contBox, 'qiang-avil')){
                        return;
                    }

                    //12.11年货秒杀类商品处理：直接跳转url
                    var btnCont = S.DOM.parent(eTarget, '.J_juBuyBtns'),
                        isMiaosha = !!btnCont.getAttribute('data-miaosha');
                    
                    if(isMiaosha) {
                        var miaoshaUrl = btnCont.getAttribute('data-miaoshaurl');
                        if(!miaoshaUrl) return;
                        
                        window.open(miaoshaUrl);
                        return;
                        
                    }
                    
                    //登录判啊断
                    if (!Ju.sys.Helper.checkAndShowLogin({
                        autoCallback: true
    //                    autoCallback: false,
    //                    callback : function(){
    //                        location.reload();
    //                    }
                    })) {
                        return;
                    }
                    
                    var theForm = Dom.getElementsByClassName('J_BuySubForm', 'form', btnParent)[0],
                        testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.buySubmit,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :theForm, //form表单
                        callback : function(response){
                            Ju.app.onPress = 0;
                            Ju.app.buy(response);
                        },
                        failure : function(){
                            Ju.app.buy();
                        }
                    });
                    
                }
                //ajaxUri.finalSubmit
                else if(Dom.hasClass(eTarget, 'J_HomePayFinal')){
                    //登录判断
                    if (!Ju.sys.Helper.checkAndShowLogin({
                        autoCallback: true
                    })) {
                        return;
                    }
                    
                    new Ju.app.stairPay('homeFinal', {container: btnParent});
                    
                }
                
                //bankcard
                else if(Dom.hasClass(eTarget, 'J_BankCardBuy')) {
                    
                    //登录判断
                    if (!Ju.sys.Helper.checkAndShowLogin({
                        autoCallback: true
                    })) {
                        return;
                    }
                    
                    var bankForm = S.DOM.get('.J_BuySubForm', S.DOM.parent(eTarget))
                                 || S.DOM.get('.J_BuySubForm', S.DOM.get('.buy-shuang', container)),
                        testRysc = new Ju.app.dataSub({
                        subUrl: ajaxUri.buySubmit,
                        source: "form", //默认form
                        type: "POST", 
                        formEl :bankForm, //form表单
                        callback : function(response){
                            Ju.app.onPress = 0;                           
                            Ju.app.buy(response);
                        },
                        failure : function(){
                            Ju.app.buy();
                        }
                    });
                }
                //任务式
                else if(Dom.hasClass(eTarget, 'J_TaskBuy')){
                    //登录判断
                    if (!Ju.sys.Helper.checkAndShowLogin({
                        autoCallback: true
                    })) {
                        return;
                    }
                    var theForm = Dom.getElementsByClassName('J_BuySubForm', 'form', btnParent)[0],
                        testRysc = new Ju.app.dataSub({
                            subUrl: ajaxUri.getQuestion,
                            source: "form", //默认form
                            type: "POST", 
                            formEl :theForm, //form表单
                            callback : function(response){
                                Ju.app.onPress = 0; 
                                Ju.app.task(response, {'type':'question'});
                            },
                            failure : function(){
                                Ju.app.buy();
                            }
                        });

                }
            }
            
            //购买按钮事件
            Event.on(container, 'click', function(e){
                    
                    var eTarget = Event.getTarget(e),
                        contBox = S.DOM.parent(eTarget, '.item-buy'),
                        contDom = S.DOM.parent(eTarget, '.main-box');

                    if(!Dom.hasClass(eTarget, 'J_BuySubmit') 
                        && !Dom.hasClass(eTarget, 'J_HomePayFinal')
                        && !Dom.hasClass(eTarget, 'J_JuSMSRemind')
                        && !Dom.hasClass(eTarget, 'J_BankCardBuy')
                        && !Dom.hasClass(eTarget, 'J_TaskBuy')
                        ) {
                        return;
                    }
                    
                    //开团提醒在未到时前，不需要验证码，临时hack
                    if(Dom.hasClass(eTarget, 'J_JuSMSRemind')){
                                           
                        if(!Dom.hasClass(contDom, 'avil')){
                            return;
                        }
                        
                    }
                    
                    //下单逻辑必须重构了，md
                    if(!S.DOM.hasClass(contBox, 'qiang-avil')){
                        if(!S.DOM.hasClass(contDom, 'avil') && !S.DOM.hasClass(contDom, 'jieti jieti-front')) {
                            return;
                        }
                    }
                    

                    Event.preventDefault(e);
 
                    if (!Ju.sys.Helper.checkAndShowLogin({
                        autoCallback: true
    //                    autoCallback: false,
    //                    callback : function(){
    //                        location.reload();
    //                    }
                    })) {
                        return;
                    }

                    //优先处理验证码

                    _self.buyCaptcha.handle(eTarget, container, function() {
                        buyActionHandler(eTarget);
                    });
            });
        };
        
        /**
         * 上传文件
         */
        this.uploadFiles = function(){
            var browseBtn = Dom.get("J_JuFileBrowse"),
                fileTest = Dom.get("J_JuFileTest"),
                fileBtn = Dom.get("J_JuFileHidden");
            if(!browseBtn || !fileBtn) {
                return;
            }

            Event.on(browseBtn, 'click', function(){
                Ju.sys.Helper.createClick(fileBtn);
            });
            
//            Event.on(fileBtn, 'change', function(){
//                alert(fileBtn.value);
//            })
//            
        }

        
        this.init();
        
        
    }

    
    Ju.use(function(){
        Ju.app.onPress = 0;
        Ju.app.juhuasuan = new juhuasuan();
    });
    
})();
/**
 * @app-Naver
 * @author: liuling.wb
 * @date: 2011.04.12
 */

;(function(global, undef) {
	
	var _filter = function(elems, fn, ctx) {
		
		var nodes = [];

		for (var i = 0, l = elems.length; i < l; i++) {
			
			if (fn.call(ctx || null, elems[i], i, elems)) {
				nodes.push(elems[i]);
			}
		}

		return new KISSY.NodeList(nodes);
	};
	
	var K = KISSY, D = K.DOM, Q = D.query, E = K.Event, N = K.Node,
		parentCls = '.navigation',
		subMenu = 'div.sub-menu',
		subNav = '.ju-sub-nav',
		guideTips = '.J_GuideTips',
		debug = false;
	

	var Naver = new function() {
		
		var ul, lis, cntNode;

		function _render() {

			ul = K.one(parentCls); 
			if(!ul) return;

            var elems = ul.all('li');

           lis = _filter(elems, function(domNode, idx, nodeList) {

                var li = new N(domNode);

				if (li.hasClass('current')) {
					cntNode = li;
					return false;
				}

				return true;
            });


			
			if(!cntNode) return;

			_cntHandler();
		}

		function _cntHandler() {

			var target = null;
			
			if (cntNode.hasClass('entrance')) {
				target = cntNode.next();
				
			} else {
				target = cntNode.prev();
			}
	
			target.css('background', 'none');
			cntNode.css('padding-left', '0px');
		}

		function _bind() {

			lis.each(function(li) {

				E.on(li, 'mouseenter', function(ev) {
					D.css(li.all(subMenu), 'display', 'block');
				});
				E.on(li, 'mouseleave', function(ev) {
					D.css(li.all(subMenu), 'display', 'none');
				});
				
			});
			
			//取消当前a链接
			K.each(D.filter('.nav-link', '.on'), function(a){
			    
			    if(D.hasClass(a, 'on')) {
			        
			        E.on(a, 'click', function(ev){
			            
			            ev.halt();
			            
			        })
			        
			    }
			    
			})
			
		}
		//引导tips
		function _showTips(){
		    var tip = D.get(guideTips);
		    if(!tip) return;
		    Ju.sys.simpleStorage.init();
		    if(Ju.sys.simpleStorage.getItem('hideGuide')) {
                return;
            }
            
            D.show(tip);
            
            var cls = D.get('.cls', tip);
            E.on(cls, 'click', function(ev){
                
                ev.halt();
                D.hide(tip);
                Ju.sys.simpleStorage.setItem('hideGuide', 1);
                
            })
		    
		}

		return {
			'init': function() {
				_render();
				_bind();
				_showTips();
			}
		}
	}	
	
	
	/**
	 * sider
	 */
	var Sider = function() {

        var focusType = 'mouseenter', releaseType = 'mouseleave',
            sider_bar = K.one('.sider-bar-tp'), 
            lis = null, cnt = null;
    
            function __init__() {
                
                priceRender();
                
                bindLink();

                if (!sider_bar) {
                    return;
                }
                
                lis = sider_bar.all('li');
                cnt = sider_bar.one('li.current');
                
                bind();
                highLight(cnt);
            }
            
            function priceRender(){
                
                var prices = D.query('.price', D.get('.ju-sider'));
                if(prices.length == 0){
                    return;
                }
                K.each(prices, function(el){
                    var priceSpan = D.get('span', el);
                    if(priceSpan){
                        var price = priceSpan.innerHTML + "",
                            prices = price.split('.');
                        //priceSpan.innerHTML = '<em>'+prices[0]+'</em>.'+prices[1];
                        
                        var newSpan = D.create('<span><em>'+prices[0]+'</em>.'+prices[1]+'</span>');
                        D.insertBefore(newSpan, priceSpan);
                        D.remove(priceSpan);
                    }
                    
                })
                
            }
    
            function bind() {
                lis.each(function(li) {
                    E.on(li, focusType, function(evt) {
                        highLight(li, 'hover');
                    });
    
                    E.on(li, releaseType, function(evt) {
                        normalize(li, 'hover');
                    });

                }); 
            }
            
            function bindLink(){
                //if(K.UA.ie < 8) {
                    
                    var theLinks = D.query('.wrap', D.get('.ju-sider'));
                    if(theLinks.length < 1){
                        return;
                    }
                    theLinks.each(function(link){
                        
                        E.on(link, 'click', function(ev){
                            ev.halt();
                            location.href = link.getAttribute('href');
                        })
                        
                        
                    })
                    
                    
                //}
                
                
            }
            
            function highLight(li, className) {
                if(!li || li.hasClass('current')) return;
                
                className = className ? className : 'on';
                
                var prevNode = li.prev();
                li.addClass(className).addClass('noBg');
                if (null != prevNode) {
                    prevNode.addClass('noBg');
                }
            }
    
            function normalize(li, className) {
                if(!li || li.hasClass('current')) return;
                
                className = className ? className : 'noBg';
                
                var prevNode = li.prev();
                if(!li.hasClass('current')) {
                    li.removeClass(className).removeClass('noBg');
                    if (null != prevNode) {
                        prevNode.removeClass('noBg');
                    }
                    highLight(cnt);
                }
            }
            
            __init__();

    
    };


	K.ready(function(k) {
		Naver.init();
		Sider();
	});

})(window, undefined);
/**
 * 聚划算短信提醒
 */
;(function(Ju, K) {
    
    var DOM = K.DOM, Event = K.Event,
        API_getForm = Ju.sys.Helper.getServerURI('ju')+'/json/tg/messageRemind.htm',
        API_submitForm = Ju.sys.Helper.getServerURI('ju')+'/json/tg/remindAction.htm',
        API_checkCode = Ju.sys.Helper.getServerURI('ju')+'/json/tg/validateCheckCode.htm',
        Trigger_Remind = 'J_JuSMSRemind',
        Trigger_FreshValid = '.J_ValidFresh',
        GUID = 0,
        
        TPLs = {    
            
            'FORM_OK': '<div class="cont">\
                {{#if source=="1"}}\
                <p class="rhd">如果商品入选团购, 聚划算将在开团前通过阿里旺旺或<em>免费短信</em>通知你团购消息。</p>\
                {{#else}}\
                <p class="rhd">聚划算将根据你的设置, 在开团前通过手机短信或阿里旺旺提醒你团购消息。</p>\
                {{/if}}\
                <div class="remind-form J_RemindPopForm">\
                    <form>\
                    <div class="form-li J_RemindWW">\
                        <div class="terms">\
                            <label><input type="checkbox" name="" value="1" /></label>\
                            <span>阿里旺旺提醒：<em>{{nick}}</em></span>\
                        </div>\
                    </div>\
                    <div class="form-li J_RemindPhone">\
                        <div class="terms">\
                            <label><input type="checkbox" name="" value="1" /></label>\
                            <span>手机提醒: </span>\
                            <span class="userPhone"><input name="userPhone" type="text" value="{{phone}}" disabled="disabled"/></span>\
                        </div>\
                    </div>\
                    <div class="form-li J_RemindValid" style="display:none">\
                          <div class="terms">\
                                <span>验证码: </span>\
                                <span><input name="checkcode" class="sms-valid" type="text" value="" /></span>\
                                <span><img class="valid-img" width="71" height="20" src="{{checkCodeUrl}}&_ts=" /></span>\
                                <span>看不清? </span>\
                                <span><a href="#" class="J_ValidFresh">换一张</a></span>\
                          </div>\
                    </div>\
                    <div class="msg attention"><p class="cont" style="display:none"></p></div>\
                    <input type="hidden" class="J_RemindType" name="remindType" value="-1" />\
                    </form>\
                </div>\
                {{#if source=="1"}}\
                <p class="tip">( 如商品未入选, 我们将不会发送通知短信 )</p>\
                {{/if}}\
            </div>',

            'REMINDED': '<div class="cont">\
                      <p class="rhd">亲，你已{{#if source=="1"}}在我想团中{{/if}}对该商品设置了开团提醒！</p>\
                      <div class="remind-info">\
                      {{#if nick}}<p>阿里旺旺提醒: {{nick}}</p>{{/if}}\
                      {{#if phone}}<p>手机短信提醒: {{phone}}</p>{{/if}}</div>\
                      <p class="r-tip">{{#if source=="1"}}如果商品入选团购，{{/if}}聚划算将在开团前通过{{normalTips}}通知你团购消息。</p>\
                      </div>',
            
            'REMIND_OK': '<div class="cont success">\
                    <p class="rhd">操作成功！<br/>{{#if source=="1"}}如果商品入选团购，{{/if}}聚划算将在开团前通过<em>{{normalTips}}</em>通知你</p>\
                    </div>'
        },


        REMIND_PARAMS = {

            'REMINDED_WW': {
                'nick' : '',
                'phone': '<em>未设置</em>',
                'source': '0',
                'normalTips': '阿里旺旺'
            },

            'REMINDED_SMS': {
                'nick' : '<em>未设置</em>',
                'phone': '',
                'source': '0',
                'normalTips': '免费短信'
            },

            'REMINDED_SMS_AND_WW': {
                'nick' : '',
                'phone': '',
                'source': '0',
                'normalTips': '阿里旺旺或免费短信'
            },

            'WW_SUCCESSFULLY': {
                'nick' : '',
                'phone': '',
                'source': '0',
                'normalTips': '阿里旺旺'            
            },

            'SMS_SUCCESSFULLY': {
                'nick' : '',
                'phone': '',
                'source': '0',
                'normalTips': '免费短信'  
            },
            'SMS_AND_WW_SUCCESSFULLY': {
                'nick' : '',
                'phone': '',
                'source': '0',
                'normalTips': '阿里旺旺与免费短信'                 
            },
            'OK': {
                'nick' : '',
                'phone': '',
                'source': '0',
                'checkCodeUrl':''
            }
        },
    
    /**
     * @namespace Ju.remind
     */
        Remind = function(container, config){
            
        var self = this;
        
        this.type = 'sms';
        
        this.result = "";
        
        this.pop = null;
        
        this.config = {
            manual: false, //是否手动触发
            trigger_cls:null, //trigger
            checkState:true, //是否检查商品时态
            source:"0",
            area: null, //显示form区域
            form: null, //表单
            addData:{}, //附加数据
            popup: null //已有弹层
        };
        
        this.validResult = true;
        
        this.signValid = new Ju.app.formValidator()
        
        /**
         * 初始化
         
         */
        this.init = function(container){
            
            container = container || document;
            
            this.bind(container);
            
        }
        
        
        this.config = K.merge(this.config, config);
        //手动
        if(!this.config.manual){
            this.init(container);
        }

        
         
    }
    
    Remind.prototype = {
        
        'bind' : function(container){
            var self = this;
            Event.on(container, 'click', function(ev){
                
                if(self.config.trigger_cls){
                    if(!DOM.hasClass(ev.target, self.config.trigger_cls)) return;
                }
                else{
                    if(!DOM.hasClass(ev.target, Trigger_Remind)) return;
                }
                
                if(self.config.checkState){
                    var contDom = DOM.parent(ev.target, '.main-box');

                    if(!DOM.hasClass(contDom, 'notbegin')){
                        return;
                    }
                }
                
                ev.halt();
                self.getRemind(ev.target);
                
            })
            
        },
        
        /**
         * 取得提醒表单
         */
        'getRemind': function(el){
            //alert(1);
            var self = this;
            
            //登录判断
            if (!self.config.manual && !Ju.sys.Helper.checkAndShowLogin({
                autoCallback: true,
                callbackScope:self
            })) {
                return;
            }

            this.theForm = this.config.form || DOM.get('.J_BuySubForm', el.parentNode);
            //console.log(this.theForm);
            /*
            var testRysc = new Ju.app.dataSub({
                subUrl: API_getForm,
                source: "form", //默认form
                type: "GET",
                formEl :this.theForm, //form表单
                callback : function(response) {
                    //console.log(response);
                    self.dealResponse(response);
                    Ju.app.onPress = 0;
                },
                failure : function() {
                    
                }
            });
            */
            //form data 
            var formData = {};
            K.each(DOM.query('input', this.theForm), function(inp){
                formData[inp.name] = inp.value;
            })
            Ju.app.onPress = 1;
            K.io({
                url: API_getForm,
                data: formData,
                success: function(data) {
                    self.dealResponse(data);
                    Ju.app.onPress = 0;
                    
                },
                dataType:'jsonp'
            });
            
            
        },

        /*
         * 隐藏当前Popup
         */

        'hideCurrentPopup': function() {
            if(this.config.popup){
                this.config.popup.hide();
            }
            else if (typeof this['popup' + GUID] == 'object') {
                this['popup' + GUID].hide();
            }
        },

         /*
          * 验证表单
          */

        'checkForm': function() {
            
            var checkList = [checkPhone, checkRemindType],
                l = checkList.length, _self = this,
                result, pass = true,
                rgPhone = /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/;
           
            while (l--) {

                result = checkList[l]();

                if (result !== true) {

                    pass = false;
                    this.showErrorMessage(result);
                    break;

                }
            }

            return pass;
            
            function checkPhone() {
                
                var inputPhone = DOM.get('.J_RemindPhone', _self.domPopup).getElementsByTagName('input')[1].value,
                    remindType = DOM.get('.J_RemindType', _self.domPopup).value,
                    hasRemindPhone = remindType == '0' || remindType == '2';

                if (hasRemindPhone && !rgPhone.test(inputPhone)) {
                    return '手机号码格式错误';
                }

                return true;
            }

            function checkRemindType() {

                var remindType = DOM.get('.J_RemindType', _self.domPopup);

                if (remindType.value == '-1') {
                    return '请选择开团提醒方式';
                }

                return true;
            }
        },
        

        'dealResponse': function(jsonObj, s){
            
            /**
            response = response.responseText ? response.responseText : response;
            response = response.replace(/\r|\n/g, '');
            var jsonObj = null, _self = this;
            
            if(response !== "") {
                try {
                    jsonObj = KISSY.JSON.parse(response);
                } catch (e) {
                    this.systemBusy();
                    return;
                }
            }
            **/
            var _self = this;
            if(jsonObj.type == "OK"){
                _self.result = "OK";
                this.showRemind(jsonObj, 'FORM_OK', '设置免费开团提醒', function(popup){
                    _self.renderRemindPopup(popup);    
                });
                return;
            }
            
            //如果那个，就不显示了
            if(_self.config.manual && !s){
                return;
            }
            
            //var pop = _self.config.popup || _self.popup;
            //if(pop){
            //    pop.hide();
            //}
             
            if(jsonObj.type == "ERROR"){
                this.hideCurrentPopup();
                this.normalMsg(jsonObj.data.content, 'error');
                return;
            }
            else if(jsonObj.type == "REMINDED_WW" || jsonObj.type == "REMINDED_SMS" || jsonObj.type == "REMINDED_SMS_AND_WW"){
                this.hideCurrentPopup();
                this.showRemind(jsonObj, 'REMINDED', '查看开团提醒设置');
                return;
            }

            else if(jsonObj.type == "WW_SUCCESSFULLY" || jsonObj.type == "SMS_SUCCESSFULLY" || jsonObj.type == "SMS_AND_WW_SUCCESSFULLY" ) {
                if(!_self.config.manual) this.hideCurrentPopup();
                this.showRemind(jsonObj, 'REMIND_OK');    
                _self.result = "SUCCESS";
                return;
            }
            else if (jsonObj.type == "CHECKCODE_ERROR") {
                this.showErrorMessage('验证码错误！')
                this.refreshCCcode();
            }

            else{
                this.systemBusy();
            }
            
            
        },

         /*
          * 规范数据
          */

        'getNormalizedData': function(data) {

            if (!K.isPlainObject(data)) {
                this.systemBusy();
                return;
            }

            return {
                'nick': data.nick,
                'phone': data.phone,
                'source': data.source,
                'checkCodeUrl': data.checkCode 
            }
        },

         /*
          * 在Popup右下角动态显示错误
          */

        'showErrorMessage': function(msg) {
            
            var domMsg = DOM.get('.attention', this.domPopup).getElementsByTagName('P')[0];
           
            if (domMsg && domMsg.nodeType == '1') {
                DOM.show(domMsg);
                domMsg.innerHTML = msg;
            }

            setTimeout(function() {
                DOM.hide(domMsg);
            }, 2500);
        },

         /*
          * 根据Checkbox设置RemindType[Hidden]
          */

        'setRemindType': function(chkWangWang, chkPhone) {

            var remindType = DOM.get('.J_RemindType', this.domPopup),
                flagWW = chkWangWang.checked,
                flagPhone = chkPhone.checked;

            if (flagWW && !flagPhone) {
                remindType.value = '1';
            } else if (!flagWW && flagPhone) {
                remindType.value = '0';
            } else if(flagWW && flagPhone) {
                remindType.value = '2';
            } else if(!flagWW && !flagPhone) {
                remindType.value = '-1';
            }
       
        },


         /*
          * 隐藏/展开 验证码区域
          */

        'toggleCCArea': function(flag) {         
            var domCC = DOM.get('.J_RemindValid', this.domPopup);
            DOM[flag ? 'show' : 'hide'](domCC);
        },

         /*
          * 重刷验证码
          */
           
        'refreshCCcode': function() {

            var rgCC = /(http:\/\/(.*?)\?sessionID=(.*?)&)/,
                validImg = DOM.get('.valid-img', this.domPopup),
                urlPrefix = validImg.src.match(rgCC)[1];

            validImg.src = urlPrefix + '&_ts=' + (+new Date);
        },

         /*
          * 将BuyItem表单数据合并至Popup中表单
          */

        'mergeForm': function() {

            var oldElements = this.theForm.elements;

            for (var i = 0, l = oldElements.length; i < l; i++) {
                var input = oldElements[i].outerHTML || new XMLSerializer().serializeToString(oldElements[i]);
                this.popupForm.appendChild(DOM.create(input));
            }                   
          
        },

         /*
          * 渲染Popup,绑定相关逻辑
          */

        'renderRemindPopup': function(popup) {

            var domPopup = this.domPopup = popup.popup || popup,
                btnRefresh = DOM.get('.J_ValidFresh', domPopup),
                chkWangWang = DOM.get('.J_RemindWW', domPopup).getElementsByTagName('input')[0],
                chkPhone = DOM.get('.J_RemindPhone', domPopup).getElementsByTagName('input')[0],
                inputPhone = DOM.get('.J_RemindPhone', domPopup).getElementsByTagName('input')[1],
                btnSubmit = DOM.get('.ok', this.domPopup),
                _self = this; this.popupForm = DOM.get('form', domPopup);
                this['popup' + (++GUID)] = popup;

            //开团提醒必选旺旺
            if(this.config.source == "1"){
                chkWangWang.checked = true;
                chkWangWang.disabled = true;
                _self.setRemindType(chkWangWang, chkPhone);
            }

            chkWangWang && Event.on(chkWangWang, 'click', function(e) {
                if(_self.config.source == "1"){
                    e.halt();
                }
                _self.setRemindType(this, chkPhone);
            });


            chkPhone && Event.on(chkPhone, 'click', function(e) {
                 var flag = this.checked;
                 _self.setRemindType(chkWangWang, this);
                 _self.toggleCCArea(flag);
                 inputPhone.disabled = !flag;
            });

            btnRefresh && Event.on(btnRefresh, 'click', function(e) {
                e.preventDefault();
                _self.refreshCCcode();
            });

            btnSubmit && Event.on(btnSubmit, 'click', function(e) {
                _self.setRemind();
            });

            this.mergeForm();

        },

         /*
          * 渲染Template并回调
          */

        'renderTemplate': function(tmp, data, cbk) {
            
            
            K.use('template', function(){
                callback();
            })

            /**
             * hacked by etai 2012.1.10
            if(!K.Template || K.Template.prototype.constructor.name != "Template"){
                K.getScript(Ju.sys.Helper.getServerURI('assets') + '/js/kissy-template-pkg.js', function(){
                    callback();
                    return;
                });
            }
            else{
                callback();
            }
            */

            function callback() {
                var snippet = K.Template(tmp).render(data);
                cbk(snippet);
            }
        },

         /*
          * 浅合并
          */

        '_shadowMerge': function(orig, target) {

            for (var p in orig) {
                if (!orig[p] && target[p]) {
                    orig[p] = target[p];
                }
            }

            return orig;
        },

         /* void showRemind
          * @flag {String} 在TPls中对应的Key, 若为空则为jsonData中的type值 
          * @title {String} 在Popup中显示的标题
          * @callback {String} 弹出Popup后的回调
          */

        'showRemind': function(jsonData, flag, title, callback) {

            var type = jsonData.type, data = jsonData.data, preParams = REMIND_PARAMS[type], template = TPLs[flag || type],

                _self = this, notAutoHide = !!(type == 'OK');

            if (!type || !data || !preParams) {
                this.systemBusy();
                return;
            }

            var data = this._shadowMerge(preParams, this.getNormalizedData(data));
            
            data.source = this.config.source;

            this.renderTemplate(template, data, function(content) {
                
                var popup = null;
                if(_self.config.manual){
                    _self.config.area.innerHTML = content;
                    popup = _self.config.area;
                }
                else{
                    popup = _self.normalMsg(content, '', true, title, notAutoHide);
                }

                if (K.isFunction(callback)) {
                    callback(popup);
                }
            });

        },

         /* 
          * 在验证后发起设置remind请求
          */

        'setRemind': function(callback) {

            var _self = this;

            if (this.checkForm()) {
                /**
                var setRemindAync = new Ju.app.dataSub({
                    subUrl: API_submitForm,
                    source: "form", //默认form
                    type: "POST",
                    formEl :this.popupForm, //form表单
                    callback : function(response) {
                        _self.dealResponse(response);
                        Ju.app.onPress = 0;
                    },
                    failure : function() {
                        
                    }
                });   
                */
                
                var formData = {};
                K.each(DOM.query('input', this.popupForm), function(inp){
                    formData[inp.name] = inp.value;
                })
                formData = K.merge(formData, _self.config.addData);
                
                Ju.app.onPress = 1;
                K.io({
                    url: API_submitForm,
                    data: formData,
                    success: function(data) {
                        //callback && callback();
                        _self.dealResponse(data, 1);
                        Ju.app.onPress = 0;
                        
                    },
                    dataType:'jsonp'
                });
            
            
                
            }
                        
        },
        /**
         * 普通弹层
         */ 
        'normalMsg': function(content, type, showHtml, title, notAutoHide) {
            content = showHtml? content : '<div class="cont ' + type + '"><p class="rhd">' + content + '</p></div>';
            var self = this,
                popTitle = '小提示';
                
                if(self.pop){
                    
                    self.pop.hide();
                    
                }
                
                var popup = new Ju.sys.Popup({
                    width: 394,
                    content: content,
                    title: title || popTitle,
                    type: 'pop-remind',
                    buttons: [{
                        text: '确定',
                        style: 'ok',
                        func: function() {
                            if (!notAutoHide) {
                                this.hide();
                            }
                        }
                    }],
                    autoShow: false,
                    useAnim: true,
                    onHide : function() {
                        Ju.app.onPress = 0;
                        //self.reloadToTab();
                    }
                });
                popup.show();

                return popup;
            },
        /**
         * 系统繁忙
         */
        'systemBusy': function(){
                var content = '<p class="error-content smile">系统繁忙：人太多了，休息一下，等等吧… </p>'
                            + '<p class="busy"></p>',
                    self = this;
                
                var popup = new Ju.sys.Popup({
                           width: 394,
                           content: content,
                           title: '小提示',
                           type: 'pop-remind',
                           keepShow:true,
                           buttons: [{
                               text: '继续团购',
                               style: 'ok',
                               func: function(){
                               }
                           }],
                           autoShow: false,
                           useAnim: true,
                           onHide : function(){
                               Ju.app.onPress = 0;
                           }
                       });
                popup.show();
                //添加倒计时
                var tuanBtn = popup.popup.getElementsByTagName('button')[0],
                    activeTime = (Math.floor(Math.random() * 6) + 3) * 1000,
                    Dom = YAHOO.util.Dom, YEvent = YAHOO.util.Event;
                Dom.addClass(tuanBtn, 'unavil');
                //清除事件
                YEvent.purgeElement(tuanBtn, false, 'click');
                
                setTimeout(function(){
                    var contP = popup.popup.getElementsByTagName('p'),
                        closeButton = Dom.getElementsByClassName('btn-close', 'a', popup.popup)[0];
                    contP[0].innerHTML = "OK，你可以继续操作了。";
                    Dom.setStyle(contP[1], 'display', 'none' );
                    Dom.removeClass(tuanBtn, 'unavil');
                    Dom.setStyle(closeButton, 'display', 'block' );
                    
                    YEvent.on(tuanBtn, 'click', function(){
                        popup.hide();
                        location.reload();
                        //刷新页面定位到当前tab
                        //self.reloadToTab();
                    });
                    
                    
                }, activeTime);
            }
        
    }
    
    Ju.app.Remind = Remind;
    new Remind();
    
    
})(Ju, KISSY);


/**
 * d2c
 */

;(function(K, global) {

    var Event = K.Event, Dom = K.DOM,
        $get = Dom.get, $query = Dom.query;


    /*
     * SnippetLazyLoader 
     *
     * D2C list 页面的列表懒加载
     *
     */

    var SnippetLazyLoader = (function() {
       
       /*
        * pending
        *
        * @type: domNode
        * @description: 下一个需要处理的懒加载节点
        */

       var pending = null,

       /*
        * vessel
        *
        * @type: domNode
        * @description: 懒加载容器
        */

           vessel = null,
               
       /*
        * indicator
        *
        * @type: domNode
        * @description: 菊花转
        */

           indicator = null,

       /*
        * subscriber
        *
        * @type: Array[Funciton]
        * @description: 每次懒加载完成后调用的外部Callback们
        */

           subscriber = [], 


       /*
        * isScrolling
        *
        * @type: Boolean
        * @description: 作为Scroll事件间隔触发的标示
        */
           isScrolling = false, 

       /*
        * delay
        *
        * @type: Number
        * @description: 作为Scroll事件间隔触发的延迟
        */

           delay = 200,

       /*
        * total
        *
        * @type: Number
        * @description: 需懒加载List的总数，页面初始化时会从Hidden[Id="J_D2cSum"]项中取得
        */
         
           total = 0,
          
       /*
        * index
        *
        * @type: Number
        * @description: 当前懒加载的序列号
        */
         
           index = 1,

       /*
        * router
        *
        * @type: String
        * @description: 返回HTML片段的后台调用接口
        */

           router = "/json/tg/dtocMore.htm";


       function scrollHandle(e) {

            if(!isScrolling && SnippetLazyLoader.enabled) {

                isScrolling = true;

                setTimeout(function() {
                
                    measure();
                    isScrolling = false;

                }, delay);
            }
       }

       //设置下一个懒加载Node

       function setTarget() {
            
            function getLastItem() {
                return $query('.main-box').pop();
            }
            
            pending = new SnippetLazyLoader.Node(getLastItem(), {'threshold': 50});
         
       }

       //当每次懒加载完调用所有注册的subscriber
       
       function externalAction() {

            K.each(subscriber, function(fn) {
                fn();
            });
       }

       function loadSnippet() {

            onLoading();

            K.io.get(router,{ 

               "_input_charset": "utf-8",
               "size": "4",
               "start": index++
                        
               }, function(response) {

                    offLoading();
                    fill(response);
                    onSnippetLoad();

           });
 
       }

       //拼装HTML片段并加之插入到对应容器中

       function fill(snippet) {

           var snippet = '<div id="J_D2cItemList' + index + '">' + snippet + '</div>';
           Dom.append(Dom.create(snippet), vessel);

       }

       //加载后的渲染

       function listRender() {
            Ju.app.juhuasuan.pageRender($get('#J_D2cItemList' + index));
       }
        

       //加载的条件判断

       function condition() {
            return getExist() < total;
       }

       //flush

       function flush() {
           pending = null;
       }

       function onSnippetLoad() {

            listRender();
            setTarget();
            externalAction();

       }

       //加载的判断逻辑

       function measure() {

           if (condition()) {

                if(pending && pending.inviewport()) {

                     flush();
                     loadSnippet();

                }

           } else {
                SnippetLazyLoader.enabled = false;
           }
       }

       function bind() {
           Event.on(global, 'scroll', scrollHandle);
       }

       function getSum() {
           total = $get('#J_D2cSum').value;
       }


       function getExist() {
           return $query('.main-box').length;
       }

       function getVessel() {
           vessel = $query('.ju-main')[0];
       }

       function getIndicator() {

            indicator = $get('#J_ListLoading');
            Dom.hide(indicator);

       }

       function onLoading() {
            Dom.show(indicator);
       }

       function offLoading() {
           Dom.hide(indicator);
       }

       function resetScroll() {
            global.scrollTo(0, 0);
       }

       function onPageRender() {
            getSum();
            getVessel();
            getIndicator();
            resetScroll();
            setTarget();     
       }

       return {
            'init': init,
            'registerAction': registerAction
       }


       function init() {

            if($get('#J_D2cSum')) {

                onPageRender();
                bind();
                syncTMS();

            }
       }

       function registerAction(fn) {
            subscriber.push(fn);
       }

    })();


    //懒加载Node

    SnippetLazyLoader.Node = function(elem, settings) {


        //加载垂直阀值

        this.threshold = settings.threshold || '60';
        
        //节点引用

        this.node = elem;
        
        //判断目标节点是否在当前视图中

        this.inviewport = function() {

            var fold = Dom.viewportHeight() + Dom.scrollTop();
            return fold >= Dom.offset(this.node).top - this.threshold;

        }
    }

    //在window.Scroll事件中是否启用懒加载逻辑

    SnippetLazyLoader.enabled = true;


    //同步右侧TMS列表页的显示

    function syncTMS() {
        
        var siders = $query('.sider-extend'),
            constant = 4;

        function showUtil(num) {
            
            while (num--) {
                Dom.show(siders[num]);
            }
        }

        function getMainBoxLength() {
            return $query('.main-box').length || 0;
        }

        function hideAll() {
            Dom.hide('.sider-extend');   
        }

        (function __init__() {
            hideAll();
            showUtil(getMainBoxLength());
        })();

        syncTMS = function() {
            showUtil(getMainBoxLength());
        }

    }

    //旺旺点灯

    function lightWangWang() {
        Light.light();
    }

    SnippetLazyLoader.registerAction(function() {
        syncTMS();
        lightWangWang();
    });

    K.ready(function() {
         SnippetLazyLoader.init();
    });

})(KISSY, window);/**
  * app-juke.js
  * liuling.wb@taobao.com
  */

;(function(global, K) {

    var Dom = K.DOM, Event = K.Event,

        $get = Dom.get, $query = Dom.query,

        isDevEnv = (function(re) {
            return re.exec(global.location.href) ? true : false;        
        })(/http:\/\/(ju\.com)/),

        DEBUG = false;
    
    
    /**
     * Console
     *
     * @Temp
     */

    var console = global.console || {'log': function(msg){ global['alert'](msg)}};


    var Juke = {

        'init': function() {

            Juke.IoWidgetManager.init();
            RatioCalculator.init();
            //Ju.app.dataSub.init();

        },

        '$version': 1.0
    },
    
        Noop = function(){};

    
    /**
     * IOWidget __proto__
     *
     * @interface
     */


    var _iOwidgetProto_ = {
        
        '_init': function() {

            this._isImplemented();
            this.setup();
            this._bind();
            this.render();

        },

        '_bind': function() {       
         
            var _self = this;

            if (!K.isUndefined(this.subBtn) && !K.isNull(this.subBtn)) {
                   
                Event.on(this.subBtn, 'click', function(e) {
                    e.preventDefault();
                    _self.btnHandler(e, this);
                });

            }
        },
        
        'setup': Noop,

        'btnHandler': Noop,

        'render': Noop,

        'preProcess': Noop,

        'IO': Noop,

        'responseHandler': _globalHandler,

        '_isImplemented': _isImplemented
    };


    /**
     * Check Method Implementation
     *
     * @Param {instance} IoWidget instance
     */

    function _isImplemented() {
        
        for (method in this) {

            if (K.isFunction(this[method]) && method.toString().charAt(0) != '_') {

                if (this[method] === Noop) {
                    throw new Error('JuKe_IOWidget_ERR: method[' + method + '] has Not Implemented!');
                }

            }
        }
        
    }

    function _globalHandler(response, arg) {

        var jsonData = null;

        try {
            jsonData = dataParse(response);
        } catch(e){ /*ignore*/ }

        if(!jsonData) {

            return;
        
        }

       switch(jsonData.type) {
            
            case "ERROR":
                 
                    errorHandler(jsonData.msg);
                    break;

            case "AUTH_NOT_PAST":

                    var authMsg = jsonData.msg + ' <a href="http://bangpai.taobao.com/group/thread/613552-259312177.htm" target="_blank">查看报名要求</a>';
                    errorHandler(authMsg);
                    break;

            case "IS_NOT_TAOKE":
                    
                    var specialMsg = '您还不是淘客掌柜，请登录<a href="http://taoke.alimama.com/keeper/manage.htm">http://taoke.alimama.com/keeper/manage.htm</a>申请';
                    errorHandler(specialMsg);
                    break;

            case "IS_NOT_JUKE":

                    navigateTo("/tg/jukeAgreement.htm");
                    break;

            case "APPLY_DETAIL_SUCC":

                    navigateTo("/tg/jukeItemApply.htm?itemId=" + arg);
                    break;

            case "ASSIGN_SUCC":

                    navigateTo("/tg/jukeItemHistory.htm");
                    break;

            case "CANCEL_SUCC":

                    navigateTo("/tg/jukeItemHistory.htm");
                    break;

            case "TAOKE_SUCC":

                    navigateTo("/tg/myJukeItem.htm");
                    break;

            case "EDIT_DETAIL_SUCC":

                    navigateTo("/tg/jukeItemEdit.htm?jukeItemId=" + arg);
                    break;

            case "JUKE_SUCC":

                    navigateTo("/tg/myJukeItem.htm");
                    break;

            default: Noop;
        }

        function errorHandler(msg) {

            var popup = new Ju.sys.Popup({
                   width: 394,
                   content: msg,
                   title: '小提示',
                   type: 'pop-ju',
                   buttons: [{
                       text: '确定',
                       func: function(){
                           this.hide();
                       }
                   }],
                   autoShow: false,
                   useAnim: true,
                   onHide : function(){
                       Ju.app.onPress = 0;
                   }
           });

           popup.show();
        }

        function dataParse(json) {

            if(json) { 
                return K.JSON.parse(json);
            }
        }

        function navigateTo(uri) {
            global.location.href = uri;
        }
    }

    
    /**
     *  IoWidget Manager
     */


    Juke.IoWidgetManager = new function() {

       this.IoWidgets = [];

       this.init = function() {
            this.setup();
            this.run();
       }
    }

    Juke.IoWidgetManager.add = function(klass) {
        
        if (K.isFunction(klass)) {
            this.IoWidgets.push(klass);
        }

        K.unique(this.IoWidgets);
    }

    Juke.IoWidgetManager.removeAll = function() {
        this.IoWidgets.length = 0;
    }

    Juke.IoWidgetManager.run = function() {
        
        if (!this.isInstantiated) {
            throw new Error('Juke_IoWidgetManager_ERR: IoWidgets have NoT Instantaited!');
        }

        for (var i = 0, l = this.IoWidgets.length; i < l; i++) {
            (new this.IoWidgets[i])._init();  
        }
    }

    Juke.IoWidgetManager.setup = function() {

        for (var i = 0, l = this.IoWidgets.length; i < l; i++) {
            this.IoWidgets[i].prototype = _iOwidgetProto_;
        }

        this.isInstantiated = true;
    }

    
    Juke.IoWidgetManager.Rounter = {

        'signValidator': '/json/tg/myJukeItemAction.htm',
        'signPromotion': '/json/tg/myJukeItemAction.htm',
        'cancelPromotion': '/json/tg/myJukeItemAction.htm',
        'editPromotion': '/json/tg/myJukeItemAction.htm',
        'agreePromotion': '/json/tg/myJukeItemAction.htm'

    }


    /**
     * Ju.App.DataSub 
     *
     * @Stub
     */

    /*
    Ju.app.dataSub = (function() {
        
        var pendingPools = {},
            orig_DataSub = Ju.app.dataSub;

        function _dataSub(config) {

            var retData = pendingPools[config.subUrl],
             
                fn = function() {
                    config.callback(retData);
                };
            
            if (_dataSub.isAsync) {

                global.setTimeout(fn, _dataSub.period)
            
             } else {
          
                fn();
             }
        }

        _dataSub.addRounter = function(uri, data) {
            pendingPools[uri] = data;
        }

        _dataSub.restore = function() {
            Ju.app.dataSub = orig_DataSub;
        }

        _dataSub.init = function() {
            
            if(!isDevEnv) {
                _dataSub.restore();
            }
        }

        return _dataSub;

    }());


    Ju.app.dataSub.period = 1200;

    Ju.app.dataSub.isAsync = false;


    Ju.app.dataSub.addRounter('/json/tg/myJukeItemAction.htm','{"type": "ERROR", "msg": "这里是文案"}');
    Ju.app.dataSub.addRounter('/json/tg/myJukeItemAction.htm','{"type": "ERROR", "msg": "店铺没有参加淘客"}');
    Ju.app.dataSub.addRounter('/json/tg/myJukeItemAction.htm','{"type": "ERROR", "msg": "店铺没有参加淘客"}');
    Ju.app.dataSub.addRounter('/json/tg/jukeItemEdit.htm','{"type": "ERROR", "msg": "您的推广已经提交且无法修改了，有问题请直接联系小二."}');
    
    */

    /**
     * 申请聚客验证
     *
     * @implement: IOWidget
     */

    var SignValidator = function() {

        var _self = this,
            identifier = 'signValidator',
            router =  Juke.IoWidgetManager.Rounter[identifier],
            form = null;


        this.setup = function() {
            this.subBtn = $get('#J_JukeSign') || $get('#J_JukeEdit');
        }

        this.render = function() {
            // Orz...
        }

        this.btnHandler = function(e, btn) {
            this.preProcess();
        }

        this.preProcess = function() {

           form = K.Node(this.subBtn).parent('form')[0];

            if (priceValidator()) {
                this.IO();
            }
        }

        this.IO = function() {

            var io = new Ju.app.dataSub({
                subUrl: router,
                source: "form", 
                type: "POST", 
                formEl :form, 
                callback : function(response){
                  _self.responseHandler(response);
                }
            });

        }

        //校验输入价格是否负责制定区间

        function priceValidator() {
           
           var price = +$get('#price').value,
               startPrice = +$get('#startPrice').value,
               endPrice = +$get('#endPrice').value;

           
           if (price && startPrice && endPrice) {
                    
                if (price > +startPrice && price < endPrice) {

                    return true;
                }
                
           } 

           var popup = new Ju.sys.Popup({

                   width: 394,
                   content: '推广价不符合指定价格区间',
                   title: '小提示',
                   type: 'pop-ju',
                   buttons: [{
                       text: '确定',
                       func: function(){
                           this.hide();
                       }
                   }],
                   autoShow: false,
                   useAnim: true,
                   onHide : function(){
                       Ju.app.onPress = 0;
                   }
           });

           popup.show();

           return false;

        }

    };


    /**
     * 申请聚客推广
     *
     * @implement: IOWidget
     */


     var SignPromotion = function() {

        var _self = this,
            identifier = 'signPromotion',
            router =  Juke.IoWidgetManager.Rounter[identifier],
            itemId = '';


        this.setup = function() {
            this.subBtn = $query('.btn-juke-sign');
        }

        this.render = function() {
            // Orz...
        }

        this.btnHandler = function(e, btn) {
            this.preProcess(btn);
        }

        this.preProcess = function(cntBtn) {
            
            itemId = cntBtn.getAttribute('idValue');
            this.IO();
        }

        this.IO = function() {

           K.io.post(router,{ 

               "_tb_token_": getTokenValue(),
               "button": "apply_detail",
               "itemId": itemId 
                        
               }, function(response) {
                _self.responseHandler(response, itemId);
           });
 
        }

     };


    /**
     * 取消聚客推广
     *
     * @implement: IOWidget
     */


     var CancelPromotion = function() {

        var _self = this,
            identifier = 'cancelPromotion',
            router =  Juke.IoWidgetManager.Rounter[identifier],
            itemId = '';
        

        this.setup = function() {
            this.subBtn = $query('.btn-juke-cancel'); 
        }

        this.render = function() {
            // Orz...
        }

        this.btnHandler = function(e, btn) {

            var popup = new Ju.sys.Popup({
                   width: 394,
                   content: "确定取消您当前的聚客推广？取消后用户将不能再参加您的团购活动了",
                   title: '小提示',
                   type: 'pop-ju',
                   buttons: [{
                       text: '确定',
                       func: function(){
                           _self.IO();
                           this.hide();
                       }
                   },{
                       text: '取消',
                       func: function() {
                           this.hide();
                       }
                   }],
                   autoShow: false,
                   useAnim: true,
                   onHide : function(){
                       Ju.app.onPress = 0;
                   }
           });

            popup.show();
            this.preProcess(btn);
        }

        this.preProcess = function(cntBtn) {            
            itemId = cntBtn.getAttribute('idValue');           
        }

        this.IO = function() {

             K.io.post(router,{ 

               "_tb_token_": getTokenValue(),
               "button": "cancel",
               "jukeItemId": itemId 
                        
               }, function(response) {
                _self.responseHandler(response);
           });
 
        }
 
     };


    /**
     * 修改聚客推广
     *
     * @implement: IOWidget
     */


     var EditPromotion = function() {

        var _self = this,
            identifier = 'editPromotion',
            router =  Juke.IoWidgetManager.Rounter[identifier],
            itemId = '';
        

        this.setup = function() {
            this.subBtn = $query('.btn-juke-edit'); 
        }

        this.render = function() {
            // Orz...
        }

        this.btnHandler = function(e, btn) {
            this.preProcess(btn);
        }

        this.preProcess = function(cntBtn) {            
            itemId = cntBtn.getAttribute('idValue');  
            this.IO();
        }

        this.IO = function() {
             
             K.io.post(router,{ 

               "_tb_token_": getTokenValue(),
               "button": "edit_detail",
               "jukeItemId": itemId 
                        
               }, function(response) {
                _self.responseHandler(response, itemId);
           });
        }
 
     };


    /**
     * 同意条款
     *
     * @implement: IOWidget
     */

     var AgreePromotion = function() {

        var _self = this,
            identifier = 'agreePromotion',
            router =  Juke.IoWidgetManager.Rounter[identifier];
        

        this.setup = function() {
            this.subBtn = $get('#J_AgreementJuKe'); 
        }

        this.render = function() {
            // Orz...
        }

        this.btnHandler = function(e, btn) {
            this.preProcess(btn);
        }

        this.preProcess = function(cntBtn) {            
            this.IO();
        }

        this.IO = function() {
             
             K.io.post(router,{ 

               "_tb_token_": getTokenValue(),
               "button": "assign"
                        
               }, function(response) {
                _self.responseHandler(response);
           });
        }
 
     };


    /* Add ioWidget */

    Juke.IoWidgetManager.add(SignValidator);
    Juke.IoWidgetManager.add(SignPromotion);
    Juke.IoWidgetManager.add(CancelPromotion);
    Juke.IoWidgetManager.add(EditPromotion);
    Juke.IoWidgetManager.add(AgreePromotion);

    K.ready(function() {
        Juke.init();
        calendarInit();
    });


    /* Calender */

    function calendarInit() {
		
		if($get('#startDate') && $get('#endDate')) {

        	K.use('calendar',function(S) {

                var c0 = new S.Calendar('#startDate',{
                    popup:true
                }).on('select',function(e){
                    S.one('#startDate').val(S.Date.format(e.date,'isoDate'));
                    c0.hide();
                });

                 var c1 = new S.Calendar('#endDate',{
                    popup:true
                }).on('select',function(e){
                    S.one('#endDate').val(S.Date.format(e.date,'isoDate'));
                    c1.hide();
                });
            });
        }
    }

    /* get Token */

    function getTokenValue() {
        return global.document.getElementsByName('_tb_token_')[0].value;          
    }


    /**
     *  推广价团购价联联动
     * 
     * @Ing
     */

    var RatioCalculator = new function() {
        
        var timer = null,
            elemPrice = null,
            elemRatio = null,
            elemActualPrice = null,
            _self = this;
           

        this.init = function() {
            elemPrice = $get("#price");
            elemRatio = $get("#J_ProFee");
            elemActualPrice = $get('#J_JukeActualPrice');
            this.render();
        }

        this.render = function() {

            if (elemPrice && elemRatio && elemActualPrice) {
                this.bind();
                updateRatio();
            }
         
        }
        
        this.bind = function() {
            elemPrice.onclick = triggerHandler;
        }
        
        this.handlerReset = function() {
            clearInterval(timer);
        }

        this.delay = 1500;

        function normalize(p) {      
            //todo
            return p;
        }

        function triggerHandler() {
            timer = global.setInterval(updateRatio, _self.delay);
        }   

        function ratioFormat(x /* price */, y) /* activityPrice */ {
            return collatePrice( ((x - y) * 100 / x).toFixed(2));
        }

        function getPriceValue() {
            return normalize(elemPrice.value * 100);
        }

        function getActivityPriceValue() {
            return $get("#activityPrice").value;
        }

        function checkSum() {

            var reg = /^[1-9][0-9]*(.[0-9]+)?$/,
                price = getPriceValue();
            
            return reg.test(price);
        }

        function collatePrice(p) {

            if(!checkSum() || !isFinite(p) || p <= 0) {
                p = 0;
            }

            return p;
        }

        function actualPriceFormat(p, r) {
            
            if (r == 0) {
                return 0 ;
            }

            return ((p / 100) * (1 - (r * 10 / 1000))).toFixed(2);
     
        }


        function updateRatio() {
            
            var price = getPriceValue(),
                activityPrice = getActivityPriceValue(),
                ratio = ratioFormat(price, activityPrice),
                actualPrice = actualPriceFormat(price, ratio);

          

            if (DEBUG) {
                console.log("Price:" + price);
                console.log("ActivityPrice:" +  activityPrice);
            }

            
            setRatio(ratio);
            setActualPrice(actualPrice);
        }

        function setRatio(r) {
            elemRatio.innerHTML = r;
        }

        function setActualPrice(p) {
            elemActualPrice.innerHTML = p;
        }

    };


    /**
    * juke-Tab 开发要求添加..
    */


  ;(function() {

     K.ready(function() {

      var vessel = $get('.juke-tab'),
          triggerList = $query('li', vessel),
          sheetList = $query('.seller-list');


      if (vessel && vessel.getAttribute('data-role') == 'tab') {
          initTab();  
      }

      function initTab() {

        K.each(triggerList, function(trigger, idx) {
            Event.on(trigger, 'click', function(e) {
                e.preventDefault();
                hideAllItem(sheetList);
                showItem(sheetList[idx]);
                Dom.removeClass(triggerList, 'on');
                Dom.addClass(triggerList[idx], 'on');

            });
        });

        (function __init__() {
            hideItem(sheetList[1]);       
        })();

      }

     });

    function hideItem(elem) {
        if (elem && elem.nodeType == 1) {
            elem.style.display = 'none';
        }
      }

    function hideAllItem(elems) {

        if (elems && elems instanceof Array && elems.length) {
        
            var l = elems.length;

            while (l--) {
            hideItem(elems[l]);
        }
      }
    }

    function showItem(elem) {
       if (elem && elem.nodeType == 1) {
           elem.style.display = 'block';
       }
    }


  })();


})(window, KISSY);// JavaScript Document
; KISSY.add("localServer", function(S){
//	KISSY.add({
//	    editor:{
//	        fullpath:"http://a.tbcdn.cn/s/kissy/1.1.6/editor/editor-pkg-min.js",
//	        cssfullpath:'http://a.tbcdn.cn/s/kissy/1.1.6/editor/theme/cool/editor-pkg-min-datauri.css'
//	    }
//	});
	var D = S.DOM, E = S.Event ,currentEditor = null;
	
	var localServer = function(){
		
	}
	
	S.augment(localServer, {
	
		//获取中文字符长度
			getChStrLen:function(s){
				
					 var len = 0;  
					for (var i=0; i<s.length; i++) {  
						if (s.charCodeAt(i)>127 || s.charCodeAt(i)==94) {  
							len += 2;  
						} else {  
							len ++;  
						}  
					}  
					return len; 
				

			},
			
		/**
		 * 手动配置验证模式
		 * 配置格式：{
		 *	 	"id" : {
		 *			reg : //,
		 *			error : "",
		 *			success : "",
		 *			retime : true, // 实时
		 *			pos : 1,2,3,4 上右下左
		 *			offset : [1, 2]
		 *		},....
		 *	}
		 */
		manualConfig : function(data){
			var self = this;
			if ( data ){
				var formId = data.formId;
				var submit_btn_id = data.submit_btn_id;
				for ( var dataItem in data )
				{
					(function(){
						
				
					var keyName = dataItem,
						keyValue = data[dataItem],
						element = D.get("#" + keyName),
						eventType = ["blur"],
						//elInfo = colle(element),
						_reg = keyValue.reg,
						_lengthChecker = keyValue.lengthChecker,
						_extraCheck,
						_extraCheckErrMsg ;
						
						if(keyValue.extra){
							_extraCheck = keyValue.extra.check;
							_extraCheckErrMsg = keyValue.extra.errorMsg;
						}
					
					
				// 添加实时事件
					if ( keyValue.retime ) eventType.push("keyup");
					if ( !keyValue.offset ) keyValue.offset = [0, 0];
					if ( !keyValue.success ) keyValue.success = "";
					if ( !keyValue.error ) keyValue.error = "";
					
					var newDiv = D.create("<div />");
					D.addClass(newDiv, "juz-msg");
					D.attr(newDiv, "id", keyName + "-msg");
					D.append(newDiv, D.get("body"));
					
					E.on("#" + keyName, eventType.join(" "), function(){
						var value = getElementValue(this);
		
						//检查逻辑;
						var reg_valid = true,length_valid = true,extra_valid=true;
						if(_reg != null){
							reg_valid = _reg.test(value);//正则检查;
							
						}
						if(_lengthChecker != null){
							//长度检查
							var length = self.getChStrLen(value);
							length_valid = ( length>=_lengthChecker.min && length<=25000);
						}
						
						
						var errorMsg = "";
						if ( !(reg_valid && length_valid) ){
							
							errorMsg = keyValue.errorTip ;//正则和长度检查的错误
							
						}else if(_extraCheck != null){
							//额外检查的错误；
							extra_valid = _extraCheck.apply();
							if(!extra_valid){
								
								errorMsg = _extraCheckErrMsg;
							}
						}

						if(errorMsg.length > 0){
							var msg_span = D.get('#'+keyName +'-msg-span');
							try{
								D.removeClass(msg_span,'juz-msg-error-2');
								//D.removeClass(msg_span,'juz-msg-success-2');
							}catch(e){}
								D.addClass(msg_span,'juz-msg-error-2');
								
								msg_span.innerHTML = errorMsg;
								
								//D.attr(data[keyName],'errmsg',errorMsg);
								//alert(D.attr(data[keyName],'errmsg'));
								if(data[keyName]['chineseName'] != null)
									data[keyName]['errmsg'] = (data[keyName]['chineseName'] + "填写有误");
								
						}else{
							
							var msg_span = D.get('#'+keyName+'-msg-span');
							try{
								D.removeClass(msg_span,'juz-msg-error-2');
								//D.removeClass(msg_span,'juz-msg-success-2');
							}catch(e){}
							//D.addClass(msg_span,'juz-msg-success-2');
							msg_span.innerHTML = "";
							return ;
						
							
						}
					});
					
					})() //闭包解决循环绑定问题；
				}
				
				//给表单增加提交事件
				
			}
		},
		
		
		initFormValidation:function(data,formId,callback){
			
			this.manualConfig(data);
			E.on(D.get('#'+formId),'submit',function(){
				var errmsg_array = [];
				for(var item in data){
					data[item]['errmsg'] = null;
				}
				for(var item in data){
					(function(){
						fireEvent(D.get('#'+item),'blur',function(){
							
							if(data[item]['errmsg'] != null && data[item]['errmsg'].length > 0)
								errmsg_array.push(data[item]['errmsg']);
						});	
					})()
				}
				
				return callback(errmsg_array);
				
			});
			
		},
		
		formSubmit : function(form, data, options){
			function allFireEvent(){
				var s = false, // true 有错误
					el;
				
				for ( var i in data ){
					fireEvent(D.get("#" + i), "blur", function(){
						el = D.get("#" + i + "-msg-span");
						var _s = D.hasClass(el, "juz-msg-error-2");
						if ( _s ){
							s = true;
						}
					});
					//if ( s ) break;
				}
				
				return [s, el];
			}
			E.on(D.get(form), "submit", function(){
				currentEditor && currentEditor.sync();
				var c = allFireEvent();
				if ( !c[0] ){
					var j = options.successMsg;
					if ( !j ) return true;
					
					if ( confirm(j) ){
						return true;
					}else{
						//(event || window.event).preventDefault();
						return false;
					}	
				}else{
					if ( S.isFunction(options.errorCallback) ) { 
						options.errorCallback(c[1]);
					}
					return false;
				}
			});
		},
		
		showTip : function( tel, el, status, word, pos, off, callback ){
			if ( el ){
				if ( S.isString(el) ) el = D.get(el);
				if ( word == undefined ) word = D.html(el);
				D.show(el);
				D.removeClass(el, "juz-msg-success");
				D.removeClass(el, "juz-msg-error");
				D.addClass(el, "juz-msg-" + status);
				D.html(el, word);
				var _sourceElement = colle(tel),
					_targetElement = colle(el),
					top, left;		
						
				pos = !pos ? 2 : pos;
				
				switch ( pos ){
					case 1 : 
						top = _sourceElement.top - _targetElement.height + off[0];
						left = _sourceElement.left + off[1];
						break;
					case 2 : 
						top = _sourceElement.top + off[0];
						left = _sourceElement.left + _sourceElement.width + 2 + off[1];
						break;
					case 3 :
						top = _sourceElement.top + _sourceElement.height + off[0];
						left = _sourceElement.left + off[1];
						break;
					case 4 :
						top = _sourceElement.top + off[0];
						left = _sourceElement.left - _targetElement.width + off[1];
						break;
					default :
						top = _sourceElement.top + off[0];
						left = _sourceElement.left + off[1];
				}
				
				D.css(el, {
					top : top + "px",
					left : left + "px"
				});
			}
		},
		
		hideTip : function(el, callback){
			if ( el ){
				if ( S.isString(el) ) el = D.get(el);
				D.hide(el);
				if ( S.isFunction(callback) ) callback.call(el);
			}
		},
		
		/**
		 * 编辑器需要引入的JS
		 * 1.1.6 : http://a.tbcdn.cn/s/kissy/1.1.6/editor/editor-pkg-min.js
		 * 1.1.7 : http://a.tbcdn.cn/s/kissy/1.1.7/??kissy-min.js,uibase/uibase-pkg-min.js,dd/dd-pkg-min.js,overlay/overlay-pkg-min.js,editor/editor-all-pkg-min.js
		 * 1.2.0 : http://a.tbcdn.cn/s/kissy/1.2.0/??kissy-min.js,uibase-min.js,component-min.js,dd-min.js,overlay-min.js,editor/editor-all-pkg-min.js
		 */
		editor : function(cls, callback,opt){
			//rebuild 2011 12 29 fangyuan.yzh 升级编辑器为1.1.6
			 Ju.sys.Helper.initEditor(cls,function(ed){
			 	currentEditor = ed[0];
				callback(arguments);			 	
			 },opt);
//			var nodes = S.all(cls) , me = this ;
//			if(nodes && nodes.length){
//				var args = [],
//					cfg = {
//			            attachForm:true,
//			            baseZIndex:10000,
//			            pluginConfig: {
//			                "flash":{
//			                    defaultWidth:"300",
//			                    defaultHeight:"300"
//			                },
//			                "resize":{
//			                    direction:["y"]
//			                }
//			            }
//		        } ;
//				KISSY.use("editor",function(S,Editor){
//					(KISSY.EditorPlugins && KISSY.EditorPlugins.Wordcount) || Ju.sys.Helper.initEditorWordcountPlugin();
//				    nodes.each(function(n,i){
//					    args[i] = S.Editor(n,S.clone(cfg)).use(
//					    		"sourcearea,separator," +
//					    		"font,separator,color,separator," +
//					    		"image,smiley,link,separator," +
//					    		"list,indent,justify,preview,resize" 
//		                );
//		                KISSY.EditorPlugins.Wordcount.bind(n,opt.maxLen,args[i]);
//	                });
//	                callback && callback(args);
//				});
//			}
//			return;
//			var cfg = {
//				base: "http://a.tbcdn.cn/kissy/1.0.4/build/editor/",
//				toolbar: [
//					"source",
//					"",
//					"fontName", "fontSize", "bold", "italic", "underline", "strikeThrough", "foreColor", "backColor",
//					"",
//					"link", "smiley", "image",
//					"",
//					"insertOrderedList", "insertUnorderedList", "outdent", "indent", "justifyLeft", "justifyCenter", "justifyRight"
//				],
//				statusbar: ["resize"],
//				pluginsConfig: {
//					image: {
//						tabs        : ["link"],
//						upload: {
//							actionUrl      : "/json/image_upload.htm",
//							extraCode      : '<label><input name="waterMark" type="checkbox" checked="checked" />图片加水印，防盗用</label>'
//						}
//					},
//					smiley: {
//						tabs        : ["wangwang"]
//					}
//				}
//			}, ts = [];
//			
//			var Dos = D.query(cls);
//			for ( var i = 0 ; i < Dos.length ; i++ )
//			{
//				if ( D.css(Dos[i], "display") != "none" ) ts.push(S.Editor(D.attr(Dos[i], "id"), cfg));
//			}
//			return callback ? callback.apply(undefined, ts) : ts;
		},
		/**
		 * 【级联规范】
		 * （二联规范）
		 */
		casCade : function(data){
			var self = this;
			
			for ( var i = 0 ; i < data.length ; i++ )
			{
				var _data = data[i];
				_data = S.mix({
					base : [], // 级联节点 支持selector
					selected : ["1", "12"], // 默认选中Name
					data : {
						/**
						 * value1 : {
							  title : "",
							  list : {
								  value : title,
								  ...
							  }
						   }
						 */
					}
				}, _data);
				var callback = _data.callback;
				
				if ( _data.base.length < 2 ) continue;
				
				var rootRood = D.get(_data.base[0]),
					tartRood = D.get(_data.base[1]),
					selectData = _data.data,
					rootArr = [];
					
				D.html(rootRood, "");	
				for ( var j in selectData )
				{
					var _strData = selectData[j];
					rootArr.push("<option value='" + j + "'>" + _strData.title + "</option>");
				}
				D.append(D.create(rootArr.join("")), rootRood);
				E.on(rootRood, "change", function(){
					//console.log("start change")
					var val = D.val(this),
						__data = selectData[val],
						_tmpArr = [];
						
					if ( __data ){
						__data = __data.list;
						D.html(tartRood, "");
						for ( var o in __data )
						{
							_tmpArr.push("<option value='" + o + "'>" + __data[o] + "</option>");
						}
						
						D.append(D.create(_tmpArr.join("")), tartRood);
					}
					if(_data.selected[1].length >0){
						D.val(tartRood,_data.selected[1]);
					}
					if(callback && _data.childSelAttr){	
						callback.call(undefined,this,tartRood,_data.childSelAttr);//todo
					}
				});
				if(callback && _data.childSelAttr){	
					E.on(tartRood,"change",function(){
						callback.call(undefined,rootRood,this,_data.childSelAttr);
					});
				}
			}
			
			if(_data.selected[0].length >0){
				  D.val(rootRood, _data.selected[0]);
				 
			}
			 fireEvent(rootRood, "change", function(){
				  });
			
		},
		
		map : function(){
			
		}
	});
	
	function getElementValue(element){
		var type = element.type;
		return D.val(element);
	}
	/*
	
	function colle(element){
		var el = D.get(element);
		return {
			top : D.offset(el).top,
			left : D.offset(el).left,
			width : D.width(el),
			height : D.height(el)
		}
	}
	*/
	
	function fireEvent(element, event, callback){
		var t ;
		if (document.createEventObject){
		// dispatch for IE
			var evt = document.createEventObject();
			t = element.fireEvent('on' + event,evt);
			S.isFunction(callback) && callback.call(element);
			return t;
		}
		else{
			// dispatch for firefox + others
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent(event, true, true ); // event type,bubbling,cancelable
			t = !element.dispatchEvent(evt);
			S.isFunction(callback) && callback.call(element);
			return t;
		}
	}


    var Extra = (function() {
    

        var CityLimit = new function() {

            var parent = null, select = null, msgTip = null, btnSubmit = null, theForm = null;

            function render() {
                select = S.get('select', parent);
                btnSubmit = S.get('#submit-btn');
                theForm = S.DOM.parent(select, 'form');

                if (triggerCondition()) {
                    bind();
                    selectHandler(select);
                }
            }

            function bind() {
                E.on(select, 'change', function(e) {
                    selectHandler(this);
                });
            }

            function resetErrorMsg() {
                D.removeClass(S.get('#city-msg-span'), 'juz-msg-error-2');
                S.get('#city-msg-span').innerHTML = '';
            }

            function showErrorMsg() {
                D.addClass(S.get('#city-msg-span'), 'juz-msg-error-2');
                S.get('#city-msg-span').innerHTML = '该城市已达到本城市报名次数限制！';
            }

            function disableSubmit() {
                btnSubmit.setAttribute('disabled', 'true');
            }

            function enableSubmit() {
                btnSubmit.removeAttribute('disabled');
            }

            function selectHandler(sel) {
                
                resetErrorMsg();
                var cntOpt = sel.options[sel.selectedIndex];
                    
                    if(cntOpt) {
                        cityLimit = parseInt(cntOpt.getAttribute('data-limit'));

                        if (cityLimit <= 0) {
                            showErrorMsg();
                            disableSubmit();
                        } else {
                            enableSubmit();
                        }
                    }
            }

            function triggerCondition() {

                var editItem = theForm['isEdit'].value || 0,
                    uploadItem = theForm['isUpload'].value || 0;

                if (editItem != '1' && uploadItem != '1') {
                    return true;
                } 

                return false;
             
            }

            function condition() {
                return !!(parent = S.get('#J_JuCityLimit'));
            }


            this.init = function() {
                if (condition()) {
                    render();
                }
            }

        }

    
    
        return {
            'init': function(){
                CityLimit.init();              
            }
        }
    
    })();

	
	S.localServer = localServer;

    Ju.Event = Ju.Event || {};
    Ju.Event.fireEvent = fireEvent


    S.ready(Extra.init);
	
	return localServer;
}, { require : ["sizzle"] });/**
 * 广告
 */

;(function() {
    var S = KISSY, DOM = S.DOM, Event = S.Event,
    adCont = null, adInner = null, imgCont = null, normalImg = '', largeImg = '', adExpand = null,
    curCity = "",
    lifeBannerApi = 'http://www.taobao.com/go/rgn/juhuasuan/banner-life-api.php';

    //顶通轮播
    var JuSlideBanner = function(K) {

        var banner = $('J_TopBannerVer2'),
            target = $('J_TopBannerSheet'),
            triggers = $('J_TopBannerTrigger').getElementsByTagName('A'),
            closeBtn = $('J_TopBannerCloseBtn'),
            lock = false,
            respond = true,
            cntIdx = 0,
            total = triggers.length - 1,
            height = 50,
            interval = 300,
            Event = K.Event,
            timer = null,
            delay = 5000;


        function hideBanner() {
            banner.style.display = 'none';
        }

        function $(elem) {
            return	typeof elem == 'string' ? document.getElementById(elem) : elem; 
        }

        function move(idx) {

            if (isLocked() && respond) {
                return;
            }

            lock = true;
            respond = false;

            setTimeout(function() {
                respond = true;
            }, interval);

            highlight(idx);

            var targetVerPos = - (idx * height),
                anim = K.Anim(target, {top: targetVerPos + 'px'},0.35 ,'easeOut' ,releaseLock);

            anim.run();
            cntIdx = idx;
        }


        function highlight(idx) {
            K.DOM.removeClass(triggers, 'current');
            K.DOM.addClass(triggers[idx], 'current');
        }

        function isLocked() {
            return lock == true;
        }

        function releaseLock() {
            lock = false;
        }

        function disableSlide() {
            K.DOM.hide($('J_TopBannerTrigger'));
        }
           
        function autoSlide() {

             timer = setInterval(function(){
                  var target = (cntIdx == total ? 0 : cntIdx + 1);
                  move(target);    
             }, delay);

        }

        function bind() {

            K.each(triggers, function(a, idx) {
                
                Event.on(a, 'mousemove', function(e) {
                    e.preventDefault();
                    move(idx);
                });
                
            });

            Event.on(banner , 'mouseover', function(e) {
                clearInterval(timer);
            });

            Event.on(banner, 'mouseout', function(e) {
                autoSlide();
            });

            Event.on(closeBtn, 'click', function(e) {
                e.preventDefault();
                hideBanner();
            });
        }

        function render() {

            if (triggers.length == 1) {
                disableSlide();
                return;
            } 
            move(0);
            autoSlide();
        }


        this.init = function() {

            if (!banner) {
                return;
            }

            bind();
            render();
        }


        this.init();

    };



    function expand() {

        DOM.addClass(adExpand, 'unexpand');

        var newImg = new Image();

        newImg.onload = function () {
            imgCont.src = largeImg;

            var imgHeight = newImg.height || 150;

            if(S.UA.ie < 8) {
                DOM.css(adInner, 'height', imgHeight+'px');
            } else {
                var anim = S.Anim(
                adInner,
                'height: '+imgHeight+'px',
                1,
                'easeIn');
                anim.run();
            }

        }
        newImg.src = largeImg;
        //记录
        Ju.sys.simpleStorage.setItem('hideAd-'+curCity, normalImg);
    }

    function unexpand() {

        DOM.removeClass(adExpand, 'unexpand');

        if(S.UA.ie < 8) {
            DOM.css(adInner, 'height', '50px');
            imgCont.src = normalImg;
        } else {
            var anim = S.Anim(
            adInner,
            'height: 50px',
            1,
            'easeIn', function() {
                imgCont.src = normalImg;
            });
            anim.run();
        }

    }

    function bind() {
        if(!adExpand)
            return;
        Event.on(adExpand, 'click', function() {
            if(DOM.hasClass(adExpand, 'unexpand')) {
                unexpand();
            } else {
                expand();
            }
        })
    }
    
    //通过接口取得当前城市banner html
    function getBanner(city){
        city = city ? city : "quanguo";
        
        S.io({
                url: lifeBannerApi,
                data: {city:city},
                success: function(data) {
                    try{
                        jsonData = S.JSON.parse(data);
                        if(jsonData.html) {
                            adCont.innerHTML = jsonData.html;
                        }
                        curCity = jsonData.city;
                        adCont = DOM.get('#top-banner0', adCont);
                        bindEvent();
                    }
                    catch(e){
                        
                    }
                    
                },
                dataType:'jsonp'
            });
        
    }
    
    function bindEvent(){
        
        adExpand = DOM.get('.J_ExpandAd', adCont);
        
        if (!adExpand) {
            JuSlideBanner(KISSY);
        }

        if(adCont.getAttribute('data-bigimg') == "") {
            DOM.hide(adExpand);
            return;
        }

        DOM.show(adExpand);

        normalImg = adCont.getAttribute('data-normalimg');
        largeImg = adCont.getAttribute('data-bigimg');
        imgCont = DOM.get('img', adCont);
        adInner = DOM.get('.inner', adCont);

        bind();

        Ju.sys.simpleStorage.init();

        if(Ju.sys.simpleStorage.getItem('hideAd-'+curCity) == normalImg) {
            return;
        }

        expand();

        setTimeout( function() {

            unexpand();

        }, 5000);

        //imgCont.src = imgCont.getAttribute('data-src');
        //DOM.css(adCont, 'height', '50px');
    }

    function init() {

        adCont = DOM.get('#J_TopBanner');
        
        if(!adCont){
            return;
        }
        
        curCity = adCont.getAttribute('data-city');
        curCity = curCity ? curCity : "quanguo";
        
        getBanner(curCity);

    }

    S.ready( function() {

        //setTimeout(function(){

        init();

        //},2000)

    });
})();
/**
  * app-medal.js
  * liuling.wb@taobao.com
  */

;(function(global, K, undef) {

    var Dom = K.DOM, Event = K.Event, $get = Dom.get, $query = Dom.query, DEBUG = false, Noop = function(){},

        console = window.console || {'log': function(msg) {/*alert(msg)*/}, 'error': Noop },

        getServerURI = Ju.sys.Helper.getServerURI;

    /*
     * @router
     */

    var apiSource = {
        "sideBarBasic": getServerURI('i') + "/json/my/honorSidebar.htm",    //左栏用户基本信息接口
        "sideBarSpecial": getServerURI('ju') + "/json/tg/myJuSidebar.htm",  //左栏总计节省接口
        "medalSign": getServerURI('i') + "/json/my/checkInAction.htm",   //签到接口
        "medalDelete": getServerURI('i') + "/json/my/newHonorDelete.htm", //删除新勋章接口
        "medalAcquire": getServerURI('i') + "/json/my/getUserHonorAction.htm" //立即领取勋章接口
    };

    /* Ju Enhancement @_@ */

    /* 
     * @Dataset Polyfills
     */

    ;(function() {
   
        var dataSet = function(elem) {      
            
            var DOMStringMap = {},
                rgData = /^data-[a-z_\-\d]*$/i;

            if (elem && elem.dataSet) {
                return elem.dataSet;
            }

            for ( attr in elem.attributes ) {

                try {
                    if (rgData.test(elem.attributes[attr].name)) {
                        var attrName = elem.attributes[attr].name.substr(5).toLowerCase(),
                            attrVal = elem.attributes[attr].value;

                        DOMStringMap[attrName] = attrVal;
                    }
                } catch(e) {}
            }

            return DOMStringMap;
        }

        this.dataSet = dataSet;
    
    }).apply(Ju);


    /*
     * @Css3Transition Detection
     */

    ;(function(isIE) {

        var _self = this, 
        
        setTransition = (function() {
       
            var transStr = '', animated = false, domLad = null, 
                prefixs = "webkit Moz o ms khtml".split(" ");

            function _setTransition(elem, prop, cbk) {

                var cfg = K.isPlainObject(elem) ? elem : {'elem': elem, 'prop': prop, 'callback': cbk},
                    
                    elem = cfg.elem, 
                    prop = cfg.prop || 'all',
                    duration = cfg.duration || '0.3s',
                    easeFn = cfg.easeFn || 'ease-out',
                    callback = cfg.callback || Noop;

                if (animated) {
                    elem.style[transStr] = prop + ' ' + duration + ' ' + easeFn;
                }

                if (elem.addEventListener) {

                    elem.addEventListener('webkitTransitionEnd', callback, false); 
                    elem.addEventListener('transitionend', callback, false);      
                    elem.addEventListener('oTransitionEnd', callback, false);    

                }

                if (isIE) {

                    setTimeout(function() {
                        callback.call(elem);
                    }, parseFloat(duration) * 1000 || 300);      
                
                }

            }

            function testPropsAll(doc) {
                
                domLad = doc.createElement('DIV');

                for (var i = 0, l = prefixs.length; i < l; i++) {

                    var transProp = prefixs[i] + 'Transition';    

                    if ( domLad.style[ transProp ] !== undefined ) {

                        transStr = transProp;
                        animated = true;
                        _setTransition.hasTransition = true;    

                        if (DEBUG) {
                            console.log('css3Transition capture: ' + transStr);
                        }

                        break;

                    }
                }
            }

            function checkCss3DSupport(doc) {

              var props = ['perspectiveProperty', 'WebkitPerspective',
                           'MozPerspective', 'OPerspective', 'msPerspective'],
                  i = 0,
                  support = false;

              while (props[i]) {

                if (props[i] in doc.body.style) {
                    support = true;
                    break;
                }

                i++;

              } 

              _setTransition.css3DSupport = support;
            }

            return {
                'inspectElement': init
            }
          
            function init(document) {
                testPropsAll(document);
                checkCss3DSupport(document);
                _self.setTrans = _setTransition;
            }
       
       })();    

       this.setTrans = setTransition;

    }).apply(Ju, [K.UA.ie]);

 
    /*
     * @Deferred Object
     */

    ;(function() {
    
        var Deferred = function() {

            var _self = this;

            function chain(method) {
                return function() {
                    method.apply(null, [].slice.call(arguments, 0));		
                    return promise;
                }
            }

            var cbList = {
                    'done': Deferred.Callback('success'),
                    'fail': Deferred.Callback('fail'),
                    'progress': Deferred.Callback('progress')
                },
                    
                promise = {
                    'done': chain(cbList.done.add),
                    'fail': chain(cbList.fail.add),
                    'progress': chain(cbList.progress.add),
                    'isResolved': false,
                    'isRejected': true,
                    'returnDeferred': _self
                }

            this.resolve = cbList.done.fire;

            this.reject = cbList.fail.fire;

            this.promise = function() {
                return promise;
            }
        };

        Deferred.Callback = function(title) {

            var fnList = [], isFired = false;
                
            return {

                'isFired': isFired,

                'identifier': title,

                'add': function(fn) {

                    if (K.isFunction(fn)) {
                        fnList.push(fn);
                    }
                },

                'fire': function() {
                    
                    var arg = [].slice.call(arguments, 0);

                    for (var i = 0, l = fnList.length; i < l; i++) {

                        if (fnList[i].apply(null, arg) === false) {
                            break;
                        }
                    }

                    isFired = true;
                }
            }
        };

        Deferred.When = function(firstDeferred) {

            var args = K.makeArray(arguments),
                count = args.length,
                D = count <= 1 ? firstDeferred.returnDeferred : new Deferred();
                promise = D.promise();


            function resolve() {
                if (! (--count)) {
                    D.resolve();
                }
            }

            function reject() {
                if (! (--count)) {
                    D.reject();
                }
            }

            if (count > 1) {
                for (var i = 0; i < count; i++) {
                    args[i].done(resolve);
                    args[i].fail(reject);
                }
            }      
            
            return promise;
        };

        this.Defer = Deferred;

    }).apply(Ju);


    /*
     * @Micro Template
     */

    ;(function(){

      var cache = {};
      
      this.template = function tmpl(str, data){

        var fn = !/\W/.test(str) ?
          cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
       
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            
            "with(obj){p.push('" +
            
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");

        return data ? fn( data ) : fn;
      };

    }).apply(Ju);
   
    
    /*
     *  @Modules Task
     *  勋章左侧模块
     */
   
    var MedalInteraction = {

            'task': [

                {
                    'moduleName': 'bioLink',
                    'main': (function() {

                        var mdBio = null, bioAnchors = null;

                        function condition() {
                            return !!( (mdBio = $get(".md-bio")) && (bioAnchors = $query('.disabled', mdBio)) );
                        }

                        function disabledDefaultAnchor(e) {
                            e.preventDefault();
                        }

                        function bind() {
                            Event.on(bioAnchors, 'click', function(e) {
                                disabledDefaultAnchor(e);
                            });
                        }

                        function render() {
                            bind();
                        }

                        return {
                            'init': init
                        }

                        function init() {
                            if (condition()) {
                                render();
                            }
                        }

                    })(),

                    'priority': 1
                },
            
                /*
                 *  @BioPanel Section
                 *  用户基本信息
                 */

                {
                    'moduleName': 'bioPanel',
                    'main': (function() {

                            var btnSign = null, areaSignSum = null, isSigned = false, origSignedSum = 0, stateArea = null, signTip = null,
                                signedText = '', signTipCon = null, hideTimer = null;
                            
                            function condition() {
                                return !!((stateArea = $get("#J_MedalSideBar .state")) && (btnSign = $get("#J_MedalSideBar .btn-sign"))); 
                            }

                            function extraCondition() {
                                return !!((btnSign = $get("#J_MedalSideBar .btn-not-sign")) && (isSigned = true));
                            }

                            function render() {
                                areaSignSum = stateArea.getElementsByTagName("EM")[0];
                                signTip = $get("#J_MedalSideBar .ju-tip");
                                signTipCon = $get('.ct', signTip);
                                renderTip();
                                bind();
                                bindExtra();
                            
                                function renderTip() {
                                    
                                    var btnClose = $get('a', signTip);
                                    
                                    Event.on(btnClose, 'click', function(e) {
                                        e.preventDefault();
                                        Dom.hide(signTip);
                                    });
                                }
                            }

                            function bind() {

                                if (Dom.hasClass(btnSign,'btn-sign')) {
                                
                                    Event.on(btnSign, 'click', function(e) {
                                   
                                        e.preventDefault();

                                        if (!isSigned) {
                                            signRequest();
                                        }
                                    });
                                }

                                 Event.on([btnSign, signTip], 'mouseout', function(e) {
                                    if (isSigned) {
                                        hideTip();    
                                    }
                                 });
                            }

                            function bindExtra() {

                                if (Dom.hasClass(btnSign,'btn-not-sign')) {

                                    Event.on([btnSign, signTip], 'mouseover', function(e) {
                                        showTip();
                                    });

                                }

                            }
            
                            function getOrigSignedSum() {
                                // origSignedSum = parseInt(areaSignSum.innerHTML);
                            }

                            function generateSignedText(day) {
                                return '已连续签到<em>' + day + '</em>天<br/>连续签到得勋章';
                            }

                            function resolveData(data) {
                                
                                try {
                                    var data = K.JSON.parse(data);
                                } catch(e) {}
                                
                                if (data.code == 'success') {

                                    areaSignSum.innerHTML = data.continuesDay + '天';
                                    signTipCon.innerHTML = generateSignedText(data.continuesDay);
                                    Dom.removeClass(btnSign, 'btn-sign');
                                    Dom.addClass(btnSign, 'btn-not-sign');
                                    btnSign.innerHTML = '已签到';
                                    Dom.removeClass(stateArea, 'off');
                                    Dom.addClass(stateArea, 'on');
                                    bindExtra();

                                } else {
                                    //errorHandler
                                }
                            }

                            function hideTip() {
                                
                                clearTimeout(hideTimer);
                                hideTimer = setTimeout(function() {
                                    Dom.hide(signTip);
                                }, 500);
                            }

                            function showTip() {
                                clearTimeout(hideTimer);
                                Dom.show(signTip);
                            }

                            function errorHandler() {
                            }

                            function signRequest() {

                                 K.io({
                                     'url': apiSource.medalSign,
                                     'success': function(data) {   
                                         isSigned = true;     
                                         resolveData(data);
                                       },
                                      'error': function() {},
                                      'dataType': "jsonp",
                                      'forceScript': true  
                                 });
                            }

                            return {
                                'init': init
                            }

                            function init() {

                                if (condition() || extraCondition()) {
                                    render();
                                }
                            }

                        })(),

                    'priority': 1
                },

                /*
                 *  @MedalNotification Section
                 *  新获得勋章提示
                 */

                {
                    'moduleName': 'medalNotification',
                    'main': (function() {
                    
                            var notification = null, btnClose = null, delay = 2000;

                            function render() {

                                Ju.setTrans(notification);

                                setTimeout(function() {
                                    expand();
                                }, delay);

                                bind();
                            }

                            function expand() {
                                notification.style.height = '18px';
                                notification.style.margin = '0px auto 10px auto';
                            }

                            function collapse() {
                                Dom.hide(notification);
                            }

                            function bind() {
                                
                                Event.on(btnClose, 'click', function(e) {
                                    e.preventDefault();
                                    collapse();
                                });
                            }

                            function condition() {
                                return !!((notification = $get("#J_MedalSideBar .md-notification")) && (btnClose = $get("#J_MedalSideBar .btn-close")) );
                            }

                            return {
                                'init': init
                            }

                            function init() {

                                if (condition()) {
                                    render();
                                }
                            }

                        })(),

                    'priority': 1
                },


                /*
                 *  @MedalList Section
                 *  已获得勋章列表
                 */

                {
                    'moduleName': 'medalList',
                    'main': (function() {

                            var mdList = null, isAnimated = false, btnDropDown = null, listContainer = null, list = null;
                                cntLi = null, cntTip = null, delay = 200, expaneded = false, origHeight = 24, lineHeight = 29, rows = 0;


                            function render() {

                                isAnimated = Ju.setTrans.hasTransition;
                                list = $query('li', mdList);
                                listItems = $query('.md-list-item', mdList);
                                btnDropDown = $get('.dropdown', mdList);
                                listContainer = $get('ul', mdList);
                                getMedalRows();
                                bind();

                            }

                            function fadeIn(elem) {    
                                Dom.show(elem);
                                elem.style.opacity = '1';
                            }

                            function fadeOut(elem) {
                                Dom.hide(elem);
                                elem.style.opacity = '0';
                            }

                            function getMedalRows() {
                                
                                var medalSum = listItems.length;
                                
                                if (medalSum) {
                                    rows = Math.floor(medalSum / 7);
                                }
                            }

                            function calculateHeight() {
                                return origHeight + (lineHeight * rows);
                            }

                            function bind() {

                                Event.on(list, 'mouseover', function(e) {  
                                    
                                    if (cntLi != this) {
                                        if (cntTip) {
                                            fadeOut(cntTip);
                                        }
                                    }

                                    cntLi = this;

                                    e.preventDefault();
                                    var tips = $get('.md-list-tips', this);

                                    cntTip = tips;

                                    if (this.timer) {
                                        clearTimeout(this.timer);
                                    }

                                    Ju.setTrans(tips, 'opacity');

                                    fadeIn(tips);

                                });;

                                Event.on(list, 'mouseleave', function(e) {

                                    e.preventDefault();
                                    var tips = $get('.md-list-tips', this);

                                    this.timer = setTimeout(function() {
                                      fadeOut(tips);
                                    }, delay);    
                                });

                                if (btnDropDown) {
                                    
                                    Event.on(btnDropDown, 'click', function(e) {
                                        e.preventDefault();
                                        toggleMedalList();
                                    });
                                }
                            }

                            function arrowLocation(tips) {
                                //todo -> next
                            }

                            function toggleMedalList() {
                                
                                if (expaneded) {
                                    collapseMedalList();
                                } else {
                                    expandMedalList();
                                }
                            }

                            function expandMedalList() {
                                Dom.css(listContainer, 'height', calculateHeight() + 'px');
                                Dom.addClass(btnDropDown, 'expand');
                                expaneded = true;
                            }

                            function collapseMedalList() {
                                Dom.css(listContainer, 'height', origHeight + 'px');
                                Dom.removeClass(btnDropDown, 'expand');
                                expaneded = false;
                            }

                            function condition() {
                                return !!(mdList = $get("#J_MedalSideBar .md-list") );
                            }
                                                               
                            return {
                                'init': init
                            }

                            function init() {

                                if (condition()) {
                                    render();
                                }
                            }

                        })(),

                    'priority': 1
                },                      

                /*
                 *  @MedalCompare Section
                 *  总计节省选项卡
                 */

                {
                    'moduleName': 'medalCompare',
                    'main': (function() {

                            var mdCompare = null, triggers = null, sheets = null;
                                
                            function render() {
                                triggers = $query('a', mdCompare);
                                sheets = $query('.st-sheet', mdCompare);
                                bind();
                            }

                            function bind() {
                                
                                K.each(triggers, function(anchor, idx) {
                                    
                                    Event.on(anchor, 'click', function(e) {
                                        
                                        e.preventDefault();
                                        highLight(this);
                                        this.blur();
                                        Dom.hide(sheets);
                                        Dom.show(sheets[idx]);

                                    });
                                
                                });
                            }

                            function highLight(anchor) {
                                Dom.removeClass(triggers, 'cnt');
                                Dom.addClass(anchor, 'cnt');
                            }

                            function condition() {
                                return !!(mdCompare = $get("#J_MedalSideBar .md-compare"));
                            }

                            return {
                                'init': init
                            }

                            function init() {
                                
                                if (condition()) {
                                    render();
                                }
                            }
                        
                        })(),

                     'priority': 1                          
                }

            ].sort(function(taskA, taskB){
                return taskA.priority - taskB.priority;          
            }),

            'getTask': function(moduleName) {
                
                return K.filter(this.task, function(task) {
                    return task.moduleName == moduleName;
                })[0];

            },

            'initialize': function(callback) {
                
                var tasks = this.task;

                K.each(tasks, function(mission) {

                    if (K.isObject(mission.main) && K.isFunction(mission.main.init)) {

                        try {                    
                            mission.main.init();
                        }catch(e) {

                            if (DEBUG) {
                                throw e;
                                console.error('SideBar模块' + m + '载入失败!');
                            }
                        }
                    }
                });

                callback();
            }
    };


    /*
     * @SideBar Singleton
     */

    var SideBar = (function() {
    
        var Deferred = Ju.Defer, $when = Deferred.When, container = null,
            dataProfile = null, dataCompare = null, timeout = 5000, isLoadedSuccess = false,
            guid = 0;

        function checkLoadStatus() {

            setTimeout(function() {

                if (!isLoadedSuccess) {
                    Medal.fallBackHandler();
                }

            }, timeout);
        }

        function jsonpRequestProfile() {

            var defer = new Deferred();

              K.io({
                 'url': apiSource.sideBarBasic,
                 'success': function(data) {
                        
                     try {

                        dataProfile = K.JSON.parse(data) || {};

                        if (DEBUG) {
                            console.log('Profile数据载入: ', dataProfile);
                        }

                     } catch(e) {
                        requestErrorHandler();
                        defer.reject();
                     }

                     defer.resolve();
                    },
                  'error': function() { defer.reject()},
                  'dataType': "jsonp",
                  'jsonpCallback': 'medaljsonpcallback' + (++guid),
                  'forceScript': true  
             });

            return defer.promise();
        }

        function jsonpRequestCompare() {

             var defer = new Deferred();          

              K.io({
                 'url': apiSource.sideBarSpecial,
                 'success': function(data) {   
                     
                     try {

                        dataCompare = data || {}

                        if (DEBUG) {
                            console.log('Compare数据载入: ', dataCompare);
                        }

                     } catch(e) {
                        requestErrorHandler();
                        defer.reject();
                     }

                     defer.resolve();                     
                   },
                  'error': function() { defer.reject() },
                  'dataType': "jsonp",
                  'jsonpCallback': 'medaljsonpcallback' + (++guid),
                  'forceScript': true  
             });

            return defer.promise();
        }


        function loadUserInfo() {        

           //@notice: fail in KISSY 1.1.6
           $when(jsonpRequestProfile(), jsonpRequestCompare()).done(function() {
                
                var data = K.mix(dataProfile, dataCompare);

                if (DEBUG) {
                    console.log('merge后数据：', data);
                }

                setTimeout(function() {

                    onSnippetLoadComplete();
                    insertCompareSnippet(data);
                    insertProfileSnippet(data);
                    onSnippetInsertComplete();

                }, 0);
            })

            checkLoadStatus();
        }

        function render() {
            getElements();
            loadUserInfo();
        }

        function getElements() {
            container = $get('.ju-md-sidebar');
        }

        function onSnippetLoadComplete() {
            //do something
        }

        function onSnippetInsertComplete() {
             MedalInteraction.initialize(onRenderComplete);
             isLoadedSuccess = true;
        }

        function onRenderComplete() {
            Dom.css(container, 'padding-top', '0px');
            Dom.css(container, 'background-image', 'none');
            showElement();
        }

        function showElement() {
            $get(".md-profile").style.visibility = 'visible';
            $get(".md-compare").style.visibility = 'visible';
        }

        function insertProfileSnippet(data) {

            var T = SideBar.Template,

                htmlSnippet = [

                    SideBar.Template['profilePanel'],
                        '<div class="md-compare" style="visibility:hidden">',
                            '<ol>',
                                '<li><a class="cnt" href="#">总计节省</a></li>',
                                '<li><a href="#">投票眼光</a></li>',
                            '</ol>',
                        '<div class="status s01">',
                            T['comparePanel']['save'][data.saveRankingLevel],
                            T['comparePanel']['insight'][data.votingVisionLevel],
                        '</div></div>'].join("\n");

            var innerHTML = Ju.template(htmlSnippet, data);
            var div = Dom.create(innerHTML);

            container.insertBefore(div, container.firstChild);
            
        }

        function insertCompareSnippet() {
        }

        function requestErrorHandler() {
            //console.log('ErrorHandler Launch!');
        }
      
        return {
            'init': launch
        }

        function launch() {
            render();
        }

    })();

    SideBar.Template = {    
        
        'profilePanel': [

            '<div class="md-profile" style="visibility:hidden">',
            '<div class="ju-tip <%= isTodayCheckedIn == "0" ? "" : "hide"%>"><div class="ct"><%= continuesDay == "0" ? "昨天没有签到吧<br/>连续签到得勋章" : "已连续签到<em>" + continuesDay + "</em>天<br/>连续签到得勋章"%></div><s></s><a>x</a></div>',
                '<div class="md-info">',
                    '<a href="#" title="" class="pic"><img src="<%=avatar%>" width="78" height="78" /></a>',
                    '<div class="md-bio">',
                        '<span class="user-name"><%=nick%></span>',
                        '<span class="pending">',
                            '<a class="<%= userOrderNum == "0" ? "disabled" : ""%>" href="<%= userOrderNum == "0" ? "" : Ju.sys.Helper.getServerURI("ju") + "/tg/my_ju.htm"%>">待付款(<em><%=userOrderNum%></em>)</a>',
                            '<a class="<%= userPollRemain == "0" ? "disabled" : ""%>" href="<%= userPollRemain == "0" ? "" : Ju.sys.Helper.getServerURI("i") + "/poll/my_poll.htm"%>">选票(<em><%=userPollRemain%></em>)</a>',
                        '</span>',
                        '<span class="state <%= continuesDay == "0" ? "off" : "on"%>" style="display:block">',
                            '<em><%=continuesDay%>天</em>',
                            '<a class="<%= isTodayCheckedIn == "0" ? "btn-sign" : "btn-not-sign"%>" ><%= isTodayCheckedIn == "0" ? "签到" : "已签到"%></a>',
                        '</span>',
                    '</div>',
                '</div>',

                '<div class="md-list <%= honors.length ? "" : "hide" %>">',
                    '<ul>',
                        '<% for ( var i = 0, l = honors.length; i < l; i++ ) { %>',
                            '<li class="md-list-item"><a href="<%= Ju.sys.Helper.getServerURI("i") + "/honor/honor.htm?honorLogo=1&honorRule=" + honors[i].honorId%>"><img src="<%= honors[i].smallIcon%>" /></a>',

                             /* tips */
                                '<div class="md-list-tips <%= "order" + i %> <%= i < 7 ? "row1" : i > 13 ? "row3" : "row2"%>">',
                                    '<div class="ju-md-list-popup">',
                                        '<div class="jmp-mask"></div>',
                                        '<div class="jmp-content">',
                                            '<div class="con-medal">',
                                                '<a href="#"><img src="<%= honors[i].picUrl%>" /></a>',
                                            '</div>',
                                            '<div class="con-info">',
                                                '<div class="inf-title">',
                                                    '<span class="tit"><%= honors[i].honorName%></span>',
                                                    '<span class="term">',
                                                        '<ul class="md-stars">',
                                                            '<% for (var j = 0,k = parseInt(honors[i].honorLevel); j < 3; j++) { %>',
                                                            '<li class="<%= (k-- > 0) ? "shine" : ""%>"></li>',
                                                            '<% } %>',
                                                        '</ul>',
                                                    '</span>',
                                               '</div>',
                                               '<div class="inf-detail"><%= honors[i].tips%></div>',
                                            '</div>',
                                            '<a class="con-link-view" href="<%= Ju.sys.Helper.getServerURI("i") + "/honor/honor.htm?honorLogo=1" %>">查看我的勋章&gt;&gt;</a>',
                                        '</div>',
                                        '<b class="jmp-arrow"></b>',
                                    '</div>',
                                '</div>',
                            '</li>',
                        '<% } %>',

                    '</ul>',
                    '<% if ( honors.length > 7 ) { %>',
                    '<a href="#" class="dropdown"></a>',
                    '<% } %>',
                '</div>',
                '<div class="md-notification <%= newHonorNum == "0" ? "hide" : ""%>">',
                    '<p>恭喜你获得<em><%= newHonorNum %></em>枚新勋章<a href="<%= Ju.sys.Helper.getServerURI("i") + "/honor/honor.htm?honorLogo=1" %>" class="gotolook">去看看>></a></p>',
                    '<a href="#" class="btn-close"></a>',
                '</div>',

            '</div>'].join("\n"),

        'comparePanel': {

            "save": {
                "1": [
                     '<div class="st-sheet save s01">',
                         '<span class="highlight">￥<em><%=saveMoney%></em></span>',
                         '<span class="description">你比全国<em><%=saveRanking%>%</em>的人省得多，</br>CPI通胀对你来说都是浮云！</span>',
                     '</div>'].join("\n"),

                "2": [
                     '<div class="st-sheet save s02">',
                         '<span class="highlight">￥<em><%=saveMoney%></em></span>',
                         '<span class="description">你比全国<em><%=saveRanking%>%</em>的人省得多，<br/>实在太会过日子了！</span>',
                      '</div>'].join("\n"),
                "3": [             
                     '<div class="st-sheet save s03">',
                         '<span class="highlight">￥<em><%=saveMoney%></em></span>',
                         '<span class="description">你比全国<em><%=saveRanking%>%</em>的人都省钱，<br/>省钱是一门艺术，看好你喔!</span>',
                     '</div>'].join("\n"),
                "4": [
                     '<div class="st-sheet save s04">',
                         '<span class="highlight">￥<em><%=saveMoney%></em></span>',
                         '<span class="description">你只比全国<em><%=saveRanking%>%</em>的人省钱，<br/>路漫漫兮，再接再厉哟！</span>',
                     '</div>'].join("\n")
            },
            
            "insight": {
                "1":[
                    '<div class="st-sheet insight s01" style="display:none">',
                         '<span class="highlight"><em><%=votingVision%>%</em></span>',
                         '<span class="description">你的目光如炬，简直就是<br/>再世伯乐啊，太神了！</span>',
                     '</div>'].join("\n"),
                
                "2": [             
                    '<div class="st-sheet insight s02" style="display:none">',
                         '<span class="highlight"><em><%=votingVision%>%</em></span>',
                         '<span class="description">你很有眼光，品味出众<br/>难得一见啊！</span>',
                    '</div>'].join("\n"),
                "3": [             
                    '<div class="st-sheet insight s03" style="display:none">',
                         '<span class="highlight"><em><%=votingVision%>%</em></span>',
                         '<span class="description">你的眼光还不错，有潜力！</span>',
                    '</div>'].join("\n"),
                "4": [
                    '<div class="st-sheet insight s04" style="display:none">',
                        '<span class="highlight"><em><%=votingVision%>%</em></span>',
                        '<span class="description">你的眼光还有待提升，<br/>继续加油喔！</span>',
                    '</div>'].join("\n")
                
            }
        }
    };


    /*
     * BootStrap it!
     */

    var Medal = new function() {

        var medalSideBar = null, requestFlag = false, _ = this;

        this.bootStrap = function() {
        
            if (condition()) {

                //BootStrap when[load_user_info == "1"]

                requestFlag = (medalSideBar.getAttribute('load_user_info') != "1" ? true : false);

                if (requestFlag) {              
                    SideBar.init();
                
                } else {
                    _.fallBackHandler();
                }
            }

            function condition() {
                return !!(medalSideBar = $get('#J_MedalSideBar'));
            }
        };

        this.fallBackHandler = function() {
            Dom.css(medalSideBar, 'background', 'none');
            Dom.css(medalSideBar, 'padding-top', '0px');
            Dom.css($get('.md-ver-nav', medalSideBar), 'margin-top', '0px');
        }

    }

    K.ready(function() { Ju.setTrans.inspectElement(document) });
    K.ready(Medal.bootStrap); 

})(window, KISSY);





/**
 * 回到顶部
 * @author etai
 */
;(function(){
    var K = KISSY, DOM = K.DOM, Event = K.Event;
        
        var backToTop = function(){
            
            this.config = {
                interval : 200,
                threshold: 500,
                temp_trig: '<a href="" class="ju_backto_top" id="J_BackToTop"></a>',
                temp_css : '.ju_backto_top{height:46px;width:46px;display:block;background:url(http://img01.taobaocdn.com/tps/i1/T1ZimGXgliXXXXXXXX-46-93.png) no-repeat 0 0;position:fixed;right:10px;bottom:50px;_position:absolute;_top:200px;display:none} .ju_backto_top:hover{background-position:0 -47px}'
                };
            
            this.trigger = null;
            
            this.timer = null;
            
            this.init();
            
        }
        K.augment(backToTop, {
            
            _checkToShow: function(){
                
                var scroll = DOM.scrollTop(document);
                
                if(scroll < this.config.threshold) {
                    DOM.hide(this.trigger);
                }
                else{
                    DOM.show(this.trigger);
                }
                
                
            },
            
            _rendTrigger: function(){
                
                var self = this;
                
                this.trigger = DOM.create(this.config.temp_trig);
                
                DOM.addStyleSheet(this.config.temp_css);
                
                DOM.append(this.trigger, document.body);
                
                DOM.css(this.trigger, 'right', self._getRightDis());
                
            },
            
            _getRightDis: function(){
                var w = DOM.width(document.body);
                
                return w >= 1100 ? parseInt((w - 990) / 2 - 56, 10) : 0;
                
            },
            
            _bindEvent: function(){
                var self = this,
                    docBd = K.UA.webkit ? document.body : document.documentElement;

                Event.on(this.trigger, 'click', function(ev){
                    ev.halt();
                    //back to top
                    /**
                    var dist = parseInt(docBd.scrollTop / 3, 10);
                    var aTimer = setTimeout(function(){
                        if(docBd.scrollTop <= dist){
                            docBd.scrollTop = 0;
                            self._checkToShow();
                            clearTimeout(aTimer);
                            aTimer = null;
                            return;
                        }
                        docBd.scrollTop -= dist;
                        
                        self._checkToShow();
                        
                        setTimeout(arguments.callee, 10);
                        
                    }, 10)
                    */
                    
                    docBd.scrollTop = 0;
                    

                })
            },
            
            init: function(config){
                
                if(KISSY.UA.ie && KISSY.UA.ie < 7) return;
                
                var self = this;
                
                if(!this.trigger) this._rendTrigger();
                
                this._bindEvent();
                
                Event.on(window, 'scroll', function(ev){
                
                    if(self.timer) return;
                    
                    self._checkToShow();
                    self.timer = setTimeout(function(){
                        
                        clearTimeout(self.timer);
                        self.timer = null;
                        
                    }, self.config.interval)
                    
                });
                
                self._checkToShow();
                
            }
            
        })
        
        Ju.app.backToTop = backToTop;
        
        K.ready(function(){
            new backToTop();
        });
        

})();
/**
  * app-qrcode.js
  * liuling.wb@taobao.com
  */

;(function(global, K) {

    
    var Dom = K.DOM, Event = K.Event, $query = Dom.query, Noop = function(){};

    var QRCode = (function() {

        var targetElems = null,
            
            api = {
                'statusDetection': "/json/tg/ValidateWlb.htm",
                'qrcodeSending': "/json/tg/TransmissionWlb.htm"
            }

        function responseHandler(response, orderId) {
        
            var data = K.JSON.parse(response);
              
            if(!data) {
                return;
            }

            switch (data.type) {
                
                case 'VAL_FAIL':
            
                    QRCode.simplePopup(data.msg, 'cry');

                    break;

                case 'VAL_SUCCESS':

                    var preSendMsg = '二维码只能发送' + data.timelimit + '次，此为第' + data.time + '次，接受手机号码为：' + data.phone + '，确定要发送吗？';
            
                    QRCode.simplePopup(preSendMsg, 'idea', function(){ sendQRCode(orderId) }, Noop);

                    break;

                case 'TRANS_FAIL':

                    QRCode.simplePopup(data.msg, 'cry');

                    break;

                case 'TRANS_SUCCESS':
             
                    QRCode.simplePopup(data.msg, 'smile');

                    break;

                default:
                    alert('系统异常, 请重试!');
                    break;
            }

        }

        function bind() {
            
            Event.on(targetElems, 'click', function(e) {

                e.preventDefault();
                detectStatus(this);
                
            });

        }

        function hasElem(collection) {
            
            if(!collection || collection.length == 0) {
                return false;
            }

            return true
        }  

        function render() {

            targetElems = $query('.J_QRCode');

            if(hasElem(targetElems)) {
                bind();
            }
        
        }

        function getOrderId(elem) {
            return elem.getAttribute('data-orderid');
        }


        function IO(router, data, handler) {
            K.io.get(router, data, handler);
        }

        function detectStatus(elem) {
            
            var orderId = getOrderId(elem);

            IO(api['statusDetection'], {'orderId': orderId}, 
                function(response) {
                    responseHandler(response, orderId);
            });
        }

        function sendQRCode(orderId) {
            IO(api['qrcodeSending'], {'orderId': orderId}, responseHandler);
        }


        return {

            'init': function() {
                render();
            }
        }
    })();


    //Expose

    QRCode.simplePopup = function(message, className, confirmHandler, cancelHandler) {
        
        var msg = message,
            className = className,
            confirmHanlder = confirmHandler || Noop,
            cancelHandler = cancelHandler;


        var content = '<p class="error-content ' + className + '">' + msg,
            buttons = cancelHandler ? 
                      [{'text': '确定', 'func': function() {confirmHanlder(); this.hide() }}, {'text': '取消', 'func': function(){ cancelHandler(); this.hide()} }] :
                      [{'text': '确定', 'func': function() {confirmHanlder(); this.hide() }}];

         var popup = new Ju.sys.Popup({
               width: 394,
               content: content,
               title: '小提示',
               type: 'pop-ju',
               buttons: buttons,
               autoShow: false,
               useAnim: true,
               onHide : function(){
                   Ju.app.onPress = 0;
               }
           });

          popup.show();
       
        
    }
  

    K.ready(QRCode.init);

})(window, KISSY);