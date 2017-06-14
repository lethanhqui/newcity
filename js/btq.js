(function ($) {
	var methods = { on: $.fn.on, bind: $.fn.bind };
	$.each(methods, function(k){
	  $.fn[k] = function () {
	  var args = [].slice.call(arguments),
	  delay = args.pop(),
	  fn = args.pop(),
	  timer;
	  args.push(function () {
	  var self = this,
	  arg = arguments;
	  clearTimeout(timer);
	  timer = setTimeout(function(){
	  fn.apply(self, [].slice.call(arg));
	  }, delay);
	});
	  return methods[k].apply(this, isNaN(delay) ? arguments : args);
	 };
	});
}(jQuery));




var timex;
var News = 0;
var Details = 0;
<!--var Has = true;-->
var doWheel = true;
var doTouch = true;
var Arrhash;
var windscroll = $(document).scrollTop();
var Itemx = $('.nav li, .social, .language, .register-form h3, .register-form .require-col .input-text, .register-form .input-but, .register-form .input-area');
var timer, timer2;  

function AnimationDelay(){
   $(Itemx).each(function(index, element) { 
		 var minDelay = 50;
         var maxDelay = 350;
		 var time = Math.floor(index) * (( maxDelay - minDelay )/2 - minDelay);
         $(this).css({'-webkit-animation-delay': time + 'ms', 'animation-delay': time + 'ms'});
   });
}

var ThisVideo = document.getElementById("video-full");
function playVid() {
	ThisVideo.play();
}
function pauseVid() {
	ThisVideo.pause();
}
function VideoFull() {
	
	 var supportsVideo = !!document.createElement('video').canPlayType;
	if (supportsVideo) {
		var videoContainer = document.getElementById('videocontainer');
		var Vid = document.getElementById('video-full');
		var videoControls = document.getElementById('videocontrols');
		Vid.controls = false;
		videoControls.setAttribute('data-state', 'visible');
		var playPause = document.getElementById('playpause');
		var Stop = document.getElementById('stop');
		var Mute = document.getElementById('mute');
		var Progress = document.getElementById('progress');
		var progressBar = document.getElementById('progressbar');
		var fullScreen = document.getElementById('fullscreen');
		var supportsProgress = (document.createElement('progress').max !== undefined);
		
		      
		   
		  if (!supportsProgress) {
			Progress.setAttribute('data-state', 'fake');
			}
		
		var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
		if (!fullScreenEnabled) {
			fullScreen.style.display = 'none';
		}
		var checkVolume = function(dir) {
			if (dir) {
				var currentVolume = Math.floor(Vid.volume * 10) / 10;
				if (dir === '+') {
					if (currentVolume < 1) {
						Vid.volume += 0.1;
					}
				}else if (dir === '-') {
					if (currentVolume > 0) {
						Vid.volume -= 0.1;
					}
				}
			
				if (currentVolume <= 0) {
					Vid.muted = true;
				}else{
					Vid.muted = false;
				}
			}
			
			changeButtonState('mute');
		}
		
		var alterVolume = function(dir) {
			checkVolume(dir);
		}
		
		var setFullscreenData = function(state) {
			videoContainer.setAttribute('data-fullscreen', !!state);
			fullScreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
		
		}
		var isFullScreen = function() {
			return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
		}
			var handleFullscreen = function() {
			if (isFullScreen()) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					}else if(document.mozCancelFullScreen){ 
					    document.mozCancelFullScreen();
					}else if (document.webkitCancelFullScreen){
					    document.webkitCancelFullScreen();
					}else if (document.msExitFullscreen){
					    document.msExitFullscreen();
					}
					 setFullscreenData(false);
					
					 
				}else{
					
					if (videoContainer.requestFullscreen){
					     videoContainer.requestFullscreen();
					}else if (videoContainer.mozRequestFullScreen){ 
					    videoContainer.mozRequestFullScreen();
					}else if (videoContainer.webkitRequestFullScreen){
						  Vid.webkitRequestFullScreen();
					}else if (videoContainer.msRequestFullscreen){ 
					    videoContainer.msRequestFullscreen();
					}
					setFullscreenData(true);
					  
				}
			}


		
		if (document.addEventListener) {
			
			Vid.addEventListener('loadedmetadata', function() {
				Progress.setAttribute('max', Vid.duration);
			});

		
			var changeButtonState = function(type) {
				
				if (type == 'playPause') {
					if (Vid.paused || Vid.ended) {
						playPause.setAttribute('data-state', 'play');
					}else{
						playPause.setAttribute('data-state', 'pause');
					}
				}else if (type == 'mute') {
					Mute.setAttribute('data-state', Vid.muted ? 'unmute' : 'mute');
				}
			}

			
			Vid.addEventListener('play', function() {
				changeButtonState('playPause');
			}, false);
			
			Vid.addEventListener('pause', function() {
				changeButtonState('playPause');
			}, false);
			
			Vid.addEventListener('volumechange', function() {
				checkVolume();
			}, false);

			
			/*PLAY PAUSE*/
			playPause.addEventListener('click', function(e) {
				if (Vid.paused || Vid.ended) {
					Vid.play();
					$('.player-vid').addClass('hide');
				}else{ 
				    Vid.pause();
					$('.player-vid').removeClass('hide');
				}
			});	
			

		   /*STOP CLOSE*/
			Stop.addEventListener('click', function(e) {
				Vid.pause();
				Vid.currentTime = 0;
				Progress.value = 0;
				changeButtonState('playPause');
				if($('#index-page').length){
			        $('.enter-site').trigger('click');
				}else{
				   $('.box-video-center').removeClass('addfull');
				   $('.player-vid').removeClass('hide');
				   $('.pic-video').removeClass('hide');
				}
				if (isFullScreen()) {
					if (document.exitFullscreen) document.exitFullscreen();
					else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
					else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
					else if (document.msExitFullscreen) document.msExitFullscreen();
					setFullscreenData(false);
					  
				}
				
			});
			
			/*MUTE SOUND*/
			Mute.addEventListener('click', function(e) {
				Vid.muted = !Vid.muted;
				changeButtonState('mute');
			});
			
			/*GO FULLSCREEN*/
			fullScreen.addEventListener('click', function(e) {
				handleFullscreen();
			});

			
			Vid.addEventListener('timeupdate', function() {
				if (!Progress.getAttribute('max')) {Progress.setAttribute('max', Vid.duration);}
				Progress.value = Vid.currentTime;
				progressBar.style.width = Math.floor((Vid.currentTime / Vid.duration) * 100) + '%';
			});

		    
			Progress.addEventListener('click', function(e) {
				var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft)) / this.offsetWidth;
				Vid.currentTime = pos * Vid.duration;
			});
			
			
			document.addEventListener('fullscreenchange', function(e) {
				setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
			});
			document.addEventListener('webkitfullscreenchange', function() {
				setFullscreenData(!!document.webkitIsFullScreen);
			});
			document.addEventListener('mozfullscreenchange', function() {
				setFullscreenData(!!document.mozFullScreen);
			});
			document.addEventListener('msfullscreenchange', function() {
				setFullscreenData(!!document.msFullscreenElement);
			});
			
			
			
			/*RETURN WHEN FINISH*/
			
			
             function myHandler(e) {
              if(!e){e = window.event;}
			      Vid.pause();
				  Vid.currentTime = 0;
				  Progress.value = 0;
				  changeButtonState('playPause');
				if($('#index-page').length){
				     $('.enter-site').trigger('click');
				}else{
				   $('.box-video-center').removeClass('addfull');
				   $('.player-vid').removeClass('hide');
				   $('.pic-video').removeClass('hide');
				}
				if (isFullScreen()) {
					if (document.exitFullscreen) document.exitFullscreen();
					else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
					else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
					else if (document.msExitFullscreen) document.msExitFullscreen();
					setFullscreenData(false);
					
				}
                       }
			 
			 Vid.addEventListener('ended',myHandler,false);
			 
			 $('.player-vid').on('click', function(e) {
				$('.box-video-center').addClass('addfull');
				$('.pic-video').addClass('hide');
				if (Vid.paused || Vid.ended){
					Vid.play();
					$('.player-vid').addClass('hide');
				}
			 });	
			 
			 
			  if(!isTouchDevice  && isMobile.all == null){
				  playPause.setAttribute('data-state', 'pause');
				  if(Details == 0){
				    $('#mute').trigger('click');
					 Details = 1;
				  }
				
				  $('.video-cover').on('click', function(e) {
				
				  if (Vid.paused || Vid.ended) {
					  Vid.play();
					  $('.player-vid').addClass('hide');
				  }else{ 
					  Vid.pause();
					  $('.player-vid').removeClass('hide');
				  }
				 
				 });
				 
			   }else{
				   
		             changeButtonState('mute');
				    playPause.setAttribute('data-state', 'pause');
		     
			   }
		
		     }
			
			
			 
	 }

}


