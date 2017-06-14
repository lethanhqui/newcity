var ua = navigator.userAgent;
var match = ua.match('MSIE (.)');
var versions = match && match.length > 1 ? match[1] : 'unknown';
var isTouchDevice =  "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch  || (navigator.msMaxTouchPoints>0) || (navigator.maxTouchPoints > 0);
var isDesktop = $(window).width() != 0 && !isTouchDevice ? true : false;
var IEMobile = ua.match(/IEMobile/i);
var isIE9 = /MSIE 9/i.test(ua); 
var isIE10 = /MSIE 10/i.test(ua);
var isIE11 = /rv:11.0/i.test(ua) && !IEMobile  ? true : false;
var isEge = /Edge\/12./i.test(navigator.userAgent)
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || ua.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia && !isIE11;
var isChrome = !!window.chrome && !!window.chrome.webstore ;
var isBlink = (isChrome || isOpera) && !!window.CSS;
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || !isChrome && !isOpera && window.webkitAudioContext !== undefined;
var isSafari5 = ua.match('Safari/') && !ua.match('Chrome') && ua.match(' Version/5.');
// Check Android version 
var AndroidVersion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
var Version = ua.match(/Android\s([0-9\.]*)/i);
// Check iOS8 version 
var isIOS8 = function() {
  var deviceAgent = navigator.userAgent.toLowerCase();
  return /iphone os 8_/.test(deviceAgent);
}
// Check iOS version 
function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
var iOS = iOSversion();

var ios, android, blackBerry, UCBrowser, Operamini, firefox, windows, smartphone, tablet,touchscreen, all;
var isMobile = {
  ios: (function(){
    return ua.match(/iPhone|iPad|iPod/i);
  }()),
  android: (function(){
    return ua.match(/Android/i);
  }()),
  blackBerry: (function(){
    return ua.match(/BB10|Tablet|Mobile/i);
  }()),
  UCBrowser: (function(){
    return ua.match(/UCBrowser/i);
  }()),
  Operamini: (function(){
    return ua.match(/Opera Mini/i);
  }()),
  
  windows: (function(){
    return ua.match(/IEMobile/i);
  }()),
  smartphone: (function(){
	return (ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 440 && window.innerHeight <= 740);
  }()),
  tablet: (function(){
    return (ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 1366 && window.innerHeight <= 800);
  }()),

  all: (function(){
    return ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
  }())
};



if(isTouchDevice  && isMobile.all !== null){
	var TouchLenght = true;
}else if(isMobile.tablet && isFirefox || isMobile.smartphone && isFirefox ){
	var TouchLenght = true;
}else{
	var TouchLenght = false;
}
if(isMobile.Operamini){
	alert('Please disable Data Savings Mode');
}


/*if(TouchLenght == true){
alert('Me')
}
*/

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
 
//EXAMPLE ANIMATION CSS
/*$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
$('#yourElement').animateCss('bounce');
*/


var Loadx = 0;

function changeUrl(url, title, description, keyword, dataName, titleog, descriptionog) {
    if (window.history.pushState !== undefined) {
        var c_href = document.URL;
        if (c_href != url && url!='')
            window.history.pushState({path: url, dataName: dataName, title: title, keyword: keyword, description: description, titleog: titleog, descriptionog: descriptionog}, "", url);
    }
    if (title != '') {
        $('#hdtitle').html(title);
        $('meta[property="og:description"]').remove();
        $('#hdtitle').after('<meta property="og:description" content="' + descriptionog + '">');
        $('meta[property="og:title"]').remove();
        $('#hdtitle').after('<meta property="og:title" content="' + titleog + '">');
        $('meta[property="og:url"]').remove();
        $('#hdtitle').after('<meta property="og:url" content="' + url + '">');
        $('meta[name=keywords]').remove();
        $('#hdtitle').after('<meta name="keywords" content="' + keyword + '">');
        $('meta[name=description]').remove();
        $('#hdtitle').after('<meta name="description" content="' + description + '">');
    }
    $('#changlanguage_redirect').val(url);
}




