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
	var reason = prompt("�����벻ͨ��ԭ��", "");
	if(reason!=null && reason!=""){
		var url = "itemAudit.do?_output_charset=utf-8&_tb_token_=1ST24Y2l";
		KISSY.IO({
			url : url,
			type : 'post',
			data : {id:id, opType:"fail", reason:reason},
			success : function(json){
				if ( null != json && typeof(json) != 'undefined' && json != '' ){
					if(true == json.result){
						alert("�����ɹ�");
						$("#itemStatus_" + id).empty();
						$("#itemStatus_" + id).append("����δͨ��");
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
	var reason = prompt("��������������ԭ��", "");
	if(reason!=null && reason!=""){
		var url = "addSellerToBlackList.do?_output_charset=utf-8&_tb_token_=1ST24Y2l";
		KISSY.IO({
			url : url,
			type : 'post',
			data : {sellerId:sellerId, reason:reason},
			success : function(json){
				if ( null != json && typeof(json) != 'undefined' && json != '' ){
					if(true == json.result){
						alert("�����ɹ�");
					} else {
						alert("����ʧ�ܣ�" + json.tip);
					}
				}
			}
		});
	}
}