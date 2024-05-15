/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/*!
 * Lightbox v2.11.4
 * by Lokesh Dhakar
 *
 * More info:
 * http://lokeshdhakar.com/projects/lightbox2/
 *
 * Copyright Lokesh Dhakar
 * Released under the MIT license
 * https://github.com/lokesh/lightbox2/blob/master/LICENSE
 *
 * @preserve
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof exports?module.exports=b(require("jquery")):a.lightbox=b(a.jQuery)}(this,function(a){function b(b){this.album=[],this.currentImageIndex=void 0,this.init(),this.options=a.extend({},this.constructor.defaults),this.option(b)}return b.defaults={albumLabel:"Image %1 of %2",alwaysShowNavOnTouchDevices:!1,fadeDuration:600,fitImagesInViewport:!0,imageFadeDuration:600,positionFromTop:50,resizeDuration:700,showImageNumberLabel:!0,wrapAround:!1,disableScrolling:!1,sanitizeTitle:!1},b.prototype.option=function(b){a.extend(this.options,b)},b.prototype.imageCountLabel=function(a,b){return this.options.albumLabel.replace(/%1/g,a).replace(/%2/g,b)},b.prototype.init=function(){var b=this;a(document).ready(function(){b.enable(),b.build()})},b.prototype.enable=function(){var b=this;a("body").on("click","a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]",function(c){return b.start(a(c.currentTarget)),!1})},b.prototype.build=function(){if(!(a("#lightbox").length>0)){var b=this;a('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" role="button" tabindex="0" aria-label="Previous image" href="" ></a><a class="lb-next" role="button" tabindex="0" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel" role="button" tabindex="0"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close" role="button" tabindex="0"></a></div></div></div></div>').appendTo(a("body")),this.$lightbox=a("#lightbox"),this.$overlay=a("#lightboxOverlay"),this.$outerContainer=this.$lightbox.find(".lb-outerContainer"),this.$container=this.$lightbox.find(".lb-container"),this.$image=this.$lightbox.find(".lb-image"),this.$nav=this.$lightbox.find(".lb-nav"),this.containerPadding={top:parseInt(this.$container.css("padding-top"),10),right:parseInt(this.$container.css("padding-right"),10),bottom:parseInt(this.$container.css("padding-bottom"),10),left:parseInt(this.$container.css("padding-left"),10)},this.imageBorderWidth={top:parseInt(this.$image.css("border-top-width"),10),right:parseInt(this.$image.css("border-right-width"),10),bottom:parseInt(this.$image.css("border-bottom-width"),10),left:parseInt(this.$image.css("border-left-width"),10)},this.$overlay.hide().on("click",function(){return b.end(),!1}),this.$lightbox.hide().on("click",function(c){"lightbox"===a(c.target).attr("id")&&b.end()}),this.$outerContainer.on("click",function(c){return"lightbox"===a(c.target).attr("id")&&b.end(),!1}),this.$lightbox.find(".lb-prev").on("click",function(){return 0===b.currentImageIndex?b.changeImage(b.album.length-1):b.changeImage(b.currentImageIndex-1),!1}),this.$lightbox.find(".lb-next").on("click",function(){return b.currentImageIndex===b.album.length-1?b.changeImage(0):b.changeImage(b.currentImageIndex+1),!1}),this.$nav.on("mousedown",function(a){3===a.which&&(b.$nav.css("pointer-events","none"),b.$lightbox.one("contextmenu",function(){setTimeout(function(){this.$nav.css("pointer-events","auto")}.bind(b),0)}))}),this.$lightbox.find(".lb-loader, .lb-close").on("click keyup",function(a){if("click"===a.type||"keyup"===a.type&&(13===a.which||32===a.which))return b.end(),!1})}},b.prototype.start=function(b){function c(a){d.album.push({alt:a.attr("data-alt"),link:a.attr("href"),title:a.attr("data-title")||a.attr("title")})}var d=this,e=a(window);e.on("resize",a.proxy(this.sizeOverlay,this)),this.sizeOverlay(),this.album=[];var f,g=0,h=b.attr("data-lightbox");if(h){f=a(b.prop("tagName")+'[data-lightbox="'+h+'"]');for(var i=0;i<f.length;i=++i)c(a(f[i])),f[i]===b[0]&&(g=i)}else if("lightbox"===b.attr("rel"))c(b);else{f=a(b.prop("tagName")+'[rel="'+b.attr("rel")+'"]');for(var j=0;j<f.length;j=++j)c(a(f[j])),f[j]===b[0]&&(g=j)}var k=e.scrollTop()+this.options.positionFromTop,l=e.scrollLeft();this.$lightbox.css({top:k+"px",left:l+"px"}).fadeIn(this.options.fadeDuration),this.options.disableScrolling&&a("body").addClass("lb-disable-scrolling"),this.changeImage(g)},b.prototype.changeImage=function(b){var c=this,d=this.album[b].link,e=d.split(".").slice(-1)[0],f=this.$lightbox.find(".lb-image");this.disableKeyboardNav(),this.$overlay.fadeIn(this.options.fadeDuration),a(".lb-loader").fadeIn("slow"),this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(),this.$outerContainer.addClass("animating");var g=new Image;g.onload=function(){var h,i,j,k,l,m;f.attr({alt:c.album[b].alt,src:d}),a(g),f.width(g.width),f.height(g.height);var n=g.width/g.height;m=a(window).width(),l=a(window).height(),k=m-c.containerPadding.left-c.containerPadding.right-c.imageBorderWidth.left-c.imageBorderWidth.right-20,j=l-c.containerPadding.top-c.containerPadding.bottom-c.imageBorderWidth.top-c.imageBorderWidth.bottom-c.options.positionFromTop-70,"svg"===e?(n>=1?(i=k,h=parseInt(k/n,10)):(i=parseInt(j/n,10),h=j),f.width(i),f.height(h)):(c.options.fitImagesInViewport?(c.options.maxWidth&&c.options.maxWidth<k&&(k=c.options.maxWidth),c.options.maxHeight&&c.options.maxHeight<j&&(j=c.options.maxHeight)):(k=c.options.maxWidth||g.width||k,j=c.options.maxHeight||g.height||j),(g.width>k||g.height>j)&&(g.width/k>g.height/j?(i=k,h=parseInt(g.height/(g.width/i),10),f.width(i),f.height(h)):(h=j,i=parseInt(g.width/(g.height/h),10),f.width(i),f.height(h)))),c.sizeContainer(f.width(),f.height())},g.src=this.album[b].link,this.currentImageIndex=b},b.prototype.sizeOverlay=function(){var b=this;setTimeout(function(){b.$overlay.width(a(document).width()).height(a(document).height())},0)},b.prototype.sizeContainer=function(a,b){function c(){d.$lightbox.find(".lb-dataContainer").width(g),d.$lightbox.find(".lb-prevLink").height(h),d.$lightbox.find(".lb-nextLink").height(h),d.$overlay.trigger("focus"),d.showImage()}var d=this,e=this.$outerContainer.outerWidth(),f=this.$outerContainer.outerHeight(),g=a+this.containerPadding.left+this.containerPadding.right+this.imageBorderWidth.left+this.imageBorderWidth.right,h=b+this.containerPadding.top+this.containerPadding.bottom+this.imageBorderWidth.top+this.imageBorderWidth.bottom;e!==g||f!==h?this.$outerContainer.animate({width:g,height:h},this.options.resizeDuration,"swing",function(){c()}):c()},b.prototype.showImage=function(){this.$lightbox.find(".lb-loader").stop(!0).hide(),this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration),this.updateNav(),this.updateDetails(),this.preloadNeighboringImages(),this.enableKeyboardNav()},b.prototype.updateNav=function(){var a=!1;try{document.createEvent("TouchEvent"),a=!!this.options.alwaysShowNavOnTouchDevices}catch(a){}this.$lightbox.find(".lb-nav").show(),this.album.length>1&&(this.options.wrapAround?(a&&this.$lightbox.find(".lb-prev, .lb-next").css("opacity","1"),this.$lightbox.find(".lb-prev, .lb-next").show()):(this.currentImageIndex>0&&(this.$lightbox.find(".lb-prev").show(),a&&this.$lightbox.find(".lb-prev").css("opacity","1")),this.currentImageIndex<this.album.length-1&&(this.$lightbox.find(".lb-next").show(),a&&this.$lightbox.find(".lb-next").css("opacity","1"))))},b.prototype.updateDetails=function(){var a=this;if(void 0!==this.album[this.currentImageIndex].title&&""!==this.album[this.currentImageIndex].title){var b=this.$lightbox.find(".lb-caption");this.options.sanitizeTitle?b.text(this.album[this.currentImageIndex].title):b.html(this.album[this.currentImageIndex].title),b.fadeIn("fast")}if(this.album.length>1&&this.options.showImageNumberLabel){var c=this.imageCountLabel(this.currentImageIndex+1,this.album.length);this.$lightbox.find(".lb-number").text(c).fadeIn("fast")}else this.$lightbox.find(".lb-number").hide();this.$outerContainer.removeClass("animating"),this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration,function(){return a.sizeOverlay()})},b.prototype.preloadNeighboringImages=function(){if(this.album.length>this.currentImageIndex+1){(new Image).src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){(new Image).src=this.album[this.currentImageIndex-1].link}},b.prototype.enableKeyboardNav=function(){this.$lightbox.on("keyup.keyboard",a.proxy(this.keyboardAction,this)),this.$overlay.on("keyup.keyboard",a.proxy(this.keyboardAction,this))},b.prototype.disableKeyboardNav=function(){this.$lightbox.off(".keyboard"),this.$overlay.off(".keyboard")},b.prototype.keyboardAction=function(a){var b=a.keyCode;27===b?(a.stopPropagation(),this.end()):37===b?0!==this.currentImageIndex?this.changeImage(this.currentImageIndex-1):this.options.wrapAround&&this.album.length>1&&this.changeImage(this.album.length-1):39===b&&(this.currentImageIndex!==this.album.length-1?this.changeImage(this.currentImageIndex+1):this.options.wrapAround&&this.album.length>1&&this.changeImage(0))},b.prototype.end=function(){this.disableKeyboardNav(),a(window).off("resize",this.sizeOverlay),this.$lightbox.fadeOut(this.options.fadeDuration),this.$overlay.fadeOut(this.options.fadeDuration),this.options.disableScrolling&&a("body").removeClass("lb-disable-scrolling")},new b});
//# sourceMappingURL=lightbox.min.map
/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	var pageBody, container, button, menu, links, i, len;

	pageBody = document.getElementsByTagName('body');
	container = document.getElementById( 'site-navigation' );

	if ( ! container ) {
		return;
	}

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button ) {
		return;
	}

	menu = container.getElementsByClassName( 'nav-inner' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			if(pageBody[0].classList.contains('menu-open')) {
				pageBody[0].classList.remove('menu-open');
			}
		//	pageBody.classList.remove(' menu-open');
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );

		} else {
			pageBody[0].classList.add('menu-open');
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	( function( container ) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

		if ( 'ontouchstart' in window ) {
			touchStartFn = function( e ) {
				var menuItem = this.parentNode, i;

				if ( ! menuItem.classList.contains( 'focus' ) ) {
					e.preventDefault();
					for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
						if ( menuItem === menuItem.parentNode.children[i] ) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove( 'focus' );
					}
					menuItem.classList.add( 'focus' );
				} else {
					menuItem.classList.remove( 'focus' );
				}
			};

			for ( i = 0; i < parentLink.length; ++i ) {
				parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
			}
		}
	}( container ) );
} )();

/* sticky Menu
   ========================================================================== */

