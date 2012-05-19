/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-20
 * Time: 下午4:23
 * To change this template use File | Settings | File Templates.
 */
KISSY.ready(function(S){
    var D = S.DOM, E = S.Event, $ = S.Node.all;
    S.use("te/catalog-bar/", function(S, catalogBar) {
        new catalogBar(".catalog");
    });
});
