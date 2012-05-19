/**
 * Author: fatedm
 * Date: 12-5-9
 * Time: 上午10:19
 * Email: fatedm@hotmail.com
 */
KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event,
        $ = S.Node.all;

var Helper = {
            /**收藏功能**/
            addFav : function(){
                var url = window.location.href,
                    title = document.title;

                E.on('#J_AddFav', 'click', function(e){
                    if(document.all){
                       window.external.addFavorite(url,title);
                    }else if(window.sidebar){
                       window.sidebar.addPanel(title, url, "");
                    }else{
                        alert( "加入收藏失败，请使用Ctrl+D进行添加" );
                    }
                    e.halt();
                })
            },
            hover : function(str){
                var items = D.query(str);
                S.each(items, function(item){
                    //var _timeout = setTimeout(function(){});
                    E.on(item, 'mouseover mouseout', function(e){
                        var tar = D.parent(e.target,'.lists') || e.target;

                        if(e.type == 'mouseover'){
                            //clearTimeout(_timeout);
                            D.addClass(tar, 'bgcolor');

                        }else if(e.type == 'mouseout'){
                            //_timeout = setTimeout(function(){
                                D.removeClass(tar, 'bgcolor');

                            //},10);
                        }
                    })
                });
            },
            highlight : function(){
                var cur = D.val('#J_highlight'),
                    curEl = D.get('#J_' + cur);
                if(cur && curEl){
                    D.addClass(curEl, 'list-cur');
                }

            },
            
            fixed : function(id){
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
                        top = winHeight - offsetH - 136,
                        start = conHeight - top;

                    D.css(el, 'bottom', start);
                    E.on(window, 'scroll resize', function(){
                        var scrollTop = D.scrollTop();
                        if(scrollTop > 10){
                            D.css(el, 'display', 'block');
                            var t = start - D.scrollTop();
                            t = t > -217 ? t : -217;
                            D.css(el, 'bottom', t + 'px');
                        }else{
                            D.css(el, 'display', 'none');
                        }
                    })
                }
            }
            
        };



    Helper.fixed('#J_Totop');
    Helper.highlight();
    Helper.addFav();
    Helper.hover('#J_More .lists');
    /**后几个li去下边框*/
    (function(){
        var items = D.query('.lists'),
            len = items.length,
            rows =  len%5 == 0 ? Math.floor(len/5) - 1 : Math.floor(len/5),
            start = rows*5;
        for(var i = start; i < len; i++){
            D.addClass(items[i], 'no-border');
        }
    })()

})
