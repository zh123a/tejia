KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event;
    var form = D.get('.submit');
    E.on(form, 'click', function(e){
        var check1 = D.get('#te-guize'),
            check2 = D.get('#te-wei'),
            check1Val = check1.checked,
            check2Val = check2.checked;
        if(!check1Val){
            check1.focus();
            e.halt();
        }else if(!check2Val){
            check2.focus();
            e.halt();
        }else{
            window.location.href = '';
        }
    })
});