<?php
/**
 * �����ؼ� header.
 *
 * @author      ������ <wb-duanmingming@taobao.com>
 * @version     1.0.0 build 12-3-28
 */
?>
<!doctype html>
<html>
<head>
    <title><?php echo $PAGE_NAME ?></title>
    <meta charset="GBK">
    <!-- ȫ��������ʽ (vm common) -->
    <link rel="stylesheet" href="http://a.tbcdn.cn/??tbsp/tbsp.css,p/global/1.0/global-min.css?t=20120101.css">
    <!-- DPL ��ʽ -->

    <!-- ������õ��� src Ŀ¼�µ���ʽ����Ҫע���ֶ���ϸ���Ȼ��ֺ���ļ������õ� -->
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/base/header.css">
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/base/base.css">
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/base/footer.css">
    
    <!-- ҳ����ʽ -->
    <!-- һ��ҳ���ڽ�����һ��ҳ�漶��ʽ��������ϸ���ȵػ����� -->
    <link rel="stylesheet" href="<?php echo $SRC_DIR ?>/page/<?php echo $PAGE_NAME ?>.css">
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy-min.js,p/global/1.0/global-min.js?t=20120101.js"></script>

</head>
<body>
<div id="site-nav" role="navigation"><div id="site-nav-bd">
	    	<p class="login-info">
		        <script>TB.Global.writeLoginInfo({"memberServer": "http://member1.taobao.com", "outmemServer" : "", "loginServer": "http://login.taobao.com", redirectUrl : "", logoutUrl : ""});</script>
		    </p>
	        <ul class="quick-menu">
	        	<li class="home"><a href="http://www.taobao.com/">�Ա�����ҳ</a></li>
		        <li>
				    <a target="_top" href="http://ju.atpanel.com/?url=http://love.taobao.com?ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=15004294216338fc3746">��Ҫ��</a>
				</li>
				<li class="mytaobao menu-item">
				    <div class="menu">
				        <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343629254662ea41" class="menu-hd" tabindex="0" aria-haspopup="menu-1" aria-label="�Ҽ������˵���tab��������esc�رյ�ǰ�˵�">�ҵ��Ա�<b></b></a>
				        <div class="menu-bd" role="menu" aria-hidden="true" id="menu-1">
				            <div class="menu-bd-panel">
				                <div>
				                    <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://trade.taobao.com/trade/itemlist/list_bought_items.htm?t=20110530&amp;ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343630400184c7a4">���򵽵ı���</a>
				                    <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://trade.taobao.com/trade/itemlist/list_sold_items.htm?t=20110530&amp;ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343631ea0cf9dc02">�������ı���</a>
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
				        <a rel="nofollow" target="_top" href="http://mai.taobao.com/seller_admin.htm" class="menu-hd" tabindex="0" aria-haspopup="menu-2" aria-label="�Ҽ������˵���tab��������esc�رյ�ǰ�˵�">��������<b></b></a>
				        <div class="menu-bd" role="menu" aria-hidden="true" id="menu-2">
				            <div class="menu-bd-panel">
				                <div>
				                    <a rel="nofollow" target="_top" href="http://trade.taobao.com/trade/itemlist/list_sold_items.htm">�������ı���</a>
				                    <a rel="nofollow" target="_top" href="http://sell.taobao.com/auction/goods/goods_on_sale.htm">�����еı���</a>
				                </div>
				            </div>
				        </div>
				    </div>
				</li>
				<li class="cart">
				    <a rel="nofollow" target="_top" href="http://cart.taobao.com/my_cart.htm">
				        <s>
				        </s>���ﳵ
				    </a>
				</li>
				<li class="favorite menu-item">
				    <div class="menu">
				        <a rel="nofollow" target="_top" href="http://ju.atpanel.com/?url=http://favorite.taobao.com/collect_list-1-.htm?scjjc=c1&amp;ad_id=&amp;am_id=&amp;cm_id=&amp;pm_id=1500343628e4c32f5407" style="width:36px;" class="menu-hd" tabindex="0" aria-haspopup="menu-3" aria-label="�Ҽ������˵���tab��������esc�رյ�ǰ�˵�">�ղؼ�<b></b></a>
				        <div style="width:82px;height:57px;line-height:1.7;" class="menu-bd" role="menu" aria-hidden="true" id="menu-3">
				            <div style="padding:8px 10px;" class="menu-bd-panel">
				                <div>
				                    <a rel="nofollow" target="_top" href="http://favorite.taobao.com/collect_list.htm?itemtype=1">�ղصı���</a>
				                    <a rel="nofollow" target="_top" href="http://favorite.taobao.com/collect_list.htm?itemtype=0">�ղصĵ���</a>
				                </div>
				            </div>
				        </div>
				    </div>
				</li>
				<li class="search menu-item">
				    <div class="menu">
				        <span class="menu-hd" tabindex="0" aria-haspopup="menu-4" aria-label="�Ҽ������˵���tab��������esc�رյ�ǰ�˵�">
				            <s>
				            </s>����<b></b></span>
				        <div class="menu-bd" role="menu" aria-hidden="true" id="menu-4">
				            <div class="menu-bd-panel">
				                <form name="topSearch" action="http://s.taobao.com/search?ssid=s0">
				                    <input maxlength="60" name="q">
				                    <button type="submit">
				                        �� ��
				                    </button>
				                    <input type="hidden" value="newsearch" name="shopf">
				                </form>
				            </div>
				        </div>
				    </div>
				</li>
				<li class="services menu-item last">
				    <div class="menu" id="J_Service">
				        <a target="_top" href="http://www.taobao.com/sitemap.php?id=sitemap2" class="menu-hd" tabindex="0" aria-haspopup="J_ServicesContainer" aria-label="�Ҽ������˵���tab��������esc�رյ�ǰ�˵�">��վ����<b></b></a>
				        <div style="width: 202px; height: auto;" class="menu-bd" id="J_ServicesContainer" role="menu" aria-hidden="true"><div class="menu-bd-panel">    <dl>        <dt>            ����        </dt>        <dd>            <a target="_top" href="http://mall.taobao.com/">�̳�</a>            <a target="_top" href="http://3c.taobao.com/">������</a>            <a target="_top" href="http://www.hitao.com/">Hitao</a>            <a target="_top" href="http://global.taobao.com/">ȫ��</a>            <a target="_top" href="http://ershou.taobao.com/">�����</a>            <a target="_top" href="http://gift.taobao.com/">����</a>            <a target="_top" href="http://www.taobao.com/go/chn/sale/index2009.php">����</a>            <a target="_top" href="http://jipiao.trip.taobao.com/index.htm?from=top">��Ʊ</a>            <a target="_top" href="http://caipiao.taobao.com/lottery/index.htm">��Ʊ</a>            <a target="_top" href="http://www.taobao.com/go/chn/channel/new.php">����</a>    <a target="_top" href="http://baoxian.taobao.com/">����</a>        </dd>    </dl>    <dl>        <dt>            <a target="_top" href="http://a.taobao.com/">�Ա��Ż�</a>        </dt>        <dd>        <span>Ƶ��:</span>        <a target="_top" href="http://fushi.taobao.com/">����</a>        <a target="_top" href="http://meirong.taobao.com/">����</a>        <a target="_top" href="http://lady.taobao.com/">Ů��</a>        <a target="_top" href="http://it.taobao.com/">����</a>        <a target="_top" href="http://home.taobao.com/b">�Ҿ�</a>        <a target="_top" style="margin-left:30px;" href="http://baby.taobao.com/">����</a>        <a target="_top" href="http://news.fang.taobao.com/">����</a><br>            <span>��Ʒ:</span>            <a target="_top" href="http://huabao.taobao.com/">����</a>            <a target="_top" href="http://try.taobao.com/">����</a>            <a target="_top" href="http://mm.taobao.com/?id=mm3">��Ů��</a>            <a target="_top" href="http://xin.taobao.com/">��Ʒ����</a><br>            <span>����:</span>            <a target="_top" href="http://bbs.taobao.com">��̳</a>            <a target="_top" href="http://bangpai.taobao.com/">����</a>        </dd>    </dl>    <dl>        <dt>            <a target="_top" href="http://jianghu.taobao.com/">�Խ���</a>        </dt>        <dd>            <a target="_top" href="http://fx.taobao.com/">��������</a>            <a style="margin-right:2px;" target="_top" href="http://ju.taobao.com/">�ۻ���(�Ź�)</a>            <a target="_top" href="http://qz.taobao.com/">�Խ��</a>        </dd>    </dl>    <dl>        <dt>            <a target="_top" href="http://www.taobao.com/m">�ֻ��Ա�</a>            <a target="_top" href="http://123.taobao.com/?zndh">����ַ</a>            <a target="_top" href="http://zhaopin.taobao.com/">�Թ���</a>        </dt>    </dl>    <dl>        <dt>            <a target="_top" href="http://service.taobao.com/support/main/service_center.htm">�������� </a> <a target="_top" href="http://aq.taobao.com/">��ȫ����</a>        </dt>        <dd>            <a target="_top" href="http://trust.taobao.com/">���װ�ȫ</a>            <a target="_top" href="http://support.taobao.com/myservice/rights/right_main.htm">άȨ����</a>        </dd>    </dl>    <dl class="last">        <dt>            <a target="_top" href="http://www.taobao.com/sitemap.php">��������</a>        </dt>    </dl></div></div>
				    </div>
				</li>
	    	</ul>
		</div>
	</div>
	<script>
	    // ������ʼ��ʹ��
	    TB.Global.init({mc:-1});
	</script>

