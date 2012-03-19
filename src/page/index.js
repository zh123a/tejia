/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-20
 * Time: 下午4:23
 * To change this template use File | Settings | File Templates.
 */
KISSY.ready(function(S){
    var DOM = S.DOM, $ = S.Node.all;
    //将url扶植到input的value
    $(".J_shareUrl").val(window.location.href);
    //高亮预定团
    $("li", DOM.get(".main-nav")).removeClass("focus");
    $(".yushou").addClass("focus");
/*
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
*/
});