function ResizeWindows() {
var Portrait = $(window).height() > $(window).width();
var Landscape = $(window).height() <= $(window).width();
var img = $('.bg-home img');
var Xwidth = $(window).width();
var Yheight = $(window).height();
var XwidthS = Xwidth - 140;
if(Yheight > 720){
    var YheightS = Yheight - 90 ;
}else{
	var YheightS = Yheight - 70 ;
}


var RatioScreeen = YheightS / XwidthS;
var RatioIMG = 820 / 1500;
var RatioIMG2 = 1080 / 1920;
var RatioFaci = 1100 / 1400;
var RatioPopup = 900 / 1100;
var RatioVideo = 1080 / 1920;
var RatioBlock = 1013 / 1900;
var percent = YheightS/1010;
var percent1 = Xwidth/2100;
var percent2 = YheightS/1300;
var percent3 = YheightS/1080;
var percent4 = Xwidth/1700;
var newXwidth;
var newYheight;
var newXwidth2;
var newYheight2;
if(RatioScreeen > RatioIMG){
	  newYheight = YheightS;
	  newXwidth	= YheightS / RatioIMG;
 }else{
	  newYheight = XwidthS * RatioIMG;
	  newXwidth	= XwidthS;
	  
}
if(RatioScreeen > RatioIMG2){
	  newYheight2 = Yheight;
	  newXwidth2	= Yheight / RatioIMG2;
 }else{
	  newYheight2 = Xwidth * RatioIMG2;
	  newXwidth2 = Xwidth;
	  
}

/* $('body').css({'width':Xwidth}); */

$('.go-top').css({'display':'none', 'opacity':0});

				
				 if(Xwidth <= 1100){
					$('.box-video-center,.video-full').css({'width':Xwidth, 'height':Xwidth * RatioVideo});
					
					if(Xwidth <= 440){
					   $('.bg-home').css({'width': Xwidth, 'height':(Xwidth+250) * RatioIMG});
					}else if(Xwidth > 440 && Xwidth <= 640){
					   $('.bg-home').css({'width': Xwidth, 'height':(Xwidth+200) * RatioIMG});
					}else{
					   $('.bg-home').css({'width': Xwidth, 'height':Xwidth * RatioIMG});
					}
					
					
					if( $('#virtual-page').length){
						$('.bg-picture').css({'width':'100%', 'height':Yheight});
					}else if( $('#facilities-page').length){
						$('.bg-picture').css({'width':'100%', 'height':Xwidth * RatioFaci});
						$('.dot-top').css({'height':Xwidth * RatioFaci});	
					}else  if($('#apartment-page').length){
					   $('.bg-picture, .block').css({'width':Xwidth, 'height':Xwidth * RatioBlock});
					}else{
					   $('.bg-picture').css({'width':Xwidth, 'height':Xwidth * RatioIMG});
					}
					
					
					$('.typical-top').scale(percent1);
					$('.item-plan').css({'height':Xwidth * RatioBlock});
					//$('.item-plan img').css({'height':Xwidth * RatioBlock, 'top':0});
						
					$('.item-plan img, .top-block').scale(percent4);
					$('.item-plan img').css({'top':(Xwidth * RatioBlock)/2 - 500});
					$('.top-block').css({'top':(Xwidth * RatioBlock)/2 - 400});	
					
					   
					  $('.colum-box').css({'width':Xwidth,'height':'auto'});   
					 $('.facilities-pic, .house').css({'height':'auto'});
					   
				      $('.scrollA, .scrollB,.scrollC, .scrollD, .scroll-menu, .scroll-des, .scroll-pro').getNiceScroll().remove();
				      $('.scrollA, .scrollC').css({'height':'auto'});
					  
					   
					   if( $('#news-page').length){
						 $('.sub-news').css({'top': $('.bg-picture').height()-64});   
						 $('.colum-box-news').css({'min-height':Yheight});   
						  var Height = $('.colum-box.active').innerHeight() ;
						  $('.box-content').css({'height':Height});
						  var allItem = $('.colum-box').length;
					      var widthItem = $('.colum-box').width(); 
					      $('.box-content').width(allItem * widthItem);  
					  }else if($('#facilities-page').length){
						   $('.box-content').css({'width':'100%', 'height':'auto'});
					  }
					
					
					   $('.box-library > h3').css({'left':'auto'});
					   
					
				      $('.news-text img, .box-location img').addClass('zoom-pic');
			        
					  
					  
				
				 }else if( Xwidth > 1100){
					  
					   
					   
				        $('.bg-home').css({'width':newXwidth, 'height':newYheight});
					    $('.bg-picture, .block, .box-video-center').css({'width':'100%', 'height':'100%'});
						$('.colum-box').css({'width':XwidthS,'height':'100%'});
					    $('.box-content').css({'height':'100%'});
						$('.facilities-pic').css({'height':YheightS});
						$('.dot-top').css({'height':YheightS});
						$('.typical-top').scale(percent);
						$('.item-plan, .house').css({'height':YheightS});
						
						if( YheightS / XwidthS > 0.55){
						    $('.item-plan img, .top-block').scale(percent2);
							$('.item-plan img').css({'top':YheightS /2 - 520});
							$('.top-block').css({'top':YheightS /2 - 430});
							$('.video-full').css({'width':'auto', 'height':newYheight});
						}else{
							$('.item-plan img, .top-block').scale(percent3);
							$('.item-plan img').css({'top':YheightS /2 - 520});
							$('.top-block').css({'top':YheightS /2 - 430});
							$('.video-full').css({'width':newXwidth, 'height':'auto'});
						}
						
					    $('.content-text').each(function(index, elm) {
						  var textH = $(elm).find('.scrollA').innerHeight();
						  if(textH >= YheightS - 250){
							  $(elm).find('.scrollA').css({'height':YheightS-250});
						  }else{
							  $(elm).find('.scrollA').css({'height':'auto'});
						  }
					     });
					  
					  
					 $('.box-library > h3').css({'left':$('.title-page').innerWidth()+40});
					 
					 if($('#news-page, #facilities-page').length){
						  $('.sub-news').css({'top':100});
						  $('.scrollC').css({'height':YheightS-40});
						  $('.colum-box-news').css({'min-height':'inherit'});  
						  var allItem = $('.colum-box').length;
					      var widthItem = $('.colum-box').width(); 
					      $('.box-content').width(allItem * widthItem);  
					 }
					  
					 $('.news-text img,  .box-location img').removeClass('zoom-pic');  

		       }
			            
					
            	      	
			
}