jQuery(document).ready(function ($) {
  //if ($(window).width() >= 992) {

    // init sticky menu
    var lastScrollPosition = 0;
    currentScrollPosition = $(window).scrollTop();
    //$("body").addClass("has-sticky-menu");

    if (currentScrollPosition > 120) {
      $("body").addClass("sticky-menu");
    } else {
      $("body").removeClass("sticky-menu");
    }
    lastScrollPosition = currentScrollPosition;

    $(window).scroll(function () {
      currentScrollPosition = $(window).scrollTop();
      if (currentScrollPosition > 120) {
        $("body").addClass("sticky-menu");
      } else {
        $("body").removeClass("sticky-menu");
      }
      if (currentScrollPosition > lastScrollPosition) {
        jQuery("body").removeClass("scroll-up");
        jQuery("body").addClass("scroll-down");
      } else {
        jQuery("body").removeClass("scroll-down");
        jQuery("body").addClass("scroll-up");
      }
      lastScrollPosition = currentScrollPosition;
    });
  //}
  
  /* **************************
  *
  * Extra-conf for onepages
  *
  * ************************** */
/*  jQuery(".menu-item a").click(function() {
      event.preventDefault();
      var menuItem = jQuery(this).attr('href');

      jQuery('.main-navigation').removeClass('toggled');
      jQuery('body').removeClass('menu-toggled');

      jQuery([document.documentElement, document.body]).animate({
          scrollTop: jQuery(menuItem).offset().top-100
      }, 800).delay(200);
  });*/
});
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();

jQuery(document).ready(function ($) {

 	/*jQuery(".slider-activities").owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		autoplay: false,
		mouseDrag: true,
		touchDrag: true,
		responsive : {
		    0 : {
		        items: 1,
		    },
		    768 : {
		        items: 2,
		    },
		    992 : {
		        items: 3,
		    },
		     1200 : {
		    	items: 4,
		    }
		}
	});*/

	if (location.hash) location.href = location.hash;

	if (jQuery.cookie('hidecookie') != "hidden" ) {
		$('#cookiebanner').removeClass('hidden');
	}

	if (jQuery.cookie('hidepopup') != "hidden" ) {
		$('#popup').removeClass('hidden');
	}
	
	$('#cookiebanner button').click(function(event) {
      var date = new Date();
      date.setTime(date.getTime()+(360*24*60*60*1000));
      document.cookie = "hidecookie" + "=" + "hidden" + "; expires=" + date.toGMTString();

      $('#cookiebanner').addClass('hidden');
	});
	
	// jQuery(".popup-close, .popup-bg").click(function(event) {
  //     var date = new Date();
  //     date.setTime(date.getTime()+(60*60*1000));
  //     document.cookie = "hidepopup" + "=" + "hidden" + "; expires=" + date.toGMTString();
	  
	//   jQuery('#popup').addClass('hidden');
	// });

})

lightbox.option({
  'albumLabel': "Image %1 sur %2",
})