<!-- �ؼ�ҳͷ -->
<div id="t-hd">
    <div id="te-header">
        <h1 id="logo">
            <a target="_top" href="http://tejia.taobao.com/"><img height="31" width="190" src="http://img03.taobaocdn.com/tps/i3/T1jlW_XetcXXXXXXXX-190-31.png" alt="�����ؼ�-�����Ա�ƽ̨-�ﳬ��ֵ ʡǮ��ʡ��"></a>
        </h1>
        <i class="beta"></i>
    </div>
</div>
<div id="nav">
    <div class="nav-box">
        <div class="te-nav">
            <ul class="te-navigation">
                <li id="J_index">
                    <a href="#">��ҳ</a>
                </li>
                <li id="J_advance">
                    <a href="#">����Ԥ��</a>
                </li>
                <li id="J_list" class="last">
                    <a href="#">�����ؼ���Ʒ</a>
                </li>
            </ul>

            <div class="te-menu"><a target="_blank" href="http://www.taobao.com/go/chn/te/index.php">�̼ұ���</a></div>
            <a href="#" class="addfav" id="J_AddFav"><i></i>�����ղ�</a>
            <a href="http://bbs.taobao.com/catalog/11383510.htm" target="_blank" class="luntan"><i></i>�ٷ���̳</a>
        </div>
        
    </div>

</div>
<?php if(($PAGE_NAME == 'index') || ($PAGE_NAME == 'index_new') || ($PAGE_NAME == 'index_v2')){ ?>
    <div class="te-subnav">
        <div class="te-subnav-b">
            <span>
                <a href="#" target="_blank">ʱ��Ůװ</a>
                <i class="subnav-hot"></i>
            </span>
            <span>
                <a href="#" target="_blank">������װ</a>
            </span>
            <span>
                <a href="#" target="_blank">��ЬŮЬ</a>
            </span>
            <span>
                <a href="#" target="_blank">��������</a>
            </span>
            <span>
                <a href="#" target="_blank">ĸӤ��Ʒ</a>
            </span>
            <span>
                <a href="#" target="_blank">�Ҿ�����</a>
            </span>

             <span>
                <a href="#" target="_blank">���ݻ���</a>
            </span>
            <span>
                <a href="#" target="_blank">��ʳ�ز�</a>
            </span>
            <span class="last">
                <a href="#" target="_blank">����ҵ�</a>
            </span>
        </div>
    </div>
    <?php } ?>
