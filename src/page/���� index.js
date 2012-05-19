/**
 * User: duanmingming
 * Date: 12-4-10
 * Time: 下午3:03
 */
KISSY.ready(function(S){
    var D = S.DOM, E = S.Event, $ = S.Node.all;
    
    function hover(str){
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

    }

    if(window.location.href.indexOf('daily') !== -1){
        var url = 'http://tejia.daily.taobao.net/';
    }else if(window.location.href.indexOf('')){
        var url = '';
    }
    
    S.IO({
        url : 'http://tejia.daily.taobao.net/synchronizeQuantity.do',
        data : {ids : ids},
        type : 'get',
        dataType : 'jsonp',
        jsonpCallback : 'callback',
        success : function(data){
            var amounts = data.pro.amount,
                len = amounts.length,
                id,amount;
            for(var i = 0; i < len; i++){
                id = amounts[i].id;
                amount = amounts[i].soldQuality;
                $('#item'+id).html('已售'+amount+'件');
            }
        }
    });
    
    /*10团start*/
    if(D.get('#ten')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'ten-nav');
        D.css('.t-ten', 'display', 'block');
        D.css('.t-fourteen', 'display', 'none');
        D.css('.t-twenty', 'display', 'none');

       
        var tenBtn = D.get('.s-ten'),
            fourteenBtn = D.get('.s-fourteen'),
            twentyBtn = D.get('.s-twenty');
        E.on(tenBtn, 'click', function(){
            D.removeClass(nav, 'ten-fourteen ten-twenty');
            D.addClass(nav, 'ten-nav');
            D.css('.t-ten', 'display', 'block');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(fourteenBtn, 'click', function(){
            D.removeClass(nav, 'ten-nav ten-twenty');
            D.addClass(nav, 'ten-fourteen');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'block');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(twentyBtn, 'click', function(){
            D.removeClass(nav, 'ten-nav ten-fourteen');
            D.addClass(nav, 'ten-twenty');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'block');
        })

        hover('#J_Ten .lists');
    }else if(D.get('#fourteen')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'fourteen-nav');
        D.css('.t-ten', 'display', 'none');
        D.css('.t-fourteen', 'display', 'block');
        D.css('.t-twenty', 'display', 'none');


        var tenBtn = D.get('.s-ten'),
            fourteenBtn = D.get('.s-fourteen'),
            twentyBtn = D.get('.s-twenty');
        E.on(tenBtn, 'click', function(){
            D.removeClass(nav, 'fourteen-nav ten-twenty');
            D.addClass(nav, 'ten-nav');
            D.css('.t-ten', 'display', 'block');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(fourteenBtn, 'click', function(){
            D.removeClass(nav, 'ten-nav ten-twenty');
            D.addClass(nav, 'fourteen-nav');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'block');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(twentyBtn, 'click', function(){
            D.removeClass(nav, 'ten-nav fourteen-nav');
            D.addClass(nav, 'ten-twenty');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'block');
        })
        hover('#J_Ten .lists');
        hover('#J_Fourteen .lists');


    }else if(D.get('#twenty')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'twenty-nav');
        D.css('.t-ten', 'display', 'none');
        D.css('.t-fourteen', 'display', 'none');
        D.css('.t-twenty', 'display', 'block');





        var tenBtn = D.get('.s-ten'),
            fourteenBtn = D.get('.s-fourteen'),
            twentyBtn = D.get('.s-twenty');
        E.on(tenBtn, 'click', function(){
            D.removeClass(nav, 'twenty-nav fourteen-nav');
            D.addClass(nav, 'ten-nav');
            D.css('.t-ten', 'display', 'block');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(fourteenBtn, 'click', function(){
            D.removeClass(nav, 'ten-nav twenty-nav');
            D.addClass(nav, 'fourteen-nav');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'block');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(twentyBtn, 'click', function(){
            D.removeClass(nav, 'ten-nav fourteen-nav');
            D.addClass(nav, 'twenty-nav');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'block');
        })
        hover('#twenty .lists');
    }else if(D.get('#nine')){
        var nav = D.get('.tuan-nav');
        D.addClass(nav, 'nine-nav');
        D.css('.t-ten', 'display', 'block');
        D.css('.t-fourteen', 'display', 'none');
        D.css('.t-twenty', 'display', 'none');

        var tenBtn = D.get('.s-ten'),
            fourteenBtn = D.get('.s-fourteen'),
            twentyBtn = D.get('.s-twenty');
        E.on(tenBtn, 'click', function(){
            D.removeClass(nav, 'ten-fourteen ten-twenty');
            D.addClass(nav, 'nine-nav');
            D.css('.t-ten', 'display', 'block');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(fourteenBtn, 'click', function(){
            D.removeClass(nav, 'nine-nav ten-twenty');
            D.addClass(nav, 'ten-fourteen');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'block');
            D.css('.t-twenty', 'display', 'none');
        })
        E.on(twentyBtn, 'click', function(){
            D.removeClass(nav, 'nine-nav ten-fourteen');
            D.addClass(nav, 'ten-twenty');
            D.css('.t-ten', 'display', 'none');
            D.css('.t-fourteen', 'display', 'none');
            D.css('.t-twenty', 'display', 'block');
        })


    }


            








    /**右侧tab start**/
    function tab(){
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
    }
    tab();
    /**右侧tab end**/
    /**浮动条start**/
    function fixIE6(el, topV){
        if (S.UA.ie != 6 || !D.get(el)) return;

        var obj = D.get(el);

        D.css(obj, {'position' : 'absolute', top : topV + 'px'});

        E.on(window, 'scroll resize', function(ev) {
            D.css(obj, 'top', (topV+D.scrollTop())+'px');
        });
    }
    fixIE6('.bar', -181);

    /**浮动条end**/
    /**
     * 商品hover效果start
     */

    
    hover('#main .lists');
    
    /**
     * 商品hover效果end
     */

    /**
     * 旋转木马start
     */
    S.use('switchable,datalazyload', function(S, Switchable){
        var Carousel = Switchable.Carousel;
        var ladies = new Carousel('#ladies', {
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
        })
        var men = new Carousel('#men', {
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
        })
        var shoes = new Carousel('#shoes', {
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
        })
        var bags = new Carousel('#bags', {
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
        })
        var beauty = new Carousel('#beauty', {
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
        })
        var home = new Carousel('#home', {
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
        })
        var baby = new Carousel('#baby', {
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
        })
        var food = new Carousel('#food', {
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
        })
        var digit = new Carousel('#digit', {
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
        })
        
    })
    /**
     * 旋转木马end
     */
    
    /**收藏功能**/
    function addFav(){
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
    }
    
    addFav();
    /**收藏功能**/
});
