/**
 * Author: fatedm
 * Date: 12-5-8
 * Time: 下午2:01
 * Email: fatedm@hotmail.com
 */
/**
 * Author: fatedm
 * Date: 12-4-11
 * Time: 上午10:17
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
            /**
             *
             * @param str 需要hover效果dom元素数组
             */
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
            tab : function(){
                $('#J_Tab li').on('mouseover', function(e){
                    var data = D.attr(e.target, 'data-index'),
                        first = $('#J_Tab li.first'),
                        last =  $('#J_Tab li.last');
                    if(data == '0'){
                        first.addClass('tab-cur');
                        last.removeClass('tab-cur');
                        D.css('.te-notice', 'display', 'block')
                        D.css('.te-hotnews', 'display', 'none');
                    }else if(data == '1'){
                        last.addClass('tab-cur');
                        first.removeClass('tab-cur');
                        D.css('.te-notice', 'display', 'none')
                        D.css('.te-hotnews', 'display', 'block');
                    }
                })
                $('#J_Tabbd li').on('mouseenter mouseleave', function(e){
                    if(e.type == 'mouseenter'){
                        $(this).addClass('cur');
                    }else{
                        $(this).removeClass('cur');
                    }
                })
            },
            fixIE6 : function(el, topV){
                if (S.UA.ie != 6 || !D.get(el)) return;

                var obj = D.get(el);

                D.css(obj, {'position' : 'absolute', top : topV + 'px'});

                E.on(window, 'scroll resize', function(ev) {
                    D.css(obj, 'top', (topV+D.scrollTop())+'px');
                });
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
                }
                var el = D.get(id),
                    conHeight = D.height('#content'),
                    winHeight = D.viewportHeight(),
                    offset = D.offset('#content'),
                    offsetH = offset.top,
                    top = winHeight - offsetH -115,
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

            },
            removeBorder : function(){

                var items = D.query('.lists'),
                    len = items.length,
                    rows =  len%5 == 0 ? Math.floor(len/5) - 1 : Math.floor(len/5),
                    start = rows*5;
                
                for(var i = start; i < len; i++){
                    D.addClass(items[i], 'no-border');
                }
            },
            highlight : function(){
                var cur = D.val('#J_highlight'),
                    curEl = D.get('#J_' + cur);
                if(cur && curEl){
                    D.addClass(curEl, 'list-cur');
                }

            }
        };


    S.IO({
        url : url+'synchronizeQuantity.do',
        data : {ids : ids+''},
        type : 'post',
        dataType : 'jsonp',
        jsonpCallback : 'callback',
        success : function(data){
            var amounts = data.pro.amount,
                len = amounts.length,
                id,amount,soldQuantity,currentQuantity,span,isHot,isCheap;
            for(var i = 0; i < len; i++){
            	amount = amounts[i];
                id = amount.id;
                sellOut = amount.sellOut;
                currentQuantity = amount.currentQuantity;
                isHot = amount.isHot;
                isCheap = amount.isCheap;
                span = $('#item' + id);
                if(currentQuantity == 0){
                    var href = $(span).attr('href');
                    $(span).parent('.lists').children('.buy').children('.btn').addClass('sellout').html('抢完了...');
                	if(href){
                	    $(span).parent('.lists').append('<a target="_blank" href="' + href +'" class="soldout"></a>');
                    }else{
                        $(span).parent('.lists').append('<a class="soldout"></a>');
                    }
                }else if(currentQuantity <100 && currentQuantity >0){
                    $(span).parent('.lists').children('.pro-img').append('<span>仅剩' + currentQuantity + '件!</span>');
                }

                if(isCheap){
                	$(span).parent('.lists').append('<i class="pro-cheap"></i>');
                }
                if(isHot){
                	$(span).parent('.lists').append('<i class="pro-hot"></i>');
                }
                $(span).html('已成交'+sellOut+'件');
            }
        }
    });
    Helper.hover('.lists');
    /*fixed*/
    Helper.fixed('#J_Totop');
    /**后几个li去下边框*/
    Helper.removeBorder();
    Helper.highlight();
})
KISSY.use('datalazyload', function(S, DataLazyload) {
    S.ready(function(S) {
        DataLazyload( { mod: 'auto' } );
    });
});