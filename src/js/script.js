// libs
var $ = require('jquery');

// modules
var Utils = require('./modules/utils');
var Scroll = require('./modules/scroll');
var Navigation = require('./modules/navigation');
var Pagetop = require('./modules/pagetop');
var Map = require('./modules/gmap');


// instance
var scroll,
    navigation,
    pagetop,
    map;


var initialize = function() {

  Utils.$window = $(window);
  Utils.$html = $('html');
  Utils.$body = $('body');

  // scroll = new Scroll('.js-scroll');
  // scroll.initialize();

  // navigation = new Navigation('.js-navi');
  // navigation.initialize();

  // pagetop = new Pagetop('.js-pagetop');
  // pagetop.initialize();

  // map = new Map('.js-gmap');
  // map.initialize();

}

// window.onpageshow = function(e) {
//   if(e.persisted) {
//     page.el.off('transitionend transitionEnd webkitTransitionEnd');
//     $('html').removeClass('is-body-unloaded');
//   }
// };

$(function(){
  initialize();
  console.log('run');
});