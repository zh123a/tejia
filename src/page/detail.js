/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-21
 * Time: ÉÏÎç10:06
 * To change this template use File | Settings | File Templates.
 */
KISSY.use("order/share/, order/clipboard/", function (S, Share, Clipboard) {
    var DOM = S.DOM, Event = S.Event, $ = S.Node.all;
    
    new Share(".order-share");

    var clip = new Clipboard(".J_shareUrl");

    $(".J_clipUrl").on("click", function(ev) {
        DOM.get('.J_shareUrl').select();
        clip.clip($(".J_shareUrl").val(), function() {
            alert("\u590d\u5236\u6210\u529f, \u9a6c\u4e0a\u53d1\u7ed9\u963f\u91cc\u65fa\u65fa\u3001QQ\u3001MSN\u597d\u53cb, \u4eba\u591a\u7ec4\u56e2\u5feb!")
        });
    });

    /*,showCopyInput:function(J){
     var O=L.get(".J_shareUrlInput",J),
     N=L.get(".J_shareUrlCopy",J),
     M=this;
     if(!O||!O){
     return
     }
     var P=M.itemData.itemUrl;
     O.value=P;
     H.on(O,"click",function(Q){
     O.select()
     });
     H.on(N,"click",function(Q){
     Q.halt();
     M.copyLink(P,O)
     })
     }
     ,copyLink:function(J,M){
     M.select();
     Ju.sys.Clipboard.clip(J,function(){
     alert("\u590d\u5236\u6210\u529f, \u9a6c\u4e0a\u53d1\u7ed9\u963f\u91cc\u65fa\u65fa\u3001QQ\u3001MSN\u597d\u53cb, \u4eba\u591a\u7ec4\u56e2\u5feb!")
     })
     }*/
});