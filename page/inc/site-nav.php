<?php
/**
 * Site-nav bar.
 *
 * @author      特木 <temu.psc@taobao.com>
 * @version     1.0.0 build 12-2-20
 */
?>

<!-- 全网吊顶 (vm common) -->
<div id="site-nav">
    <div id="site-nav-bd">
        <style>
            #site-nav .seller-center .menu-hd {
                width: 48px;
            }

            #site-nav .seller-center .menu-bd {
                width: 94px;
                line-height: 1.7;
            }

            #site-nav .seller-center .menu-bd-panel {
                padding: 8px 10px;
            }
        </style>
        <p class="login-info">
            <script>TB.Global.writeLoginInfo();</script>
        </p>
        <ul class="quick-menu">
            <li class="home"><a href="http://www.taobao.com/">淘宝网首页</a></li>
            <li class="menu-item">
                <div class="menu">
                    <a class="menu-hd" style="width:36px;"
                       href="http://ju.atpanel.com/?url=http://love.taobao.com?ad_id=&am_id=&cm_id=&pm_id=15004294216338fc3746"
                       target="_top" rel="nofollow">我要买<b></b></a>

                    <div class="menu-bd" style="width:82px;height:75px;line-height:1.7;">
                        <div class="menu-bd-panel" style="padding:8px 10px;">

                            <div>
                                <a href="http://ju.atpanel.com/?url=http://list.taobao.com/browse/cat-0.htm?ad_id=&am_id=&cm_id=&pm_id=15006048193468e03af6"
                                   target="_top" rel="nofollow">商品分类</a>
                                <a href="http://ju.atpanel.com/?url=http://love.taobao.com/guang/index.htm?ad_id=&am_id=&cm_id=&pm_id=1500604820c8c4721fc4"
                                   target="_top" rel="nofollow">大家正在买</a>
                                <a href="http://ju.atpanel.com/?url=http://love.taobao.com/toukui/index.htm?ad_id=&am_id=&cm_id=&pm_id=150060482114b4eabfba"
                                   target="_top" rel="nofollow">品味连连看</a>
                            </div>
                        </div>
                    </div>

                </div>
            </li>

            <li class="mytaobao menu-item">
                <div class="menu">
                    <a class="menu-hd" href="http://i.taobao.com/my_taobao.htm" target="_top" rel="nofollow">我的淘宝<b></b></a>

                    <div class="menu-bd" style="height: 75px;">
                        <div class="menu-bd-panel" id="myTaobaoPanel">
                            <div>
                                <a href="http://trade.taobao.com/trade/itemlist/list_bought_items.htm" target="_top"
                                   rel="nofollow">已买到的宝贝</a>

                            </div>
                            <div>
                                <a href="http://jianghu.taobao.com/admin/invite/invite_friend.htm" target="_top"
                                   rel="nofollow">我的好友</a>
                            </div>
                            <div>
                                <a href="http://i.taobao.com/my_taobao.htm" target="_top" rel="nofollow">最新动态</a>
                            </div>

                        </div>
                    </div>
                </div>
            </li>

            <li class="seller-center menu-item">
                <div class="menu">
                    <a class="menu-hd" href="http://mai.taobao.com/seller_admin.htm" target="_top"
                       rel="nofollow">卖家中心<b></b></a>

                    <div class="menu-bd">

                        <div class="menu-bd-panel">
                            <div>
                                <a href="http://trade.taobao.com/trade/itemlist/list_sold_items.htm" target="_top"
                                   rel="nofollow">已卖出的宝贝</a>
                                <a href="http://sell.taobao.com/auction/goods/goods_on_sale.htm" target="_top"
                                   rel="nofollow">出售中的宝贝</a>
                            </div>
                        </div>
                    </div>
                </div>

            </li>
            <li class="service">
                <a href="http://service.taobao.com/support/main/service_center.htm" target="_top"
                   rel="nofollow">服务中心</a>
            </li>
            <li class="cart">
                <a href="http://cart.taobao.com/my_cart.htm" target="_top" rel="nofollow">
                    <s>
                    </s>购物车
                </a>
            </li>
            <li class="favorite menu-item">
                <div class="menu">

                    <a class="menu-hd" style="width:36px;"
                       href="http://favorite.taobao.com/collect_list-1-.htm?scjjc=c1" target="_top"
                       rel="nofollow">收藏夹<b></b></a>

                    <div class="menu-bd" style="width:82px;height:57px;line-height:1.7;">
                        <div class="menu-bd-panel" style="padding:8px 10px;">
                            <div>
                                <a href="http://favorite.taobao.com/collect_list.htm?itemtype=1" target="_top"
                                   rel="nofollow">收藏的宝贝</a>
                                <a href="http://favorite.taobao.com/collect_list.htm?itemtype=0" target="_top"
                                   rel="nofollow">收藏的店铺</a>
                            </div>

                        </div>
                    </div>
                </div>
            </li>

            <li class="services menu-item last">
                <div id="J_Service" class="menu">
                    <a class="menu-hd" href="http://www.taobao.com/sitemap.php?id=sitemap2"
                       target="_top">网站导航<b></b></a>

                    <div id="J_ServicesContainer" class="menu-bd"
                         style="width:202px;width:210px\9;_width:202px;height:337px;"></div>
                </div>

            </li>
        </ul>
    </div>
</div>
<script>TB.Global.init();</script>