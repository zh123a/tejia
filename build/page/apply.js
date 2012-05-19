/**
 * Author: fatedm
 * Date: 12-3-29
 * Time: ����10:20
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
     * ��Ʒ����
     */
    var proLinkArr = {
        tip : '��������Ҫ�����ı������ӡ�',
        error : '������ı������Ӳ������Ա�����',
        empty : '�������Ӳ���Ϊ�ա�',
        focusout : function(el){
            var val = el.value;
            if(val.indexOf('http://') === -1){
                D.removeClass(this.p, 'tip ok');
                D.addClass(this.p, 'error');
                D.html(this.span, '������ı������Ӳ����Ϲ���');
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
     * ��Ʒ����
     */
    var proName = {
        tip : '�����뱨����Ʒ�ı������ơ�',
        error : '���������������13�����֣�26���ַ����ڡ�',
        empty : '�������Ʋ���Ϊ��',
        limit : '������ı������ƺ���Υ��������޸ĺ�������д��',
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
     * ��Ʒ�ۿ�
     */
    var proPrice = {
        tip : '�������������Ļ�����ۿۼ۸�',
        error : '�۸�ֻ�ܰ������ֺ�С���㡣',
        empty : '������ۿۼ۸���Ϊ��',
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
     * ��Ʒ����
     */
    var proNum = {
        tip : '�������������Ļ����������',
        error : '���ṩ�Ļ������������100����',
        empty : '�������������Ϊ��',
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
        error : '�ף������ʵ���Ʒû�а취�μӻӴ��'

    };
    var proImg1 = {
        error : 'ֻ�����ϴ���ʽΪjpg,png,jpeg�ı����׵�ͼ��'
    };
    var proImg2 = {
        error : 'ֻ�����ϴ���ʽΪjpg,png,jpeg����Ȩ�ļ�ͼƬ��'
    };
    var proImg3 = {
        error : 'ֻ�����ϴ���ʽΪjpg,png,jpeg��QS�ʼ�֤��ͼƬ��'
    };

    var user = {
        tip : '�ף���д������֡�',
        error : '�ף�����Ҫ��дŶ��',
        empty : '�ף�����Ҫ��дŶ��',
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
        tip : '����������ϵ�������ֻ����롣',
        error : '�ף���������ֻ����벻��ȷ�����������룡',
        empty : '�ֻ����벻��Ϊ�ա�',
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
        tip : '������������ϵ���䡣',
        error : '�ף�������������ַ����ȷ����������д��',
        empty : '������������ϵ���䡣',
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
        error : '�ף�����ϸ�鿴���������ؼ��̼ҹ����������ͬ�⣬���ڷ����ڴ�̡�'
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
* ����start
*/

KISSY.use('node,calendar,calendar/assets/base.css', function(S, Node, Calendar){
    var D = S.DOM,
        E = S.Event;
    var S_Date = S.Date;
    var showdate = function(n, d) {//����d���ǰ������ߺ��죬����date,ע��chrome�²�֧��date����ʱ�������
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
                    opt = '<option value="-1">��Ŀ�</option>';
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
* ����end
*/