function NavClick() {
	if(!isTouchDevice  && isMobile.all == null){
          var Click = document.getElementById("audio-click");
          var Hover = document.getElementById("audio-hover");
	}
	
    $('.nav-click').on('click', function() {
		 if($('.subscribe-icon').hasClass('active')){
			 $('.register-form').scrollTop(0);
			 $('.subscribe-icon').removeClass('active');
		     $('.register-form h3, .register-form .require-col .input-text, .register-form .input-area, .register-form .input-but').removeClass('show');
			 $('.register-form').removeClass('show');
		 }
        if ($('.nav-click').hasClass('active')) {
			if(!isTouchDevice  && isMobile.all == null){
	 		Hover.pause();  
	        Hover.currentTime = 0; 
            Click.play();
			}
			
			$('.navigation').scrollTop(0);
            $('.nav-click').removeClass('active');
			$('.sub-nav').removeClass('no-link');
            $('.overlay-menu, .navigation').removeClass('show');  
			$('html, body').removeClass('no-scroll');
			$('.corner-top, .corner-bottom, .shape-bg').removeClass('pause');
			
			if($('.slide-bg').length){
				var Full = $('.slide-bg')[0].swiper;
				Full.slideNext();
			    Full.startAutoplay();
			}
        } else {
		  if(!isTouchDevice  && isMobile.all == null){
			Click.pause();  
	        Click.currentTime = 0;    
            Hover.play();
		  }
		    $('.navigation').scrollTop(0);
            $('.nav-click').addClass('active');
			$('.sub-nav').addClass('no-link');
			$('.overlay-menu, .navigation').addClass('show');
			$('html, body').addClass('no-scroll');
			$('.corner-top, .corner-bottom, .shape-bg').addClass('pause');
			if($('.slide-bg').length){
				var Full = $('.slide-bg')[0].swiper;
			    Full.stopAutoplay();
			}
		
          }
        return false;
		
    });
	
	
	 $('.subscribe-icon').on('click', function(){
		  document.getElementById("register").reset();
		  if($('.nav-click').hasClass('active')){
			  $('.navigation').scrollTop(0);
              $('.nav-click').removeClass('active');
              $('.overlay-menu, .navigation').removeClass('show');  
		  }
	       if($('.subscribe-icon').hasClass('active')){
			   	if(!isTouchDevice  && isMobile.all == null){
			   	  Hover.pause();  
	              Hover.currentTime = 0; 
                  Click.play();
				}
			    $('html, body').removeClass('no-scroll');
				 $('.register-form').scrollTop(0);
				$('.subscribe-icon').removeClass('active');
				$('.sub-nav').removeClass('no-link');
				$('.register-form').removeClass('show');
		        $('.register-form h3, .register-form .require-col .input-text, .register-form .input-area, .register-form .input-but').removeClass('show');
			    $('.corner-top, .corner-bottom, .shape-bg').removeClass('pause');
				if($('.slide-bg').length){
				   var Full = $('.slide-bg')[0].swiper;    
				   Full.slideNext();
			       Full.startAutoplay();
			    }
				
				
	      }else{
			  	if(!isTouchDevice  && isMobile.all == null){
			      Click.pause();  
	              Click.currentTime = 0;    
                  Hover.play();
				}
			  $('html, body').addClass('no-scroll');
			   $('.register-form').scrollTop(0);
			  $('.subscribe-icon').addClass('active');
			  $('.sub-nav').addClass('no-link');
			  $('.register-form').addClass('show');
			  $('.register-form h3').addClass('show');
			  $('.corner-top, .corner-bottom, .shape-bg').addClass('pause');
			  $('.require-col').children().each(function(i){
			    var box = $(this);
			     $(box).addClass('show');
		      });
			  if($('.slide-bg').length){
				 var Full = $('.slide-bg')[0].swiper;      
			     Full.stopAutoplay();
			  }
			 
		  }
        return false;
			  
	});
		
}





