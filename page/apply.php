<?php
/**
 * Author: fatedm
 * Date: 12-3-28
 * Time: ����2:56
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
                1.��д�ؼ���Ʒ��Ϣ
             </li>
             <li>
                 <label class="hd required">�������ӣ�</label>
                 <input type="text" class="text J_Pro J_Input" id="J_Pro" name="url" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">�������ƣ�</label>
                 <input type="text" class="text J_Input" id="J_Name" name="nm" autocomplete="off">
                 <span class="hd-text">���������������ʮ�������ֻ�26���ַ�</span>
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">�����ۺ�۸�</label>
                 <span class="for-money-l">��</span><input type="text" class="text money-input J_Input" id="J_Price" name="price" autocomplete="off"><span class="for-money-r">Ԫ</span>
                 <span class="hd-text">�ۺ�۸������ڽ�60���ڻ��������ͼ�</span>
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">�ṩ������</label>
                 
                 <input class="text J_Input" type="text" name="num" id="J_Num" id="num" autocomplete="off">
                 <span class="hd-text hd-text-s">�Է���С����Ϊ��ּ�������ı�������Ҫ���50��<br>��������ֵ�Ƽ�Ҫ���200���������ҡ�300��</span>
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">�Ƿ���ʣ�</label>
                 <input type="checkbox" class="checkbox J_Input" id="baoyou" name="by">
                 <span class="baoyou-text">(�������Ҫȫ������)</span>
                 <div class="valid-under" style="display:none"><p class="estate tip"><span class="label">�ף������ʵ���Ʒû�а취�μӻӴ��</span></p></div>
             </li>
             <li>
                 <label class="hd required">�����׵�ͼƬ��</label>
                 <i class="for-file"></i>
                 <input type="file" class="file J_Input" name="fiter1" id="fiter1">
                 <span class="file-txt file-txt-s">���ϴ� <i class="orange">430x430 �İ�ɫ������Ʒͼ</i>��֧��JPG��JPEG��PNG��ʽ��<i class="orange">ͼƬ��С������1M</i>��<br>ͼƬ������Ӱ�챦���������뱣֤ͼƬ���������ۡ�����ͼƬ���п��ܵ�����˲�ͨ��</span>
                <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd">��Ȩ�ļ�ͼƬ��</label>
                 <i class="for-file"></i>
                 <input data-state="true" type="file" class="file" name="fiter2" id="fiter2">
                 <span class="file-txt">Ʒ����Ʒ��Ҫ�ṩ��Ȩ֤�飬֧��JPG��JPEG��PNG��ʽ��<i class="orange">ͼƬ��С������1M</i>��</span>
                <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
              <li>
                 <label class="hd">QS�ʼ�֤��ͼ��</label>
                 <i class="for-file"></i>
                 <input data-state="true" type="file" class="file" name="fiter1" id="fiter3" >
                 <span class="file-txt">ʳƷ����Ʒ�����ṩQS�ʼ�֤�����棬֧��JPG��JPEG��PNG��ʽ��<i class="orange">ͼƬ��С������1M</i>��</span>
                <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
              </li>
             <li>
                 <label class="hd required">�������ڣ�</label>
                 <input type="text" class="text text-short J_Input" id="J_Popup" name="date" readonly="readonly">
                 <span class="file-txt"><a href="http://bbs.taobao.com/catalog/thread/15283510-257201944.htm
" style="color:#ff6600;text-decoration: underline;">��˲鿴ÿ�ձ�������</a>��ѡ���������ٵ����ڣ����л�������ҳ</span>
             </li>
             <li>
                 <label class="hd required">����ģ�飺</label>
                 <select name="active" id="active">
                     <option value="-1">��Ŀ�(Ĭ��)</option>
                 </select>
                 <a class="active-item" href="http://bbs.taobao.com/catalog/thread/15283510-257046879.htm" target="_blank">��˲鿴�֧�ֵ���Ŀ</a>
                 
             </li>
              <li class="form-apply-t">
                2.��д�̼���ϵ��Ϣ
             </li>
             <li>
                 <label class="hd required">��ϵ�ˣ�</label>
                 <input type="text" class="text J_Input" id="user" name="user" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">��ϵ�ֻ���</label>
                 <input type="text" class="text J_Input" id="phone" name="phone" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required">��ϵ���䣺</label>
                 <input class="text J_Input" type="text" id="email" name="email" autocomplete="off">
                 <div class="valid-under" style="display:none;"><p class="estate"><span class="label"></span></p></div>
             </li>
             <li>
                 <label class="hd required"></label>
                 <input  id="J_TLaws" type="checkbox" class="checkbox J_Input"><span class="size14"> �����Ķ�<a href="#" target="_blank">�������ؼ��̼ҹ���</a>����ΪΥ���������Ϊ�е���Ӧ�����Ρ�</span>
                <div class="valid-under" style="display:none;"><p class="estate tip"><span class="label">�ף�����ϸ�鿴���������ؼ��̼ҹ����������ͬ�⣬���ڷ����ڴ�̡�</span></p></div>
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