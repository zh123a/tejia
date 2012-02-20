<?php
/**
 * 预售 header.
 *
 * @author      特木 <fahai@taobao.com>
 * @version     1.0.0 build 12-1-11
 */
?>

<!doctype html>
<html>
<head>
    <title><?= $PAGE_NAME ?></title>
    <meta http-equiv="content-type" content="text/html; charset=gbk">
    <!-- 全网公共样式 (vm common) -->
    <link rel="stylesheet" href="http://a.tbcdn.cn/??tbsp/tbsp.css,p/global/1.0/global-min.css?t=20120101.css">

    <!-- DPL 样式 -->
    <!-- 如果引用的是 src 目录下的样式，则要注意手动把细粒度划分后的文件都引用到 -->
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

    <!-- 页面样式 -->
    <!-- 一个页面内仅引用一个页面级样式，不用再细粒度地划分了 -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/page/<?= $PAGE_NAME ?>.css">
<!--    <link rel="stylesheet" href="http://assets.daily.taobao.net/apps/pix/page/--><?//= $PAGE_NAME ?><!--.css">-->

    <!-- 暂时使用未压缩版本方便调试 -->
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy.js"></script>
    <script src="http://a.tbcdn.cn/??p/global/1.0/global-min.js,p/et/et.js?t=20120101.js"></script>

    <!-- DPL 脚本 -->
    <!-- DPL 脚本定义了模块化 pix-mod 的 config 信息，基本不需要改动了，因此直接引用 build 下的 -->
    <script type="text/javascript" src="<?= $SRC_DIR ?>/base/config.js"></script>
    <script type="text/javascript" src="<?= $SRC_DIR ?>/base/header.js"></script>
    <script type="text/javascript" src="<?= $SRC_DIR ?>/base/user-info.js"></script>
<!--    <script type="text/javascript" src="http://assets.daily.taobao.net/apps/pix/base/index.js"></script>-->
</head>
<body>
<?php
include_once(dirname(__FILE__) . '/site-nav.php');
?>
<!-- 画报页头 -->
<div id="header">
    <div id="brand">
        <ul class="add-item">
            <li id="local-upload-entry">
                <a href="javascript:void(0);" style="color:#fff;">本地上传</a>
            </li>
        </ul>
    </div>
</div>