function SlidePicture() {
	
	/*HOME PAGE*/
	
 if( $('#home-page').length){
	 
	 	if($('.slider-home').length){	
	      var Time = $('.slider-home').attr('data-time'); 
		  
		    var Full = new Swiper('.slide-bg', {
		    pagination: '.pagination',	
            autoplay: Time,
			speed:  1000,   
			paginationClickable: true,
			centeredSlides: true,
			slidesPerView: 1,
			keyboardControl: true,
			autoplayDisableOnInteraction: false,
			loop:true,
			//mousewheelControl: true,
			simulateTouch: true,
			effect: 'fade',
			
		 onInit: function (swiper) {
			   $('.slide-bg .item-container').eq(swiper.activeIndex).addClass('show-text'); 
			   $('.bg-home').addClass('move'); 
			  
		 },
			
		  onTransitionStart: function (swiper) {
				$('.slide-bg .item-container').removeClass('show-text');
		   },
		   onTransitionEnd: function (swiper) {
			   $('.slide-bg .item-container').eq(swiper.activeIndex).addClass('show-text'); 
			   $('.bg-home').addClass('move'); 
		   }, 
			
		  });
		  
		}

	 
	 if ($(window).width() > 1100) {
	   var HomeSlide = new Swiper('.home-slide', {
		  speed: 1000,
		  //paginationClickable: true,
		  nextButton: '.button-next',
		  prevButton: '.button-prev',
		  direction: 'vertical',
		  slidesPerView: 1,
		  keyboardControl: true,
		  mousewheelControl: true,
		  simulateTouch: false,
		  effect: 'slide',
		   onInit: function (swiper) {
			   $('.page').removeClass('play-home');
			   $('.page').eq(swiper.activeIndex).addClass('play-home'); 
			   $('.slide-news, .video-home').addClass('fadeout').removeClass('fadeinup');
			   $('.box-location, .box-intro').addClass('fadeout').removeClass('goleft goright');
			    
				  if($('.item-wrapper .page:first-child').hasClass('play-home')){
			           $('.scroll-down').addClass('show'); 
					   $('.button-next').addClass('hide');
		          }else{
					   $('.scroll-down').removeClass('show');
					   $('.button-next').removeClass('hide');
					 
				  }
			   
		   },
		   onTransitionStart: function (swiper) {
			 $('.page').removeClass('play-home');
			
			  var Full = $('.slide-bg')[0].swiper;
		         Full.stopAutoplay();
			      StopTime();
				
				$('.box-location, .box-intro').addClass('fadeout').removeClass('goleft goright');
			    $('.slide-news, .video-home').addClass('fadeout').removeClass('fadeinup');
		   },
		   onTransitionEnd: function (swiper) {
			   
			     $('.page').eq(swiper.activeIndex).addClass('play-home'); 
			   
			    if($('.slider-home').hasClass('item-active')){
		           var Full = $('.slide-bg')[0].swiper;
				    Full.slideNext();
		            Full.startAutoplay();
					addMove();
				}
				
				 if($('.item-wrapper .page:first-child').hasClass('play-home')){
			            $('.scroll-down').addClass('show'); 
						$('.button-next').addClass('hide');
						playVid();
		          }else{
					   $('.scroll-down').removeClass('show');
					   $('.button-next').removeClass('hide');
					   pauseVid(); 
					   
				  }
				
				$('.item-active .box-location').addClass('goleft');
				$('.item-active .box-intro').addClass('goright');
				$('.item-active .slide-news,.item-active .video-home').addClass('fadeinup');
				
		   }, 
		 
		 });
		 
	 }
	
	
	  $('.slide-news').BTQSlider({
		    autoPlay: 5000,
			navigation : false,
			pagination : true,
			autoHeight : true,
			stopOnHover : true,
			itemsCustom : [
				[0, 1],
				[400, 1],
				[500, 2],
				[1000, 2]
			],
			afterAction: function(el){
             this.$BTQItems.removeClass('show-news');
             this.$BTQItems.eq(this.currentItem).addClass('show-news');
	        }
          });
	 
    }
	
	
	
		  	  
	/*ABOUT PAGE*/	  	  
     if($('#about-page').length){
		$('.shadow').addClass('color'); 
	 if ($(window).width() > 1100) {
		 
		 if(isIE9 ||  isIE10 || isIE11 || isEdge ){
	      var Effect = 'slide'
        }else{
	      var Effect = 'coverflow'
        } 
		 
		 
	    var AboutSlide = new Swiper('.slide-about', {
	      speed: 1000,
		  nextButton: '.button-next',
		  prevButton: '.button-prev',
		  direction: 'vertical',
		  slidesPerView: 1,
		  //hashnav: true,
		  keyboardControl: true,
		  mousewheelControl: true,
		  simulateTouch: false,
		  effect: Effect,
		  coverflow: {
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
		 // loop:true,
        
		onInit: function (swiper) {
			  $('.page').removeClass('ani-text');
		      $('.page').eq(swiper.activeIndex).addClass('ani-text'); 
			  ScrollNiceA();
			  
			     if($('.item-wrapper .page:first-child').hasClass('ani-text')){
			           $('.scroll-down').addClass('show'); 
		          }else{
					   $('.scroll-down').removeClass('show');
				  }
			   
		 },
	     onTransitionStart: function (swiper) {
			   $('.ani-text .content-box').addClass('flipoutx');
			   $('.page').removeClass('ani-text');
			   $('.sub-nav li').removeClass('current  active');
			   
			   var Index = $('.item-active').attr('data-hash');
			  $('.sub-nav li a[data-name= "' + Index + '"]').parent().addClass('current active');
			   ScrollNiceHide();
		 },
		 onTransitionEnd: function (swiper) {
			  $('.content-box').removeClass('flipoutx');
			  $('.page').eq(swiper.activeIndex).addClass('ani-text'); 
			  var Index = $('.ani-text').attr('data-hash');
			
			  ScrollNiceA();
			  
				 if($('.item-wrapper .page:first-child').hasClass('ani-text')){
			                    $('.scroll-down').addClass('show'); 
		                    }else{
					$('.scroll-down').removeClass('show');
				}
				  
		  $('.ani-text .content-box').one(animationEnd, function() {
                             $('.sub-nav li a[data-name= "' + Index + '"]').parent().removeClass('active');
                     });  
				
         }, 
		 
	   
       });
		   
		     
	   }
	   
	   
	 }
	 
	 
	 	/*LIBRARY*/
		
	  if($('#library-page').length){
		 
	  if ($(window).width() > 1100) {
	    var LibrarySlide = new Swiper('.slide-library', {
	    speed: 1000,
		nextButton: '.button-next',
		prevButton: '.button-prev',
		direction: 'vertical',
		slidesPerView: 1,
		//hashnav: true,
		keyboardControl: true,
		mousewheelControl: true,
		simulateTouch: false,
		effect: 'slide',
        //loop:true,    
		
		 onInit: function (swiper) {
			  
			  $('.page').removeClass('show-lib');
		      $('.page').eq(swiper.activeIndex).addClass('show-lib'); 
			  if($('.item-wrapper .page:first-child').hasClass('show-lib')){
			           $('.scroll-down').addClass('show'); 
		          }else{
				  $('.scroll-down').removeClass('show');
			 }
			
		 },
	     onTransitionStart: function (swiper) {
			  $('.show-lib .lib-item-slide,.show-lib .box-library h3').addClass('flipoutx');
			  $('.page').removeClass('show-lib');
			  $('.sub-nav li').removeClass('current  active'); 
			  var Index = $('.item-active').attr('data-hash');
			  $('.sub-nav li a[data-name= "' + Index + '"]').parent().addClass('current active');
			  
		 },
		 onTransitionEnd: function (swiper) {
			 $('.lib-item-slide, .box-library h3').removeClass('flipoutx');
			 $('.page').eq(swiper.activeIndex).addClass('show-lib'); 
			  var Index = $('.show-lib').attr('data-hash');
			  //$('.sub-nav li a[data-name= "' + Index + '"]').parent().addClass('current active');
			     
				 if($('.item-wrapper .page:first-child').hasClass('show-lib')){
			           $('.scroll-down').addClass('show'); 
		          }else{
					   $('.scroll-down').removeClass('show');
				  }
				  
				  
		     $('.show-lib .lib-item-slide').one(animationEnd, function() {
                             $('.sub-nav li a[data-name= "' + Index + '"]').parent().removeClass('active');
                          });   
				  
				  
         }, 
	   
       });
	
	   }
	   
	   
	   
			 $('.pdf-slide').BTQSlider({
				singleItem : true, 
			    pagination : true,
				navigation : true,
			    slideSpeed: 600,
                paginationSpeed: 600,
				rewindNav : false,
				afterAction: function(el){
				  this.$BTQItems.removeClass('select');
				  this.$BTQItems.eq(this.currentItem).addClass('select');
				   Check();
				 }
			  });
	   
	   
	        $('.video-slide').BTQSlider({
			    pagination : true,
				navigation : true,
			    slideSpeed: 600,
                paginationSpeed: 600,
				rewindNav : false,
				autoHeight : true,
				itemsCustom : [
					  [0, 1],
					  [300, 1],
					  [400, 1],
					  [500, 1],
					  [600, 2],
					  [700, 2],
					  [800, 2],
					  [900, 2],
					  [1000, 2],
					  [1100, 2],
					  ],
					   afterAction: function(el){
			          this.$BTQItems.removeClass('select');
			          this.$BTQItems.eq(this.currentItem).addClass('select');
					   Check();
				     }
			  });
	        
		 
			$('.pic-slide').BTQSlider({
			    pagination : true,
				navigation : true,
			    slideSpeed: 600,
                paginationSpeed: 600,
				rewindNav : false,
				autoHeight : true,
				itemsCustom : [
					  [0, 1],
					  [300, 1],
					  [400, 1],
					  [500, 1],
					  [600, 2],
					  [700, 2],
					  [800, 2],
					  [900, 2],
					  [1000, 2],
					  [1100, 2],
					  ],
					   afterAction: function(el){
			          this.$BTQItems.removeClass('select');
			          this.$BTQItems.eq(this.currentItem).addClass('select');
					  Check();
				     }
			  });
			  
			  
		    
	     }
	
	 
	
       	//FACILITIES PAGE//
	
	if($('#facilities-page').length){
		 
	  if ($(window).width() > 1100) {
	  
	    var FaciSlide = new Swiper('.slide-facilities', {
	    speed: 1000,
		nextButton: '.button-next',
		prevButton: '.button-prev',
		direction: 'vertical',
		slidesPerView: 1,
		keyboardControl: true,
		mousewheelControl: true,
		simulateTouch: false,
		effect: 'slide',
        
		
		 onInit: function (swiper) {
			  $('.page').removeClass('ani-text');
		      $('.page').eq(swiper.activeIndex).addClass('ani-text'); 
			   $('.ani-text .dot-top').children().each(function(i){
					  var box = $(this);
					  setTimeout(function(){$(box).addClass('fadeindown')}, (i+1) * 200);
				  });
			  ScrollNiceA();
			  if($('.item-wrapper .page:first-child').hasClass('ani-text')){
			           $('.scroll-down').addClass('show'); 
		          }else{
					   $('.scroll-down').removeClass('show');
				  }
		 },
	     onTransitionStart: function (swiper) {
			  $('.dot-top, .note-facilities, .content-box, .facilities-pic').addClass('flipoutx');
			  $('.page').removeClass('ani-text');
			  $('.sub-faci li').removeClass('current'); 
			  $('.note-facilities').removeClass('show');
			  $('.dot-top a').removeClass('fadeindown');
			  $('.facilities-pic').removeClass('fadeinup');
			  $('.faci-slide').trigger('BTQ.stop');
			  $('.dot-top a, .note-facilities li').removeClass('current');
			  $('.show-box-pic').removeClass('showup');
			   ScrollNiceHide();
			   
			   
		 },
		 
		 onTransitionEnd: function (swiper) {
			  $('.dot-top, .note-facilities, .content-box, .facilities-pic').removeClass('flipoutx');
			 $('.page').eq(swiper.activeIndex).addClass('ani-text'); 
			  var Index = $('.ani-text').attr('data-hash');
			  $('.sub-faci li a[data-name= "' + Index + '"]').parent().addClass('current');
			   ScrollNiceA();
			     
				 if($('.item-wrapper .page:first-child').hasClass('ani-text')){
			           $('.scroll-down').addClass('show'); 
		          }else{
					   $('.scroll-down').removeClass('show');
				  }
				  
				  $('.ani-text .dot-top').children().each(function(i){
					  var box = $(this);
					  setTimeout(function(){$(box).addClass('fadeindown')}, (i+1) * 200);
				  });
		           $('.ani-text .faci-slide').trigger('BTQ.play', 3000);
						
                }, 
	   
             });
	      }
		 
		 
			 $('.faci-slide').BTQSlider({
				transitionStyle:'goDown' ,
				singleItem : true, 
			        pagination : true,
				navigation : true,
				//autoPlay: 3000,
			        slideSpeed: 600,
                                      paginationSpeed: 600,
				autoHeight : true,
				stopOnHover : true,
				lazyLoad : true,
				
				afterAction: function(el){
				  this.$BTQItems.removeClass('show-pic');
				  this.$BTQItems.eq(this.currentItem).addClass('show-pic');
				   Check();
				 }
			  });
		 
		 
	
	     }
		 
		 
		 
		//APARTMENT PAGE//
	
	if($('#apartment-page').length){
		 
	  if ($(window).width() > 1100) {
	  
	    var ApartSlide = new Swiper('.slide-block', {
	    speed: 1000,
		nextButton: '.button-next',
		prevButton: '.button-prev',
		direction: 'vertical',
		slidesPerView: 1,
		keyboardControl: true,
		mousewheelControl: true,
		simulateTouch: false,
	    hashnav: true,
		
		 onInit: function (swiper) {
			  $('.page').removeClass('ani-block');
		      $('.page').eq(swiper.activeIndex).addClass('ani-block'); 
			  $('.ani-block .typical-top').children().each(function(i){
					  var box = $(this);
					  setTimeout(function(){$(box).addClass('fadeindown')}, (i+1) * 200);
			   });
			   
			    if($('.item-wrapper .page:first-child').hasClass('ani-block')){
			           $('.scroll-down').addClass('show'); 
		          }else{
					   $('.scroll-down').removeClass('show');
				  }
					
			
		 },
	     onTransitionStart: function (swiper) {
			  $('.typical-name, .note-block').removeClass('fadeindown').addClass('flipoutx');
			  $('.page').removeClass('ani-block');
			  $('.note-block li').removeClass('current'); 
		 },
		 
		 onTransitionEnd: function (swiper) {
			  $('.typical-name, .note-block').removeClass('flipoutx');
			 $('.page').eq(swiper.activeIndex).addClass('ani-block'); 
			  var Index = $('.ani-block').attr('data-hash');
			  $('.note-block li a[data-name= "' + Index + '"]').parent().addClass('current');
			     
				 if($('.item-wrapper .page:first-child').hasClass('ani-block')){
			           $('.scroll-down').addClass('show');
		          }else{
					   $('.scroll-down').removeClass('show');
				  }
				  
				  
				  $('.ani-block .typical-top').children().each(function(i){
					  var box = $(this);
					  setTimeout(function(){$(box).addClass('fadeindown')}, (i+1) * 200);
				  });
						
                }, 
	   
             });
	      }
		  
		  
		   $('.slide-plan').each(function(index, element) {
            
			 $(element).BTQSlider({
				singleItem : true, 
			    pagination : false,
				navigation : false,
			    slideSpeed: 1000,
				//transitionStyle:'backSlide' ,
				lazyLoad : true,
				afterAction: function(el){
				  this.$BTQItems.removeClass('show-plan');
				  this.$BTQItems.eq(this.currentItem).addClass('show-plan');
				  var Select = this.$BTQItems.eq(this.currentItem).parent().parent().parent().parent();
				    $(Select).find('.sub-block li').removeClass('current'); 
				     var Name = this.$BTQItems.eq(this.currentItem).find('.item-plan').attr('data-plan');
					 $(Select).find('.sub-block li a[data-name= "' + Name + '"]').parent().addClass('current');
				    if($(window).width() <=1100){
					  detectBut();
					}
			        // window.location.hash = Name; 
				 }
			  });
		 
		    });
		
		  
	  } 
		 
	   
	   //  APARTMENT DETAILS  
		 
		if($('#apartment-detail-page').length){
			
			
		var HouseSlide = new Swiper('.slide-apartment', {
	         speed: 600,
		zoom: true, 
		lazyLoading: true,
		watchSlidesVisibility: true,
		preloadImages: false,
		slidesPerView: 1,
		hashnav: true,
		keyboardControl: true,
		mousewheelControl: true,
		
		
		 onInit: function (swiper) {
			  $('.house').removeClass('show-details');
		      $('.house').eq(swiper.activeIndex).addClass('show-details'); 
			  $('.show-details').find('.lazy-preloader').remove();
			if($(window).width() > 1100){
				swiper.enableMousewheelControl();
			}else{
				swiper.disableMousewheelControl();
			}
			
			 $('.container-zoom img').addClass('zoomscale');
			
		 },
	     onTransitionStart: function (swiper) {
			  $('.house').removeClass('show-details');
			  $('.sub-nav-typical li').removeClass('current'); 
			 

		 },
		 onTransitionEnd: function (swiper) {
			
			  $('.house').eq(swiper.activeIndex).addClass('show-details'); 
			  $('.show-details').find('.lazy-preloader').remove();
			  var Index = $('.show-details').attr('data-hash');
			  $('.sub-nav-typical li a[data-name= "' + Index + '"]').parent().addClass('current');
			 $('.container-zoom').removeClass('zoomin');
			  $('.container-zoom img').removeClass('zoomin');
				
			   if($(window).width() <=1100){
					 detectBut();
					 setTimeout(function(){ swiper.onResize();}, 300);
				}
				  
                  }, 
	   
             });
	   
	   
	   
	 }
	

	
}


function Check() {
	
	if($('#library-page, #facilities-page').length){			
	 $('.slide-buttons').each(function(index, element) {
		  var Height = $(this).parent().parent().innerHeight();
		 $(element).css({'top': - Height/2});
	 });
	}
	
	
     $('.pic-slide').each(function(index, element) {
		  var Length = $(element).find('.slide-item').length;
		   if($(window).width() > 610){
				 if(Length>2){
					 $(element).find('.slide-item').css({'display':'block', 'float':'left', 'margin':0});
				 }else{
					 $(element).find('.slide-wrapper').css({'width':'100%'});
					 $(element).find('.slide-item').css({'display':'inline-block', 'float':'none', 'margin':'0 -5px'});
				 }
			}else{
				$(element).find('.slide-item').css({'display':'block', 'float':'left', 'margin':0});
			}
	   });
	   
	   
	 $('.video-slide').each(function(index, element) {
		  var Length = $(element).find('.slide-item').length;
			if($(window).width() > 610){
				 if(Length>2){
					 $(element).find('.slide-item').css({'display':'block', 'float':'left', 'margin':0});
				 }else{
					 $(element).find('.slide-wrapper').css({'width':'100%'});
					 $(element).find('.slide-item').css({'display':'inline-block', 'float':'none', 'margin':'0 -5px'});
				 }
			}else{
				$(element).find('.slide-item').css({'display':'block', 'float':'left', 'margin':0});
			}
	   });
	   
	 if($(window).width() <= 1100){  
	    $('.video-slide .slide-pagination, .pic-slide .slide-pagination, .pdf-slide .slide-pagination').addClass('grey');
	 }else{
		 $('.video-slide .slide-pagination, .pic-slide .slide-pagination, .pdf-slide .slide-pagination').removeClass('grey');
	 }

}



function StopTime() {
	if(timer > 0 || timer2 > 0){
		clearTimeout(timer);
		clearTimeout(timer2);
		timer = 0;
		timer2 = 0;
	}
	  $('.left-content').removeClass('move');
	  $('.left-content h3').children().children().removeClass('move');
	  $('.left-content p').children().removeClass('move');
	  $('.box-text').removeClass('show end');
}

		 
function addMove() {
     
	  $('.left-content').addClass('move');	
	 
	  var Lengh = $('.left-content h3').children().children().length;
	  var Lengh2 = $('.left-content p').children().length;	
      var Time = (200 * Lengh);
	  var Time2 = (150 * Lengh2);
	  setTimeout(function(){ $('.box-text').addClass('show');}, Time);
	  setTimeout(function(){ $('.box-text').addClass('end');}, Time2);
	 
	   $('.move h3').children().children().each(function(i){
		var box = $(this);
		 timer = setTimeout(function(){$(box).addClass('move')}, (i+1) * 250);
	   });
	  setTimeout(function(){ 
	   $('.show p').children().each(function(i){
		 var box = $(this);
		 timer2 =  setTimeout(function(){$(box).addClass('move')}, (i+1) * 100);
	   });
	   }, Time);
	   
	    
} 

function AniText() {
		$('.title-page').addClass('show');
	   	$('.title-page h2').children().children().each(function(i){
		var box = $(this);
		   setTimeout(function(){$(box).addClass('move')}, (i+1) * 100);
	   });
	   
}



function NewsLoad(url, ShowDetails) {
       $.ajax({url: url, cache: false, success: function(data) {
             $(ShowDetails).find('.news-content').append(data);
          
			   
			   $('.news-text img').addClass('zoom-pic');
			   ZoomPic();
			  
			  $('.news-text a, .news-text p a').on('click', function (e) {
	               e.preventDefault();
	               var  url = $(this).attr('href');
	              window.open(url, '_blank');
                  return false;
               });  
			   
			 
			 $(ShowDetails).find('.news-content').stop().animate({'opacity': 1}, 100, 'linear', function() {
                  if ($(window).width() > 1100) {
					 ScrollNiceC();
					  var Top =  $(ShowDetails).find('.link-page.current').offset().top;
					  var H =  $(ShowDetails).find('.news-list').offset().top;
					 if(News == 0){
					    $(ShowDetails).find('.scrollB').stop().animate({scrollTop: Top - H});
					  News = 1;
					 }
					 
				 }else{
					  var Height = $('.colum-box.active').innerHeight();
					   $('.box-content').css({'height':Height});
					   $('.news-text').imagesLoaded(function() {
					     var Height = $('.colum-box.active').innerHeight();
					     $('.box-content').css({'height':Height});
					   });
					 detectBut();
				 }
				 
				   $('.news-text').addClass('fadein'); 
				   $('.news-list').removeClass('no-link');
				   $('.loadicon2').fadeOut(300, 'linear', function() {
				         $('.loadicon2').remove();
                    });
				 
                
			  }); 
			

        }
		
    });
}








function VideoLoad(idx) {
    $.ajax({url: idx, cache: false, success: function(data) {
            $('.allvideo').append(data);
			  var ThisVideo = document.getElementById("view-video");
            function playVid() {
                ThisVideo.play();
            }
            function pauseVid() {
                ThisVideo.pause();
            }
			
			$('.loadicon').fadeOut(300, 'linear', function () {
				playVid();
			    $('.loadicon').remove();
		      });
			
          
            var length = $('#view-video').length;
            $('.close-video').on( 'click',function() {
				
                if (length != 0) {
                    pauseVid();
                }
              
                $('.allvideo').fadeOut(500, 'linear', function() {
                    $('.overlay-dark').removeClass('show');
                    $('.allvideo .video-list').remove();  
					$('html, body').removeClass('no-scroll');
					
					if($('.to-scrollV').length) {
						var top = $('.to-scrollV').offset().top;
						$('.to-scrollV').removeClass('to-scrollV');
						
						if($(window).width() < 1100) {
							$('html, body').scrollTop(top - 60);
						}
					}
					
					
                });
		 
		    });
       }
		
		
   });
}





function AlbumLoad(url,num) {
    $.ajax({url: url, cache: false, success: function(data) {
            $('.all-album').append(data);
			
			if($('.all-album .album-load').length >1){
				$('.all-album .album-load').last().remove();
			}
			
			 $(".pic-name > h3").lettering('words').children("span").lettering().children("span").lettering();
			 $(".pic-name > small").lettering('words').children("span").lettering().children("span").lettering();
		       
			       	   if ($(window).width() > 1100) {
							var ZOOM = 2;
					    }else if ($(window).width() > 740 && $(window).width() <= 1100) {	
						   var ZOOM = 3;
						}else{
							var ZOOM = 4;
						}
				
					   var slideAlbum = new Swiper('.album-center', {
						zoom: true, 
						zoomMax: ZOOM,
						lazyLoading: true,
						watchSlidesVisibility: true,
						preloadImages: false,
						slidesPerView: 1,
						speed: 600,
						grabCursor: true,
						nextButton: '.next-pic',
						prevButton: '.prev-pic',
						spaceBetween: 0,
						centeredSlides: true, 
						keyboardControl: true,
						mousewheelControl: true,
						onInit: function (swiper) {
						  swiper.slideTo(num, 0, true);
						  addText();
						  if(ZOOM > 1){
							   $('.container-zoom img').addClass('zoomscale');
						  }
						   
					   },	
					   onTransitionStart: function (swiper) {
						  
					   },
					   onTransitionEnd: function (swiper) {
		                        
						  $('.container-zoom img').removeClass('zoomin');
						  $('.close-album, .slide-pic-nav').removeClass('level-index-out');
						 addText();
						 
					   }, 
					
					});
	                
					
				   
				 
			 function addText() {
					 clearTimeout(timex);
					 $('.pic-name').removeClass('move');	
					 $('.pic-name h3').children().children().removeClass('move');
					 $('.pic-name small').children().children().removeClass('move');
					 $('.item-active').find('.pic-name').addClass('move');
					 $('.move h3, .move  small').children().children().each(function(i){
						 	var box = $(this);
							var timex = setTimeout(function(){$(box).addClass('move')}, (i+1) * 100);
					 });
					
				}
				 
				
			 $('.album-load').animate({'opacity':1}, 100, 'linear', function() {
				 if ($('.album-pic-center').length > 1) {
                    $('.slide-pic-nav').css({'display': 'block'});
                 }
				 
				 $('.loadicon').fadeOut(300, 'linear', function() {
					 $('.loadicon').remove();
                   });
			  });



		     $('.close-album').on("click" ,function() {
				
				if($('#facilities-page').length){
				 $('.faci-slide').trigger('BTQ.play', 3000);
			    }
				
				$('.all-album').fadeOut(500, 'linear', function() {
					$('.overlay-dark').removeClass('show');
                    $('.album-load').remove();
                });
                 
				$('html, body').removeClass('no-scroll');
				
                return false;
            });
			
           	
           var overlay = document.querySelector('.all-album');
		    overlay.addEventListener("touchmove", function(event) {
			event.preventDefault();
		  });


   }});
}



function ZoomMap() {
		 $('.viewer').addClass('desktop').addClass('fadein');
		  
		  
		 var $viewer = $('.viewer');
		  $viewer.find('.panzoom').panzoom({
			$zoomIn: $viewer.find(".pic-zoom-in"),
			$zoomOut: $viewer.find(".pic-zoom-out"),
			$zoomRange: $viewer.find(".zoom-range"),
			$reset: $viewer.find(".pic-reset"),
			//startTransform: 'scale(0.52)', 
			  maxScale: 4,
			  minScale: 1,
			  increment: 0.3,
			  contain: 'automatic'
			  }).panzoom('zoom');
	  if(!$('#about-page').length){
	     var $panzoom = $viewer.find('.panzoom').panzoom();
          $panzoom.on('mousewheel.focal', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
              increment: 0.1,
              animate: false,
              focal: e
            });
          });
	  }
	   $('.map-img').addClass('show'); 
	   ScaleMap();
	   setTimeout(function(){ $('.apartment-pointer').addClass('show');}, 1000);
	     if(!$('#about-page').length){
	   setTimeout(function(){ $('.location').addClass('ani-text'); ScrollNiceA();}, 500);  
		 }
}

