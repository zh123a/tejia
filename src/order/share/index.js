/**
 * @fileOverView 分享模块
 * @author temu.psc@taobao.com
 * @date 2012-02-03
 */

KISSY.add("order/share/index", function(S) {
    var DOM = S.DOM, Event = S.Event;

    function Share(container) {
        this.container = container;
        this.init();
    }

    S.augment(Share, {
        init: function() {
            var that = this;
            S.getScript("http://a.tbcdn.cn/apps/snstaoshare/widget/ts/ts-min.js", function() {
                TS.require('Share', '2.0', function() {
                    Event.on(that.container, 'click', function(ev) {
                        //TODO 需要根据详情页的实际情况在html页面设置data-shareparam里面的具体信息
                        var target = ev.target;
                        target.nodeName.toUpperCase() !== "A" && (target = DOM.parent(target, "a"));
                        new TS.Share(target).show('');
                    });
                })
            });
        }
    });

    return Share;
}, {
    requires:[]
});