jQuery(".page-template-homepage .menu-anchor a").click(function() {
    event.preventDefault();
    var menuLink = jQuery(this).attr('href');
    var menuHash = menuLink.split('#').pop();
    var menuItem = "#" + menuHash;

    console.log(menuItem);


    jQuery('#site-navigation').removeClass('toggled');
    jQuery('body').removeClass('menu-toggled');

    jQuery([document.documentElement, document.body]).animate({
       scrollTop: jQuery(menuItem).offset().top
    }, 500).delay(200);
    
    jQuery('body').removeClass('menu-open');
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5jb29raWUuanMiLCJsaWdodGJveC5taW4uanMiLCJuYXZpZ2F0aW9uLmpzIiwic3RpY2t5LW1lbnUuanMiLCJza2lwLWxpbmstZm9jdXMtZml4LmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBqUXVlcnkgQ29va2llIFBsdWdpbiB2MS40LjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jYXJoYXJ0bC9qcXVlcnktY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMDYsIDIwMTQgS2xhdXMgSGFydGxcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRCAoUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSlcblx0XHRkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0Ly8gTm9kZS9Db21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQnJvd3NlciBnbG9iYWxzXG5cdFx0ZmFjdG9yeShqUXVlcnkpO1xuXHR9XG59KGZ1bmN0aW9uICgkKSB7XG5cblx0dmFyIHBsdXNlcyA9IC9cXCsvZztcblxuXHRmdW5jdGlvbiBlbmNvZGUocykge1xuXHRcdHJldHVybiBjb25maWcucmF3ID8gcyA6IGVuY29kZVVSSUNvbXBvbmVudChzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlY29kZShzKSB7XG5cdFx0cmV0dXJuIGNvbmZpZy5yYXcgPyBzIDogZGVjb2RlVVJJQ29tcG9uZW50KHMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RyaW5naWZ5Q29va2llVmFsdWUodmFsdWUpIHtcblx0XHRyZXR1cm4gZW5jb2RlKGNvbmZpZy5qc29uID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogU3RyaW5nKHZhbHVlKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBwYXJzZUNvb2tpZVZhbHVlKHMpIHtcblx0XHRpZiAocy5pbmRleE9mKCdcIicpID09PSAwKSB7XG5cdFx0XHQvLyBUaGlzIGlzIGEgcXVvdGVkIGNvb2tpZSBhcyBhY2NvcmRpbmcgdG8gUkZDMjA2OCwgdW5lc2NhcGUuLi5cblx0XHRcdHMgPSBzLnNsaWNlKDEsIC0xKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykucmVwbGFjZSgvXFxcXFxcXFwvZywgJ1xcXFwnKTtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gUmVwbGFjZSBzZXJ2ZXItc2lkZSB3cml0dGVuIHBsdXNlcyB3aXRoIHNwYWNlcy5cblx0XHRcdC8vIElmIHdlIGNhbid0IGRlY29kZSB0aGUgY29va2llLCBpZ25vcmUgaXQsIGl0J3MgdW51c2FibGUuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBwYXJzZSB0aGUgY29va2llLCBpZ25vcmUgaXQsIGl0J3MgdW51c2FibGUuXG5cdFx0XHRzID0gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZShwbHVzZXMsICcgJykpO1xuXHRcdFx0cmV0dXJuIGNvbmZpZy5qc29uID8gSlNPTi5wYXJzZShzKSA6IHM7XG5cdFx0fSBjYXRjaChlKSB7fVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVhZChzLCBjb252ZXJ0ZXIpIHtcblx0XHR2YXIgdmFsdWUgPSBjb25maWcucmF3ID8gcyA6IHBhcnNlQ29va2llVmFsdWUocyk7XG5cdFx0cmV0dXJuICQuaXNGdW5jdGlvbihjb252ZXJ0ZXIpID8gY29udmVydGVyKHZhbHVlKSA6IHZhbHVlO1xuXHR9XG5cblx0dmFyIGNvbmZpZyA9ICQuY29va2llID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcblxuXHRcdC8vIFdyaXRlXG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgISQuaXNGdW5jdGlvbih2YWx1ZSkpIHtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgY29uZmlnLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHZhciBkYXlzID0gb3B0aW9ucy5leHBpcmVzLCB0ID0gb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoKTtcblx0XHRcdFx0dC5zZXRNaWxsaXNlY29uZHModC5nZXRNaWxsaXNlY29uZHMoKSArIGRheXMgKiA4NjRlKzUpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IFtcblx0XHRcdFx0ZW5jb2RlKGtleSksICc9Jywgc3RyaW5naWZ5Q29va2llVmFsdWUodmFsdWUpLFxuXHRcdFx0XHRvcHRpb25zLmV4cGlyZXMgPyAnOyBleHBpcmVzPScgKyBvcHRpb25zLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnLCAvLyB1c2UgZXhwaXJlcyBhdHRyaWJ1dGUsIG1heC1hZ2UgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuXHRcdFx0XHRvcHRpb25zLnBhdGggICAgPyAnOyBwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJyxcblx0XHRcdFx0b3B0aW9ucy5kb21haW4gID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxuXHRcdFx0XHRvcHRpb25zLnNlY3VyZSAgPyAnOyBzZWN1cmUnIDogJydcblx0XHRcdF0uam9pbignJykpO1xuXHRcdH1cblxuXHRcdC8vIFJlYWRcblxuXHRcdHZhciByZXN1bHQgPSBrZXkgPyB1bmRlZmluZWQgOiB7fSxcblx0XHRcdC8vIFRvIHByZXZlbnQgdGhlIGZvciBsb29wIGluIHRoZSBmaXJzdCBwbGFjZSBhc3NpZ24gYW4gZW1wdHkgYXJyYXlcblx0XHRcdC8vIGluIGNhc2UgdGhlcmUgYXJlIG5vIGNvb2tpZXMgYXQgYWxsLiBBbHNvIHByZXZlbnRzIG9kZCByZXN1bHQgd2hlblxuXHRcdFx0Ly8gY2FsbGluZyAkLmNvb2tpZSgpLlxuXHRcdFx0Y29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gY29va2llcy5sZW5ndGg7XG5cblx0XHRmb3IgKDsgaSA8IGw7IGkrKykge1xuXHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpLFxuXHRcdFx0XHRuYW1lID0gZGVjb2RlKHBhcnRzLnNoaWZ0KCkpLFxuXHRcdFx0XHRjb29raWUgPSBwYXJ0cy5qb2luKCc9Jyk7XG5cblx0XHRcdGlmIChrZXkgPT09IG5hbWUpIHtcblx0XHRcdFx0Ly8gSWYgc2Vjb25kIGFyZ3VtZW50ICh2YWx1ZSkgaXMgYSBmdW5jdGlvbiBpdCdzIGEgY29udmVydGVyLi4uXG5cdFx0XHRcdHJlc3VsdCA9IHJlYWQoY29va2llLCB2YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBQcmV2ZW50IHN0b3JpbmcgYSBjb29raWUgdGhhdCB3ZSBjb3VsZG4ndCBkZWNvZGUuXG5cdFx0XHRpZiAoIWtleSAmJiAoY29va2llID0gcmVhZChjb29raWUpKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IGNvb2tpZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdGNvbmZpZy5kZWZhdWx0cyA9IHt9O1xuXG5cdCQucmVtb3ZlQ29va2llID0gZnVuY3Rpb24gKGtleSwgb3B0aW9ucykge1xuXHRcdC8vIE11c3Qgbm90IGFsdGVyIG9wdGlvbnMsIHRodXMgZXh0ZW5kaW5nIGEgZnJlc2ggb2JqZWN0Li4uXG5cdFx0JC5jb29raWUoa2V5LCAnJywgJC5leHRlbmQoe30sIG9wdGlvbnMsIHsgZXhwaXJlczogLTEgfSkpO1xuXHRcdHJldHVybiAhJC5jb29raWUoa2V5KTtcblx0fTtcblxufSkpO1xuIiwiLyohXG4gKiBMaWdodGJveCB2Mi4xMS40XG4gKiBieSBMb2tlc2ggRGhha2FyXG4gKlxuICogTW9yZSBpbmZvOlxuICogaHR0cDovL2xva2VzaGRoYWthci5jb20vcHJvamVjdHMvbGlnaHRib3gyL1xuICpcbiAqIENvcHlyaWdodCBMb2tlc2ggRGhha2FyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2tlc2gvbGlnaHRib3gyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBAcHJlc2VydmVcbiAqL1xuIWZ1bmN0aW9uKGEsYil7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJqcXVlcnlcIl0sYik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YihyZXF1aXJlKFwianF1ZXJ5XCIpKTphLmxpZ2h0Ym94PWIoYS5qUXVlcnkpfSh0aGlzLGZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYil7dGhpcy5hbGJ1bT1bXSx0aGlzLmN1cnJlbnRJbWFnZUluZGV4PXZvaWQgMCx0aGlzLmluaXQoKSx0aGlzLm9wdGlvbnM9YS5leHRlbmQoe30sdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyksdGhpcy5vcHRpb24oYil9cmV0dXJuIGIuZGVmYXVsdHM9e2FsYnVtTGFiZWw6XCJJbWFnZSAlMSBvZiAlMlwiLGFsd2F5c1Nob3dOYXZPblRvdWNoRGV2aWNlczohMSxmYWRlRHVyYXRpb246NjAwLGZpdEltYWdlc0luVmlld3BvcnQ6ITAsaW1hZ2VGYWRlRHVyYXRpb246NjAwLHBvc2l0aW9uRnJvbVRvcDo1MCxyZXNpemVEdXJhdGlvbjo3MDAsc2hvd0ltYWdlTnVtYmVyTGFiZWw6ITAsd3JhcEFyb3VuZDohMSxkaXNhYmxlU2Nyb2xsaW5nOiExLHNhbml0aXplVGl0bGU6ITF9LGIucHJvdG90eXBlLm9wdGlvbj1mdW5jdGlvbihiKXthLmV4dGVuZCh0aGlzLm9wdGlvbnMsYil9LGIucHJvdG90eXBlLmltYWdlQ291bnRMYWJlbD1mdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9wdGlvbnMuYWxidW1MYWJlbC5yZXBsYWNlKC8lMS9nLGEpLnJlcGxhY2UoLyUyL2csYil9LGIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7Yi5lbmFibGUoKSxiLmJ1aWxkKCl9KX0sYi5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7dmFyIGI9dGhpczthKFwiYm9keVwiKS5vbihcImNsaWNrXCIsXCJhW3JlbF49bGlnaHRib3hdLCBhcmVhW3JlbF49bGlnaHRib3hdLCBhW2RhdGEtbGlnaHRib3hdLCBhcmVhW2RhdGEtbGlnaHRib3hdXCIsZnVuY3Rpb24oYyl7cmV0dXJuIGIuc3RhcnQoYShjLmN1cnJlbnRUYXJnZXQpKSwhMX0pfSxiLnByb3RvdHlwZS5idWlsZD1mdW5jdGlvbigpe2lmKCEoYShcIiNsaWdodGJveFwiKS5sZW5ndGg+MCkpe3ZhciBiPXRoaXM7YSgnPGRpdiBpZD1cImxpZ2h0Ym94T3ZlcmxheVwiIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImxpZ2h0Ym94T3ZlcmxheVwiPjwvZGl2PjxkaXYgaWQ9XCJsaWdodGJveFwiIHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImxpZ2h0Ym94XCI+PGRpdiBjbGFzcz1cImxiLW91dGVyQ29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImxiLWNvbnRhaW5lclwiPjxpbWcgY2xhc3M9XCJsYi1pbWFnZVwiIHNyYz1cImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQVAvLy93QUFBQ0g1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlDUkFFQU93PT1cIiBhbHQ9XCJcIi8+PGRpdiBjbGFzcz1cImxiLW5hdlwiPjxhIGNsYXNzPVwibGItcHJldlwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXMgaW1hZ2VcIiBocmVmPVwiXCIgPjwvYT48YSBjbGFzcz1cImxiLW5leHRcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYXJpYS1sYWJlbD1cIk5leHQgaW1hZ2VcIiBocmVmPVwiXCIgPjwvYT48L2Rpdj48ZGl2IGNsYXNzPVwibGItbG9hZGVyXCI+PGEgY2xhc3M9XCJsYi1jYW5jZWxcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCI+PC9hPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJsYi1kYXRhQ29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImxiLWRhdGFcIj48ZGl2IGNsYXNzPVwibGItZGV0YWlsc1wiPjxzcGFuIGNsYXNzPVwibGItY2FwdGlvblwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImxiLW51bWJlclwiPjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwibGItY2xvc2VDb250YWluZXJcIj48YSBjbGFzcz1cImxiLWNsb3NlXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiPjwvYT48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKS5hcHBlbmRUbyhhKFwiYm9keVwiKSksdGhpcy4kbGlnaHRib3g9YShcIiNsaWdodGJveFwiKSx0aGlzLiRvdmVybGF5PWEoXCIjbGlnaHRib3hPdmVybGF5XCIpLHRoaXMuJG91dGVyQ29udGFpbmVyPXRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItb3V0ZXJDb250YWluZXJcIiksdGhpcy4kY29udGFpbmVyPXRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItY29udGFpbmVyXCIpLHRoaXMuJGltYWdlPXRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItaW1hZ2VcIiksdGhpcy4kbmF2PXRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItbmF2XCIpLHRoaXMuY29udGFpbmVyUGFkZGluZz17dG9wOnBhcnNlSW50KHRoaXMuJGNvbnRhaW5lci5jc3MoXCJwYWRkaW5nLXRvcFwiKSwxMCkscmlnaHQ6cGFyc2VJbnQodGhpcy4kY29udGFpbmVyLmNzcyhcInBhZGRpbmctcmlnaHRcIiksMTApLGJvdHRvbTpwYXJzZUludCh0aGlzLiRjb250YWluZXIuY3NzKFwicGFkZGluZy1ib3R0b21cIiksMTApLGxlZnQ6cGFyc2VJbnQodGhpcy4kY29udGFpbmVyLmNzcyhcInBhZGRpbmctbGVmdFwiKSwxMCl9LHRoaXMuaW1hZ2VCb3JkZXJXaWR0aD17dG9wOnBhcnNlSW50KHRoaXMuJGltYWdlLmNzcyhcImJvcmRlci10b3Atd2lkdGhcIiksMTApLHJpZ2h0OnBhcnNlSW50KHRoaXMuJGltYWdlLmNzcyhcImJvcmRlci1yaWdodC13aWR0aFwiKSwxMCksYm90dG9tOnBhcnNlSW50KHRoaXMuJGltYWdlLmNzcyhcImJvcmRlci1ib3R0b20td2lkdGhcIiksMTApLGxlZnQ6cGFyc2VJbnQodGhpcy4kaW1hZ2UuY3NzKFwiYm9yZGVyLWxlZnQtd2lkdGhcIiksMTApfSx0aGlzLiRvdmVybGF5LmhpZGUoKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtyZXR1cm4gYi5lbmQoKSwhMX0pLHRoaXMuJGxpZ2h0Ym94LmhpZGUoKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oYyl7XCJsaWdodGJveFwiPT09YShjLnRhcmdldCkuYXR0cihcImlkXCIpJiZiLmVuZCgpfSksdGhpcy4kb3V0ZXJDb250YWluZXIub24oXCJjbGlja1wiLGZ1bmN0aW9uKGMpe3JldHVyblwibGlnaHRib3hcIj09PWEoYy50YXJnZXQpLmF0dHIoXCJpZFwiKSYmYi5lbmQoKSwhMX0pLHRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItcHJldlwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtyZXR1cm4gMD09PWIuY3VycmVudEltYWdlSW5kZXg/Yi5jaGFuZ2VJbWFnZShiLmFsYnVtLmxlbmd0aC0xKTpiLmNoYW5nZUltYWdlKGIuY3VycmVudEltYWdlSW5kZXgtMSksITF9KSx0aGlzLiRsaWdodGJveC5maW5kKFwiLmxiLW5leHRcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7cmV0dXJuIGIuY3VycmVudEltYWdlSW5kZXg9PT1iLmFsYnVtLmxlbmd0aC0xP2IuY2hhbmdlSW1hZ2UoMCk6Yi5jaGFuZ2VJbWFnZShiLmN1cnJlbnRJbWFnZUluZGV4KzEpLCExfSksdGhpcy4kbmF2Lm9uKFwibW91c2Vkb3duXCIsZnVuY3Rpb24oYSl7Mz09PWEud2hpY2gmJihiLiRuYXYuY3NzKFwicG9pbnRlci1ldmVudHNcIixcIm5vbmVcIiksYi4kbGlnaHRib3gub25lKFwiY29udGV4dG1lbnVcIixmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGlzLiRuYXYuY3NzKFwicG9pbnRlci1ldmVudHNcIixcImF1dG9cIil9LmJpbmQoYiksMCl9KSl9KSx0aGlzLiRsaWdodGJveC5maW5kKFwiLmxiLWxvYWRlciwgLmxiLWNsb3NlXCIpLm9uKFwiY2xpY2sga2V5dXBcIixmdW5jdGlvbihhKXtpZihcImNsaWNrXCI9PT1hLnR5cGV8fFwia2V5dXBcIj09PWEudHlwZSYmKDEzPT09YS53aGljaHx8MzI9PT1hLndoaWNoKSlyZXR1cm4gYi5lbmQoKSwhMX0pfX0sYi5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oYil7ZnVuY3Rpb24gYyhhKXtkLmFsYnVtLnB1c2goe2FsdDphLmF0dHIoXCJkYXRhLWFsdFwiKSxsaW5rOmEuYXR0cihcImhyZWZcIiksdGl0bGU6YS5hdHRyKFwiZGF0YS10aXRsZVwiKXx8YS5hdHRyKFwidGl0bGVcIil9KX12YXIgZD10aGlzLGU9YSh3aW5kb3cpO2Uub24oXCJyZXNpemVcIixhLnByb3h5KHRoaXMuc2l6ZU92ZXJsYXksdGhpcykpLHRoaXMuc2l6ZU92ZXJsYXkoKSx0aGlzLmFsYnVtPVtdO3ZhciBmLGc9MCxoPWIuYXR0cihcImRhdGEtbGlnaHRib3hcIik7aWYoaCl7Zj1hKGIucHJvcChcInRhZ05hbWVcIikrJ1tkYXRhLWxpZ2h0Ym94PVwiJytoKydcIl0nKTtmb3IodmFyIGk9MDtpPGYubGVuZ3RoO2k9KytpKWMoYShmW2ldKSksZltpXT09PWJbMF0mJihnPWkpfWVsc2UgaWYoXCJsaWdodGJveFwiPT09Yi5hdHRyKFwicmVsXCIpKWMoYik7ZWxzZXtmPWEoYi5wcm9wKFwidGFnTmFtZVwiKSsnW3JlbD1cIicrYi5hdHRyKFwicmVsXCIpKydcIl0nKTtmb3IodmFyIGo9MDtqPGYubGVuZ3RoO2o9KytqKWMoYShmW2pdKSksZltqXT09PWJbMF0mJihnPWopfXZhciBrPWUuc2Nyb2xsVG9wKCkrdGhpcy5vcHRpb25zLnBvc2l0aW9uRnJvbVRvcCxsPWUuc2Nyb2xsTGVmdCgpO3RoaXMuJGxpZ2h0Ym94LmNzcyh7dG9wOmsrXCJweFwiLGxlZnQ6bCtcInB4XCJ9KS5mYWRlSW4odGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiksdGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcmJmEoXCJib2R5XCIpLmFkZENsYXNzKFwibGItZGlzYWJsZS1zY3JvbGxpbmdcIiksdGhpcy5jaGFuZ2VJbWFnZShnKX0sYi5wcm90b3R5cGUuY2hhbmdlSW1hZ2U9ZnVuY3Rpb24oYil7dmFyIGM9dGhpcyxkPXRoaXMuYWxidW1bYl0ubGluayxlPWQuc3BsaXQoXCIuXCIpLnNsaWNlKC0xKVswXSxmPXRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItaW1hZ2VcIik7dGhpcy5kaXNhYmxlS2V5Ym9hcmROYXYoKSx0aGlzLiRvdmVybGF5LmZhZGVJbih0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uKSxhKFwiLmxiLWxvYWRlclwiKS5mYWRlSW4oXCJzbG93XCIpLHRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItaW1hZ2UsIC5sYi1uYXYsIC5sYi1wcmV2LCAubGItbmV4dCwgLmxiLWRhdGFDb250YWluZXIsIC5sYi1udW1iZXJzLCAubGItY2FwdGlvblwiKS5oaWRlKCksdGhpcy4kb3V0ZXJDb250YWluZXIuYWRkQ2xhc3MoXCJhbmltYXRpbmdcIik7dmFyIGc9bmV3IEltYWdlO2cub25sb2FkPWZ1bmN0aW9uKCl7dmFyIGgsaSxqLGssbCxtO2YuYXR0cih7YWx0OmMuYWxidW1bYl0uYWx0LHNyYzpkfSksYShnKSxmLndpZHRoKGcud2lkdGgpLGYuaGVpZ2h0KGcuaGVpZ2h0KTt2YXIgbj1nLndpZHRoL2cuaGVpZ2h0O209YSh3aW5kb3cpLndpZHRoKCksbD1hKHdpbmRvdykuaGVpZ2h0KCksaz1tLWMuY29udGFpbmVyUGFkZGluZy5sZWZ0LWMuY29udGFpbmVyUGFkZGluZy5yaWdodC1jLmltYWdlQm9yZGVyV2lkdGgubGVmdC1jLmltYWdlQm9yZGVyV2lkdGgucmlnaHQtMjAsaj1sLWMuY29udGFpbmVyUGFkZGluZy50b3AtYy5jb250YWluZXJQYWRkaW5nLmJvdHRvbS1jLmltYWdlQm9yZGVyV2lkdGgudG9wLWMuaW1hZ2VCb3JkZXJXaWR0aC5ib3R0b20tYy5vcHRpb25zLnBvc2l0aW9uRnJvbVRvcC03MCxcInN2Z1wiPT09ZT8obj49MT8oaT1rLGg9cGFyc2VJbnQoay9uLDEwKSk6KGk9cGFyc2VJbnQoai9uLDEwKSxoPWopLGYud2lkdGgoaSksZi5oZWlnaHQoaCkpOihjLm9wdGlvbnMuZml0SW1hZ2VzSW5WaWV3cG9ydD8oYy5vcHRpb25zLm1heFdpZHRoJiZjLm9wdGlvbnMubWF4V2lkdGg8ayYmKGs9Yy5vcHRpb25zLm1heFdpZHRoKSxjLm9wdGlvbnMubWF4SGVpZ2h0JiZjLm9wdGlvbnMubWF4SGVpZ2h0PGomJihqPWMub3B0aW9ucy5tYXhIZWlnaHQpKTooaz1jLm9wdGlvbnMubWF4V2lkdGh8fGcud2lkdGh8fGssaj1jLm9wdGlvbnMubWF4SGVpZ2h0fHxnLmhlaWdodHx8aiksKGcud2lkdGg+a3x8Zy5oZWlnaHQ+aikmJihnLndpZHRoL2s+Zy5oZWlnaHQvaj8oaT1rLGg9cGFyc2VJbnQoZy5oZWlnaHQvKGcud2lkdGgvaSksMTApLGYud2lkdGgoaSksZi5oZWlnaHQoaCkpOihoPWosaT1wYXJzZUludChnLndpZHRoLyhnLmhlaWdodC9oKSwxMCksZi53aWR0aChpKSxmLmhlaWdodChoKSkpKSxjLnNpemVDb250YWluZXIoZi53aWR0aCgpLGYuaGVpZ2h0KCkpfSxnLnNyYz10aGlzLmFsYnVtW2JdLmxpbmssdGhpcy5jdXJyZW50SW1hZ2VJbmRleD1ifSxiLnByb3RvdHlwZS5zaXplT3ZlcmxheT1mdW5jdGlvbigpe3ZhciBiPXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe2IuJG92ZXJsYXkud2lkdGgoYShkb2N1bWVudCkud2lkdGgoKSkuaGVpZ2h0KGEoZG9jdW1lbnQpLmhlaWdodCgpKX0sMCl9LGIucHJvdG90eXBlLnNpemVDb250YWluZXI9ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKCl7ZC4kbGlnaHRib3guZmluZChcIi5sYi1kYXRhQ29udGFpbmVyXCIpLndpZHRoKGcpLGQuJGxpZ2h0Ym94LmZpbmQoXCIubGItcHJldkxpbmtcIikuaGVpZ2h0KGgpLGQuJGxpZ2h0Ym94LmZpbmQoXCIubGItbmV4dExpbmtcIikuaGVpZ2h0KGgpLGQuJG92ZXJsYXkudHJpZ2dlcihcImZvY3VzXCIpLGQuc2hvd0ltYWdlKCl9dmFyIGQ9dGhpcyxlPXRoaXMuJG91dGVyQ29udGFpbmVyLm91dGVyV2lkdGgoKSxmPXRoaXMuJG91dGVyQ29udGFpbmVyLm91dGVySGVpZ2h0KCksZz1hK3RoaXMuY29udGFpbmVyUGFkZGluZy5sZWZ0K3RoaXMuY29udGFpbmVyUGFkZGluZy5yaWdodCt0aGlzLmltYWdlQm9yZGVyV2lkdGgubGVmdCt0aGlzLmltYWdlQm9yZGVyV2lkdGgucmlnaHQsaD1iK3RoaXMuY29udGFpbmVyUGFkZGluZy50b3ArdGhpcy5jb250YWluZXJQYWRkaW5nLmJvdHRvbSt0aGlzLmltYWdlQm9yZGVyV2lkdGgudG9wK3RoaXMuaW1hZ2VCb3JkZXJXaWR0aC5ib3R0b207ZSE9PWd8fGYhPT1oP3RoaXMuJG91dGVyQ29udGFpbmVyLmFuaW1hdGUoe3dpZHRoOmcsaGVpZ2h0Omh9LHRoaXMub3B0aW9ucy5yZXNpemVEdXJhdGlvbixcInN3aW5nXCIsZnVuY3Rpb24oKXtjKCl9KTpjKCl9LGIucHJvdG90eXBlLnNob3dJbWFnZT1mdW5jdGlvbigpe3RoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItbG9hZGVyXCIpLnN0b3AoITApLmhpZGUoKSx0aGlzLiRsaWdodGJveC5maW5kKFwiLmxiLWltYWdlXCIpLmZhZGVJbih0aGlzLm9wdGlvbnMuaW1hZ2VGYWRlRHVyYXRpb24pLHRoaXMudXBkYXRlTmF2KCksdGhpcy51cGRhdGVEZXRhaWxzKCksdGhpcy5wcmVsb2FkTmVpZ2hib3JpbmdJbWFnZXMoKSx0aGlzLmVuYWJsZUtleWJvYXJkTmF2KCl9LGIucHJvdG90eXBlLnVwZGF0ZU5hdj1mdW5jdGlvbigpe3ZhciBhPSExO3RyeXtkb2N1bWVudC5jcmVhdGVFdmVudChcIlRvdWNoRXZlbnRcIiksYT0hIXRoaXMub3B0aW9ucy5hbHdheXNTaG93TmF2T25Ub3VjaERldmljZXN9Y2F0Y2goYSl7fXRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItbmF2XCIpLnNob3coKSx0aGlzLmFsYnVtLmxlbmd0aD4xJiYodGhpcy5vcHRpb25zLndyYXBBcm91bmQ/KGEmJnRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItcHJldiwgLmxiLW5leHRcIikuY3NzKFwib3BhY2l0eVwiLFwiMVwiKSx0aGlzLiRsaWdodGJveC5maW5kKFwiLmxiLXByZXYsIC5sYi1uZXh0XCIpLnNob3coKSk6KHRoaXMuY3VycmVudEltYWdlSW5kZXg+MCYmKHRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItcHJldlwiKS5zaG93KCksYSYmdGhpcy4kbGlnaHRib3guZmluZChcIi5sYi1wcmV2XCIpLmNzcyhcIm9wYWNpdHlcIixcIjFcIikpLHRoaXMuY3VycmVudEltYWdlSW5kZXg8dGhpcy5hbGJ1bS5sZW5ndGgtMSYmKHRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItbmV4dFwiKS5zaG93KCksYSYmdGhpcy4kbGlnaHRib3guZmluZChcIi5sYi1uZXh0XCIpLmNzcyhcIm9wYWNpdHlcIixcIjFcIikpKSl9LGIucHJvdG90eXBlLnVwZGF0ZURldGFpbHM9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO2lmKHZvaWQgMCE9PXRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0udGl0bGUmJlwiXCIhPT10aGlzLmFsYnVtW3RoaXMuY3VycmVudEltYWdlSW5kZXhdLnRpdGxlKXt2YXIgYj10aGlzLiRsaWdodGJveC5maW5kKFwiLmxiLWNhcHRpb25cIik7dGhpcy5vcHRpb25zLnNhbml0aXplVGl0bGU/Yi50ZXh0KHRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0udGl0bGUpOmIuaHRtbCh0aGlzLmFsYnVtW3RoaXMuY3VycmVudEltYWdlSW5kZXhdLnRpdGxlKSxiLmZhZGVJbihcImZhc3RcIil9aWYodGhpcy5hbGJ1bS5sZW5ndGg+MSYmdGhpcy5vcHRpb25zLnNob3dJbWFnZU51bWJlckxhYmVsKXt2YXIgYz10aGlzLmltYWdlQ291bnRMYWJlbCh0aGlzLmN1cnJlbnRJbWFnZUluZGV4KzEsdGhpcy5hbGJ1bS5sZW5ndGgpO3RoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItbnVtYmVyXCIpLnRleHQoYykuZmFkZUluKFwiZmFzdFwiKX1lbHNlIHRoaXMuJGxpZ2h0Ym94LmZpbmQoXCIubGItbnVtYmVyXCIpLmhpZGUoKTt0aGlzLiRvdXRlckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImFuaW1hdGluZ1wiKSx0aGlzLiRsaWdodGJveC5maW5kKFwiLmxiLWRhdGFDb250YWluZXJcIikuZmFkZUluKHRoaXMub3B0aW9ucy5yZXNpemVEdXJhdGlvbixmdW5jdGlvbigpe3JldHVybiBhLnNpemVPdmVybGF5KCl9KX0sYi5wcm90b3R5cGUucHJlbG9hZE5laWdoYm9yaW5nSW1hZ2VzPWZ1bmN0aW9uKCl7aWYodGhpcy5hbGJ1bS5sZW5ndGg+dGhpcy5jdXJyZW50SW1hZ2VJbmRleCsxKXsobmV3IEltYWdlKS5zcmM9dGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4KzFdLmxpbmt9aWYodGhpcy5jdXJyZW50SW1hZ2VJbmRleD4wKXsobmV3IEltYWdlKS5zcmM9dGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4LTFdLmxpbmt9fSxiLnByb3RvdHlwZS5lbmFibGVLZXlib2FyZE5hdj1mdW5jdGlvbigpe3RoaXMuJGxpZ2h0Ym94Lm9uKFwia2V5dXAua2V5Ym9hcmRcIixhLnByb3h5KHRoaXMua2V5Ym9hcmRBY3Rpb24sdGhpcykpLHRoaXMuJG92ZXJsYXkub24oXCJrZXl1cC5rZXlib2FyZFwiLGEucHJveHkodGhpcy5rZXlib2FyZEFjdGlvbix0aGlzKSl9LGIucHJvdG90eXBlLmRpc2FibGVLZXlib2FyZE5hdj1mdW5jdGlvbigpe3RoaXMuJGxpZ2h0Ym94Lm9mZihcIi5rZXlib2FyZFwiKSx0aGlzLiRvdmVybGF5Lm9mZihcIi5rZXlib2FyZFwiKX0sYi5wcm90b3R5cGUua2V5Ym9hcmRBY3Rpb249ZnVuY3Rpb24oYSl7dmFyIGI9YS5rZXlDb2RlOzI3PT09Yj8oYS5zdG9wUHJvcGFnYXRpb24oKSx0aGlzLmVuZCgpKTozNz09PWI/MCE9PXRoaXMuY3VycmVudEltYWdlSW5kZXg/dGhpcy5jaGFuZ2VJbWFnZSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4LTEpOnRoaXMub3B0aW9ucy53cmFwQXJvdW5kJiZ0aGlzLmFsYnVtLmxlbmd0aD4xJiZ0aGlzLmNoYW5nZUltYWdlKHRoaXMuYWxidW0ubGVuZ3RoLTEpOjM5PT09YiYmKHRoaXMuY3VycmVudEltYWdlSW5kZXghPT10aGlzLmFsYnVtLmxlbmd0aC0xP3RoaXMuY2hhbmdlSW1hZ2UodGhpcy5jdXJyZW50SW1hZ2VJbmRleCsxKTp0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCYmdGhpcy5hbGJ1bS5sZW5ndGg+MSYmdGhpcy5jaGFuZ2VJbWFnZSgwKSl9LGIucHJvdG90eXBlLmVuZD1mdW5jdGlvbigpe3RoaXMuZGlzYWJsZUtleWJvYXJkTmF2KCksYSh3aW5kb3cpLm9mZihcInJlc2l6ZVwiLHRoaXMuc2l6ZU92ZXJsYXkpLHRoaXMuJGxpZ2h0Ym94LmZhZGVPdXQodGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiksdGhpcy4kb3ZlcmxheS5mYWRlT3V0KHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24pLHRoaXMub3B0aW9ucy5kaXNhYmxlU2Nyb2xsaW5nJiZhKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImxiLWRpc2FibGUtc2Nyb2xsaW5nXCIpfSxuZXcgYn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlnaHRib3gubWluLm1hcCIsIi8qKlxyXG4gKiBGaWxlIG5hdmlnYXRpb24uanMuXHJcbiAqXHJcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XHJcbiAqIG5hdmlnYXRpb24gc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXHJcbiAqL1xyXG4oIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBwYWdlQm9keSwgY29udGFpbmVyLCBidXR0b24sIG1lbnUsIGxpbmtzLCBpLCBsZW47XHJcblxyXG5cdHBhZ2VCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcclxuXHRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3NpdGUtbmF2aWdhdGlvbicgKTtcclxuXHJcblx0aWYgKCAhIGNvbnRhaW5lciApIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGJ1dHRvbiA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2J1dHRvbicgKVswXTtcclxuXHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgYnV0dG9uICkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0bWVudSA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCAnbmF2LWlubmVyJyApWzBdO1xyXG5cclxuXHQvLyBIaWRlIG1lbnUgdG9nZ2xlIGJ1dHRvbiBpZiBtZW51IGlzIGVtcHR5IGFuZCByZXR1cm4gZWFybHkuXHJcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG1lbnUgKSB7XHJcblx0XHRidXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcclxuXHRpZiAoIC0xID09PSBtZW51LmNsYXNzTmFtZS5pbmRleE9mKCAnbmF2LW1lbnUnICkgKSB7XHJcblx0XHRtZW51LmNsYXNzTmFtZSArPSAnIG5hdi1tZW51JztcclxuXHR9XHJcblxyXG5cdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoIC0xICE9PSBjb250YWluZXIuY2xhc3NOYW1lLmluZGV4T2YoICd0b2dnbGVkJyApICkge1xyXG5cdFx0XHRpZihwYWdlQm9keVswXS5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtb3BlbicpKSB7XHJcblx0XHRcdFx0cGFnZUJvZHlbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1vcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdC8vXHRwYWdlQm9keS5jbGFzc0xpc3QucmVtb3ZlKCcgbWVudS1vcGVuJyk7XHJcblx0XHRcdGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoICcgdG9nZ2xlZCcsICcnICk7XHJcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyApO1xyXG5cdFx0XHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGFnZUJvZHlbMF0uY2xhc3NMaXN0LmFkZCgnbWVudS1vcGVuJyk7XHJcblx0XHRcdGNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyB0b2dnbGVkJztcclxuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScgKTtcclxuXHRcdFx0bWVudS5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnICk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gR2V0IGFsbCB0aGUgbGluayBlbGVtZW50cyB3aXRoaW4gdGhlIG1lbnUuXHJcblx0bGlua3MgICAgPSBtZW51LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYScgKTtcclxuXHJcblx0Ly8gRWFjaCB0aW1lIGEgbWVudSBsaW5rIGlzIGZvY3VzZWQgb3IgYmx1cnJlZCwgdG9nZ2xlIGZvY3VzLlxyXG5cdGZvciAoIGkgPSAwLCBsZW4gPSBsaW5rcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdGxpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XHJcblx0XHRsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIG9yIHJlbW92ZXMgLmZvY3VzIGNsYXNzIG9uIGFuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlRm9jdXMoKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gTW92ZSB1cCB0aHJvdWdoIHRoZSBhbmNlc3RvcnMgb2YgdGhlIGN1cnJlbnQgbGluayB1bnRpbCB3ZSBoaXQgLm5hdi1tZW51LlxyXG5cdFx0d2hpbGUgKCAtMSA9PT0gc2VsZi5jbGFzc05hbWUuaW5kZXhPZiggJ25hdi1tZW51JyApICkge1xyXG5cclxuXHRcdFx0Ly8gT24gbGkgZWxlbWVudHMgdG9nZ2xlIHRoZSBjbGFzcyAuZm9jdXMuXHJcblx0XHRcdGlmICggJ2xpJyA9PT0gc2VsZi50YWdOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XHJcblx0XHRcdFx0aWYgKCAtMSAhPT0gc2VsZi5jbGFzc05hbWUuaW5kZXhPZiggJ2ZvY3VzJyApICkge1xyXG5cdFx0XHRcdFx0c2VsZi5jbGFzc05hbWUgPSBzZWxmLmNsYXNzTmFtZS5yZXBsYWNlKCAnIGZvY3VzJywgJycgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZi5jbGFzc05hbWUgKz0gJyBmb2N1cyc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmID0gc2VsZi5wYXJlbnRFbGVtZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyBgZm9jdXNgIGNsYXNzIHRvIGFsbG93IHN1Ym1lbnUgYWNjZXNzIG9uIHRhYmxldHMuXHJcblx0ICovXHJcblx0KCBmdW5jdGlvbiggY29udGFpbmVyICkge1xyXG5cdFx0dmFyIHRvdWNoU3RhcnRGbiwgaSxcclxuXHRcdFx0cGFyZW50TGluayA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCAnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhLCAucGFnZV9pdGVtX2hhc19jaGlsZHJlbiA+IGEnICk7XHJcblxyXG5cdFx0aWYgKCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgKSB7XHJcblx0XHRcdHRvdWNoU3RhcnRGbiA9IGZ1bmN0aW9uKCBlICkge1xyXG5cdFx0XHRcdHZhciBtZW51SXRlbSA9IHRoaXMucGFyZW50Tm9kZSwgaTtcclxuXHJcblx0XHRcdFx0aWYgKCAhIG1lbnVJdGVtLmNsYXNzTGlzdC5jb250YWlucyggJ2ZvY3VzJyApICkge1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBtZW51SXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpICkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIG1lbnVJdGVtID09PSBtZW51SXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuW2ldICkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG1lbnVJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSggJ2ZvY3VzJyApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bWVudUl0ZW0uY2xhc3NMaXN0LmFkZCggJ2ZvY3VzJyApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCAnZm9jdXMnICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBwYXJlbnRMaW5rLmxlbmd0aDsgKytpICkge1xyXG5cdFx0XHRcdHBhcmVudExpbmtbaV0uYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0Rm4sIGZhbHNlICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KCBjb250YWluZXIgKSApO1xyXG59ICkoKTtcclxuIiwiLyogc3RpY2t5IE1lbnVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcbiAgLy9pZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTkyKSB7XG5cbiAgICAvLyBpbml0IHN0aWNreSBtZW51XG4gICAgdmFyIGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIC8vJChcImJvZHlcIikuYWRkQ2xhc3MoXCJoYXMtc3RpY2t5LW1lbnVcIik7XG5cbiAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gMTIwKSB7XG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInN0aWNreS1tZW51XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInN0aWNreS1tZW51XCIpO1xuICAgIH1cbiAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPiAxMjApIHtcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJzdGlja3ktbWVudVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic3RpY2t5LW1lbnVcIik7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzY3JvbGwtdXBcIik7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikuYWRkQ2xhc3MoXCJzY3JvbGwtZG93blwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzY3JvbGwtZG93blwiKTtcbiAgICAgICAgalF1ZXJ5KFwiYm9keVwiKS5hZGRDbGFzcyhcInNjcm9sbC11cFwiKTtcbiAgICAgIH1cbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbiAgICB9KTtcbiAgLy99XG4gIFxuICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqXG4gICogRXh0cmEtY29uZiBmb3Igb25lcGFnZXNcbiAgKlxuICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiAgalF1ZXJ5KFwiLm1lbnUtaXRlbSBhXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBtZW51SXRlbSA9IGpRdWVyeSh0aGlzKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgIGpRdWVyeSgnLm1haW4tbmF2aWdhdGlvbicpLnJlbW92ZUNsYXNzKCd0b2dnbGVkJyk7XG4gICAgICBqUXVlcnkoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWVudS10b2dnbGVkJyk7XG5cbiAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBqUXVlcnkobWVudUl0ZW0pLm9mZnNldCgpLnRvcC0xMDBcbiAgICAgIH0sIDgwMCkuZGVsYXkoMjAwKTtcbiAgfSk7Ki9cbn0pOyIsIi8qKlxyXG4gKiBGaWxlIHNraXAtbGluay1mb2N1cy1maXguanMuXHJcbiAqXHJcbiAqIEhlbHBzIHdpdGggYWNjZXNzaWJpbGl0eSBmb3Iga2V5Ym9hcmQgb25seSB1c2Vycy5cclxuICpcclxuICogTGVhcm4gbW9yZTogaHR0cHM6Ly9naXQuaW8vdldkcjJcclxuICovXHJcbiggZnVuY3Rpb24oKSB7XHJcblx0dmFyIGlzSWUgPSAvKHRyaWRlbnR8bXNpZSkvaS50ZXN0KCBuYXZpZ2F0b3IudXNlckFnZW50ICk7XHJcblxyXG5cdGlmICggaXNJZSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaWQgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZyggMSApLFxyXG5cdFx0XHRcdGVsZW1lbnQ7XHJcblxyXG5cdFx0XHRpZiAoICEgKCAvXltBLXowLTlfLV0rJC8udGVzdCggaWQgKSApICkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xyXG5cclxuXHRcdFx0aWYgKCBlbGVtZW50ICkge1xyXG5cdFx0XHRcdGlmICggISAoIC9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaS50ZXN0KCBlbGVtZW50LnRhZ05hbWUgKSApICkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC50YWJJbmRleCA9IC0xO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCBmYWxzZSApO1xyXG5cdH1cclxufSApKCk7XHJcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuXHJcbiBcdC8qalF1ZXJ5KFwiLnNsaWRlci1hY3Rpdml0aWVzXCIpLm93bENhcm91c2VsKHtcclxuXHRcdGxvb3A6IGZhbHNlLFxyXG5cdFx0bmF2OiB0cnVlLFxyXG5cdFx0ZG90czogZmFsc2UsXHJcblx0XHRhdXRvcGxheTogZmFsc2UsXHJcblx0XHRtb3VzZURyYWc6IHRydWUsXHJcblx0XHR0b3VjaERyYWc6IHRydWUsXHJcblx0XHRyZXNwb25zaXZlIDoge1xyXG5cdFx0ICAgIDAgOiB7XHJcblx0XHQgICAgICAgIGl0ZW1zOiAxLFxyXG5cdFx0ICAgIH0sXHJcblx0XHQgICAgNzY4IDoge1xyXG5cdFx0ICAgICAgICBpdGVtczogMixcclxuXHRcdCAgICB9LFxyXG5cdFx0ICAgIDk5MiA6IHtcclxuXHRcdCAgICAgICAgaXRlbXM6IDMsXHJcblx0XHQgICAgfSxcclxuXHRcdCAgICAgMTIwMCA6IHtcclxuXHRcdCAgICBcdGl0ZW1zOiA0LFxyXG5cdFx0ICAgIH1cclxuXHRcdH1cclxuXHR9KTsqL1xyXG5cclxuXHRpZiAobG9jYXRpb24uaGFzaCkgbG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLmhhc2g7XHJcblxyXG5cdGlmIChqUXVlcnkuY29va2llKCdoaWRlY29va2llJykgIT0gXCJoaWRkZW5cIiApIHtcclxuXHRcdCQoJyNjb29raWViYW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoalF1ZXJ5LmNvb2tpZSgnaGlkZXBvcHVwJykgIT0gXCJoaWRkZW5cIiApIHtcclxuXHRcdCQoJyNwb3B1cCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuXHR9XHJcblx0XHJcblx0JCgnI2Nvb2tpZWJhbm5lciBidXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSsoMzYwKjI0KjYwKjYwKjEwMDApKTtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gXCJoaWRlY29va2llXCIgKyBcIj1cIiArIFwiaGlkZGVuXCIgKyBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHJcbiAgICAgICQoJyNjb29raWViYW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcblx0fSk7XHJcblx0XHJcblx0Ly8galF1ZXJ5KFwiLnBvcHVwLWNsb3NlLCAucG9wdXAtYmdcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIC8vICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkrKDYwKjYwKjEwMDApKTtcclxuICAvLyAgICAgZG9jdW1lbnQuY29va2llID0gXCJoaWRlcG9wdXBcIiArIFwiPVwiICsgXCJoaWRkZW5cIiArIFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgXHJcblx0Ly8gICBqUXVlcnkoJyNwb3B1cCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuXHQvLyB9KTtcclxuXHJcbn0pXHJcblxyXG5saWdodGJveC5vcHRpb24oe1xyXG4gICdhbGJ1bUxhYmVsJzogXCJJbWFnZSAlMSBzdXIgJTJcIixcclxufSlcclxuXHJcblxyXG5qUXVlcnkoXCIucGFnZS10ZW1wbGF0ZS1ob21lcGFnZSAubWVudS1hbmNob3IgYVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbWVudUxpbmsgPSBqUXVlcnkodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgdmFyIG1lbnVIYXNoID0gbWVudUxpbmsuc3BsaXQoJyMnKS5wb3AoKTtcclxuICAgIHZhciBtZW51SXRlbSA9IFwiI1wiICsgbWVudUhhc2g7XHJcblxyXG4gICAgY29uc29sZS5sb2cobWVudUl0ZW0pO1xyXG5cclxuXHJcbiAgICBqUXVlcnkoJyNzaXRlLW5hdmlnYXRpb24nKS5yZW1vdmVDbGFzcygndG9nZ2xlZCcpO1xyXG4gICAgalF1ZXJ5KCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtdG9nZ2xlZCcpO1xyXG5cclxuICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XHJcbiAgICAgICBzY3JvbGxUb3A6IGpRdWVyeShtZW51SXRlbSkub2Zmc2V0KCkudG9wXHJcbiAgICB9LCA1MDApLmRlbGF5KDIwMCk7XHJcbiAgICBcclxuICAgIGpRdWVyeSgnYm9keScpLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxufSk7XHJcbiJdfQ==
