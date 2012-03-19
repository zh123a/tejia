/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-21
 * Time: 下午4:19
 * To change this template use File | Settings | File Templates.
 */

KISSY.add("order/clipboard/index", function(S) {
    var DOM = S.DOM, Event = S.Event, ua = S.UA;

    function Clipboard(el) {
        if (!!el) {
            this.el = DOM.get(el);
        }
    }

    S.augment(Clipboard, {
        setText: function(content) {
            try {
                if (window.clipboardData && clipboardData.setData()) {
                    clipboardData.setData("text", content)
                } else {
                    if (!!this.el && this.el.createTextRange) {
                        var range = this.el.createTextRange();
                        if (range) {
                            range.execCommand("Copy")
                        }
                    }
                }
            } catch(e) {
            }
        },
        clip:function(txt, callback) {
            if (ua.ie) {
                this.setText(txt);
                callback()
            } else {
                alert("由于浏览器的原因系统无法正常复制链接。请选中地址并按Ctrl+C，将链接复制下来。");
            }

        }
    });

    return Clipboard;
}, {
    requires:[]
});