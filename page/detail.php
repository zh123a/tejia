<?php
/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-20
 * Time: ����2:57
 * To change this template use File | Settings | File Templates.
 */
$PAGE_NAME = "detail";
include_once(dirname(__FILE__) . '/inc/config.php');
include_once(dirname(__FILE__) . '/inc/header.php');
?>

<!-- �������� -->
<div id="content">
    <?php include_once(dirname(__FILE__) . '/inc/banner.php')?>
    <div class="order-item">
        <div class="info-box clearfix">
            <div class="pic-box">
               <a target="_blank" href="#">
                   <img src="<?= $SRC_DIR ?>/assets/detail.png" alt="">
               </a>
            </div>
            <div class="meta">
                <img src="<?= $SRC_DIR ?>/assets/intro.png" alt=""/>
                <div class="actualPrice"><span>&yen;</span>136.00</div>
                <div class="listPrice">ԭ�ۣ�<del>266.00</del><span>4.8��</span></div>
                <div class="orders">2688���Ѿ�Ԥ��</div>
                <div class="orderNow"><a class="" href="#">����Ԥ��</a></div>
                <div class="share"><input value="http://dadada" class="J_shareUrl"/><span class="J_clipUrl">����</span><a href="#" onclick="shareItem(this); return false;" data-shareparam='{"title":"�����","linkurl":"http://","comment":"Ĭ����������","itempic":"http://img03.taobaocdn.com/bao/uploaded/i3/T1TtdVXe4dXXcEoywU_015201.jpg_120x120.jpg","props":{"description":"�����"}}' class="order-share">���������</a></div>
                <div><a>��������</a><i>*****</i></div>
            </div>
        </div>
<script src="http://a.tbcdn.cn/apps/snstaoshare/widget/ts/ts-min.js"></script>

        <div class="info-detail">

        </div>
    </div>
</div>
<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>