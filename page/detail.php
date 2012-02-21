<?php
/**
 * Created by JetBrains PhpStorm.
 * User: temu.psc
 * Date: 12-2-20
 * Time: 下午2:57
 * To change this template use File | Settings | File Templates.
 */
$PAGE_NAME = "detail";
include_once(dirname(__FILE__) . '/inc/config.php');
include_once(dirname(__FILE__) . '/inc/header.php');
?>

<!-- 内容主体 -->
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
                <div class="listPrice">原价：<del>266.00</del><span>4.8折</span></div>
                <div class="orders">2688人已经预定</div>
                <div class="orderNow"><a class="" href="#">立即预定</a></div>
                <div class="share"><input value="http://dadada" class="J_shareUrl"/><span class="J_clipUrl">复制</span><a href="#" onclick="shareItem(this); return false;" data-shareparam='{"title":"活动标题","linkurl":"http://","comment":"默认评论内容","itempic":"http://img03.taobaocdn.com/bao/uploaded/i3/T1TtdVXe4dXXcEoywU_015201.jpg_120x120.jpg","props":{"description":"活动描述"}}' class="order-share">分享给好友</a></div>
                <div><a>韩都衣舍</a><i>*****</i></div>
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