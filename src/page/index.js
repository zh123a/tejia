/**
 * User: duanmingming
 * Date: 12-4-10
 * Time: ����3:03
 */
KISSY.ready(function(S){
    var D = S.DOM, E = S.Event, $ = S.Node.all;

    var Helper = {
            /**�ղع���**/
            addFav : function(){
                var url = window.location.href,
                    title = document.title;

                E.on('#J_AddFav', 'click', function(e){
                    if(document.all){
                       window.external.addFavorite(url,title);
                    }else if(window.sidebar){
                       window.sidebar.addPanel(title, url, "");
                    }else{
                        alert( "�����ղ�ʧ�ܣ���ʹ��Ctrl+D�������" );
                    }
                    e.halt();
                })
            },
            /**
             *
             * @param str ��ҪhoverЧ��domԪ������
             */
            hover : function(str){
                var items = D.query(str);

                S.each(items, function(item){
                    var _timeout = setTimeout(function(){});

                    E.on(item, 'mouseover mouseout', function(e){

                        var tar = D.parent(e.target,'.lists') || e.target,
                            buy = $(tar).children('.buy'),
                            buynow = $(buy).children('.buynow')[0],
                            sell = $(buy).children('.forcenter')[0];

                        if(e.type == 'mouseover'){
                            clearTimeout(_timeout);
                            D.css(buynow, 'display', 'block');
                            D.css(sell, 'display', 'none');

                        }else if(e.type == 'mouseout'){
                            _timeout = setTimeout(function(){
                                D.css(buynow, 'display', 'none');
                                D.css(sell, 'display', '');
                            },10);
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
            }
        };

    


    
    
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
                soldQuantity = amount.soldQuantity;
                currentQuantity = amount.currentQuantity; 
                isHot = amount.isHot;
                isCheap = amount.isCheap;
                span = $('#item' + id);
                if(currentQuantity == 0){
                    var href = $(span).parent('.lists').children('.pro-img').attr('href');
                	$(span).parent('.lists').append('<a target="_blank" href="' + href +'" class="soldout"></a>');
                }               
                if(isHot){
                	$(span).parent('.lists').children('.pro-name').append('<i class="pro-hot"></i>');
                }
                if(isCheap){
                	$(span).parent('.lists').children('.pro-name').append('<i class="pro-cheap"></i>');
                }
                $(span).html('����'+soldQuantity+'��');
            }
        }
    });
    
    /*10��start*/
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
        Helper.hover('#J_Ten .lists');
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

        Helper.hover('#J_Ten .lists');
        Helper.hover('#J_Fourteen .lists');


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
        Helper.hover('#twenty .lists');
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
    }

    /**
     * �Ҳ�tab
    **/
    Helper.tab();

    /**
     * ������
    **/
    Helper.fixIE6('.bar', -181);

    /**
     * ��ƷhoverЧ��
     */
    Helper.hover('#main .lists');

    /**
     * �ղؼ�
     */
    Helper.addFav();
    /**
     * ��תľ��start
     */
    S.use('switchable,datalazyload', function(S, Switchable){
        var Carousel = Switchable.Carousel,
            arr = ['ladies', 'men', 'shoes', 'bags', 'beauty', 'home', 'baby', 'food', 'digit'],
            config = {
                contentCls : 'list',
                triggerCls : 'trigger',
                navCls : 'trigger',
                activeTriggerCls : 'selected',
                viewSize : [990],
                triggerType : 'mouse',
                effect : 'scrollx',
                interval : 3,
                autoplay :false,
                circular : true,
                steps : 5,
                lazyDataType : 'img-src'
            };
        S.each(arr, function(item){
            var id = item;
            id = new Carousel('#'+id,config);
        })
        
    })
    /**
     * ��תľ��end
     */

});