function initialize() {
var Center = new google.maps.LatLng(10.781372570163962, 106.73566446511234);

var marker = null;
	
	var styles = [
	     
		 {elementType: "geometry",
			stylers: [	 { hue: "#0868a1" },{ saturation: 0 },{ lightness: 0 },{ gamma: 1 }, { visibility: "simplified"}]
		  },
		  
		   {elementType: "labels.icon",
             stylers: [	 { hue: "#0868a1"}]
		   },
		    { elementType: 'labels.text.fill',
            stylers: [{color: '#999999'}]
		   },
		     {featureType: 'water',
			  elementType: 'geometry',
              stylers: [{color: '#11ace4'}]
            },
			{
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
             {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#666666'}]
            },
			 {
              featureType: 'poi',
               elementType: 'labels.text.stroke',
               stylers: [{hue: '#999999'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#76ae43'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#333333'}]
            },
			{
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#939598'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#939598'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
			{
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#fbfbfb'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#fbfbfb'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#666666'}]
            },
			
			 {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#fbfbfb'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#666666'}]
            },



 

		];

	  var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});
	   
	  
	  var mapOptions = {
	  center: Center,
	  zoom: 14,
	  scrollwheel: true,
	  draggable: true,
	  draggingCursor: 'move',
	  noclear: true,
	  disableDefaultUI: true,
	  disableDoubleClickZoom : true,
	  mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style'],
      position: google.maps.ControlPosition.TOP_RIGHT
	  }
	  
	  };
	  
	  
	  google.maps.event.addDomListener(window, "resize", function() {
        google.maps.event.trigger(map, "resize");
        map.setCenter(Center);
		map.setZoom(15);
		
     });

	  
	  var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	  var styledMapOptions = { name: "NEW CITY THU THIEM" };
	 
	  map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
	  
	  
	  var logo = '../pictures/logo-map.png';
	  marker = new google.maps.Marker({
		  map: map,
		  draggable:false,
		  animation: google.maps.Animation.DROP,
		  position: new google.maps.LatLng(10.781372570163962, 106.73566446511234),
		  icon: logo
	  });
	  

    function bounceAnimationMarker() {marker.setAnimation(google.maps.Animation.BOUNCE);}
	function clearAnimationMarker() { marker.setAnimation(null);}
	if($(window).width()>1100){
	 google.maps.event.addListener(marker, 'mouseover', bounceAnimationMarker);
  	 google.maps.event.addListener(marker, 'mouseout', clearAnimationMarker);
	 }
	 
	
	
	  google.maps.event.addListener(marker, 'click', openBox);
	
	
     
	 
	 function openBox() {
	  clearAnimationMarker();
	  var boxText = document.createElement("div");
	  boxText.innerHTML = 
	  "<div class='infobox'>"
	  +"<img src='../pictures/company.jpg'  alt='pic' >"
	  +"<h3>D·ª± A°n New City</h3>"
	  +"<p>ƒê∆∞·ªùng Mai ChA≠ Th·ªç, P. BA¨nh KhA°nh, Q.2, TP. HCM<br>"
	  +"Tel: <a href='tel:090 8 999 899'>090 8 999 899</a>.<br>"
	  +"</p></div>"; 
	
	  
	  var myOptions = {
	    content: boxText,
		disableAutoPan: true,
		maxWidth: 250,
		pixelOffset: new google.maps.Size(-125, -150),
		boxStyle: {background: "transparent",opacity: 1 ,width: "300px"},
		closeBoxMargin: "0",
		closeBoxzIndex: "99999",
		closeBoxPosition: "absolute",
		closeBoxURL: "../images/close3.png",
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: false,
		pane: "floatPane",
		enableEventPropagation: true
	  };
	  
	  var showinfo = new InfoBox(myOptions);
	  showinfo.open(map, marker);	
	    
	  }
	 
	 ZoomControl(map);
		 
}

       

function ZoomControl(map) {
  $('.zoom-control a').click(function ()  {
   var zoom = map.getZoom();
	switch ($(this).attr("id")) {
	case "zoom-in":
		map.setZoom(++zoom);
		break;
	case "zoom-out":
		map.setZoom(--zoom);
		break;
	default:
		break
	}
	return false
  
 });
 
 
}



function ScrollHoz() {
	var Scroll = $('.news-list, .sub-news, .sub-nav-typical, .sub-block');
	if($(window).width() <= 1100){
		if($('#news-page').length){
		    $('.scrollB').each(function(index, element) {
                 var Thumb = $(this).children().length;
				 var Width = $(this).children().width()+5;
                 $(this).width(Thumb * Width);
			 });
		}
		
       $(Scroll).css({'overflow-x':'scroll','overflow-y':'hidden','-ms-touch-action': 'auto','-ms-overflow-style' :'none', 'overflow':' -moz-scrollbars-none'});
	   $(Scroll).animate({scrollLeft: "0px"});
	   if(TouchLenght == false  || !isTouchDevice){ 
		   if($(window).width() <= 1100){
			  $(Scroll).mousewheel(function(e, delta) {
				  e.preventDefault();
				 if ($(window).width() <= 1100) {
				   this.scrollLeft -= (delta * 40);
				 }
			   });
			  
			    $(Scroll).addClass('dragscroll');
				$('.dragscroll').draptouch();
		   }
	   }
	    
	}
	 
}


function Done() {
	 $('html, body').scrollTop(0);
       ResizeWindows();
	   ScrollHoz();
	   SlidePicture();
	    $(".title-page > h2").lettering('words').children('span').lettering().children('span').lettering();
        $(".left-content h3").lettering('words').children('span').lettering().children('span').lettering();
		$(".left-content p").lettering('words').children("span").lettering();	
		 
		if(!isTouchDevice  && isMobile.all == null){
		    $('.player-vid').addClass('hide');
		  }
			 
		
		$('.map-mobile img')
		  if($('.map-mobile img').length){
			    $('.map-mobile img').addClass('pinch-zoom');
				 $('.pinch-zoom').each(function () {
				 new Pic.PinchZoom($(this), {});
				 });
			}
			
		
		 $('.container').stop().animate({'opacity':1},500 ,'linear', function () { 
		    $('.shadow').addClass('show');
			$('.mask').addClass('hide');
			 $('.loadicon').stop().fadeOut(500, function () { 
			    ContentLoad();
				 $('.loadicon').remove();
			 });
		 });
}


(function($) {
	
    if (!Array.prototype.indexOf)
	   {
	   Array.prototype.indexOf = function(elt)
             {
             var len  = this.length >>> 0;
             var from = Number(arguments[1]) || 0;
                 from = (from < 0)
                      ? Math.ceil(from)
                      : Math.floor(from);
             if (from < 0)
                 from += len;
 
                 for (; from < len; from++)
                     {
                     if (from in this &&
                     this[from] === elt)
                     return from;
                     }
             return -1;
             };
       }

    var Yheight = $(window).height();
    var Xwidth = $(window).width();	
    var qLimages = new Array;
    var qLdone = 0;
    var qLdestroyed = false;
    var qLimageContainer = "";
    var qLoverlay = "";
    var qLbar = "";
    var qLpercentage = "";
    var qLimageCounter = 0;
    var qLstart = 0;

    var qLoptions = {
        onComplete: function () {
			      $('#qLoverlay').remove();
			      $('body .item-load').remove();
			   },
        backgroundColor: "#fff",
        barColor: "#fff",
        barHeight: 1,
        percentage: true,
        deepSearch: true,
        completeAnimation: "fade",
        minimumTime: 500,
        onLoadComplete: function () {
            if (qLoptions.completeAnimation == "grow") {
                var animationTime = 100;
                var currentTime = new Date();
                if ((currentTime.getTime() - qLstart) < qLoptions.minimumTime) {
                    animationTime = (qLoptions.minimumTime - (currentTime.getTime() - qLstart));
                }

                 $('#qLbar').stop().animate({"width": "100%"}, animationTime, function () {
					    
						  $('#qLoverlay').fadeOut(200, function () {      
						         qLoptions.onComplete();
								 // if( Loadx == 0){
									//  Loadx = 1;
                                     // Done();
                                  // }
								 ResizeWindows();
								
                          });
                });
			}
		}
            
    };
	
	      
    var afterEach = function () {
        //start timer
        var currentTime = new Date();
        qLstart = currentTime.getTime();

        createPreloadContainer();
        createOverlayLoader();
    };

    var createPreloadContainer = function() {
         qLimageContainer = $('<div class="item-load"></div>').appendTo("body").css({
            display: "none",
            width: 0,
            height: 0,
            overflow: "hidden"
        });
        for (var i = 0; qLimages.length > i; i++) {
            $.ajax({
                url: qLimages[i],
                type: 'HEAD',
                success: function(data) {
                    if(!qLdestroyed){
                        qLimageCounter++;
                        addImageForPreload(this['url']);
                    }
                }
            });
        }
    };

    var addImageForPreload = function(url) {
        var image = $("<img/>").attr("src", url).bind("load", function () {
            completeImageLoading();
        }).appendTo(qLimageContainer);
    };

    var completeImageLoading = function () {
        qLdone++;

        var percentage = (qLdone / qLimageCounter) * 100;
        $(qLbar).stop().animate({
            width: percentage + "%",
            minWidth: percentage + "%"
        }, 200);

        if (qLoptions.percentage == true) {
            $(qLpercentage).text(Math.ceil(percentage) + "%");
        }

        if (qLdone == qLimageCounter) {
            destroyQueryLoader();
        }
    };

    var destroyQueryLoader = function () {
        $(qLimageContainer).remove();
        qLoptions.onLoadComplete();
        qLdestroyed = true;
    };

    var createOverlayLoader = function () {
            qLoverlay = $('<div id="qLoverlay"></div>').css({
            width: "100%",
            height: "10px",
            position: "absolute",
            zIndex:1000,
            top: 0,
            left: 0,
        }).appendTo("body");
        qLbar = $('<div id="qLbar"></div>').css({
            height: qLoptions.barHeight + "px",
            backgroundColor: qLoptions.barColor,
            width: "0%",
            position: "absolute",
            top: "0px"
        }).appendTo(qLoverlay);
        if (qLoptions.percentage == true) {
            qLpercentage = $('<div id="qLpercentage"></div>').text("0%").css({
               height: "120px",
			   width: "120px",
			   position: "absolute",
			   fontSize: "0px",
			   top: "50%",
			   left: "50%",
			   marginTop: "60px" ,
			   textAlign: "center",
			   marginLeft: "-60px",
			   color: "#fff"
            }).appendTo(qLoverlay);
        }
    };

    var findImageInElement = function (element) {
        var url = "";

        if ($(element).css("background-image") != "none") {
            var url = $(element).css("background-image");
        } else if (typeof($(element).attr("src")) != "undefined" && element.nodeName.toLowerCase() == "img") {
            var url = $(element).attr("src");
        }

        if (url.indexOf("gradient") == -1) {
            url = url.replace(/url\(\"/g, "");
            url = url.replace(/url\(/g, "");
            url = url.replace(/\"\)/g, "");
            url = url.replace(/\)/g, "");

            var urls = url.split(", ");

            for (var i = 0; i < urls.length; i++) {
                if (urls[i].length > 0 && qLimages.indexOf(urls[i]) == -1) {
                    var extra = "";
                    qLimages.push(urls[i] + extra);
                }
            }
        }
    }

    $.fn.queryLoader = function(options) {
        if(options) {
            $.extend(qLoptions, options );
        }

        this.each(function() {
            findImageInElement(this);
            if (qLoptions.deepSearch == true) {
                $(this).find("*:not(script)").each(function() {
                    findImageInElement(this);
                });
            }
        });

        afterEach();

        return this;
    };

})(jQuery);







/*window.addEventListener("load", function(){
	if(!isTouchDevice  && isMobile.all == null){
		if(!$('#index-page').length){
$('.container').prepend('<audio id="audio-hover" preload="auto"><source src="../audio/hover.mp3" type="audio/mpeg"></source></audio><audio id="audio-click" preload="auto"><source src="../audio/click.mp3" type="audio/mpeg"></source></audio>');	
		}
	};
}, false);
*/

$(document).ready(function () {
if(!isFirefox){
	if(!$('#index-page').length){
	$('head').append('<link href="../css/webkit.css" rel="stylesheet" type="text/css" >');
	}
}		
	
$('html, body').scrollTop(0);
ResizeWindows();


if(!$('.loadicon').length){
    $('body').append('<div class="loadicon" style="display:block"></div>');	
}
$('body').queryLoader({ barColor:"#fff", percentage: false, barHeight:0, completeAnimation: "grow",  minimumTime:100});	

setTimeout(function(){if( Loadx == 0){ Loadx = 1;  Done();}}, 2000);

 $('body').imagesLoaded( { background: true }, function() {
  //console.log('body background image loaded');
  if( Loadx == 0){ Loadx = 1;  Done();}
 }); 
 
});


/* imagesLoaded PACKAGED v4.1.1*/

( function( global, factory ) {
  if ( typeof define == 'function' && define.amd ) {
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    module.exports = factory();
  } else {
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}
var proto = EvEmitter.prototype;
proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
 
  var events = this._events = this._events || {};
  var listeners = events[ eventName ] = events[ eventName ] || [];
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
 
  this.on( eventName, listener );
  var onceEvents = this._onceEvents = this._onceEvents || {};
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];

  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      this.off( eventName, listener );
      delete onceListeners[ listener ];
    }
  
    listener.apply( this, args );
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

( function( window, factory ) { 'use strict';
  if ( typeof define == 'function' && define.amd ) {
   
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
  
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
   
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}


function makeArray( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    ary = obj;
  } else if ( typeof obj.length == 'number' ) {
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    ary.push( obj );
  }
  return ary;
}

// -------------------------- imagesLoaded -------------------------- //

function ImagesLoaded( elem, options, onAlways ) {
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  if ( typeof elem == 'string' ) {
    elem = document.querySelectorAll( elem );
  }

  this.elements = makeArray( elem );
  this.options = extend( {}, this.options );

  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    this.jqDeferred = new $.Deferred();
  }
  setTimeout( function() {
    this.check();
  }.bind( this ));
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];
  this.elements.forEach( this.addElementImages, this );
};

ImagesLoaded.prototype.addElementImages = function( elem ) {
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    return;
  }
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  return this.img.complete && this.img.naturalWidth !== undefined;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}


Background.prototype = Object.create( LoadingImage.prototype );
Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  $ = jQuery;
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
ImagesLoaded.makeJQueryPlugin();
return ImagesLoaded;

});
