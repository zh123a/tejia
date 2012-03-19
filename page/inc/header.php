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
    <!-- DPL ��ʽ -->

    <!-- ������õ��� src Ŀ¼�µ���ʽ����Ҫע���ֶ���ϸ���Ȼ��ֺ���ļ������õ� -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/header.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/footer.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/common.css">

    <!-- ҳ����ʽ -->
    <!-- һ��ҳ���ڽ�����һ��ҳ�漶��ʽ��������ϸ���ȵػ����� -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/page/<?= $PAGE_NAME ?>.css">
    
    <!-- ��ʱʹ��δѹ���汾������� -->
    <script>window.g_config={appId:10};</script>
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy.js?t=20120101.js"></script>
    <script type="text/javascript" src="http://a.tbcdn.cn/??p/global/1.0/global-min.js,p/et/et.js?t=20120101.js"></script>
    <!-- DPL �ű�������ģ�黯 order-mod �� config ��Ϣ����������Ҫ�Ķ��ˣ����ֱ������ build �µ� -->
    <script type="text/javascript">
        KISSY.config({
            packages: [
                {
                    name: "order",
                    tag: "20120104",
                    charset: "gbk",
                    path: "../src/" // XXX
                    //path: "http://assets.daily.taobao.net/apps/pix/"
                }
            ]
        });
    </script>

</head>
<body>
<?php
include_once(dirname(__FILE__) . '/site-nav.php');
?>
<!-- Ԥ��ҳͷ -->
<div id="header">
    <div class="slogan clearfix">
        <div class="logo">
            <a target="_top" title="�Ա�Ԥ��" href="http:yu.taobao.com"></a>
        </div>
        <div class="description">
            <span>����in���Լ�!</span>
        </div>
    </div>
    <div class="navbar">
        <ul class="nav clearfix">
            <li class="">
                <a href="http://xin.taobao.com/">��ҳ</a>
            </li>
            <li class="divider-vertical"></li>
            <li>
                <a target="_blank" href="http://girl.taobao.com/girl/xin.htm">Ԥ����</a>
            </li>
            <li class="right">
                <a href="#" class="seller-signup">�̼ұ���</a>
            </li>
            <li class="right divider-vertical"></li>
            <li class="right">
                <a href="#" class="buyer-notice">�����֪</a>
            </li>
        </ul>
    </div>
</div>