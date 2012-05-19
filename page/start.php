<?php
/**
 * Author: fatedm
 * Date: 12-5-15
 * Time: 上午11:02
 * Email: fatedm@hotmail.com
 */
 ?>
<?php
$PAGE_NAME = "start";
include_once(dirname(__FILE__) . '/inc/config.php');
include_once(dirname(__FILE__) . '/inc/header.php');
?>
<div id="content">
    <div id="start">
        <div class="welcome">
             fjkdj,欢迎你
        </div>
        <div class="start-content">
            <div class="manage-left">
                <div class="manage-center">
                    <div class="manage-title-con"><h4 class="manage-title"></h4></div>
                    <ul class="manage-nav">
                       <li class="selected">
                           <i></i>
                           <a href="#">已报名的商品</a>
                       </li>
                        <li><i></i><a href="#">已结束的商品</a></li>
                    </ul>
                </div>
                <div class="manage-notice">
                    <h4 class="manage-notice-title">公告</h4>
                    <ul>
                        <li><a href="#">部分商品下架公告</a></li>
                        <li><a href="#">部分商品下架公告</a></li>
                        <li class="last"><a href="#">部分商品下架公告</a></li>
                    </ul>
                    <div class="manage-notice-more"><a href="#">更多&gt;</a></div>
                </div>
            </div>
            <div class="manage-right">
                <div class="manage-right-title">
                    <div class="manage-list">
                        <div class="info">宝贝信息</div>
                        <div class="price m-item">报名折扣价</div>
                        <div class="amount m-item">报名数量</div>
                        <div class="apply-time m-item">报名时间</div>
                        <div class="active-time m-item">活动时间</div>
                        <div class="state m-item">活动状态</div>
                        <div class="act m-item">操作</div>
                    </div>
                </div>
                <!--start：没有报名-->
                <div class="no-apply" style="display: none;">
                    <div class="no-apply-box">
                        <div class="no-apply-info"><i></i>抱歉，您目前没有任何报名天天特价中的商品！</div>
                        <div class="u-can-apply">
                            <a href="#" target="_blank" class="apply-btn"></a>
                            <p>或查看 <a href="#" target="_blank">报名历史记录</a></p>
                        </div>
                    </div>
                    <p class="our-spirit">天天特价专注于扶持1-5钻诚信、优质卖家，报名、审核、排期均为系统自动化，不收取任何费用。如有发现任何牟利行为，请坚决举报！ <a href="#" target="_blank">点此查看详情</a></p>
                    <div class="about-spirit">
                        <b>相关链接：</b>
                        <a href="#" target="_blank">天天特价报名规则</a>
                        <a href="#" target="_blank">违规商家处罚方法</a>
                        <a href="#" target="_blank">允许报名天天特价的类目</a>
                        <a href="#" target="_blank">常见问题</a>
                    </div>
                </div>
                <!--end：没有报名-->
                <!--start:有报名-->
                <div class="has-apply">
                    <div class="has-apply-box">
                        <div class="manage-list">
                            <div class="info">
                                <a href="#" target="_blank" class="info-img"><img src="http://img.f2e.taobao.net/img.png?x=80x80"></a>
                                <p class="info-title"><a href="#">歌莉娅秋冬新款长袖格子衬三</a></p>
                            </div>
                            <div class="price">￥39.0</div>
                            <div class="amount">300</div>
                            <div class="apply-time"><p>2012-04-05</p><p>15:30</p></div>
                            <div class="active-time"><p>2012-04-05</p><p>15:30</p></div>
                            <div class="state"><p class="state-info">活动进行中</p></div>
                            <div class="act"><a href="#" class="del-btn">撤销报名</a></div>
                            <div class="del-info">
                                <i class="del-info-arrow"></i>
                                
                                <p>按钮仅在活动排期前可以点击哦！</p>
                            </div>
                        </div>

                    </div>
                    <div class="has-apply-know">
                        <div class="know-title"><i class="know-title-icon"></i>参与活动必知</div>
                        <p><a href="#" target="_blank">我被同志可以上天天特价活动了，该进行那些必要的设置和操作呢？</a></p>
                    </div>
                </div>
                <!--end:有报名-->
            </div>
        </div>
    </div>
</div>
    <div class="helper-con">
<div class="helper">
    <div class="helper-title">
        <div class="helper-tl">
            <div class="helper-cheap">
                <i></i>
                <h4>超值：全场免邮</h4>
                <p>全场特价 全国包邮</p>
            </div>
            <div class="helper-promise">
                <i></i>
                <h4>保障：7天无理由退换货</h4>
                <p>放心购物 后顾无忧</p>
            </div>
            <div class="helper-chao">
                <i></i>
                <h4>精选：天天特价</h4>
                <p>全网精选 超值优惠</p>
            </div>
        </div>

    </div>
    <div class="helper-bd">
        <dl class="helper-about">
            <dt>关于我们</dt>
            <dd><a href="http://bbs.taobao.com/catalog/thread/15283510-257049795.htm" target="_blank">天天特价介绍</a></dd>
            <dd><a href="http://bbs.taobao.com/catalog/thread/15283510-257049795.htm" target="_blank">天天特价核心价值</a></dd>
        </dl>
        <dl class="helper-suggest">
            <dt>买家购物指南</dt>

            <dd><a href="http://bbs.taobao.com/catalog/thread/15283510-257049892.htm" target="_blank">特价商品抢购指南</a></dd>
        </dl>
        <dl class="helper-question">
            <dt>商家常见问题</dt>
            <dd><a href="http://bbs.taobao.com/catalog/thread/15283510-257043271.htm" target="_blank">招商规则</a></dd>
            <dd><a href="http://bbs.taobao.com/catalog/thread/15283510-257044968.htm" target="_blank">违规商家处罚</a></dd>
            <dd><a href="http://bbs.taobao.com/catalog/thread/15283510-257050869.htm " target="_blank">商家如何报名</a></dd>
        </dl>
        <dl class="helper-contact">
            <dt>联系我们</dt>
            <dd><a href="http://weibo.com/u/1859077242" target="_blank">关注微博</a></dd>
            <dd><a href="http://bbs.taobao.com/catalog/11383510.htm" target="_blank">官方论坛</a></dd>
            <dd><a href="http://bangpai.taobao.com/group/743351.htm" target="_blank">官方帮派</a></dd>
            <dd><a href="http://shuo.taobao.com//microshop/front.htm?userId=683950256" target="_blank">官方机构说</a></dd>
        </dl>
        <dl class="helper-email">
            <dt>意见建议</dt>
            <dd>投诉建议邮箱</dd>
            <dd><a class="arial" href="mailto:tejia@taobao.com" target="_blank">tejia@taobao.com</a></dd>
            <dd>廉政邮箱：</dd>
            <dd><a class="arial" href="mailto:lianzheng@taobao.com" target="_blank">lianzheng@taobao.com</a></dd>

        </dl>
    </div>
</div>
    </div>
    <div id="dialog">
         <div class="dialog-bg"></div>
         <div class="del-dialog">
             <h4>您确定要撤销本次报名？</h4>
             <div class="dialog-btn-box">
                 <button class="yes-btn">确定</button>
                 <button class="no-btn">取消</button>
             </div>
             <span class="dialog-close"></span>
         </div>

    </div>
    <form name="" id="form" method="get" action="">
        <input type="hidden" name="id" id="promotion" value="123">
    </form>
<?php
include_once(dirname(__FILE__) . '/inc/footer.php');
?>