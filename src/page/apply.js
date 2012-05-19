/**
 * Author: fatedm
 * Date: 12-3-29
 * Time: ����10:20
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
                    D.html(self.span, 'ͼƬΪ��'+val);
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
     * ��Ʒ����
     */
    var proLinkArr = {
        tip : '��������Ҫ�����ı������ӡ�',
        error : '������ı������Ӳ������Ա�����',
        empty : '�������Ӳ���Ϊ�ա�',
        focusout : function(el){
            var val = el.value.toLowerCase();
               
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
           
            if(val.indexOf('taobao.com')=== -1 ){
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
        tip : '�������������Ļ�����ۺ�۸�',
        error : '�۸�ֻ�ܰ������ֺ�С����,��<span style="color:#ff6600;">С�������������һλ</span>��',
        empty : '������ۺ�۸���Ϊ��',
        focusout : function(el){
            var val = el.value;
            //�����Ļ�۸񣨼����ۼ۸�Ϊ�����XXXXԪ
            if(/^(\d*)?(\.)?\d{1}$/.test(val)){
                D.removeClass(this.p, 'tip error');
                D.addClass(this.p, 'ok');
                D.html(this.span, '�����Ļ�۸񣨼����ۼ۸�Ϊ�����<b style="color:#ff6600;">' + val + '</b>Ԫ');
                D.attr(el, 'data-state', true);
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
        error : '���ṩ�Ļ��������Ӧ����50-300֮�䡣',
        empty : '�������������Ϊ��',
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
    * ����start
    */

    var S_Date = S.Date;
    
    var showdate = function(n, d) {//����d���ǰ������ߺ��죬����date,ע��chrome�²�֧��date����ʱ�������
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
                    opt = '<option value="-1">��Ŀ�</option>';
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
    * ����end
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


