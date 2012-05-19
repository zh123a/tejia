KISSY.ready(function(S){
	var D = S.DOM,
		E = S.Event;
	var S_Date = S.Date;
	new S.Calendar('#J_Popup', {
        
        popup:true,
        triggerType:['click'],
        closable:true
        
    }).on('select', function(e) {
        var d = S_Date.format(e.date, 'isoDate');
                     
        D.val('#J_Popup', d);
       

       
    });
});
var $ = KISSY.Node.all;
function auditFail(id) {
	var reason = prompt("请输入不通过原因", "");
	if(reason!=null && reason!=""){
		var url = "itemAudit.do?_output_charset=utf-8&_tb_token_=1ST24Y2l";
		KISSY.IO({
			url : url,
			type : 'post',
			data : {id:id, opType:"fail", reason:reason},
			success : function(json){
				if ( null != json && typeof(json) != 'undefined' && json != '' ){
					if(true == json.result){
						alert("操作成功");
						$("#itemStatus_" + id).empty();
						$("#itemStatus_" + id).append("二审未通过");
						$("#failReason_" + id).empty();
						$("#failReason_" + id).append(reason);
					}else{
						alert(json.tip);
					}
				}
			}
		})
	}
}

function addToBlackList(sellerId) {
	var reason = prompt("请输入加入黑名单原因", "");
	if(reason!=null && reason!=""){
		var url = "addSellerToBlackList.do?_output_charset=utf-8&_tb_token_=1ST24Y2l";
		KISSY.IO({
			url : url,
			type : 'post',
			data : {sellerId:sellerId, reason:reason},
			success : function(json){
				if ( null != json && typeof(json) != 'undefined' && json != '' ){
					if(true == json.result){
						alert("操作成功");
					} else {
						alert("操作失败：" + json.tip);
					}
				}
			}
		});
	}
}