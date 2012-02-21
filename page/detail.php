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
        order-item
    </div>
</div>
<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>