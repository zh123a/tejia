/**
 * Author: fatedm
 * Date: 12-5-15
 * Time: 上午11:03
 * Email: fatedm@hotmail.com
 */
KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event,
        $ = S.Node.all;
    if(D.get('.del-btn')){
        var winW = D.viewportWidth(),
            node = D.get('.del-btn');
        $('.del-dialog').css({top : '400px', left :(winW-292)/2 + 'px'});
        if(node && !D.attr(node, 'data-custom')){
            D.css(node, 'cursor', 'default');
        }
        E.on(document, 'click', function(e){

            var tar = e.target,
                h = D.docHeight();

            if(D.hasClass(tar, 'del-btn') && D.attr(tar, 'data-custom')){
                e.preventDefault();
                D.css('#dialog', {display: 'block', height: h + 'px'});

            }else if(D.hasClass(tar, 'yes-btn')){
                var id = D.attr(node, 'data-custom');
                S.IO.post('/seller/dropSignUp.do',{id : id}, function(data){
                    if(data.result == true){
                        alert('撤销报名成功！');
                    }else{
                        alert(data.tip);
                    }
                });
                window.location.reload();

            }else if(D.hasClass(tar, 'no-btn') || D.hasClass(tar, 'dialog-close')){
                    D.css('#dialog', 'display', 'none')
            }

        })
       
    }
    
    var Helper = {

     /**收藏功能**/
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
                        alert( "加入收藏失败，请使用Ctrl+D进行添加" );
                    }
                    e.halt();
                })
            }
        }
    }
    Helper.addFav();
})