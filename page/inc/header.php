<?php
/**
 * 天天特价 header.
 *
 * @author      段明明 <wb-duanmingming@taobao.com>
 * @version     1.0.0 build 12-3-28
 */
?>
<!doctype html>
<html>
<head>
    <title><?php echo $PAGE_NAME ?></title>
    <meta charset="GBK">
    <!-- 全网公共样式 (vm common) -->
    <link rel="stylesheet" href="http://a.tbcdn.cn/??tbsp/tbsp.css,p/global/1.0/global-min.css?t=20120101.css">
    <!-- DPL 样式 -->

    <!-- 如果引用的是 src 目录下的样式，则要注意手动把细粒度划分后的文件都引用到 -->
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/base/header.css">
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/base/base.css">
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/base/footer.css">
    
    <!-- 页面样式 -->
    <!-- 一个页面内仅引用一个页面级样式，不用再细粒度地划分了 -->
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/page/<?php echo $PAGE_NAME ?>.css">
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy-min.js,p/global/1.0/global-min.js?t=20120101.js"></script>

</head>
<body>
<div id="site-nav" role="navigation"><div id="site-nav-bd">
	    	<p class="login-info">
		        <script>TB.Global.writeLoginInfo({"memberServer": "http://member1.taobao.com", "outmemServer" : "", "loginServer": "http://login.taobao.com", redirectUrl : "", logoutUrl : ""});</script>
		    </p>
	        <ul class="quick-menu">
	        	<li class="home"><a href="http://www.taobao.com/">淘宝网首页</a></li>
		        <li>
				    <a target="_top" href="http://ju.atpanel.com/?url=http://love.taobao.com?ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=15004294216338fc3746">我要买</a>
				</li>
				<li class="mytaobao menu-item">
				    <div class="menu">
				        <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343629254662ea41" class="menu-hd" tabindex="0" aria-haspopup="menu-1" aria-label="右键弹出菜单，tab键导航，esc关闭当前菜单">我的淘宝<b></b></a>
				        <div class="menu-bd" role="menu" aria-hidden="true" id="menu-1">
				            <div class="menu-bd-panel">
				                <div>
				                    <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://trade.taobao.com/trade/itemlist/list_bought_items.htm?t=20110530&amp;ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343630400184c7a4">已买到的宝贝</a>
				                    <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://trade.taobao.com/trade/itemlist/list_sold_items.htm?t=20110530&amp;ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343631ea0cf9dc02">已卖出的宝贝</a>
				                </div>
				            </div>
				        </div>
				    </div>
				</li>
				<style>
				    #site-nav .seller-center .menu-hd{ width:48px;}
				    #site-nav .seller-center .menu-bd{ width: 94px; line-height:1.7;}
				    #site-nav .seller-center .menu-bd-panel{padding: 8px 10px;}
				</style>
				<li class="seller-center menu-item">
				    <div class="menu">
				        <a rel="nofollow" target="_top" href="http://mai.taobao.com/seller_admin.htm" class="menu-hd" tabindex="0" aria-haspopup="menu-2" aria-label="右键弹出菜单，tab键导航，esc关闭当前菜单">卖家中心<b></b></a>
				        <div class="menu-bd" role="menu" aria-hidden="true" id="menu-2">
				            <div class="menu-bd-panel">
				                <div>
				                    <a rel="nofollow" target="_top" href="http://trade.taobao.com/trade/itemlist/list_sold_items.htm">已卖出的宝贝</a>
				                    <a rel="nofollow" target="_top" href="http://sell.taobao.com/auction/goods/goods_on_sale.htm">出售中的宝贝</a>
				                </div>
				            </div>
				        </div>
				    </div>
				</li>
				<li class="cart">
				    <a rel="nofollow" target="_top" href="http://cart.taobao.com/my_cart.htm">
				        <s>
				        </s>购物车
				    </a>
				</li>
				<li class="favorite menu-item">
				    <div class="menu">
				        <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://favorite.taobao.com/collect_list-1-.htm?scjjc=c1&amp;ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343628e4c32f5407" style="width:36px;" class="menu-hd" tabindex="0" aria-haspopup="menu-3" aria-label="右键弹出菜单，tab键导航，esc关闭当前菜单">收藏夹<b></b></a>
				        <div style="width:82px;height:57px;line-height:1.7;" class="menu-bd" role="menu" aria-hidden="true" id="menu-3">
				            <div style="padding:8px 10px;" class="menu-bd-panel">
				                <div>
				                    <a rel="nofollow" target="_top" href="http://favorite.taobao.com/collect_list.htm?itemtype=1">收藏的宝贝</a>
				                    <a rel="nofollow" target="_top" href="http://favorite.taobao.com/collect_list.htm?itemtype=0">收藏的店铺</a>
				                </div>
				            </div>
				        </div>
				    </div>
				</li>
				<li class="search menu-item">
				    <div class="menu">
				        <span class="menu-hd" tabindex="0" aria-haspopup="menu-4" aria-label="右键弹出菜单，tab键导航，esc关闭当前菜单">
				            <s>
				            </s>搜索<b></b></span>
				        <div class="menu-bd" role="menu" aria-hidden="true" id="menu-4">
				            <div class="menu-bd-panel">
				                <form name="topSearch" action="http://s.taobao.com/search?ssid=s0">
				                    <input maxlength="60" name="q">
				                    <button type="submit">
				                        搜 索
				                    </button>
				                    <input type="hidden" value="newsearch" name="shopf">
				                </form>
				            </div>
				        </div>
				    </div>
				</li>
				<li class="services menu-item last">
				    <div class="menu" id="J_Service">
				        <a target="_top" href="http://www.taobao.com/sitemap.php?id=sitemap2" class="menu-hd" tabindex="0" aria-haspopup="J_ServicesContainer" aria-label="右键弹出菜单，tab键导航，esc关闭当前菜单">网站导航<b></b></a>
				        <div style="width: 202px; height: auto;" class="menu-bd" id="J_ServicesContainer" role="menu" aria-hidden="true"><div class="menu-bd-panel">    <dl>        <dt>            购物        </dt>        <dd>            <a target="_top" href="http://mall.taobao.com/">商城</a>            <a target="_top" href="http://3c.taobao.com/">电器城</a>            <a target="_top" href="http://www.hitao.com/">Hitao</a>            <a target="_top" href="http://global.taobao.com/">全球购</a>            <a target="_top" href="http://ershou.taobao.com/">跳蚤街</a>            <a target="_top" href="http://gift.taobao.com/">礼物</a>            <a target="_top" href="http://www.taobao.com/go/chn/sale/index2009.php">促销</a>            <a target="_top" href="http://jipiao.trip.taobao.com/index.htm?from=top">机票</a>            <a target="_top" href="http://caipiao.taobao.com/lottery/index.htm">彩票</a>            <a target="_top" href="http://www.taobao.com/go/chn/channel/new.php">创意</a>    <a target="_top" href="http://baoxian.taobao.com/">保险</a>        </dd>    </dl>    <dl>        <dt>            <a target="_top" href="http://a.taobao.com/">淘宝门户</a>        </dt>        <dd>        <span>频道:</span>        <a target="_top" href="http://fushi.taobao.com/">服饰</a>        <a target="_top" href="http://meirong.taobao.com/">美容</a>        <a target="_top" href="http://lady.taobao.com/">女人</a>        <a target="_top" href="http://it.taobao.com/">数码</a>        <a target="_top" href="http://home.taobao.com/b">家居</a>        <a target="_top" style="margin-left:30px;" href="http://baby.taobao.com/">亲子</a>        <a target="_top" href="http://news.fang.taobao.com/">房产</a><br>            <span>产品:</span>            <a target="_top" href="http://huabao.taobao.com/">画报</a>            <a target="_top" href="http://try.taobao.com/">试用</a>            <a target="_top" href="http://mm.taobao.com/?id=mm3">淘女郎</a>            <a target="_top" href="http://xin.taobao.com/">新品中心</a><br>            <span>社区:</span>            <a target="_top" href="http://bbs.taobao.com">论坛</a>            <a target="_top" href="http://bangpai.taobao.com/">帮派</a>        </dd>    </dl>    <dl>        <dt>            <a target="_top" href="http://jianghu.taobao.com/">淘江湖</a>        </dt>        <dd>            <a target="_top" href="http://fx.taobao.com/">宝贝分享</a>            <a style="margin-right:2px;" target="_top" href="http://ju.taobao.com/">聚划算(团购)</a>            <a target="_top" href="http://qz.taobao.com/">淘金币</a>        </dd>    </dl>    <dl>        <dt>            <a target="_top" href="http://www.taobao.com/m">手机淘宝</a>            <a target="_top" href="http://123.taobao.com/?zndh">淘网址</a>            <a target="_top" href="http://zhaopin.taobao.com/">淘工作</a>        </dt>    </dl>    <dl>        <dt>            <a target="_top" href="http://service.taobao.com/support/main/service_center.htm">服务中心 </a> <a target="_top" href="http://aq.taobao.com/">安全中心</a>        </dt>        <dd>            <a target="_top" href="http://trust.taobao.com/">交易安全</a>            <a target="_top" href="http://support.taobao.com/myservice/rights/right_main.htm">维权中心</a>        </dd>    </dl>    <dl class="last">        <dt>            <a target="_top" href="http://www.taobao.com/sitemap.php">更多内容</a>        </dt>    </dl></div></div>
				    </div>
				</li>
	    	</ul>
		</div>
	</div>
	<script>
	    // 吊顶初始化使用
	    TB.Global.init({mc:-1});
	</script>

