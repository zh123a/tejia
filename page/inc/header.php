<?php
/**
 * Ԥ�� header.
 *
 * @author      ��ľ <temu.psc@taobao.com>
 * @version     1.0.0 build 12-2-20
 */
?>
<!doctype html>
<html>
<head>
    <title><?= $PAGE_NAME ?></title>
    <meta http-equiv="content-type" content="text/html; charset=gbk">
    <!-- ȫ��������ʽ (vm common) -->
    <link rel="stylesheet" href="http://a.tbcdn.cn/??tbsp/tbsp.css,p/global/1.0/global-min.css?t=20120101.css">

    <!--<link rel="stylesheet" href="http://a.tbcdn.cn/app/taoinfo/aitao/taoinfo_header_2010.css?t=20120110.css">-->
    

    <!-- DPL ��ʽ -->
    <!-- ������õ��� src Ŀ¼�µ���ʽ����Ҫע���ֶ���ϸ���Ȼ��ֺ���ļ������õ� -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/header.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/footer.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/common.css">

    <!-- ҳ����ʽ -->
    <!-- һ��ҳ���ڽ�����һ��ҳ�漶��ʽ��������ϸ���ȵػ����� -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/page/<?= $PAGE_NAME ?>.css">
    
    <!-- ��ʱʹ��δѹ���汾������� -->
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy.js"></script>
    <script src="http://a.tbcdn.cn/??p/global/1.0/global-min.js,p/et/et.js?t=20120101.js"></script>
</head>
<body>
<?php
include_once(dirname(__FILE__) . '/site-nav.php');
?>
<!-- Ԥ��ҳͷ -->
<div id="header">
    <div class="wrapper">
        <h1 id="logo">
            <a title="�й��������Ż�" target="_top" href="http://www.taobao.com"></a>
            <a target="_top" class="sub-logo" href="http://xin.taobao.com"></a>
        </h1>
        <div class="search">
            <form target="_blank" method="get" action="http://s.taobao.com/search">
                <label id="J_searchicon" class="key" for="q"></label>
                <input class="search-key" autocomplete="off" name="q" id="q"/>
                <button class="search-button" type="submit"></button>
            </form>
        </div>
    </div>
    <div id="nav">
        <ul class="main-nav clearfix">
            <li class="focus">
                <a href="http://xin.taobao.com/">��Ʒ��ҳ</a>
            </li>
            <li>
                <a href="http://xin.taobao.com/legend.htm">������Ʒ<em class="num">(7)</em></a>
            </li>
            <li class="last">
                <a target="_blank" href="http://girl.taobao.com/girl/xin.htm">Ůװ��Ʒ</a><div class="hot-icon2"></div>
            </li>
            <li class="right" id="J_person">
                <a href="http://xin.taobao.com/user/user_center.htm" class="gerenzhongxin">��������</a>
                <ul class="menulist hidden">
                    <li><a href="http://xin.taobao.com/user/user_center.htm">���ʷ</a></li>
                    <li><a href="http://xin.taobao.com/user/user_subscribe.htm">��������</a></li>
                    <li><a href="http://xin.taobao.com/user/invite_record.htm">�����¼</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>