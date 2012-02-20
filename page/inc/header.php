<?php
/**
 * Ԥ�� header.
 *
 * @author      ��ľ <fahai@taobao.com>
 * @version     1.0.0 build 12-1-11
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
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/content.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/footer.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/button.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/user-info.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/pic-set.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/list-item.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/pagination.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/dialog.css">
<!--    <link rel="stylesheet" href="http://assets.daily.taobao.net/apps/pix/base/index.css">-->

    <!-- ҳ����ʽ -->
    <!-- һ��ҳ���ڽ�����һ��ҳ�漶��ʽ��������ϸ���ȵػ����� -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/page/<?= $PAGE_NAME ?>.css">
<!--    <link rel="stylesheet" href="http://assets.daily.taobao.net/apps/pix/page/--><?//= $PAGE_NAME ?><!--.css">-->

    <!-- ��ʱʹ��δѹ���汾������� -->
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy.js"></script>
    <script src="http://a.tbcdn.cn/??p/global/1.0/global-min.js,p/et/et.js?t=20120101.js"></script>

    <!-- DPL �ű� -->
    <!-- DPL �ű�������ģ�黯 pix-mod �� config ��Ϣ����������Ҫ�Ķ��ˣ����ֱ������ build �µ� -->
    <script type="text/javascript" src="<?= $SRC_DIR ?>/base/config.js"></script>
    <script type="text/javascript" src="<?= $SRC_DIR ?>/base/header.js"></script>
    <script type="text/javascript" src="<?= $SRC_DIR ?>/base/user-info.js"></script>
<!--    <script type="text/javascript" src="http://assets.daily.taobao.net/apps/pix/base/index.js"></script>-->
</head>
<body>
<?php
include_once(dirname(__FILE__) . '/site-nav.php');
?>
<!-- ����ҳͷ -->
<div id="header">
    <div id="brand">
        <ul class="add-item">
            <li id="local-upload-entry">
                <a href="javascript:void(0);" style="color:#fff;">�����ϴ�</a>
            </li>
        </ul>
    </div>
</div>