function ScaleMap(){
	$('.panzoom').css({'-webkit-transform':'matrix(1, 0, 0, 1, 0, 0)', 'transform':'matrix(1, 0, 0, 1, 0, 0)'});
	var scaleMap =  $('.container').height()/1580;
	$('.map-img.show').scale(scaleMap);
	
	
}


function FocusText(){
	var txtholder = 'Họ v�  Tên (*)  Điện thoại (*) Email (*)  Địa chỉ Số CMND (*) Full name (*)  Phone numbers (*) Address ID card (*)';
	var txtRep = "";
	$('input').focus(function () {
		txtRep = $(this).val();
		if (txtholder.indexOf(txtRep) >= 0) {
			$(this).val("");
		}
	});
   $('input').focusout(function () {
		if ($(this).val() == "") $(this).val(txtRep);
	});
	  var cur_text="";
	   $('textarea').focus(function(){
		cur_text =  $(this).val();
			$(this).val('')}).focusout(function(){
				if($(this).val() == "") 
				  $(this).val(cur_text)
	});
		
				
}


function ScrollNiceA() {
	if($(window).width() <= 1100){
		$('.scrollA').getNiceScroll().remove();
		$('.scrollA').css({'overflow-x':'visible','overflow-y':'visible'});
	}else{
		$('.ani-text .scrollA').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.ani-text .scrollA').getNiceScroll().show();
        $('.ani-text .scrollA').niceScroll({touchbehavior:true, horizrailenabled: false, cursordragontouch:true,grabcursorenabled: false});
		$('.ani-text .scrollA').animate({scrollTop: "0px"});
     }
	
}

