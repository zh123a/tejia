<?php
$product_cn = '淘宝画报社区';
$product_en = 'Pix';
?>
<!doctype html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=gbk">
    <title><?= $product_cn ?></title>
    <base target="_blank">
    <link rel="stylesheet" href="index.css">
</head>
<body>
<div id="page">
    <div id="header">
        <h1><?= $product_en ?></h1>
    </div>

    <div id="content">

        <h3>Me - 个人中心 | 我的</h3>
        <ul>
            <li class="doing">
                <a href="page/user_set.php?nav=sets&viewer=self">我的图集</a>
                <a href="design/me/user_set.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="page/user_set_detail.php?nav=sets&viewer=self">我的图集详情</a>
                <a href="design/me/user_set_detail.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="page/user_pic.php?nav=pics&viewer=self">我的图片</a>
                <a href="design/me/user_pic.png">[视觉稿]</a>
            </li>
            <li class="todo">
                <a href="page/user_pic_fav.php?nav=likes&viewer=self">我的喜欢</a>
                <a href="design/me/user_pic_fav.png">[视觉稿]</a>
            </li>
            <li class="todo">
                <a href="page/user_follower.php?nav=followers&viewer=self">粉丝</a>
                <a href="design/me/user_follower.png">[视觉稿]</a>
            </li>
            <li class="todo">
                <a href="page/user_following.php?nav=followings&viewer=self">关注</a>
                <a href="design/me/user_following.png">[视觉稿]</a>
            </li>
        </ul>

        <h3>Ta - 个人中心 | Ta 的</h3>
        <ul>
            <li class="doing">
                <a href="page/user_set.php?nav=sets&viewer=ta">Ta 的图集</a>
                <a href="design/ta/ta_set.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="page/user_set_detail.php?nav=sets&viewer=ta">Ta 的图集详情</a>
                <a href="design/ta/ta_set_detail.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="page/user_pic.php?nav=pics&viewer=ta">Ta 的图片</a>
                <a href="design/ta/ta_pic.png">[视觉稿]</a>
            </li>
            <li class="todo">
                <a href="page/user_pic_fav.php?nav=likes&viewer=ta">Ta 的喜欢</a>
                <a href="design/ta/ta_pic_fav.png">[视觉稿]</a>
            </li>
        </ul>

        <h3>SetManager - 个人中心 | 图集操作</h3>
        <ul>
            <li class="done">
                <a href="page/user_set.php?nav=sets&viewer=self">新建图集</a>
                <a href="design/set-manager/create_set.png">[视觉稿]</a>
            </li>
            <li class="done">
                <a href="page/user_set.php?nav=sets&viewer=self">编辑图集</a>
                <a href="design/set-manager/edit_set.png">[视觉稿]</a>
            </li>
        </ul>

        <h3>PicManager - 个人中心 | 图片操作</h3>
        <ul>
            <li class="todo">
                <a href="page/user_pic.php?nav=pics&viewer=self">编辑图片</a>
                <a href="design/pic-manager/edit_pic.png">[视觉稿]</a>
            </li>
            <li class="todo">
                <a href="page/user_pic.php?nav=pics&viewer=self">把图片收藏到…</a>
                <a href="design/pic-manager/collect_pic.png">[视觉稿]</a>
            </li>
        </ul>

        <h3>Tool - 采集工具和上传</h3>
        <ul>
            <li class="doing">
                <a href="#">浏览器采集动作</a>
                <a href="design/tool/pick.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="#">采集后保存</a>
                <a href="design/tool/pick_save.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="#">上传入口</a>
                <a href="design/upload/upload_entrance.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="#">上传</a>
                <a href="design/upload/upload.png">[视觉稿]</a>
            </li>
        </ul>

        <h3>Help - 帮助 | 采集工具的使用方式</h3>
        <ul>
            <li class="todo">
                <a href="#">各种帮助页面……各种……</a>
            </li>
        </ul>

        <h3>TODO - 未归档</h3>
        <ul>
            <li class="todo">
                <a href="#">首页</a>
                <a href="design/home.png">[视觉稿]</a>
            </li>
            <li class="doing">
                <a href="page/detail.php">图片详情</a>
                <a href="design/detail.png">[视觉稿]</a>
            </li>
            <li class="todo">
                <a href="#">最热图片</a>
                <a href="design/list_pic_hot.png">[视觉稿]</a>
            </li>
        </ul>

        <h3>Pixel-Demo - 模块页面测试</h3>
        <ul>
            <li class="done"><a href="src/pixel/like/demo/">喜欢</a></li>
            <li class="done"><a href="src/pixel/like/demo/index2.html">列表页的喜欢</a></li>
            <li class="done"><a href="src/pixel/share/demo/">分享</a></li>
            <li class="done"><a href="src/pixel/follow/demo/">关注</a></li>
            <li class="doing"><a href="src/pixel/comments/demo/">评论</a></li>
        </ul>

        <h3>Tests - 模块单元测试</h3>
        <ul>
            <li class="done"><a href="src/pixel/example/tests/">示例</a></li>
            <li class="doing"><a href="src/pixel/util/tests/">实用工具</a></li>
            <li class="doing"><a href="src/pixel/pagination/tests/">分页模块</a></li>
        </ul>

        <h3>Note - 辅助说明</h3>
        <ul>
            <li class="done"><a href="page/example.php">示例</a></li>
            <li class="done"><a href="README.html">开发帮助</a></li>
        </ul>

    </div>
    <div id="footer">
        <p>Copyright (c) 2012, fahai@taobao.com. All rights reserved. </p>
    </div>
</div>
</body>
</html>
