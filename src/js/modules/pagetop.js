'use strict';

var $, _, Utils;

$ = require('jquery');
_ = require('lodash');
Utils = require('./utils');

/**
 * constructor
 */
var pagetop = function(el) {
  this.el = $(el);
  this.button = null;
  this.scroll = null;
  this.height = null;
};

/**
 * 初期化
 */
pagetop.prototype.initialize = function() {
  if(!this.el[0]) {
    return;
  }
  this.button = $('.js-pagetop');

  this.scroll = Utils.$window.scrollTop();
  this.height = Utils.$window.height();

  this.bind();
};


/**
 * イベントハンドラをバインド
 */
pagetop.prototype.bind = function() {
  this.controlUI = _.bind(this.controlUI, this);

  Utils.$window
    .on('scroll', this.controlUI);
};


/**
 * スクロール値が
 */
pagetop.prototype.controlUI = function() {
  this.scroll = Utils.$window.scrollTop();

  if(this.scroll > this.height) {
    this.button.addClass('is-active');
  } else {
    this.button.removeClass('is-active');
  }
};


module.exports = pagetop;