function ScrollNiceB() {
   if($(window).width() <= 1100){
		ScrollHoz();
	}else{
		$('.scrollB').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollB').getNiceScroll().show();
        $('.scrollB').niceScroll({touchbehavior:true, horizrailenabled: false, cursordragontouch:true,grabcursorenabled: false, cursorcolor:"#fff"});
		 if(News == 0){
		  $('.scrollB').animate({scrollTop: '0px'});
		 }
     }
}
function ScrollNiceC() {
   if($(window).width() <= 1100){
		$('.scrollC').getNiceScroll().remove();
		$('.scrollC').css({'overflow-x':'visible','overflow-y':'visible'});
	}else{
		$('.scrollC').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollC').getNiceScroll().show();
        $('.scrollC').niceScroll({touchbehavior:true, horizrailenabled: false, cursordragontouch:true,grabcursorenabled: false});
		$('.scrollC').animate({scrollTop: "0px"});
     }
}

function ScrollNiceD() {
	if($(window).width() <= 1100){
		$('.scrollD').getNiceScroll().remove();
		$('.scrollD').css({'overflow-x':'visible','overflow-y':'visible'});
	}else{
		$('.scrollD').css({'overflow-x':'hidden','overflow-y':'hidden'});
        $('.scrollD').getNiceScroll().show();
        $('.scrollD').niceScroll({touchbehavior:true, horizrailenabled: false, cursordragontouch:true,grabcursorenabled: false});
		$('.scrollD').animate({scrollTop: "0px"});
     }
	
}



function ScrollNiceHide() {
    $('.scrollA, .scrollB, .scrollC').getNiceScroll().remove();
}



function LinkPage(){
	  $('a.link-load, a.link-home, a.go-page, .go-details,  .go-back, .typical-name a, .link-back,  a.go-back, a.house, .go-link,.apartment-pointer a, .details li a, .go-home, .link-icon a, .go-apartment, .logo a, .enter-site, .house-name').on( 'click',function(e){
	   e.preventDefault();
	    $('.mask').removeClass('hide');
	  
	   ScrollNiceHide();
	   $('html, body').addClass('no-scroll');
		var linkLocation =  $(this).attr("href");
		 $('.container').stop().animate({'opacity':1},500 ,'linear', function () { 
		 window.location = linkLocation;
		 });
	 return false;
	});
	
}





