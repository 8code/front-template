var $, is;
var _lang,
    _isTouch;

$ = require('jquery');
is = require('is');

var Utils = {};

Utils.$window = null;
Utils.$html = null;
Utils.$body = null;

Utils.MOBILE_WIDTH = 769;

Utils.TRANSITION_END = 'transitionend transitionEnd webkitTransitionEnd';

/*
 * windowの幅を返す
 */
Utils.getWindowWidth = function() {
  return this.$window.width();
};

/*
 * windowの高さを返す
 */
Utils.getWindowHeight = function() {
  return this.$window.height();
};


/*
 * langを返す
 */
Utils.getLang = function() {
  if(!_lang) {
    _lang = this.$html.attr('lang');
  }

  return _lang;
};


/*
 * モバイルかどうか
 */
Utils.isMobile = function() {
  var _isMobile = this.$window.width() < this.MOBILE_WIDTH || is.mobile();
  return _isMobile;
};


/*
 * タブレットかどうか
 */
Utils.isTablet = function() {
  return is.tablet();
};

/*
 * IEかどうか
 */
Utils.isIE = function() {
  return is.ie();
};


/*
 * ie9かどうか
 */
Utils.isIE9 = function() {
  return is.ie(9);
};

/*
 * ie9かどうか
 */
Utils.isIE10 = function() {
  return is.ie(10);
};

/*
 * ie9かどうか
 */
Utils.isIE11 = function() {
  return is.ie(11);
};

/*
 * androidかどうか
 */
Utils.isAndroid = function() {
  return is.android();
};


/*
 * タッチパネルかどうか
 */
Utils.isTouch = function() {
  if(!_isTouch) {
    _isTouch = this.$body.hasClass('is-touch');
  }

  return _isTouch;
};

/*
 * 外部リンクかどうか
 */
Utils.isExternal = function(href) {
  return !(/^#/.test(href) || new RegExp('^' + location.origin).test(href));
};

module.exports = Utils;