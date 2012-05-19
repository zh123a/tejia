<?php
/**
 * Author: fatedm
 * Date: 12-4-12
 * Time: 上午11:44
 * Email: fatedm@hotmail.com
 */
?>
<?php
$PAGE_NAME = "rule";
include_once(dirname(__FILE__) . '/inc/config.php');
include_once(dirname(__FILE__) . '/inc/header.php');
?>

<div id="content">
    <div class="rule-outer">
        <div class="rule-mid">
            <div class="rule-inner">
                <div class="rule-title">
                    <h2></h2>
                </div>
                <div class="rule-con">
                    <dl>
                        <dt>一、天天特价商家报名资格：</dt>
                        <dd>
                            <p>集市店铺：（只针对淘宝网集市店铺开放）</p>
                            <ol>
                                <li>1）卖家信用积分：一钻到五钻（公益宝贝卖家信誉：一心到五钻）</li>
                                <li>2）好评率≥98%</li>
                                <li>3）开店时间≥90天</li>
                                <li>4）加入消费者保障服务，并加入七天无理由退换货（淘宝公益店铺：加入消费者保障服务即可）</li>
                                <li>5）店铺动态评分：描述相符≥4.6 、服务态度≥4.6 、发货速度≥4.6</li>
                                <li>6）实物宝贝交易≥90%（淘宝公益店铺：不限制）</li>
                                <li>7）B类侵权扣分为0（发布违禁信息、出售假冒商品、盗用他人账户、泄露他人信息、骗取他人财物）。</li>
                                <li>8）A类扣分满12分或12分的倍数,自最近处罚起，三个月内不能报名</li>
                                <li>9）因为各种违规而被搜索全店屏蔽的卖家，暂时禁止参与活动</li>
                                
                            </ol>
                        </dd>
                        <dt>二、天天特价报名宝贝要求：</dt>
                        <dd>
                            <ol>
                                <li>1）报名宝贝原价不高于全网均价，禁止先提价再打折。</li>
                                <li>2）报名的宝贝数量≥50件, 且≤300件 （报名超值推荐的宝贝数量≥200件,且≤300件）</li>
                                <li>3）报名宝贝近30天内交易≥10件</li>
                                <li>4）报名宝贝折扣价格低于60天内最低拍下价格</li>
                                <li>5）报名宝贝必须包邮</li>
                                <li>6）报名宝贝应是应季商品</li>
                                <li>7）涉及售卖品牌商品需要上传品牌授权图片</li>
                                <li>8）报名宝贝图片为430*430白底1M以内清晰图片（无logo、无水印、无广告语等）</li>
                                <li>9）报名宝贝标题10个汉字或者20个字符且描述准确清晰，严禁堆砌关键字</li>
                                <li>10）	报名宝贝需要有一定的细节描述图</li>
                            </ol>
                        </dd>
                        <dt>三、悬挂logo和banner</dt>
                        <dd>
                            <p>参加活动商家，店铺自报名日起悬挂天天特价logo和banner一个月，不悬挂视为自动放弃报名</p>
                            <p>卖家店铺首页：图片http://img01.taobaocdn.com/tps/i1/T1kAX4XgVuXXXXXXXX-950-90.jpg</p>
                            <p>参加活动的宝贝详情页面：图片http://img04.taobaocdn.com/tps/i4/T1ukh4XoXhXXXXXXXX-190-233.jpg</p>
                            <p>连接到http://tejia.taobao.com</p>
                            <p>操作流程：<a href="http://bbs.taobao.com/catalog/thread/15283510-257041030.htm" target="_blank">http://bbs.taobao.com/catalog/thread/15283510-257041030.htm</a></p>
                        </dd>
                        <dt>活动规则、活动流程及卖家黑名单处罚机制详见：<a href="http://bbs.taobao.com/catalog/thread/15283510-257043271.htm" target="_blank">详细</a></dt>
                    </dl>

                    <div class="form" id="form">

                            <fieldset>
                                <div>
                                    <h4>以下内容请您勾选确认：</h4>
                                    <p>
                                        <label for="te-guize"><input type="checkbox" name="guize" id="te-guize"> 我已仔细阅读以上内容并同意<a href="#" target="_blank">《天天特价商家规则》</a>。</label>
                                    </p>
                                    <p>
                                        <label for="te-wei"><input type="checkbox" name="chufa" id="te-wei"> 如果我违反天天特价规则，将接受相应的处罚。</label>
                                    </p>
                                </div>
                            </fieldset>
                            <button type="submit" class="submit"></button>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>