function ContentLoad(){
    ResizeWindows();
	AnimationDelay();
    LinkPage();
    FocusText();
	NavClick();
	//SlidePicture();
	Option();
	ZoomPic();
	
	  var IDPage = $('body').attr('id');
	  $('.nav li a[data-name= "' + IDPage + '"]').parent().addClass('current');
	  
	  
	  $('html, body').removeClass('no-scroll'); 
	
	if(!$('#home-page').length){
		 $('.logo').css({'cursor':'pointer'});
		 $('.logo').on( 'click',function() {
			 $('a.link-home').trigger('click');
		});
	}
	
	if($('.sub-news li').length>=2){
		$('.sub-news').css({'display':'block'});
	}else{
		$('.sub-news').css({'display':'none'});
	}

	   
	    if($('.video-full').length){
		   VideoFull();
	    }
	
	
	
	setTimeout(function(){ AniText();$('.logo, .nav-click, .shape-bg').addClass('show');}, 300);
	setTimeout(function(){$('.footer').addClass('fadeinup'); $('.corner-top, .corner-bottom, .hotline, .subscribe-icon, .enter-site').addClass('show');}, 500);	
	setTimeout(function(){$('.next-prev').addClass('fadeinup');}, 800);	
	setTimeout(function(){ $('.sub-nav, .sub-news, .sub-faci, .left-apartment').addClass('show')}, 1000);
	
	
	 setTimeout(function(){ 
	   $('.bottom-house').children().each(function(i){
		 var box = $(this);
		 setTimeout(function(){$(box).addClass('show')}, (i+1) * 300);
	    });
	  }, 1000);

    if($('#index-page').length){
	
		if(!isTouchDevice  && isMobile.all == null){
           $('.player-vid').trigger('click');
		}
	}
   
   
   //HOME PAGE//
    if($('#home-page').length){
	 	  $('.link-home').addClass('current');
		  $('.whell').addClass('show');
		  addMove();
		  
			   $('.box:not(.video-home)').on( 'click',function(e){
				 e.preventDefault();
				$(this).find('.go-details').trigger('click');
			  });
			  
			    $('.box.video-home').on( 'click',function(e){
				 e.preventDefault();
				$(this).find('.player').trigger('click');
			  });
			  
		 if(!isTouchDevice  && isMobile.all == null){
           $('.player-vid').trigger('click');
		}
		         
	  }
	  
	
 //ABOUT PAGE//
    if($('#about-page').length){
		$('.whell').addClass('show');
		 
		 $('.sub-nav li').on('click', function (e) {
            e.preventDefault();
            $('.sub-nav li').removeClass('current');
            $(this).addClass('current');
			 var Name = $(this).find('a').attr('data-name');
				 //window.location.hash = Name;
				  
				  if ( $(window).width() > 1100) { 
				      var AboutSlide = $('.slide-about')[0].swiper;
					   var Num = $(".item-container[data-hash='" + Name + "']").index();
					   AboutSlide.slideTo(Num, 1000, true);
					   
				  }
				   return false;
			    });
				
			   if($(window).width() > 1100){
				ZoomMap();
		       }
			
			  if ( $(window).width() > 1100) { 
					  $('.sub-nav li:first-child').trigger('click');
			  }
				
	 }
	 

  //LOCATION ZONES PAGE//
	   if($('#location-page, #zones-page').length){
		  if($(window).width() > 1100){
				ZoomMap();
		  }else{
			  $('.content-box').addClass('fadeinup');
		  }
		}
	
	
		 //FACILITIES PAGE//
	if($('#facilities-page').length){
			$('.whell').addClass('show');  
		 $('.sub-faci li').on('click', function (e) {
            e.preventDefault();
            $('.sub-faci li').removeClass('current');
            $(this).addClass('current');
			 var Name = $(this).find('a').attr('data-name');
			
				  
				  if ( $(window).width() > 1100) { 
				       var FaciSlide = $('.slide-facilities')[0].swiper;
					   var Num = $(".item-container[data-hash='" + Name + "']").index();
					   FaciSlide.slideTo(Num, 1000, true);
				  }
				   return false;
			    });
				
						  
			 
			$('.dot-top a').on('mouseenter', function () {
				$('.dot-top a, .note-facilities li').removeClass('current');
			    $(this).addClass('current');
				$('.show-box-pic').removeClass('showup');
				 var id = $(this).attr('data-show');
				 var Lx = $(this).offset().left;
				 var Tx = $(this).offset().top;
				 var Width = $(this).width();
				 var Height = $(".show-box-pic").innerHeight();
				 var W = $(".show-box-pic").width();
				
				  if($(window).width() > 1100){
					  $(".note-facilities li a[data-text='" + id + "']").parent().addClass('current');
					  $(".show-box-pic[data-pic='" + id + "']").css({'left': Lx - (Width + 147), 'top':Tx - (Height+120)});
					  $(".show-box-pic[data-pic='" + id + "']").addClass('showup');
				  }else{
				      $(".note-facilities li a[data-text='" + id + "']").parent().addClass('current');
					    if($(window).width() <= 680){
					        $(".show-box-pic[data-pic='" + id + "']").css({'left':  $(window).width()/2 - 100, 'top':Tx - Height});
						}else{
							$(".show-box-pic[data-pic='" + id + "']").css({'left':  Lx - (W/2 -10), 'top':Tx - (Height+100)});
						}
					  $(".show-box-pic[data-pic='" + id + "']").addClass('showup');
					  
				  }
				 
				 
			 });
			 
			    $('.note-facilities li a').on('mouseenter', function () {
			         var idx = $(this).attr('data-text');
					 var Active = $(".dot-top a[data-show ='" + idx + "']"); 
					$('.dot-top a, .note-facilities li').removeClass('current');
					$(Active).addClass('current');
					$('.show-box-pic').removeClass('showup');
					$(".dot-top a[data-show='" + idx + "']").trigger('mouseenter');
			   });
		    
				$('.note-facilities li').on('mouseleave', function () {
						$('.dot-top a, .note-facilities li').removeClass('current');
						$('.show-box-pic').removeClass('showup');
				 });
				 
				 $('.dot-top').on('click', function () {
					 if($(window).width() > 1100){
						$('.dot-top a, .note-facilities li').removeClass('current');
						$('.show-box-pic').removeClass('showup');
					 }
				 });
			 
			 
			 //ZOOM PIC
			  $('.dot-top a').on('click', function (e) {
	              e.preventDefault();
				  if ( $(window).width() > 1100) { 
				   var picx = $(this).attr('data-show');
				    if(picx !== ""){
				    var img = $(".show-box-pic[data-pic='" + picx + "']").find('img').attr("src");
				    ThumbZoom(img);
					$('.dot-top a, .note-facilities li').removeClass('current');
					$('.show-box-pic').removeClass('showup');
				   }
				  }
			  });
			  
			   $('.note-facilities li').on('click', function (e) {
					e.preventDefault();
					var idx = $(this).find('a').attr('data-text');
				   $(".dot-top a[data-show='" + idx + "']").trigger('click');
				});
			  
			
			  $('.show-box-pic').on('click', function (e) {
	              e.preventDefault();
				   var img = $(this).find('img').attr("src");
				   ThumbZoom(img);
				   $('.dot-top a, .note-facilities li').removeClass('current');
				  $('.show-box-pic').removeClass('showup');
			  });  
			  
				
			if ( $(window).width() > 1100) { 
					  $('.sub-faci li:first-child').trigger('click');
			   }    
							 
			  
			   
	}
	
		  //APARTMENT PAGE//
	if($('#apartment-page').length){
		
		$('.whell').addClass('show');  
			
		$('.note-block li').on('click', function (e) {
             e.preventDefault();
            $('.note-block li').removeClass('current');
            $(this).addClass('current');
			 var Name = $(this).find('a').attr('data-name');
			
			  window.location.hash = Name; 
			 
			 	  if ( $(window).width() > 1100) { 
				       var ApartSlide = $('.slide-block')[0].swiper;
					   var Num = $(".item-container[data-hash='" + Name + "']").index();
						 ApartSlide.slideTo(Num, 1000, true);
					  
				  }
				   return false;
			    });
		  
		
		      $('.typical-top a, .block-name').on('click', function (e) {
				     e.preventDefault();
						$('.typical-top a, .note-block li').removeClass('current');
						$('.block-name').removeClass('show');
						$('.typical-block').removeClass('show');
						 var Name = $(this).attr('data-name');
						 
					  if ( $(window).width() > 1100) { 
				           var ApartSlide = $('.slide-block')[0].swiper;
					      var Num = $(".item-container[data-hash='" + Name + "']").index();
					      ApartSlide.slideTo(Num, 1000, true);
				       }else{ 
						 var Top = $(".item-container[data-hash='" + Name + "']").offset().top;
						$('html, body').stop().animate({scrollTop: Top}, 600, 'easeOutExpo');
						 }
						 
					return false;	  
				});		
				
		
			 $('.typical-top a').on('mouseenter', function () {
				 
				$('.typical-top a').removeClass('current');
			    $(this).addClass('current');
				$('.block-name').removeClass('show');
				
				 var id = $(this).attr('data-show');
				 var show = $(this).attr('data-box');
				 var Lx = $(this).offset().left;
				 var Tx = $(this).offset().top;
				 var Width = $(this).innerWidth();
				 var W =  $(".block-name[data-block='" + id + "']").innerWidth();
				 var H =  $(".block-name[data-block='" + id + "']").innerHeight();

			if($(window).width() > 1100){
				if($(window).width() <= 1500){
				     $(".block-name[data-block='" + id + "']").css({'left':  Lx +  (Width/2 * 0.5) , 'top':Tx - (H-70)});
				}else{
					 $(".block-name[data-block='" + id + "']").css({'left':  Lx +  (Width/2) , 'top':Tx - H});
				}
				  $(".note-block li a[data-text='" + id + "']").parent().addClass('current');
				  $(".block-name[data-block='" + id + "']").addClass('show');
				  $(".typical-block[data-block='" + show + "']").addClass('show');
			}
			return false;	 
				 
		 });
			 
			 
			 
			   $('.note-block li a').on('mouseenter', function () {
			         var idx = $(this).attr('data-text');
					 var Active = $(".typical-top a[data-show ='" + idx + "']"); 
					  
				 $('.typical-top a, .note-block li').removeClass('current');
			     $(Active).addClass('current');
				  $('.block-name').removeClass('show');
				  $('.typical-block').removeClass('show');
				  $(".typical-top a[data-show='" + idx + "']").trigger('mouseenter');
				  return false;
			   });
		   
		   
			     $('.block-name a').on('mouseenter', function () {
						$('.typical-top a, .note-block li').removeClass('current');
						$('.block-name').removeClass('show');
						$('.typical-block').removeClass('show');
						return false;
				 });	
					
			   
				$('.typical-top a, .note-block li').on( 'mouseleave', function () {
						$('.typical-top a, .note-block li').removeClass('current');
						$('.block-name').removeClass('show');
						$('.typical-block').removeClass('show');
						return false;
				});	
				
				
			   $('.sub-block').each(function(index, element) {
			    var Click =  $(element).find('li a');
			    $(Click).on('click', function(e) {
                          e.preventDefault();
				  $(Click).parent().removeClass('current');
				  $(this).parent().addClass('current');
				 var Select =  $(this).parent().parent().parent().parent();
				  var Open = $(this).parent().index();
				  
				 $(Select).find('.slide-plan').trigger('BTQ.goTo', Open);
					return false; 
			     });
			  });	
			  
			  
			   $('.top-block a').mouseenter(function () {
					if($(window).width() > 1100){
						$('.house-text').removeClass('show');
						 var idx = $(this).attr('data-name');
						 var Lx = $(this).offset().left;
						 var Tx = $(this).offset().top;
						 var Width = $(this).width();
						 var W =  $(".house-text[data-block='" + idx + "']").width();
						
						 $(".house-text[data-block='" + idx + "']").css({'left': Lx  - Width/3  , 'top':Tx -90});
						
						 $(".house-text[data-block='" + idx + "']").addClass('show');
					
					}
					   return false; 
				  }); 
					  
				  $('.top-block a').mouseleave(function () {
					   if($(window).width() > 1100){
						  $('.house-text').removeClass('show');
					   }
					   return false;
				  });	
			  
			  
			  
			  
				
			 if ( $(window).width() > 1100) { 
				  if(window.location.hash){
					  LocationHash();
				   }else{
					  $('.note-block li:first-child').trigger('click');
				  }
				   
			  } 
			
			
	}
	
	
	 //APARTMENT DETAIL PAGE//
	if($('#apartment-detail-page').length){
		
			$('.whell').addClass('show');  
		
			    $('.sub-nav-typical li a').on('click', function(e) {
                 e.preventDefault();
				  $('.sub-nav-typical li').removeClass('current');
				  $(this).parent().addClass('current');
			       var Name = $(this).attr('data-name');
				   window.location.hash = Name;
				
				      var HouseSlide = $('.slide-apartment')[0].swiper;
					   var Num = $(".item-container[data-hash='" + Name + "']").index();
					   HouseSlide.slideTo(Num, 1200, true);
				  
				   return false;
			    });
					 

			
			  if(window.location.hash){
				  LocationHash();
			   }else{
				  $('.sub-nav-typical li:first-child').find('a').trigger('click');
			  }
				   
			   
			
			
	}
			
			
	//LIBRARY PAGE//
  	if($('#library-page').length){
		$('.whell').addClass('show');
		 $('.sub-nav li').on('click', function (e) {
            e.preventDefault();
            $('.sub-nav li').removeClass('current');
            $(this).addClass('current');
			  var Name = $(this).find('a').attr('data-name');
				 
				  
				  if ( $(window).width() > 1100) { 
				      var LibrarySlide = $('.slide-library')[0].swiper;
					   var Num = $(".item-container[data-hash='" + Name + "']").index();
					   LibrarySlide.slideTo(Num, 1000, true);
				  }
				   return false;
			    });
				
			   
			
			  if ( $(window).width() > 1100) { 
					$('.sub-nav li:first-child').trigger('click');
			  } 
		  
	     }	
			
			
			
	   
      	  //NEWS PAGE//
		 if($('#news-page').length){
			 
			 setTimeout(function(){ $('.sub-news').addClass('show')}, 1500);
			 
			 $('.link-page a').on('click', function (e) {
					 e.preventDefault();
					$('.news-list').addClass('no-link');
					
					if(!$('.loadicon').hasClass('loader')){
					   $('.colum-box-news').append('<div class="loadicon2" style="display:block"></div>');
					 }
					
					   var ShowDetails = $(this).parent().parent().parent().parent().parent();
					   $(this).parent().parent().find('.link-page').removeClass('current'); 
					   $(this).parent().addClass('current'); 
					  var Name = $(this).attr('data-name');
					  
					   window.location.hash = Name; 
					  var url = $(this).attr('href');
					  
					     $(ShowDetails).find('.news-content').addClass('newsload');
						
					     $(ShowDetails).find('.news-content').stop().animate({'opacity': 0}, 500,'linear', function () {
						  if($('.newsload').children().length){
							 $('.scrollC').getNiceScroll().remove();
						     $('.newsload').children().remove();
							  $('div .newsload').removeClass('newsload');
					      }
		
						  NewsLoad(url, ShowDetails);
						 Details = 1;
					    });
					
					 
					return false;
				  });	
			
			
			 $('.sub-news li').on('click', function (e) {
				e.preventDefault();
			  
					 var allItem = $('.colum-box').length;
					 var widthItem = $('.colum-box').width(); 
					 $('.box-content').width(allItem * widthItem);  
			  
					$('.sub-news li').removeClass('current');
					$('.colum-box').removeClass('active');
					$(this).addClass('current');
					
					 var Openpage = $(this).find('a').attr('data-name');
					
					    var XCurrent = $('.box-content').offset().left;
				        var XItem = $('.box-content .colum-box[data-hash= "' + Openpage + '"]').offset().left; 
					    $('.colum-box[data-hash= "' + Openpage + '"]').addClass('active'); 
						
					    $('.box-content').stop().animate({'left': XCurrent - XItem}, 600, 'easeInOutExpo', function(){
								
							var Lenght = $('.active').find('.news-content').children();
							
							  if(!$(Lenght).length){
								     if(!$('.active .link-page').hasClass('current')){
										 
										 $('.active .link-page:first-child a').trigger('click');
									 }else{
										 
										 $('.active .link-page.current a').trigger('click');
									 }
			                   }else{
								    var Name = $('.active .link-page.current a').attr('data-name');
					                window.location.hash = Name; 
							   }
							   
							
							 
						 if($(window).width() > 1100){  
					          $('.box-content, .colum-box.active').css({'height':'100%'});
							  $('.colum-box.active').find('.colum-box-news').addClass('fadeinup'); 
							  
							  setTimeout(function(){$('.colum-box.active').find('.news-list').addClass('showup');}, 300);
			                 
					      }else{
							   var Height = $('.colum-box.active').innerHeight();
							   $('.box-content').css({'height':Height});
							   detectBut();
					      }
							 
					    });
					 
					
					 
                return false;
              });
			
			
			  ScrollNiceB();
			 
				
			  if(window.location.hash){
					LocationHash();
				 }else{
					$('.colum-box:first-child').find('.link-page:first-child a').trigger('click');
				}
				
	   }
	   
	   
	   
	   //CONTACT PAGE//
	if($('#contact-page').length){
		 setTimeout(function(){ initialize(); }, 500);
		 setTimeout(function(){ $('.contact-box').addClass('goleft'); }, 1500);	
		
	}
	  
	  



}