<!-- 特价页头 -->
<div id="t-hd">
    <div id="te-header">
        <h1 id="logo">
            <a target="_top" href="http://tejia.taobao.com/"><img height="31" width="190" src="http://img03.taobaocdn.com/tps/i3/T1jlW_XetcXXXXXXXX-190-31.png" alt="天天特价-来自淘宝平台-物超所值 省钱更省心"></a>
        </h1>
        <i class="beta"></i>
    </div>
</div>
<div id="nav">
    <div class="nav-box">
        <div class="te-nav">
            <ul class="te-navigation">
                <li id="J_index">
                    <a href="#">首页</a>
                </li>
                <li id="J_advance">
                    <a href="#">明日预告</a>
                </li>
                <li id="J_list" class="last">
                    <a href="#">更多特价商品</a>
                </li>
            </ul>

            <div class="te-menu"><a target="_blank" href="http://www.taobao.com/go/chn/te/index.php">商家报名</a></div>
            <a href="#" class="addfav" id="J_AddFav"><i></i>加入收藏</a>
            <a href="http://bbs.taobao.com/catalog/11383510.htm" target="_blank" class="luntan"><i></i>官方论坛</a>
        </div>
        
    </div>

</div>
<?php if(($PAGE_NAME == 'index') || ($PAGE_NAME == 'index_new') || ($PAGE_NAME == 'index_v2')){ ?>
    <div class="te-subnav">
        <div class="te-subnav-b">
            <span>
                <a href="#" target="_blank">时尚女装</a>
                <i class="subnav-hot"></i>
            </span>
            <span>
                <a href="#" target="_blank">流行男装</a>
            </span>
            <span>
                <a href="#" target="_blank">男鞋女鞋</a>
            </span>
            <span>
                <a href="#" target="_blank">包包配饰</a>
            </span>
            <span>
                <a href="#" target="_blank">母婴用品</a>
            </span>
            <span>
                <a href="#" target="_blank">家居生活</a>
            </span>

             <span>
                <a href="#" target="_blank">美容护肤</a>
            </span>
            <span>
                <a href="#" target="_blank">美食特产</a>
            </span>
            <span class="last">
                <a href="#" target="_blank">数码家电</a>
            </span>
        </div>
    </div>
    <?php } ?>
