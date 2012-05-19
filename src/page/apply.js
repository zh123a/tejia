/**
 * Author: fatedm
 * Date: 12-3-29
 * Time: 上午10:20
 * Email: fatedm@hotmail.com
 */
KISSY.add('validate', function(S){
    var D = S.DOM,
        E = S.Event;
    function Validate(id, info, hasValuechange,type){
        this.id = id;
        this.el = D.get(id);
        this.parent = this.el.parentNode;
        this.node = D.get('.valid-under', this.parent);
        this.p = D.get('.estate', this.node);
        this.span = D.get('.label', this.p);
        this.info = info;
        this.type = type;
        this.hasValuechange = hasValuechange;
        this.init();
    }
    S.augment(Validate, S.EventTarget, {
        init : function(){
            if(this.type == 'checkbox'){
                this.clickCheckbox();
            }else if(this.type == 'file'){
                this.checkFile();
            }else{
                this.onFocusin();
                if(this.hasValuechange){
                    this.onValuechange();
                }
                this.onFoucsout();
            }
        },
        onFocusin : function(){
            var self = this,
                info = self.info;

            E.on(self.el, 'focusin', function(){
                val = D.val(self.el);
                if(val == ''){
                    D.css(self.node, 'display', 'block');
                    D.removeClass(self.p, 'error ok');
                    D.addClass(self.p, 'tip');
                    D.html(self.span, info.tip);
                }else{
                    self.info.focusout.call(self, self.el);
                }
            })
        },
        onFoucsout : function(){
            var self = this,
                info = self.info;
           
            E.on(self.el, 'focusout', function(){
                var val = self.el.value;
               
               if(val === ''){
                    D.css(self.node, 'display', 'block');
                    D.removeClass(self.p, 'tip ok');
                    D.addClass(self.p, 'error');
                    D.html(self.span, info.empty);
                    D.attr(self.el, 'data-state', false);
               }else{
                    self.info.focusout.call(self, self.el);
               }
            })
        },
        onValuechange : function(){
            var self = this,
                info = self.info;
            E.on(self.el, 'valuechange', function(e){
                self.info.valuechange.call(self, self.el, e);
            })

        },
        clickCheckbox : function(){
            var self = this;
            E.on(self.el, 'click', function(){
                var checked = self.el.checked;
                if(checked){
                    D.css(self.node, 'display', 'none');
                    D.attr(self.el, 'data-state', true);
                }else{
                    D.addClass(self.p, 'error');
                    D.html(self.span, self.info.error);
                    D.css(self.node, 'display', 'block');
                    D.attr(self.el, 'data-state', false);
                }
            })
        },
        checkFile : function(){
            var self = this;
            E.on(this.el, 'change', function(){
                var val = self.el.value,
                    str;
                if(S.UA.shell === 'chrome'){
                    val = val.substring(val.lastIndexOf('\\')+1);
                }
                str = val.substring(val.length-4);
                str = str.toLowerCase();

                if((str != '.jpg') && (str != '.gif') && (str != '.png') && (str != 'jpeg')){
                    D.removeClass(self.p, 'tip');
                    D.addClass(self.p, 'error');
                    D.html(self.span, self.info.error);
                    D.css(self.node, 'display', 'block');
                }else{
                    D.removeClass(self.p, 'error');
                    D.addClass(self.p, 'tip');
                    D.html(self.span, '图片为：'+val);
                    D.css(self.node, 'display', 'block');
                    D.attr(self.el, 'data-state', true);
                }
            })
        }
    })
    S.Validate = Validate;
    return Validate;
}, {
    requires:[]
});