function ThumbZoom(img) {

  $('html, body').addClass('no-scroll');
  $(this).parent().addClass('to-scroll');
   if(!$('.loadicon').length){
		    $('body').append('<div class="loadicon" style="display:block"></div>');	
		 }
  $('.all-pics').addClass('show');
  $('.all-pics').append('<div class="full"  style="display:block"></div>');
  $('.overlay-dark').addClass('show');
  
  var activePicLarge = img;
  var newActive = activePicLarge.replace("_s", "_l");

  $('.all-pics').find('.full').append('<img src ="'+(newActive)+'" alt="pic" />');
  $('.all-pics').find('.full').append('<span></span>');
  $('body').append('<div class="close-pics"></div>');
  $('.all-pics').append('<div class="close-pics-small"></div>');
		  
	
	$('.all-pics img').on("load", function() {
			$('.all-pics').addClass('show');
		  
			 if(TouchLenght == false  || !isTouchDevice){ 
			   $('.full').addClass('dragscroll');
			   $('.dragscroll').draptouch();
			 }else{
			   $('.full').addClass('pinch-zoom');
				$('.pinch-zoom').each(function () {
				 new Pic.PinchZoom($(this), { });
			   });
			 }
				   
		   
		   
		   if($('.full img').length>1){
			  $('.full img').last().remove()
		  }
		
		  $('.loadicon').fadeOut(400, 'linear', function() {
			   if(TouchLenght == false  || !isTouchDevice){ 
				 detectMargin();
			   }
			  
				$('.full img').addClass('fadein');
				$('.loadicon').removeClass('loader'); 
				 $('.loadicon').removeClass('show');
		   });
		  
	    });
	  
	  	if($(window).width() > 1100) {
				 $('.full span').on('click', function () {
					 $('.close-pics').trigger('click');
				 });
			}	

		$('.close-pics, .close-pics-small').on('click', function () {
		   $('.loadicon').remove();
			$('.full').fadeOut(300, 'linear', function() {
		    $('.overlay-dark').removeClass('show');
			$('.all-pics .full, .all-pics .text-length, .all-pics .pinch-zoom-container').remove();
			$('.close-pics, .close-pics-small').remove();
			$('.all-pics').removeClass('show');  
			$('html, body').removeClass('no-scroll');
				
				if($('.to-scroll').length){
					var top = $('.to-scroll').offset().top;
					if($(window).width() < 1100) {
						$('html, body').scrollTop(top - 60);
					}	
					$('.to-scroll').removeClass('to-scroll');
				}
			 });	
			
		  });
}
 
 
function ZoomPic() {

   $('img').on("click" ,function() {
	   
	   if($(window).width() <= 1100 && $(this).hasClass('zoom-pic')){
        $('html, body').addClass('no-scroll');
		
		$(this).parent().addClass('to-scrollZ');
		
		
		if(!$('.loadicon').length){
		    $('body').append('<div class="loadicon" style="display:block"></div>');	
		 }
		
        $('.all-pics').addClass('show');
        $('.all-pics').append('<div class="full"  style="display:block"></div>');
       
		$('.overlay-dark').addClass('show');
		var activePicLarge = $(this).attr("src");
	   
	     $('.all-pics').find('.full').append('<img src ="'+(activePicLarge)+'" alt="pic" />');
		 $('.all-pics').append('<div class="close-pics-small"></div>'); 
		 
          $('.all-pics img').on( "load", function() {
			      
				$('.all-pics').addClass('show');
						     
				 if(TouchLenght == false  || !isTouchDevice){ 
					 $('.full').addClass('dragscroll');
					 $('.dragscroll').draptouch();
				   }else{
					 $('.full').addClass('pinch-zoom');
					  $('.pinch-zoom').each(function () {
					   new Pic.PinchZoom($(this), {});
					 });
				   }
						 
				 
				 
                 if($('.full img').length>1){
					$('.full img').last().remove()
				}
              
				$('.loadicon').fadeOut(400, 'linear', function() {
					 if(TouchLenght == false  || !isTouchDevice){ 
					   detectMargin();
					 }
					 
					 $('.full img').addClass('fadein');
					 $('.loadicon').remove();
				});
				
            });
			

        $('.close-pics-small').on("click" ,function() {
			$('.loadicon').remove();
            $('.full').fadeOut(300, 'linear', function() {
				$('.overlay-dark').removeClass('show');
                $('.all-pics .full,  .all-pics .pinch-zoom-container').remove();
                $('.close-pics-small').remove();
                $('.all-pics').removeClass('show');
			    $('html, body').removeClass('no-scroll');
				
				if($('.to-scrollZ').length) {
					var top = $('.to-scrollZ').offset().top;
					$('.to-scrollZ').removeClass('to-scrollZ');
					
					if($(window).width() < 1100) {
						$('html, body').scrollTop(top - 60);
					}
				}
			 });	
           
        });
		
	   }
        return false;
    });
}

function Option() {
	

    $('a.link-pdf, .library-download a').on( 'click',function(e){
	     e.preventDefault();
	      var  url = $(this).attr('href');
	      window.open(url, '_blank');
         return false;
      });

    $('.brochure-box, .house-pdf').on( 'click',function(e){
	     e.preventDefault();
	      var  url = $(this).find('a').attr('href');
	      window.open(url, '_blank');
         return false;
      });
	  
	
	 $('.pic-box').on( 'click',function(e){
	     e.preventDefault();
	      $(this).find('a').trigger('click')
         return false;
      });

	
	
	
	  $('.view-album, .thumb-album').on( 'click',function(e) {
        e.preventDefault();
       var url = $(this).attr('href');
		 if(!$('.loadicon').length){
           $('body').append('<div class="loadicon" style="display:block"></div>');
		 }
		 $('html, body').addClass('no-scroll');
		 $('.overlay-dark').addClass('show');
         $('.all-album').fadeIn(300, 'linear', function() {
		     AlbumLoad(url,0);
			});
        return false;
      });  
	  
	  
	  
	
	 $('.zoom.album').on("click", function(e) {
			e.preventDefault();
			$(this).parent().addClass('viewalbum');
			var url = $(this).attr('href');
			var num = $(this).parent().parent().parent().index();
			
		  if(!$('.loadicon').length){
            $('body').append('<div class="loadicon" style="display:block"></div>');
		   }
		   
			if($('#facilities-page').length){
				$('.faci-slide').trigger('BTQ.stop');
			}
			
			$('html, body').addClass('no-scroll');
			$('.overlay-dark').addClass('show');
			
			  $('.all-album').fadeIn(300, 'linear', function() {
				AlbumLoad(url, num);
			});
			return false;
		}); 
	
			 
	  $('a.player, a.play-video, .home-video').on( 'click',function(e) {
        e.preventDefault();
		 $(this).parent().addClass('to-scrollV');
		 
		 if($('.popup-video img').length){
			  $('.popup-pics, .popup-video').removeClass('fadeinup').addClass('fadeout');
			  $('.close-popup').removeClass('fadeinup').addClass('fadeout');
		 }
		 
		  if($('.library-load').length){
			 $('.library-center').trigger('BTQ.stop');
		  }
		 
		 
		  var idx = $(this).attr('href');
		   if(!$('.loadicon').length){
		     $('body').append('<div class="loadicon" style="display:block"></div>');
		   }
		   $('html, body').addClass('no-scroll');
		   $('.overlay-dark').addClass('show');
		   
		    $('.allvideo').fadeIn(300, 'linear', function() {
              VideoLoad(idx);
		   });
         return false;
     });
	 
	
	  
	
      $('.zoom:not(.album),  .zoom-mobile').on("click" ,function() {
		 
        $('html, body').addClass('no-scroll');
		
		 if(!$('.loadicon').length){
           $('body').append('<div class="loadicon" style="display:block"></div>');
		  }
		  
        $('.all-pics').addClass('show');
        $('.all-pics').append('<div class="full"  style="display:block"></div>');
		$('.overlay-dark').addClass('show');
		
		var activePicLarge = $(this).parent().find('img').attr("src") || $(this).parent().find('img').attr("data-src");
	    var newActive = activePicLarge.replace("_s", "_l");
	  
	    $('.all-pics').find('.full').append('<img src ="'+(newActive)+'" alt="pic" />');
		$('.all-pics').find('.full').append('<span></span>');
        $('body').append('<div class="close-pics"></div>');
		$('.all-pics').append('<div class="close-pics-small"></div>');
				
		  
          $('.all-pics img').on("load",function() {
				  $('.all-pics').addClass('show');
			    
                   if(TouchLenght == false  || !isTouchDevice){ 
					 $('.full').addClass('dragscroll');
					 $('.dragscroll').draptouch();
				   }else{
					 $('.full').addClass('pinch-zoom');
					  $('.pinch-zoom').each(function () {
					   new Pic.PinchZoom($(this), {});
					 });
				   }
						 
				 
				 
                 if($('.full img').length>1){
					$('.full img').last().remove()
				}
              
				$('.loadicon').fadeOut(400, 'linear', function() {
					 if(TouchLenght == false  || !isTouchDevice){ 
					   detectMargin();
					 }
                    
					  $('.full img').addClass('fadein');
					  $('.loadicon').remove();
				});
				
            });
			
			if($(window).width() > 1100) {
				 $('.full span').on('click', function () {
					 $('.close-pics').trigger('click');
				 });
			}	
		   

        $('.close-pics, .close-pics-small').on("click" ,function() {
			$('.loadicon').remove();
            $('.full').fadeOut(300, 'linear', function() {
				$('.overlay-dark').removeClass('show');
                $('.all-pics .full, .all-pics .text-length, .all-pics .pinch-zoom-container').remove();
                $('.close-pics, .close-pics-small').remove();
                $('.all-pics').removeClass('show');  
				$('html, body').removeClass('no-scroll');
				
            });
        });
        return false;
    });
	



}


function turnWheelTouch(){
	doWheel = true;
	doTouch = true;
}  



