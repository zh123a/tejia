/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-21
 * Time: 上午10:06
 * To change this template use File | Settings | File Templates.
 */
KISSY.use("order/share/, order/clipboard/", function (S, Share, Clipboard) {
    var DOM = S.DOM, Event = S.Event, $ = S.Node.all;
    S.ready(function() {
        //将url扶植到input的value
        $(".J_shareUrl").val(window.location.href);
        //高亮预定团
        $("li", DOM.get(".main-nav")).removeClass("focus");
        $(".yushou").addClass("focus");

        //添加SNS大分享模块
        new Share(".order-share");
        //添加复制url模块
        var clip = new Clipboard(".J_shareUrl");
        $(".J_clipUrl").on("click", function(ev) {
            DOM.get('.J_shareUrl').select();
            clip.clip($(".J_shareUrl").val(), function() {
                alert("复制成功, 马上发给阿里旺旺、QQ、MSN好友, 人多组团快!")
            });
        });
        
        //var itemId = $('.orders').attr("data-id");
        //var b = DOM.get(".orders", "#content");
        //console.log(b);
        //console.log(itemId);
        S.io({
            dataType:"jsonp",
            url:"http://tbskip.taobao.com/json/auction_saled_amount.do?keys="+$('.orders').attr("data-id"),
            jsonp:"callback",
            success:function(e) {
                if(e.auctions[0].amount){
                    $('.orders').html("已有"+e.auctions[0].amount+"人预定");
                }
            }
        })
    });
});
KISSY.ready(function(a) {
    var d = a.DOM,b = d.get(".orders", "#content");//c = [];

    //d.attr(b, "data-id");
    
    //a.io({dataType:"jsonp",url:"http://xin.taobao.com/ajax/query_quantity.htm",data:{ids:c},jsonp:"callback",success:function(e) {
    
});