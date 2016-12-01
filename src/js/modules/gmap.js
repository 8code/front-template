var _, Utils;

_ = require('lodash');
Utils = require('./utils');


// google APIオプション用オブジェクト
var _google = {};


//
// Constractor
//
var gmap = {};


//
// 初期化
//
gmap.init = function(){

  this.map,
  this.marker,
  this.customMapType;

  // ユーザー設定
  this.el = $('.js-gmap'),
  this.opts = null,
  this.conf = {
    project: '{{ project }}',
    markerPath: '/assets/themes/{{ theme-name }}/img/marker/default.png',
    marker: { width: '{{ size }}', height: '{{ size }}' },
    zoom: 15,
    scrollwheel: false,
    draggable: true,
    disableDoubleClickZoom: false,
    stylers: [
        { hue: "#xxxxxx" }
    ]
  };

  if(Utils.getWindowWidth() < Utils.MOBILE_WIDTH) {
    this.conf.draggable = false;
    this.conf.disableDoubleClickZoom = true;
  }

  if(this.el == null) {
    return;
  }

  for(var i=0;i<this.el.length;i++) {
    this.create(this.el.eq(i));
  }

  //this.bind();
};


//
// イベントハンドラをバインド
//
gmap.bind = function(){

  this.onResizeWindow = _.bind(this.onResizeWindow, this);
  Utils.$window.on('resize', _.debounce(this.onResizeWindow, 200));
};


//
// 各種オプションをgoogleMap APIv3用に初期化
//
gmap.create = function(el){

  this.opts = el.data('opts');

  // 地図オプションを初期化
  _google = {
    default: {
      zoom: this.conf.zoom,
      center: (function(lat, lng){ var o = new google.maps.LatLng(lat, lng); return o; })(this.opts.lat, this.opts.lng),
      scrollwheel: this.conf.scrollwheel,
      draggable: this.conf.draggable,
      disableDoubleClickZoom: this.conf.disableDoubleClickZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    markerImg: {
      url : this.conf.markerPath,
      scaledSize : (function(w, h){ var o = new google.maps.Size(w, h); return o; })(this.conf.marker.width, this.conf.marker.height)
    },
    feature: [{
      elementType: 'all',
      featureType: 'all',
      stylers: this.conf.stylers
    }],
    styled: {
     name: this.conf.project
    }
  };

  this.draw(el.get(0));
};


//
// 描画
//
gmap.draw = function(el){
  this.map = new google.maps.Map(el, _google.default);
  this.marker = new google.maps.Marker({ position: _google.default.center, map: this.map, icon: _google.markerImg });
  this.customMapType = new google.maps.StyledMapType(_google.feature, _google.styled);
  this.map.mapTypes.set(this.conf.project, this.customMapType);
  this.map.setMapTypeId(this.conf.project);
};


//
// ウィンドウリサイズハンドラ
//
// gmap.onResizeWindow = function(){
//   var i, latlng, scaledSize, $this;

//   //状態によってオプションを更新
//   if(Utils.getWindowWidth() < Utils.MOBILE_WIDTH) {
//     //mk = { w: this.conf.markerSP.width, h: this.conf.markerSP.width };
//     this.conf.draggable = false;
//     this.conf.disableDoubleClickZoom = true;
//   } else {
//     //mk = { w: this.conf.marker.width, h: this.conf.marker.width };
//     this.conf.draggable = true;
//     this.conf.disableDoubleClickZoom = false;
//   }

//   for(i=0;i<this.el.length;i++) {
//     $this = this.el.eq(i);
//     latlng = new google.maps.LatLng($this.data('opts').lat, $this.data('opts').lng);
//     //scaledSize = new google.maps.Size(mk.w, mk.h);

//     google.maps.event.trigger(this.map, 'resize');
//     this.map.setCenter(latlng);
//     // this.map.setIcon({
//     //   url: this.conf.markerPath,
//     //   scaledSize: scaledSize
//     // });
//     this.map.setOptions({
//       draggable: this.conf.draggable,
//       disableDoubleClickZoom: this.conf.disableDoubleClickZoom,
//     });
//   }
// };

module.exports = gmap;