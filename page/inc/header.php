<?php
/**
 * 预售 header.
 *
 * @author      特木 <temu.psc@taobao.com>
 * @version     1.0.0 build 12-2-20
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
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/footer.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/common.css">

    <!-- 页面样式 -->
    <!-- 一个页面内仅引用一个页面级样式，不用再细粒度地划分了 -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/page/<?= $PAGE_NAME ?>.css">
    
    <!-- 暂时使用未压缩版本方便调试 -->
    <script>window.g_config={appId:10};</script>
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy.js?t=20120101.js"></script>
    <script type="text/javascript" src="http://a.tbcdn.cn/??p/global/1.0/global-min.js,p/et/et.js?t=20120101.js"></script>
    <!-- DPL 脚本定义了模块化 order-mod 的 config 信息，基本不需要改动了，因此直接引用 build 下的 -->
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
<!-- 预售页头 -->
<div id="header">
    <div class="slogan clearfix">
        <div class="logo">
            <a target="_top" title="淘宝预售" href="http:yu.taobao.com"></a>
        </div>
        <div class="description">
            <span>做最in的自己!</span>
        </div>
    </div>
    <div class="navbar">
        <ul class="nav clearfix">
            <li class="">
                <a href="http://xin.taobao.com/">首页</a>
            </li>
            <li class="divider-vertical"></li>
            <li>
                <a target="_blank" href="http://girl.taobao.com/girl/xin.htm">预定团</a>
            </li>
            <li class="right">
                <a href="#" class="seller-signup">商家报名</a>
            </li>
            <li class="right divider-vertical"></li>
            <li class="right">
                <a href="#" class="buyer-notice">买家须知</a>
            </li>
        </ul>
    </div>
</div>