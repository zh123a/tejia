/**
 * Author: fatedm
 * Date: 12-5-7
 * Time: 上午10:29
 * Email: fatedm@hotmail.com
 */

KISSY.ready(function(S){
    var D = S.DOM, E = S.Event, $ = S.Node.all;

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
            hover : function(str,cls){
                var items = D.query(str);
                S.each(items, function(item){

                    E.on(item, 'mouseover mouseout', function(e){
                        var tar = D.parent(e.target,'.lists') || e.target;

                        if(e.type == 'mouseover'){

                            D.addClass(tar, cls);

                        }else if(e.type == 'mouseout'){

                                D.removeClass(tar, cls);
                           
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
                });
                $('#J_Tabbd li').on('mouseenter mouseleave', function(e){
                    if(e.type == 'mouseenter'){
                        $(this).addClass('cur');
                    }else{
                        $(this).removeClass('cur');
                    }
                });
            },
            fixIE6 : function(el, topV){
                if (S.UA.ie != 6 || !D.get(el)) return;

                var obj = D.get(el);

                D.css(obj, {'position' : 'absolute', top : topV + 'px'});

                E.on(window, 'scroll resize', function(ev) {
                    D.css(obj, 'top', (topV+D.scrollTop())+'px');
                });
            },
            highlight : function(){
                var cur = D.val('#J_highlight'),
                    curEl = D.get('#J_' + cur);
                if(cur && curEl){
                    D.addClass(curEl, 'list-cur');
                }

            },
            ajax : function(){
                if(window.location.href.indexOf('duanmingming') != -1) return;
                S.IO({
                    url : url + 'synchronizeQuantity.do',
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
                                    $(span).parent('.lists').append('<a  class="soldout"></a>');
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
            },
            change : function(arr, str, cls){
                var items = D.query(arr);
                S.each(items, function(item){
                    D.addClass(item, cls);
                    D.html(item, str);
                })
            },
            hideAdd : function(str){
                var els = D.query(str);
                S.each(els, function(item){
                    D.css(item, 'display', 'none');
                    $(item).parent('.buy').append('<span style="float:left;color:#aaa;height:22px;line-height:22px;">已成交0件</span>');
                })
            }
        };








    /*10团start*/
    if(D.get('#ten')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'ten-nav');
        D.css('.t-ten', 'display', 'block');
        D.css('.t-fourteen', 'display', 'none');
        D.css('.t-twenty', 'display', 'none');
        E.on(nav, 'click', function(e){
            var tar = e.target,
                tenCon = D.get('.t-ten'),
                FourteenCon = D.get('.t-fourteen'),
                twentyCon = D.get('.t-twenty');
            if(D.hasClass(tar, 's-ten')){
                D.removeClass(nav, 'ten-fourteen ten-twenty');
                D.addClass(nav, 'ten-nav');
                D.css('.t-ten', 'display', 'block');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-fourteen')){
                D.removeClass(nav, 'ten-nav ten-twenty');
                D.addClass(nav, 'ten-fourteen');
                D.css(tenCon, 'display', 'none');
                D.css(FourteenCon, 'display', 'block');
                D.css(twentyCon, 'display', 'none');
            }else if(D.hasClass(tar, 's-twenty')){
                D.removeClass(nav, 'ten-nav ten-fourteen');
                D.addClass(nav, 'ten-twenty');
                D.css(tenCon, 'display', 'none');
                D.css(FourteenCon, 'display', 'none');
                D.css(twentyCon, 'display', 'block');
            }
        });
        Helper.change('#J_Fourteen .btn', '14:00开始', 'willbuy');
        Helper.change('#J_Twenty .btn', '20:00开始', 'willbuy');
        Helper.ajax();
        Helper.hideAdd('#J_Fourteen .salescount');
        Helper.hideAdd('#J_Twenty .salescount');
    }else if(D.get('#fourteen')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'fourteen-nav');
        D.css('.t-ten', 'display', 'none');
        D.css('.t-fourteen', 'display', 'block');
        D.css('.t-twenty', 'display', 'none');

        E.on(nav, 'click', function(e){
            var tar = e.target,
                tenCon = D.get('.t-ten'),
                FourteenCon = D.get('.t-fourteen'),
                twentyCon = D.get('.t-twenty');
            if(D.hasClass(tar, 's-ten')){
                D.removeClass(nav, 'fourteen-nav ten-twenty');
                D.addClass(nav, 'ten-nav');
                D.css('.t-ten', 'display', 'block');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-fourteen')){
                D.removeClass(nav, 'ten-nav ten-twenty');
                D.addClass(nav, 'fourteen-nav');
                D.css('.t-ten', 'display', 'none');
                D.css('.t-fourteen', 'display', 'block');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-twenty')){
                D.removeClass(nav, 'ten-nav fourteen-nav');
                D.addClass(nav, 'ten-twenty');
                D.css('.t-ten', 'display', 'none');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'block');
            }
        });

        Helper.change('#J_Twenty .btn', '20:00开始', 'willbuy');
        Helper.ajax();
        Helper.hideAdd('#J_Twenty .salescount');
    }else if(D.get('#twenty')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'twenty-nav');
        D.css('.t-ten', 'display', 'none');
        D.css('.t-fourteen', 'display', 'none');
        D.css('.t-twenty', 'display', 'block');

        E.on(nav, 'click', function(e){
            var tar = e.target,
                tenCon = D.get('.t-ten'),
                FourteenCon = D.get('.t-fourteen'),
                twentyCon = D.get('.t-twenty');
            if(D.hasClass(tar, 's-ten')){
                D.removeClass(nav, 'twenty-nav fourteen-nav');
                D.addClass(nav, 'ten-nav');
                D.css('.t-ten', 'display', 'block');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-fourteen')){
                D.removeClass(nav, 'ten-nav twenty-nav');
                D.addClass(nav, 'fourteen-nav');
                D.css('.t-ten', 'display', 'none');
                D.css('.t-fourteen', 'display', 'block');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-twenty')){
                D.removeClass(nav, 'ten-nav fourteen-nav');
                D.addClass(nav, 'twenty-nav');
                D.css('.t-ten', 'display', 'none');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'block');
            }
        });
        Helper.ajax();
    }else if(D.get('#nine')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'nine-nav');
        D.css('.t-ten', 'display', 'block');
        D.css('.t-fourteen', 'display', 'none');
        D.css('.t-twenty', 'display', 'none');
        E.on(nav, 'click', function(e){
            var tar = e.target,
                tenCon = D.get('.t-ten'),
                FourteenCon = D.get('.t-fourteen'),
                twentyCon = D.get('.t-twenty');
            if(D.hasClass(tar, 's-ten')){
                D.removeClass(nav, 'ten-fourteen ten-twenty');
                D.addClass(nav, 'nine-nav');
                D.css('.t-ten', 'display', 'block');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-fourteen')){
                D.removeClass(nav, 'nine-nav ten-twenty');
                D.addClass(nav, 'ten-fourteen');
                D.css('.t-ten', 'display', 'none');
                D.css('.t-fourteen', 'display', 'block');
                D.css('.t-twenty', 'display', 'none');
            }else if(D.hasClass(tar, 's-twenty')){
                D.removeClass(nav, 'nine-nav ten-fourteen');
                D.addClass(nav, 'ten-twenty');
                D.css('.t-ten', 'display', 'none');
                D.css('.t-fourteen', 'display', 'none');
                D.css('.t-twenty', 'display', 'block');
            }
        })
        Helper.change('#J_Ten .btn', '10:00开始', 'willbuy');
        Helper.change('#J_Fourteen .btn', '14:00开始', 'willbuy');
        Helper.change('#J_Twenty .btn', '20:00开始', 'willbuy');
        $('#main .btn').addClass('willbuy').html("10点开抢");
    }

    /**
     * 右侧tab
    **/
    Helper.tab();

    /**
     * 浮动条
    **/
    Helper.fixIE6('.bar', -209);

   /**
     * 导航高亮
    **/
    Helper.highlight();

    /**
     * 收藏夹
     */
    Helper.addFav();

    Helper.hover('#main .lists', 'bgcolor');
    Helper.hover('#J_Ten .lists', 'tuan-lists');
    Helper.hover('#J_Fourteen .lists', 'tuan-lists');
    Helper.hover('#J_Twenty .lists', 'tuan-lists');

});
KISSY.use('datalazyload', function(S, DataLazyload) {
    S.ready(function(S) {
        DataLazyload( { mod: 'auto' } );
    });
});