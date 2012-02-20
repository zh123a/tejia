<?php
/*$viewer = $_GET['viewer'];
if ($viewer == 'self') {
    $PAGE_NAME = "user_set";
} else {
    $PAGE_NAME = "ta_set";
}*/
$PAGE_NAME = "index";
include_once(dirname(__FILE__) . '/inc/config.php');
include_once(dirname(__FILE__) . '/inc/header.php');
?>
<!-- 内容主体 -->
<div id="content">
    <div class="banner">
        <div class="banner-con clearfix">
            <img src="<?= $SRC_DIR ?>/assets/customize.png" alt="个性定制，值得拥有" class="customize"/>
            <ul>
                <li>
                    <a>周六</a>
                </li>
                <li>
                    <a>周日</a>
                </li>
                <li>
                    <a>周一</a>
                </li>
                <li>
                    <a>周二</a>
                </li>
                <li>
                    <a>周三</a>
                </li>
            </ul>
            <span>2月14日精选</span>

        </div>
    </div>
    <div class="listdiv clearfix">
        <ul class="clearfix">
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/1.png" alt="" /><span>立即预定1</span></a></li>
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/2.png" alt="" /><span>立即预定2</span></a></li>
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/3.png" alt="" /><span>立即预定3</span></a></li>
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/4.png" alt="" /><span>立即预定4</span></a></li>
        </ul>
    </div>
</div>
<!-- end 内容主体 -->
<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>