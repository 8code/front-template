var _, Utils;

_ = require('lodash');
Utils = require('./Utils');
require('mobileEvents');

//
// Constractor
//
var navigation = {};


//初期化
navigation.init = function(){
  this.body = $('body'),

  this.el = $('.js-navi'),
  this.overlay = $('.js-navi-overlay'),
  this.target = $('.js-navi-target'),
  this.item = $('.js-navi-item'),
  this.link = this.item.children('a'),
  this.header = $('.l-header');

  this.sub = '.gnav-menu__sub';

  if(this.el == null || !Utils.isMobile) {
    return;
  }

  this.link.each(function() {
    var $this = $(this);

    if($this.next('.gnav-menu__sub')[0]) {
      $this.addClass('is-stratum');
    }
  });

  this.bind();
};


//
// 処理をバインド
//
navigation.bind = function(){

  this.onTapTrigger = _.bind(this.onTapTrigger, this);
  this.onTapItem = _.bind(this.onTapItem, this);
  this.onTapOverlay = _.bind(this.onTapOverlay, this);

  this.el.on("tap", this.onTapTrigger);
  this.item.on("tap", this.onTapItem);
  this.overlay.on("tap", this.onTapOverlay);
};


//
// タップ時の処理
//
navigation.onTapTrigger = function(e){
  if( !$.contains(this.target[0], e.target) ) {
    this.body.toggleClass('is-gnav-active');
  }

  // if(this.body.hasClass('is-gnav-active')) {
  //   this.header.css('height', '100%');
  // } else {
  //   this.header.delay(600).queue(function(){
  //     $(this).css('height', 'auto').dequeue();
  //   });
  // }
};


//
// オーバーレイタップ時の処理
//
navigation.onTapOverlay = function(e){
  if( !$.contains(this.target[0], e.target) ) {
    this.body.toggleClass('is-gnav-active');
  }
};


//
// 内部アコーディオン処理
//
navigation.onTapItem = function(e){
  var $this = $(e.currentTarget);
  if($this.find('.is-stratum')[0]){
    $this.children('a').toggleClass('is-active');
    $this.find(this.sub).stop().slideToggle();
  }
};

module.exports = navigation;