var _, velocity;

_ = require('lodash');
velocity = require('velocity');
require('easing');


/**
 * constructor
 */
var Scroll = function() {};


/**
 * 初期化
 */
Scroll.init = function() {
  this.el = $('.js-scroll');
  this.body = null;
  this.target = null;
  this.to = null;

  // オプション
  this.duration = 1200;
  this.easing = 'easeOutQuint';
  this.offset = 0;
  this.hash = true;

  if(this.el == null) {
    return;
  }
  this.body = $('body');
  //this.body.addClass('has-load');

  this.bind();
};


/**
 * イベントをバインド
 */
Scroll.bind = function() {
  this.onClickTrigger = _.bind(this.onClickTrigger, this);

  this.el.on('click', this.onClickTrigger);
};


/**
 * スクロール処理
 */
Scroll.scroll = function(el) {
  this.to = el === '#' ? this.body : $(el);
  //this.offset = offset;

  this.to.velocity("scroll", {
    duration: this.duration,
    easing: this.easing,
    offset: this.offset
  },
  function(){
    if(this.hash) {
      history.pushState('', '', h);
    }
  });
}


/**
 * イベントハンドラ
 */
Scroll.onClickTrigger = function(e) {
  var hash;

  this.target = $(e.currentTarget);
  hash = this.target.attr('href');
  //offset = this.target.data('offset');

  this.scroll(hash);
};

module.exports = Scroll;