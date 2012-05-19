<?php
/**
 * Author: fatedm
 * Date: 12-3-28
 * Time: 下午2:56
 * Email: fatedm@hotmail.com
 */
 ?>
<?php
$PAGE_NAME = "apply";
include_once(dirname(__FILE__) . '/inc/config.php');
include_once(dirname(__FILE__) . '/inc/header.php');
?>
<link rel="stylesheet" href="http://a.tbcdn.cn/apps/med/kissy/1.2.0/calendar/assets/base-min.css">
<script src="http://a.tbcdn.cn/apps/med/kissy/1.2.0/calendar-min.js"></script>


<input type="hidden" value="26/18" id="J_Date">

<div id="content">
     <form id="apply" name="apply" action="" method="get">
         <input name='_tb_token_' type='hidden' value='12ZTyawk'>
		<input type="hidden" name="action" value="sellerSignAction"/>
		<input type="hidden" name="event_submit_do_signUp" value="1"/>
         <ul class="form-apply">
             <li class="form-apply-t">
                1.填写特价商品信息
             </li>
             <li>
                 <label class="hd required">宝贝链接：</label>
                 <input type="text" class="text J_Pro J_Input" id="J_Pro" name="url" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">宝贝名称：</label>
                 <input type="text" class="text J_Input" id="J_Name" name="nm" autocomplete="off">
                 <span class="hd-text">能清楚描述宝贝的十三个汉字或26个字符</span>
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">宝贝折后价格：</label>
                 <span class="for-money-l">￥</span><input type="text" class="text money-input J_Input" id="J_Price" name="price" autocomplete="off"><span class="for-money-r">元</span>
                 <span class="hd-text">折后价格必须低于近60天内活动宝贝的最低价</span>
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">提供数量：</label>
                 
                 <input class="text J_Input" type="text" name="num" id="J_Num" id="num" autocomplete="off">
                 <span class="hd-text hd-text-s">以扶持小卖家为宗旨，报名的宝贝数量要求≥50件<br>（报名超值推荐要求≥200件），并且≤300件</span>
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">是否包邮：</label>
                 <input type="checkbox" class="checkbox J_Input" id="baoyou" name="by">
                 <span class="baoyou-text">(活动宝贝需要全国包邮)</span>
                 <div class="valid-under" style="display:none"><p class="estate tip"><span class="label">亲，不包邮的商品没有办法参加活动哟！</span></p></div>
             </li>
             <li>
                 <label class="hd required">宝贝白底图片：</label>
                 <i class="for-file"></i>
                 <input type="file" class="file J_Input" name="fiter1" id="fiter1">
                 <span class="file-txt file-txt-s">请上传 <i class="orange">430x430 的白色背景产品图</i>，支持JPG、JPEG、PNG格式（<i class="orange">图片大小不超过1M</i>）<br>图片质量将影响宝贝销量，请保证图片清晰和美观。不良图片将有可能导致审核不通过</span>
                <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd">授权文件图片：</label>
                 <i class="for-file"></i>
                 <input data-state="true" type="file" class="file" name="fiter2" id="fiter2">
                 <span class="file-txt">品牌商品需要提供授权证书，支持JPG、JPEG、PNG格式（<i class="orange">图片大小不超过1M</i>）</span>
                <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
              <li>
                 <label class="hd">QS质检证明图：</label>
                 <i class="for-file"></i>
                 <input data-state="true" type="file" class="file" name="fiter1" id="fiter3" >
                 <span class="file-txt">食品类商品必须提供QS质检证明报告，支持JPG、JPEG、PNG格式（<i class="orange">图片大小不超过1M</i>）</span>
                <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
              </li>
             <li>
                 <label class="hd required">参与日期：</label>
                 <input type="text" class="text text-short J_Input" id="J_Popup" name="date" readonly="readonly">
                 <span class="file-txt"><a href="http://bbs.taobao.com/catalog/thread/15283510-257201944.htm
" style="color:#ff6600;text-decoration: underline;">点此查看每日报名人数</a>，选择人数更少的日期，更有机会上首页</span>
             </li>
             <li>
                 <label class="hd required">参与活动模块：</label>
                 <select name="active" id="active">
                     <option value="-1">类目活动(默认)</option>
                 </select>
                 <a class="active-item" href="http://bbs.taobao.com/catalog/thread/15283510-257046879.htm" target="_blank">点此查看活动支持的类目</a>
                 
             </li>
              <li class="form-apply-t">
                2.填写商家联系信息
             </li>
             <li>
                 <label class="hd required">联系人：</label>
                 <input type="text" class="text J_Input" id="user" name="user" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">联系手机：</label>
                 <input type="text" class="text J_Input" id="phone" name="phone" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">联系邮箱：</label>
                 <input class="text J_Input" type="text" id="email" name="email" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required"></label>
                 <input  id="J_TLaws" type="checkbox" class="checkbox J_Input"><span class="size14"> 我已阅读<a href="#" target="_blank">《天天特价商家规则》</a>，并为违反规则的行为承担相应的责任。</span>
                <div class="valid-under" style="display:none;"><p class="estate tip"><span class="label">亲，您仔细查看过《天天特价商家规则》了吗？如果同意，请在方框内打√。</span></p></div>
             </li>
             <li class="last">
                 <label class="hd"></label>
                 <input type="hidden" value="http://tejia.daily.taobao.net/" data-state="true" id="J_Ui">
                 <button class="submit" type="submit"></button>
             </li>
         </ul>


         
     </form>
</div>

<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>