function detectBut() {
	
if($('#news-page').length){
	if($(window).width() <= 1100 && $('.active .link-page').hasClass('current')){
	  var Current = $('.active .link-page.current').parent().parent();
	  var Left  = $('.active .scrollB').offset().left;
	  var XLeft = $('.active .link-page.current').offset().left;
	  var Center = $('.news-list').width()/2 - $('.active .link-page.current').width()/2;
	  $(Current).stop().animate({scrollLeft:  (XLeft-Center) - Left}, 'slow');
	 }
	if($(window).width() <= 1100){
	 if( $('.sub-news ul').length){
		var Left  = $('.sub-news ul').offset().left;
		var XLeft = $('.sub-news li.current').offset().left;
	    var Percent = $(window).width()/100 * 10;
		var Center = ($(window).width() - Percent)/2 - $('.sub-news li.current').width()/2;
		$('.sub-news').stop().animate({scrollLeft:  (XLeft-Center) - Left}, 'slow');
	 }
    } 
	 
 }
 
 if($('#apartment-page').length){
	
	if($(window).width() <= 1100){
		 $('.sub-block').each(function(index, element) {
	     var Current = $(element);
	     var Left  = $(element).find('ul').offset().left;
	     var XLeft = $(element).find('li.current').offset().left;
	     var Center = $('.sub-block').width()/2 - $(element).find('li.current').width()/2;
	  $(Current).stop().animate({scrollLeft:  (XLeft-Center) - Left}, 'slow');
	   });
	 }
	
	 
 }



 if($('#apartment-detail-page').length){
	if($(window).width() <= 1100){
	 if( $('.sub-nav-typical').length){
		var Left  = $('.sub-nav-typical ul').offset().left;
		var XLeft = $('.sub-nav-typical li.current').offset().left;
		var Center = $('.sub-nav-typical').width()/2 - $('.sub-nav-typical li.current').width()/2;
		$('.sub-nav-typical').stop().animate({scrollLeft:  (XLeft-Center) - Left}, 'slow');
	 }
    } 
	 
 }

 
 
}




function detectMargin() {
var ImgW = $('.full img').width();
var ImgH = $('.full  img').height();
var Yheight = $(window).height();
var Xwidth = $(window).width();

	if (Xwidth > ImgW) {
		  $('.full img').css({'margin-left': Xwidth / 2 - ImgW / 2});
	  } else {
		  $('.full img').css({'margin-left': 0});
	  }
	  if (Yheight > ImgH) {
		  $('.full img').css({'margin-top': Yheight / 2 - ImgH / 2});
	  } else {
		  $('.full img').css({'margin-top':  0});
	  }
}


document.addEventListener( 'keydown', function(e) {
	 var keyCode = e.keyCode || e.which;
	   if( keyCode === 37) {
		 $('.sub-news li.current').prev().find('a').trigger('click');
	   }
		if( keyCode === 39) {
		 $('.sub-news li.current').next().find('a').trigger('click');
	   }
	
});

$(document).ready(function () {

 $(document).bind('scroll', function() {
  
		var currenttop = $(document).scrollTop();
		var VideoHome =  $('.box-video-center').height();
		
         if ($(window).width() <= 1100) {
		    if (currenttop > 50) {
                $('.scroll-down').fadeOut(500, 'linear');
            } else {
                $('.scroll-down').fadeIn(500, 'linear');
            } 
			
			if($('#home-page').length && $('.box-video-center').length){
			   if (currenttop > VideoHome + 100) {
					pauseVid(); 
			  } else {
					playVid();
			  } 
			}
			
			if(currenttop > $(window).height()/2) {
		       $('.go-top').css({'display':'block', 'opacity':1});
	       }else {
		      $('.go-top').css({'display':'none', 'opacity':0});
	       }
		   
			 
			 windscroll = currenttop;
		   
		}
	
	
	 if(!$('#index-page').length){
	   var overlay = document.querySelector('.overlay-menu, .overlay-dark, .allvideo, .register-form span');
		overlay.addEventListener("touchmove", function(event) {
			event.preventDefault();
		});	
	 }
		
});
	
	


$('.go-top').on( 'click',function(){
	  $('html, body').animate({scrollTop:0},'slow');
}); 

 

  
});

window.onorientationchange = ResizeWindows;
$(window).on("orientationchange",function(){
 if ($(window).width() <= 1100) {
	 ScrollHoz();
	 
	   if($('#news-page').length){
		   var Open = $('.colum-box.active').attr('data-hash');
		   $(".sub-news li a[data-name='" + Open  + "']").trigger('click');
	    }
		
	   if($('#news-page, #apartment-page, #apartment-detail-page').length){
		   detectBut();
	   }
	   
	   if ($('#apartment-detail-page').length) {
		  var HouseSlide = $('.slide-apartment')[0].swiper;
			 HouseSlide.onResize();
		}
	 
 }
 
});

$(window).resize(function () {
	 if($(window).width() > 1100){
		 if( $('.news-text img,  .box-location img').hasClass('zoom-pic')){ 
		   $('.close-pics-small').trigger('click');
		 }
	 }
   ScrollNiceHide();
   ResizeWindows();
});		

$(window).on('resize', function() {
   ResizeWindows();
   
   
   
//-----------------------------			
//  DESKTOP 	
    if ($(window).width() > 1100) {
		  
		
		  
			 if($('.dragscroll').length){ 
			      detectMargin();
				  $('.dragscroll').draptouch();
				  
			 }
			 
		  
		  if($('#home-page').length){  
		    if(!$('.page').hasClass('play-home')){
				 SlidePicture();
			 }
		   }
		   
		    if($('#about-page').length){  
			 if(!$('.page').hasClass('ani-text')){
				 SlidePicture();
			 }
		   }
		   
		   if($('#facilities-page').length){  
			 if(!$('.page').hasClass('ani-text')){
				 SlidePicture();
			 }
		   }
		   
		     if($('#apartment-page').length){  
			 if(!$('.page').hasClass('ani-block')){
				 SlidePicture();
			 }
		   }
		   
		   if ($('#location-page, #zones-page').length) {
				  ScaleMap();
			  if (!$('.viewer').hasClass('desktop')) {
			        ZoomMap();
		      }
           }
		   
		   
		    if($('#library-page').length){  
		    if(!$('.page').hasClass('show-lib')){
				 SlidePicture();
			 }
		   }
		   
		    if ($('#apartment-detail-page').length) {
				var HouseSlide = $('.slide-apartment')[0].swiper;
				HouseSlide.enableMousewheelControl();
		    }
		   
		   
		     if($('#news-page').length){
		      var Open = $('.colum-box.active').attr('data-hash');
		      $(".sub-news li a[data-name='" + Open  + "']").trigger('click');
	         }
			
		     if (!$('.sub-nav li').hasClass('current')) {
		        $('.sub-nav li:first-child ').trigger('click');
		      }else{
			    $('.sub-nav li.current').trigger('click');
		     }
			 
			  if (!$('.sub-faci li').hasClass('current')) {
		        $('.sub-faci li:first-child ').trigger('click');
		      }else{
			    $('.sub-faci li.current').trigger('click');
		     }
		
		    
		    if($('.news-list, .sub-news, .sub-block').hasClass('dragscroll')){
				 $('.news-list, .sub-news, .sub-block').removeClass('dragscroll draptouch-active draptouch-moving-left draptouch-moving-down');
				 $('.news-list, .sub-news, .sub-block').css({'overflow':'visible'});
			 }
			 
			
			 
		   	if( $('.scrollA, .scrollB, .scrollC, .scrollD').length){
			    $('.scrollB').css({'width':'100%'});
				 setTimeout(function(){ ScrollNiceA(); ScrollNiceB(); ScrollNiceC();ScrollNiceD();}, 250);
		    }
			
	        if ($('#apartment-detail-page').length) {
			  var HouseSlide = $('.slide-apartment')[0].swiper;
			   HouseSlide.onResize();
			}
//  DESKTOP 

//-----------------------------		
 
//  MOBILE 		
    } else {
		
		  
		 if(TouchLenght == false  || !isTouchDevice){
		    ScrollHoz();
		    if($('#news-page, #apartment-page, #apartment-detail-page').length){
		      detectBut();
	        }
		   
			
			if($('#news-page').length){
		     var Open = $('.colum-box.active').attr('data-hash');
		     $(".sub-news li a[data-name='" + Open  + "']").trigger('click');
	        }
			
			if ($('#apartment-detail-page').length) {
			  var HouseSlide = $('.slide-apartment')[0].swiper;
			   HouseSlide.onResize();
			}	
		 
		 }
		
		
		///////////////
		 
		    if ($('#home-page').length) {
			  if($('.page').hasClass('play-home')){
				var HomeSlide = $('.home-slide')[0].swiper;
				 HomeSlide.destroy(true, true);
				 $('.page').removeClass('play-home');
			  }
		    } 
		   
		 
		    if ($('#about-page').length) {
			  if($('.page').hasClass('ani-text')){
				var AboutSlide = $('.slide-about')[0].swiper;
				AboutSlide.destroy(true, true);
				 $('.page').removeClass('ani-text');
			  }
		   }
		   
		   if ($('#facilities-page').length) {
			  if($('.page').hasClass('ani-text')){
				var FaciSlide = $('.slide-facilities')[0].swiper;
				 FaciSlide.destroy(true, true);
				 $('.page').removeClass('ani-text');
			  }
		   }
		
		
		  if ($('#apartment-page').length) {
			  if($('.page').hasClass('ani-block')){
				var ApartSlide = $('.slide-block')[0].swiper;
				 ApartSlide.destroy(true, true);
				 $('.page').removeClass('ani-block');
			  }
		   }
		
		    if($('#library-page').length){
			 if($('.page').hasClass('show-lib')){
				var LibrarySlide = $('.slide-library')[0].swiper;
				LibrarySlide.destroy(true, true);
				 $('.page').removeClass('show-lib');
			  }
	        }
			
			 if ($('#apartment-detail-page').length) {
				var HouseSlide = $('.slide-apartment')[0].swiper;
				HouseSlide.disableMousewheelControl();
		    }
		   
			
		   	
	
  }
	  
		 
	
//  MOBILE 	 
//-----------------------------	
        
 
 
   
}, 250);


function LocationHash() {
    var PageActive = window.location.hash;
    PageActive = PageActive.slice(1);
    Arrhash = PageActive.split('/');
	
	
	$(".sub-nav-typical li a[data-name='" + PageActive + "']").trigger('click');
	$(".note-block li a[data-name='" + PageActive + "']").trigger('click');
	
	if($('#news-page').length && Details == 0){
		 $(".link-page a[data-name='" + PageActive + "']").parent().addClass('current');
		 $(".sub-news li a[data-name='" + Arrhash[0] + "']").trigger('click');
	}
	
}



$(window).bind("popstate", function(e) {
	e.preventDefault();
	  LinkPage();
	  LocationHash();
});
		
