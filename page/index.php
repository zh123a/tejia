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
<!-- �������� -->
<div id="content">
    <?php include_once(dirname(__FILE__) . '/inc/banner.php')?>
    <div class="listdiv clearfix">
        <ul class="clearfix">
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/1.png" alt="" /><span>����Ԥ��1</span></a></li>
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/2.png" alt="" /><span>����Ԥ��2</span></a></li>
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/3.png" alt="" /><span>����Ԥ��3</span></a></li>
            <li><a target="_blank" href="#"><img src="<?= $SRC_DIR ?>/assets/4.png" alt="" /><span>����Ԥ��4</span></a></li>
        </ul>
    </div>
</div>
<!-- end �������� -->
<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>