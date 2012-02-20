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

    <!--<link rel="stylesheet" href="http://a.tbcdn.cn/app/taoinfo/aitao/taoinfo_header_2010.css?t=20120110.css">-->
    

    <!-- DPL 样式 -->
    <!-- 如果引用的是 src 目录下的样式，则要注意手动把细粒度划分后的文件都引用到 -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/header.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/footer.css">
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/base/common.css">

    <!-- 页面样式 -->
    <!-- 一个页面内仅引用一个页面级样式，不用再细粒度地划分了 -->
    <link rel="stylesheet" href="<?= $SRC_DIR ?>/page/<?= $PAGE_NAME ?>.css">
    
    <!-- 暂时使用未压缩版本方便调试 -->
    <script type="text/javascript" charset="utf-8" src="http://a.tbcdn.cn/??s/kissy/1.2.0/kissy.js"></script>
    <script src="http://a.tbcdn.cn/??p/global/1.0/global-min.js,p/et/et.js?t=20120101.js"></script>
</head>
<body>
<?php
include_once(dirname(__FILE__) . '/site-nav.php');
?>
<!-- 预售页头 -->
<div id="header">
    <div class="wrapper">
        <h1 id="logo">
            <a title="中国消费者门户" target="_top" href="http://www.taobao.com"></a>
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
                <a href="http://xin.taobao.com/">新品首页</a>
            </li>
            <li>
                <a href="http://xin.taobao.com/legend.htm">更多新品<em class="num">(7)</em></a>
            </li>
            <li class="last">
                <a target="_blank" href="http://girl.taobao.com/girl/xin.htm">女装新品</a><div class="hot-icon2"></div>
            </li>
            <li class="right" id="J_person">
                <a href="http://xin.taobao.com/user/user_center.htm" class="gerenzhongxin">个人中心</a>
                <ul class="menulist hidden">
                    <li><a href="http://xin.taobao.com/user/user_center.htm">活动历史</a></li>
                    <li><a href="http://xin.taobao.com/user/user_subscribe.htm">订阅设置</a></li>
                    <li><a href="http://xin.taobao.com/user/invite_record.htm">邀请记录</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>