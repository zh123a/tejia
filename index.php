<?php
$product_cn = '�Ա���������';
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

        <h3>Me - �������� | �ҵ�</h3>
        <ul>
            <li class="doing">
                <a href="page/user_set.php?nav=sets&viewer=self">�ҵ�ͼ��</a>
                <a href="design/me/user_set.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="page/user_set_detail.php?nav=sets&viewer=self">�ҵ�ͼ������</a>
                <a href="design/me/user_set_detail.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="page/user_pic.php?nav=pics&viewer=self">�ҵ�ͼƬ</a>
                <a href="design/me/user_pic.png">[�Ӿ���]</a>
            </li>
            <li class="todo">
                <a href="page/user_pic_fav.php?nav=likes&viewer=self">�ҵ�ϲ��</a>
                <a href="design/me/user_pic_fav.png">[�Ӿ���]</a>
            </li>
            <li class="todo">
                <a href="page/user_follower.php?nav=followers&viewer=self">��˿</a>
                <a href="design/me/user_follower.png">[�Ӿ���]</a>
            </li>
            <li class="todo">
                <a href="page/user_following.php?nav=followings&viewer=self">��ע</a>
                <a href="design/me/user_following.png">[�Ӿ���]</a>
            </li>
        </ul>

        <h3>Ta - �������� | Ta ��</h3>
        <ul>
            <li class="doing">
                <a href="page/user_set.php?nav=sets&viewer=ta">Ta ��ͼ��</a>
                <a href="design/ta/ta_set.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="page/user_set_detail.php?nav=sets&viewer=ta">Ta ��ͼ������</a>
                <a href="design/ta/ta_set_detail.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="page/user_pic.php?nav=pics&viewer=ta">Ta ��ͼƬ</a>
                <a href="design/ta/ta_pic.png">[�Ӿ���]</a>
            </li>
            <li class="todo">
                <a href="page/user_pic_fav.php?nav=likes&viewer=ta">Ta ��ϲ��</a>
                <a href="design/ta/ta_pic_fav.png">[�Ӿ���]</a>
            </li>
        </ul>

        <h3>SetManager - �������� | ͼ������</h3>
        <ul>
            <li class="done">
                <a href="page/user_set.php?nav=sets&viewer=self">�½�ͼ��</a>
                <a href="design/set-manager/create_set.png">[�Ӿ���]</a>
            </li>
            <li class="done">
                <a href="page/user_set.php?nav=sets&viewer=self">�༭ͼ��</a>
                <a href="design/set-manager/edit_set.png">[�Ӿ���]</a>
            </li>
        </ul>

        <h3>PicManager - �������� | ͼƬ����</h3>
        <ul>
            <li class="todo">
                <a href="page/user_pic.php?nav=pics&viewer=self">�༭ͼƬ</a>
                <a href="design/pic-manager/edit_pic.png">[�Ӿ���]</a>
            </li>
            <li class="todo">
                <a href="page/user_pic.php?nav=pics&viewer=self">��ͼƬ�ղص���</a>
                <a href="design/pic-manager/collect_pic.png">[�Ӿ���]</a>
            </li>
        </ul>

        <h3>Tool - �ɼ����ߺ��ϴ�</h3>
        <ul>
            <li class="doing">
                <a href="#">������ɼ�����</a>
                <a href="design/tool/pick.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="#">�ɼ��󱣴�</a>
                <a href="design/tool/pick_save.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="#">�ϴ����</a>
                <a href="design/upload/upload_entrance.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="#">�ϴ�</a>
                <a href="design/upload/upload.png">[�Ӿ���]</a>
            </li>
        </ul>

        <h3>Help - ���� | �ɼ����ߵ�ʹ�÷�ʽ</h3>
        <ul>
            <li class="todo">
                <a href="#">���ְ���ҳ�桭�����֡���</a>
            </li>
        </ul>

        <h3>TODO - δ�鵵</h3>
        <ul>
            <li class="todo">
                <a href="#">��ҳ</a>
                <a href="design/home.png">[�Ӿ���]</a>
            </li>
            <li class="doing">
                <a href="page/detail.php">ͼƬ����</a>
                <a href="design/detail.png">[�Ӿ���]</a>
            </li>
            <li class="todo">
                <a href="#">����ͼƬ</a>
                <a href="design/list_pic_hot.png">[�Ӿ���]</a>
            </li>
        </ul>

        <h3>Pixel-Demo - ģ��ҳ�����</h3>
        <ul>
            <li class="done"><a href="src/pixel/like/demo/">ϲ��</a></li>
            <li class="done"><a href="src/pixel/like/demo/index2.html">�б�ҳ��ϲ��</a></li>
            <li class="done"><a href="src/pixel/share/demo/">����</a></li>
            <li class="done"><a href="src/pixel/follow/demo/">��ע</a></li>
            <li class="doing"><a href="src/pixel/comments/demo/">����</a></li>
        </ul>

        <h3>Tests - ģ�鵥Ԫ����</h3>
        <ul>
            <li class="done"><a href="src/pixel/example/tests/">ʾ��</a></li>
            <li class="doing"><a href="src/pixel/util/tests/">ʵ�ù���</a></li>
            <li class="doing"><a href="src/pixel/pagination/tests/">��ҳģ��</a></li>
        </ul>

        <h3>Note - ����˵��</h3>
        <ul>
            <li class="done"><a href="page/example.php">ʾ��</a></li>
            <li class="done"><a href="README.html">��������</a></li>
        </ul>

    </div>
    <div id="footer">
        <p>Copyright (c) 2012, fahai@taobao.com. All rights reserved. </p>
    </div>
</div>
</body>
</html>
