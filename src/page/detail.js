/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-21
 * Time: ����10:06
 * To change this template use File | Settings | File Templates.
 */
KISSY.use("order/share/, order/clipboard/", function (S, Share, Clipboard) {
    var DOM = S.DOM, Event = S.Event, $ = S.Node.all;
    S.ready(function() {
        //��url��ֲ��input��value
        $(".J_shareUrl").val(window.location.href);
        //����Ԥ����
        $("li", DOM.get(".main-nav")).removeClass("focus");
        $(".yushou").addClass("focus");

        //���SNS�����ģ��
        new Share(".order-share");
        //��Ӹ���urlģ��
        var clip = new Clipboard(".J_shareUrl");
        $(".J_clipUrl").on("click", function(ev) {
            DOM.get('.J_shareUrl').select();
            clip.clip($(".J_shareUrl").val(), function() {
                alert("���Ƴɹ�, ���Ϸ�������������QQ��MSN����, �˶����ſ�!")
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
                    $('.orders').html("����"+e.auctions[0].amount+"��Ԥ��");
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