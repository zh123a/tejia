/**
 * Created by JetBrains PhpStorm.
 * User: fatedm
 * Date: 12-3-29
 * Time: ÏÂÎç1:31
 */

KISSY.add('te/validate/index', function(S){
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
                    D.attr(self.el, 'data.state', false);
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
                    D.addClass(self.p, 'error');
                    D.html(self.span, self.info.error);
                    D.css(self.node, 'display', 'block');
                }else{
                    D.removeClass(self.p, 'error');
                    D.addClass(self.p, 'ok');
                    D.html(self.span, 'ok¡£Í¼Æ¬Îª£º'+val);
                    D.css(self.node, 'display', 'block');
                    D.attr(self.el, 'data-state', true);
                }
            })
        }
    })
    return Validate;
}, {
    requires:[]
});
