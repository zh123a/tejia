/**
 * Author: fatedm
 * Date: 12-3-29
 * Time: 上午10:20
 * Email: fatedm@hotmail.com
 */


KISSY.use('te/validate/', function(S, Validate){
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
            var val = el.value;
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
            if(val.indexOf('taobao.com')=== -1 && val.indexOf('tmall.com') === -1){
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
        tip : '请输入您报名的活动宝贝折扣价格。',
        error : '价格只能包含数字和小数点。',
        empty : '活动宝贝折扣价格不能为空',
        focusout : function(el){
            var val = el.value;

            if(/^(\d*)?(\.)?\d+$/.test(val)){
                ok.call(this, el);
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
        error : '您提供的活动宝贝数量低于100件。',
        empty : '活动宝贝数量不能为空',
        focusout : function(el){
            var val = el.value;
            if(isNaN(val) || val < 100){
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
    new Validate('#J_Pro',proLinkArr, true);
    new Validate('#J_Name',proName);
    new Validate('#J_Price', proPrice);
    new Validate('#J_Num', proNum);
    new Validate('#baoyou', proMail, false, 'checkbox');
    new Validate('#fiter1', proImg1, false, 'file');
    new Validate('#fiter2', proImg2, false, 'file');
    new Validate('#fiter3', proImg3, false, 'file');
    new Validate('#user', user);
    new Validate('#phone', phone);
    new Validate('#email', email);
    new Validate('#J_TLaws', tejiaLaw, false, 'checkbox');

    var form = D.get('#apply');
    E.on(form, 'submit', function(e){
        var inputs = D.query('input', form),
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
           if(D.attr(inputs[arr1], 'type') !== 'hidden'){
				inputs[arr1].focus();
			}
            e.halt();
			return false;
        }
        return true;
    })
})
/**
* 日历start
*/

KISSY.use('node,calendar,calendar/assets/base.css', function(S, Node, Calendar){
    var D = S.DOM,
        E = S.Event;
    var S_Date = S.Date;
    var showdate = function(n, d) {//计算d天的前几天或者后几天，返回date,注：chrome下不支持date构造时的天溢出
        var uom = new Date(d - 0 + n * 86400000);
        uom = uom.getFullYear() + "/" + (uom.getMonth() + 1) + "/" + uom.getDate();
        return new Date(uom);
    };
    var select = D.get('#active'),
        url = D.val('#J_Ui');
    new Calendar('#J_Popup', {
        pages:2,
        popup:true,
        triggerType:['click'],
        closable:true,
        minDate:showdate(11, new Date()),
        maxDate:showdate(15, new Date())
    }).on('select', function(e) {
        var d = S_Date.format(e.date, 'isoDate'),
            dYear = d.substring(0,4),
            dMonth = d.substring(5,7),
            dDay = d.substring(8,10),
            dDate = dMonth + dDay;


        Node.one('#J_Popup').val(d);
        D.attr('#J_Popup', 'data-state', 'true');
        
       S.IO({
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
       })
    });
});
/**
* 日历end
*/