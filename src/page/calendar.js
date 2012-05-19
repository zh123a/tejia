/**
 * Author: fatedm
 * Date: 12-5-11
 * Time: 上午11:24
 * Email: fatedm@hotmail.com
 */
function getNumOfDays(year, month){
    return 32 - new Date(year, month - 1, 32).getDate();
}
KISSY.add('calendar', function(S, undefined){
   var D = S.DOM,
       E = S.Event,
       EventTarget = E.Target,
       $ = S.Node.all;
    function Calendar(config){
        this._init(config);
    }
    S.augment(Calendar, EventTarget, {
        _init : function(config){
            this.config = config || {};
           
            this.con = $(config.con) || $('#cal-container');
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth();
            this.ca = new this.Page({
                year : this.year ,
                month : this.month,
                activeDays : config.activeDays
            }, this);
            this.ca.render();
            this._buildEvent();
            return this;
        },
        render : function(o){
            var self = this,
                i = 0, _oym;
            o = o || {};
            if(self.ca){
			    self.ca.detachEvent();
            }
            self.con.empty();
            _oym = [self.year, self.month];
           
           self.ca = new self.Page({
                year : _oym[0],
                month : _oym[1],
                activeDays : self.config.activeDays
            }, self);
            self.ca.render();

        },
        //裸算下一个月的年月,[2009,11],年:fullYear，月:从0开始计数
        _computeNextMonth: function(a) {
            var _year = a[0],
                _month = a[1];
            if (_month == 11) {
                _year++;
                _month = 0;
            } else {
                _month++;
            }
            return [_year,_month];
        },
        destroy : function(){
            var self = this;
            S.each(self.EV, function(tev) {
                if (tev) {
                    tev.target.detach(tev.type, tev.fn);
            }});
            self.con.remove();
        },
        //月加
        _monthAdd: function() {
            var self = this;
            if (self.month == 11) {
                self.year++;
                self.month = 0;
            } else {
                self.month++;
            }
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },

        //月减
        _monthMinus: function() {
            var self = this;
            if (self.month === 0) {
                self.year--;
                self.month = 11;
            } else {
                self.month--;
            }
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },
		//年加
        _yearAdd: function() {
            var self = this;
            self.year++;
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },

        //年减
        _yearMinus: function() {
            var self = this;
            self.year--;
            self.date = new Date(self.year.toString() + '/' + (self.month + 1).toString() + '/1');
            return this;
        },
        _getHeadStr : function(year, month){
            return year.toString() + '年' + (Number(month) + 1).toString() + '月';
        },
        _buildEvent : function(){
            /*var self = this,tev,i;
            S.each(self.EV, function(tev) {
                if (tev) {
                    tev.target.detach(tev.type, tev.fn);
                }
            });
            self.EV = self.EV || [];
            tev = self.EV[0] = {
                target:$(document),
                type:'click'
            };
            tev.fn = function(e){
                
            }
            tev.target.on(tev.type, tev.fn);*/
        },

        Page : function(config, father){
            this.year = config.year;
            this.month = config.month;
            this.father = father;
            this.config = config;
           
            this._getNumsOfDays = function(year, month){
                return 32 - new Date(year, month - 1, 32).getDate();
            };
            //月加
            this._monthAdd = function () {
                var self = this;
                if (self.month == 11) {
                    self.year++;
                    self.month = 0;
                } else {
                    self.month++;
                }
            },

            //月减
            this._monthMinus = function () {
                var self = this;
                if (self.month === 0) {
                    self.year--;
                    self.month = 11;
                } else {
                    self.month--;
                }
            },
            //年加
            this._yearAdd = function () {
                var self = this;
                self.year++;
            };

            //年减
            this._yearMinus = function () {
                var self = this;
                self.year--;
            };
            this.detachEvent = function () {
                var self = this;
                self.EV = self.EV || [];
                //flush event
                S.each(self.EV, function (tev) {
                    if (tev) {
                        tev.target.detach(tev.type, tev.fn);
                    }
                });
            };
            this._buildEvent = function () {
                var self = this,
                    tev, i;
                function bindEventTev(){
                    tev.target.on(tev.type, tev.fn);
                }
                self.EV = [];
                tev = self.EV[self.EV.length] = {
                    target : $('.cal-prev'),
                    type : 'click',
                    fn : function(){
                        self.father._monthMinus().render();
                        self.father.fire('monthChange', {
                            date:new Date(self.father.year + '/' + (self.father.month + 1) + '/01')
                        });
                    }
                };
                bindEventTev();
                tev = self.EV[self.EV.length] = {
                    target : $('.cal-next'),
                    type : 'click',
                    fn : function(e){
                       
                       self.father._monthAdd().render();
                       self.father.fire('monthChange', {
                            date : new Date(self.father.year + '/' + (self.father.month + 1) + '/01')
                       })
                    }
                };
                bindEventTev();
            };
            this._renderUI = function () {
                var self = this,
                    _O = {};

                _O.title = '<h4>' + self.father._getHeadStr(self.year, self.month) + '</h4>';
                _O.prev = '<span class="cal-prev"></span>';
                _O.next = '<span class="cal-next"></span>';
                _O.week = '<div class="cal-whd">' +
                              '<span>周日</span>' +
                              '<span>周一</span>' +
                              '<span>周二</span>' +
                              '<span>周三</span>' +
                              '<span>周四</span>' +
                              '<span>周五</span>' +
                              '<span class="cal-whd-last">周六</span>' +
                          '</div>';
                self._createDS();
                self.html = '<div id="cal-con">' +
                                '<div class="cal-hd">' +
                                    _O.title + _O.prev + _O.next +
                                '</div>' +
                                '<div class="cal-bd">' +
                                     _O.week +
                                    '<div class="cal-dbd">' +
                                        self.ds +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                //alert(self.html);
                self.father.con.html(self.html);
            };
            this._createDS = function(){
                var self = this,
                    s = '',
                    link = '',
                    startOffset = (7  + new Date(self.year + '/' + (self.month + 1) + '/01').getDay()) % 7,
                    _td,
                    _td_s,
                    CLS,
                    activeDays = self.config.activeDays,
                    today = new Date(),
                    days = self._getNumsOfDays(self.year, self.month + 1);
                /*var temp =  '<div class="cal-items">' +
                            '<h4>5</h4>' +
                            '<p class="cal-link"><a href="#">办公用品、防辐射</a></p>' +
                            '<p>已申请：111人</p>' +
                            '</div>';*/
                for(var i = 0; i < startOffset; i++){
                    s += '<div class="cal-items"></div>'
                }
                //alert(startOffset);
                for(i = 1; i <= days; i++){
                    _td = self.year + '-' + (self.month + 1) + '-' + i,
                    _td_s = 'days' + _td,
                    CLS = ((i  + startOffset) % 7 === 0)? 'cal-items cal-items-last' : 'cal-items';
                    for(var j = 0; j < activeDays.length; j++){
                       
                        if(_td == activeDays[j].date){
                           link = '<p class="cal-link"><a href="http://tejia.taobao.com?date=' + _td + '">' + activeDays[j].activeName + '</a></p>' +
                                  '<p>已申请：' + activeDays[j].amount + '人</p>';
                        }
                    }
                    s += '<div class="' + CLS + '" id="' + _td_s + '">' +
                         '<h4>' + i + '</h4>' + link + '</div>';
                    link = '';
                }
                
                self.ds = s;
                return self;
            };
             /**
             * 渲染
             */
            this.render = function () {
                var cc = this;
                cc._renderUI();
               cc._buildEvent();
                return this;
            };
        }
    })
    return Calendar;
})

KISSY.use('calendar', function(S, Calendar){
    S.ready(function(){
        var ooo = {
            con : '#cal-container',
            date : '2012-5-13',//开始日期，默认取电脑当前日期
            activeDays : [{"date":"2012-5-15","amount":100,"activeName":"女装"},{"date":"2012-5-16","amount":200,"activeName":"男装"}]//添加活动日期，方便以后搞活动添加特殊日期的链接

        }

        var test = new Calendar(ooo);
    })
})