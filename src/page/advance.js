/**
 * Author: fatedm
 * Date: 12-4-16
 * Time: 上午11:31
 * Email: fatedm@hotmail.com
 */
KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event;

    /*fixed start*/
    function fixed(id){
        if (S.UA.ie != 6){
            E.on(window, 'scroll resize', function(){
                var scrollTop = D.scrollTop();

                if(scrollTop > 10){
                    D.css(id, 'display', 'block');
                }else{
                    D.css(id, 'display', 'none');
                }
            });
            return;
        }else{
            var el = D.get(id),
                conHeight = D.height('#content'),
                winHeight = D.viewportHeight(),
                offset = D.offset('#content'),
                offsetH = offset.top,
                top = winHeight - offsetH - 127,
                start = conHeight - top;
            
            D.css(el, 'bottom', start);
            E.on(window, 'scroll resize', function(){
                var scrollTop = D.scrollTop();
                if(scrollTop > 10){
                    D.css(el, 'display', 'block');
                    var t = start - D.scrollTop();
                    t = t > 0 ? t : 0;
                    D.css(el, 'bottom', t + 'px');
                }else{
                    D.css(el, 'display', 'none');
                }
            })
        }

    }
    fixed('#J_Totop');
    /*fixed end*/
    /**后几个li去下边框*/
    (function(){
        var items = D.query('.items-box'),
            len = items.length,
            rows =  Math.floor(len/5),
            start = rows*5;
        for(var i = start; i < len; i++){
            D.addClass(items[i], 'no-border');
        }
    })()
    
})
