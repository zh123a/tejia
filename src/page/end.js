/**
 * Author: fatedm
 * Date: 12-5-15
 * Time: ����11:03
 * Email: fatedm@hotmail.com
 */
KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event;
    var Helper = {

     /**�ղع���**/
        addFav : function(){
            var url = window.location.href,
                title = document.title;
            if(D.get('#J_AddFav')){
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
            }
        }
    }
    Helper.addFav();
})
KISSY.use('node,overlay',function(S,Node,O){
    Node.all('.reasons').each(function(t){
        var pop = new O.Popup({
            elStyle : {
                border : '2px solid gray',
                padding : '5px',
                width : '110px',
                background : '#fff'
            },
            trigger : t,
            triggerType : 'mouse',
            content : t.next('.state-nopass-reason').html(),
            align : {
                node : t,
                points : ['bl','tl']
            }
        })
    })
})