KISSY.use('validate', function(S, Validate){
    var D = S.DOM,
        E = S.Event;
    var error = function(el){
        D.removeClass(this.p, 'tip ok');
        D.addClass(this.p, 'error');
        D.html(this.span, this.info.error);
        D.attr(el, 'data-state', false);
       
    }
   var ok = function(el){
        D.removeClass(this.p, 'tip error');
        D.addClass(this.p, 'ok');
        D.html(this.span, 'ok');
        D.attr(el, 'data-state', true);
    }
    /**
     * 商品链接
     */
    var proLinkArr = {
        tip : '请输入您要报名的宝贝链接。',
        error : '您输入的宝贝链接不属于淘宝网。',
        empty : '宝贝链接不能为空。',
        focusout : function(el){
            var val = el.value.toLowerCase();
               
            if(val.indexOf('http://') === -1){
                D.removeClass(this.p, 'tip ok');
                D.addClass(this.p, 'error');
                D.html(this.span, '你输入的宝贝链接不符合规则');
                D.attr(el, 'data-state', false);
            }else{
                 ok.call(this, el);
            }
        },
        valuechange : function(el, e){
            var val = e.newVal;
           
            if(val.indexOf('taobao.com')=== -1 ){
                error.call(this, el);
            }else{
                ok.call(this, el);
            }
        }
    };

    /**
     * 商品名称
     */
    var proName = {
        tip : '请输入报名商品的宝贝名称。',
        error : '宝贝名称请控制在13个汉字（26个字符）内。',
        empty : '宝贝名称不能为空',
        limit : '您输入的宝贝名称含有违禁词语，请修改后重新填写。',
        focusout : function(el){
            var val = el.value,
                getBytesLength = function(str){
                var totalLength = 0, c, len = str.length;
                for(var i = 0; i < len; i++){
                    c = str.charCodeAt(i);
                    if (( c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                        totalLength++;
                    }else {
                        totalLength+=2;
                    }  
                }
                return totalLength;
            };
            var valLen = getBytesLength(val);

            if(valLen > 26){
                error.call(this, el);
            }else{
                ok.call(this, el);
            }
        }
    }
    /**
     * 商品折扣
     */
    var proPrice = {
        tip : '请输入您报名的活动宝贝折后价格。',
        error : '价格只能包含数字和小数点,且<span style="color:#ff6600;">小数点后面最多包含一位</span>。',
        empty : '活动宝贝折后价格不能为空',
        focusout : function(el){
            var val = el.value;
            //宝贝的活动价格（即出售价格）为人民币XXXX元
            if(/^(\d*)?(\.)?\d{1}$/.test(val)){
                D.removeClass(this.p, 'tip error');
                D.addClass(this.p, 'ok');
                D.html(this.span, '宝贝的活动价格（即出售价格）为人民币<b style="color:#ff6600;">' + val + '</b>元');
                D.attr(el, 'data-state', true);
            }else{

                error.call(this, el);
            }
        }
    }

    /**
     * 商品数量
     */
    var proNum = {
        tip : '请输入您报名的活动宝贝数量。',
        error : '您提供的活动宝贝数量应该在50-300之间。',
        empty : '活动宝贝数量不能为空',
        focusout : function(el){
            var val = el.value;
            if(isNaN(val) || val < 50 || val > 300){
                error.call(this, el);
            }else{
                ok.call(this, el);
            }
        }
    };
    var proMail = {
        error : '亲，不包邮的商品没有办法参加活动哟！'

    };
    var proImg1 = {
        error : '只允许上传格式为jpg,png,jpeg的宝贝白底图。'
    };
    var proImg2 = {
        error : '只允许上传格式为jpg,png,jpeg的授权文件图片。'
    };
    var proImg3 = {
        error : '只允许上传格式为jpg,png,jpeg的QS质检证明图片。'
    };

    var user = {
        tip : '亲，请写你的名字。',
        error : '亲，名字要填写哦！',
        empty : '亲，名字要填写哦！',
        focusout : function(el){
            
            var val = el.value;
            if(val == ''){

                error.call(this, el);
            }else{
                ok.call(this, el);
            }
        }
    };
    var phone = {
        tip : '请输入能联系到您的手机号码。',
        error : '亲，您输入的手机号码不正确，请重新输入！',
        empty : '手机号码不能为空。',
        focusout : function(el){
            var val = el.value;
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(val))){
                error.call(this, el);
            }else{
                ok.call(this, el);
            }
        }
    }
    var email = {
        tip : '请输入您的联系邮箱。',
        error : '亲，您输入的邮箱地址不正确，请重新填写！',
        empty : '请输入您的联系邮箱。',
        focusout : function(el){
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                val = el.value;
            if(!reg.test(val)){
                error.call(this, el);
            }else{
                ok.call(this, el);
            }

        }
    };
    var tejiaLaw = {
        error : '亲，您仔细查看过《天天特价商家规则》了吗？如果同意，请在方框内打√。'
    };
    function _init(){
        var items = D.query('.J_Input');
        S.each(items, function(item){
            if(item.id == 'baoyou' || item.id == 'J_TLaws'){
                if(item.checked){
                    D.attr(item, 'data-state', 'true');
                }
            }else{
                if(item.value){
                     D.attr(item, 'data-state', 'true');
                }
            }
        })
    }
    _init();

    new S.Validate('#J_Pro',proLinkArr);
    new S.Validate('#J_Name',proName);
    new S.Validate('#J_Price', proPrice);
    new S.Validate('#J_Num', proNum);
    new S.Validate('#baoyou', proMail, false, 'checkbox');
    new S.Validate('#fiter1', proImg1, false, 'file');
    new S.Validate('#fiter2', proImg2, false, 'file');
    new S.Validate('#fiter3', proImg3, false, 'file');
    new S.Validate('#user', user);
    new S.Validate('#phone', phone);
    new S.Validate('#email', email);
    new S.Validate('#J_TLaws', tejiaLaw, false, 'checkbox');
    
    /**
    * 日历start
    */

    var S_Date = S.Date;
    
    var showdate = function(n, d) {//计算d天的前几天或者后几天，返回date,注：chrome下不支持date构造时的天溢出
        var uom = new Date(d - 0 + n * 86400000);
        uom = uom.getFullYear() + "/" + (uom.getMonth() + 1) + "/" + uom.getDate();
        return new Date(uom);
    };
    var select = D.get('#active'),
        url = D.val('#J_Ui'),min,max;


    if(D.get('#J_Date')){
        
        var nowVal = D.val('#J_Date').split('/');
        
        var now = nowVal[0],
            hour = nowVal[1];
        if(now == 26 && hour < 12){
            min = new Date('April 28,2012');
            max = new Date('May 6,2012');
        }else if(now == 26 && hour >=12 && hour <19){
            min = new Date('April 29,2012');
            max = new Date('May 6,2012');
        }else if(now == 26 && hour >=19){
            min = new Date('April 30, 2012');
            max = new Date('May 6, 2012');
        }else if(now == 27){
            min = new Date('April 30, 2012');
            max = new Date('May 7, 2012');
        }else if(now == 28){
            min = new Date('May 7,2012');
            max = new Date('May 8,2012');
        }else{
            min = showdate(8, new Date()),
            max = showdate(10, new Date());
        }
    }else{
        min = showdate(8, new Date()),
        max = showdate(10, new Date());
    }
    
    new S.Calendar('#J_Popup', {
        pages:2,
        popup:true,
        triggerType:['click'],
        closable:true,
        minDate : min,
        maxDate : max
    }).on('select', function(e) {
        var d = S_Date.format(e.date, 'isoDate'),
            dYear = d.substring(0,4),
            dMonth = d.substring(5,7),
            dDay = d.substring(8,10),
            dDate = dMonth + dDay;
           

        D.val('#J_Popup', d);
        D.attr('#J_Popup', 'data-state', 'true');

       /*S.IO({
           type : 'get',
           url : url + 'promotion/getPromotionByDate.htm',
           dataType : 'jsonp',
           jsonpCallback : 'callback',
           data : {time : d},
           success : function(data){

                var opts = data[dYear][dDate],
                    len = opts.length,
                    opt = '<option value="-1">类目活动</option>';
                if(len){
                    for(var i = 0; i < len; i++){
                        opt += '<option value="' + opts[i]['id'] + '">' +opts[i]['name'] +  '</option>';
                    }
                }
                D.html(select, opt);
           }
       })*/
    });

    /**
    * 日历end
    */
    

    var form = D.get('#apply');
    E.on(form, 'submit', function(e){
        var inputs = D.query('.J_Input'),
            bl = true, state, arr = [];
        
        S.each(inputs, function(item, i){
            if(D.attr(item, 'data-state') === 'true'){
                state = true;
            }else{
                state = false;
                arr.push(i);
                bl = false;
            }
        
        });
       
        if(!bl){
            var arr1 = arr[0];
            try{
			inputs[arr1].focus();
            }catch(e){}
            e.halt();
			return false;
        }
        return true;
    })
})


