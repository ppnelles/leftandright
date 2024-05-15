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

jQuery(".page-template-homepage .menu-anchor a").click(function() {
    event.preventDefault();
    var menuItem = jQuery(this).attr('href');

    //console.log(menuItem);


    jQuery('#site-navigation').removeClass('toggled');
    jQuery('body').removeClass('menu-toggled');

    jQuery([document.documentElement, document.body]).animate({
       scrollTop: jQuery(menuItem).offset().top
    }, 500).delay(200);
    
    jQuery('body').removeClass('menu-open');
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5jb29raWUuanMiLCJuYXZpZ2F0aW9uLmpzIiwic3RpY2t5LW1lbnUuanMiLCJza2lwLWxpbmstZm9jdXMtZml4LmpzIiwibWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogalF1ZXJ5IENvb2tpZSBQbHVnaW4gdjEuNC4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2FyaGFydGwvanF1ZXJ5LWNvb2tpZVxuICpcbiAqIENvcHlyaWdodCAyMDA2LCAyMDE0IEtsYXVzIEhhcnRsXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTUQgKFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUpXG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdC8vIE5vZGUvQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJyb3dzZXIgZ2xvYmFsc1xuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufShmdW5jdGlvbiAoJCkge1xuXG5cdHZhciBwbHVzZXMgPSAvXFwrL2c7XG5cblx0ZnVuY3Rpb24gZW5jb2RlKHMpIHtcblx0XHRyZXR1cm4gY29uZmlnLnJhdyA/IHMgOiBlbmNvZGVVUklDb21wb25lbnQocyk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZWNvZGUocykge1xuXHRcdHJldHVybiBjb25maWcucmF3ID8gcyA6IGRlY29kZVVSSUNvbXBvbmVudChzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0cmluZ2lmeUNvb2tpZVZhbHVlKHZhbHVlKSB7XG5cdFx0cmV0dXJuIGVuY29kZShjb25maWcuanNvbiA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IFN0cmluZyh2YWx1ZSkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VDb29raWVWYWx1ZShzKSB7XG5cdFx0aWYgKHMuaW5kZXhPZignXCInKSA9PT0gMCkge1xuXHRcdFx0Ly8gVGhpcyBpcyBhIHF1b3RlZCBjb29raWUgYXMgYWNjb3JkaW5nIHRvIFJGQzIwNjgsIHVuZXNjYXBlLi4uXG5cdFx0XHRzID0gcy5zbGljZSgxLCAtMSkucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLnJlcGxhY2UoL1xcXFxcXFxcL2csICdcXFxcJyk7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFJlcGxhY2Ugc2VydmVyLXNpZGUgd3JpdHRlbiBwbHVzZXMgd2l0aCBzcGFjZXMuXG5cdFx0XHQvLyBJZiB3ZSBjYW4ndCBkZWNvZGUgdGhlIGNvb2tpZSwgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0Ly8gSWYgd2UgY2FuJ3QgcGFyc2UgdGhlIGNvb2tpZSwgaWdub3JlIGl0LCBpdCdzIHVudXNhYmxlLlxuXHRcdFx0cyA9IGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UocGx1c2VzLCAnICcpKTtcblx0XHRcdHJldHVybiBjb25maWcuanNvbiA/IEpTT04ucGFyc2UocykgOiBzO1xuXHRcdH0gY2F0Y2goZSkge31cblx0fVxuXG5cdGZ1bmN0aW9uIHJlYWQocywgY29udmVydGVyKSB7XG5cdFx0dmFyIHZhbHVlID0gY29uZmlnLnJhdyA/IHMgOiBwYXJzZUNvb2tpZVZhbHVlKHMpO1xuXHRcdHJldHVybiAkLmlzRnVuY3Rpb24oY29udmVydGVyKSA/IGNvbnZlcnRlcih2YWx1ZSkgOiB2YWx1ZTtcblx0fVxuXG5cdHZhciBjb25maWcgPSAkLmNvb2tpZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zKSB7XG5cblx0XHQvLyBXcml0ZVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmICEkLmlzRnVuY3Rpb24odmFsdWUpKSB7XG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQoe30sIGNvbmZpZy5kZWZhdWx0cywgb3B0aW9ucyk7XG5cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5leHBpcmVzID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHR2YXIgZGF5cyA9IG9wdGlvbnMuZXhwaXJlcywgdCA9IG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdHQuc2V0TWlsbGlzZWNvbmRzKHQuZ2V0TWlsbGlzZWNvbmRzKCkgKyBkYXlzICogODY0ZSs1KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChkb2N1bWVudC5jb29raWUgPSBbXG5cdFx0XHRcdGVuY29kZShrZXkpLCAnPScsIHN0cmluZ2lmeUNvb2tpZVZhbHVlKHZhbHVlKSxcblx0XHRcdFx0b3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJywgLy8gdXNlIGV4cGlyZXMgYXR0cmlidXRlLCBtYXgtYWdlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0b3B0aW9ucy5wYXRoICAgID8gJzsgcGF0aD0nICsgb3B0aW9ucy5wYXRoIDogJycsXG5cdFx0XHRcdG9wdGlvbnMuZG9tYWluICA/ICc7IGRvbWFpbj0nICsgb3B0aW9ucy5kb21haW4gOiAnJyxcblx0XHRcdFx0b3B0aW9ucy5zZWN1cmUgID8gJzsgc2VjdXJlJyA6ICcnXG5cdFx0XHRdLmpvaW4oJycpKTtcblx0XHR9XG5cblx0XHQvLyBSZWFkXG5cblx0XHR2YXIgcmVzdWx0ID0ga2V5ID8gdW5kZWZpbmVkIDoge30sXG5cdFx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHRcdC8vIGNhbGxpbmcgJC5jb29raWUoKS5cblx0XHRcdGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUgPyBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsgJykgOiBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bCA9IGNvb2tpZXMubGVuZ3RoO1xuXG5cdFx0Zm9yICg7IGkgPCBsOyBpKyspIHtcblx0XHRcdHZhciBwYXJ0cyA9IGNvb2tpZXNbaV0uc3BsaXQoJz0nKSxcblx0XHRcdFx0bmFtZSA9IGRlY29kZShwYXJ0cy5zaGlmdCgpKSxcblx0XHRcdFx0Y29va2llID0gcGFydHMuam9pbignPScpO1xuXG5cdFx0XHRpZiAoa2V5ID09PSBuYW1lKSB7XG5cdFx0XHRcdC8vIElmIHNlY29uZCBhcmd1bWVudCAodmFsdWUpIGlzIGEgZnVuY3Rpb24gaXQncyBhIGNvbnZlcnRlci4uLlxuXHRcdFx0XHRyZXN1bHQgPSByZWFkKGNvb2tpZSwgdmFsdWUpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Ly8gUHJldmVudCBzdG9yaW5nIGEgY29va2llIHRoYXQgd2UgY291bGRuJ3QgZGVjb2RlLlxuXHRcdFx0aWYgKCFrZXkgJiYgKGNvb2tpZSA9IHJlYWQoY29va2llKSkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXN1bHRbbmFtZV0gPSBjb29raWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRjb25maWcuZGVmYXVsdHMgPSB7fTtcblxuXHQkLnJlbW92ZUNvb2tpZSA9IGZ1bmN0aW9uIChrZXksIG9wdGlvbnMpIHtcblx0XHQvLyBNdXN0IG5vdCBhbHRlciBvcHRpb25zLCB0aHVzIGV4dGVuZGluZyBhIGZyZXNoIG9iamVjdC4uLlxuXHRcdCQuY29va2llKGtleSwgJycsICQuZXh0ZW5kKHt9LCBvcHRpb25zLCB7IGV4cGlyZXM6IC0xIH0pKTtcblx0XHRyZXR1cm4gISQuY29va2llKGtleSk7XG5cdH07XG5cbn0pKTtcbiIsIi8qKlxyXG4gKiBGaWxlIG5hdmlnYXRpb24uanMuXHJcbiAqXHJcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XHJcbiAqIG5hdmlnYXRpb24gc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXHJcbiAqL1xyXG4oIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBwYWdlQm9keSwgY29udGFpbmVyLCBidXR0b24sIG1lbnUsIGxpbmtzLCBpLCBsZW47XHJcblxyXG5cdHBhZ2VCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKTtcclxuXHRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3NpdGUtbmF2aWdhdGlvbicgKTtcclxuXHJcblx0aWYgKCAhIGNvbnRhaW5lciApIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGJ1dHRvbiA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSggJ2J1dHRvbicgKVswXTtcclxuXHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgYnV0dG9uICkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0bWVudSA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCAnbmF2LWlubmVyJyApWzBdO1xyXG5cclxuXHQvLyBIaWRlIG1lbnUgdG9nZ2xlIGJ1dHRvbiBpZiBtZW51IGlzIGVtcHR5IGFuZCByZXR1cm4gZWFybHkuXHJcblx0aWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG1lbnUgKSB7XHJcblx0XHRidXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcclxuXHRpZiAoIC0xID09PSBtZW51LmNsYXNzTmFtZS5pbmRleE9mKCAnbmF2LW1lbnUnICkgKSB7XHJcblx0XHRtZW51LmNsYXNzTmFtZSArPSAnIG5hdi1tZW51JztcclxuXHR9XHJcblxyXG5cdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoIC0xICE9PSBjb250YWluZXIuY2xhc3NOYW1lLmluZGV4T2YoICd0b2dnbGVkJyApICkge1xyXG5cdFx0XHRpZihwYWdlQm9keVswXS5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtb3BlbicpKSB7XHJcblx0XHRcdFx0cGFnZUJvZHlbMF0uY2xhc3NMaXN0LnJlbW92ZSgnbWVudS1vcGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdC8vXHRwYWdlQm9keS5jbGFzc0xpc3QucmVtb3ZlKCcgbWVudS1vcGVuJyk7XHJcblx0XHRcdGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoICcgdG9nZ2xlZCcsICcnICk7XHJcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyApO1xyXG5cdFx0XHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cGFnZUJvZHlbMF0uY2xhc3NMaXN0LmFkZCgnbWVudS1vcGVuJyk7XHJcblx0XHRcdGNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyB0b2dnbGVkJztcclxuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScgKTtcclxuXHRcdFx0bWVudS5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnICk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gR2V0IGFsbCB0aGUgbGluayBlbGVtZW50cyB3aXRoaW4gdGhlIG1lbnUuXHJcblx0bGlua3MgICAgPSBtZW51LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYScgKTtcclxuXHJcblx0Ly8gRWFjaCB0aW1lIGEgbWVudSBsaW5rIGlzIGZvY3VzZWQgb3IgYmx1cnJlZCwgdG9nZ2xlIGZvY3VzLlxyXG5cdGZvciAoIGkgPSAwLCBsZW4gPSBsaW5rcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdGxpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XHJcblx0XHRsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIHRvZ2dsZUZvY3VzLCB0cnVlICk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIG9yIHJlbW92ZXMgLmZvY3VzIGNsYXNzIG9uIGFuIGVsZW1lbnQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlRm9jdXMoKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0Ly8gTW92ZSB1cCB0aHJvdWdoIHRoZSBhbmNlc3RvcnMgb2YgdGhlIGN1cnJlbnQgbGluayB1bnRpbCB3ZSBoaXQgLm5hdi1tZW51LlxyXG5cdFx0d2hpbGUgKCAtMSA9PT0gc2VsZi5jbGFzc05hbWUuaW5kZXhPZiggJ25hdi1tZW51JyApICkge1xyXG5cclxuXHRcdFx0Ly8gT24gbGkgZWxlbWVudHMgdG9nZ2xlIHRoZSBjbGFzcyAuZm9jdXMuXHJcblx0XHRcdGlmICggJ2xpJyA9PT0gc2VsZi50YWdOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XHJcblx0XHRcdFx0aWYgKCAtMSAhPT0gc2VsZi5jbGFzc05hbWUuaW5kZXhPZiggJ2ZvY3VzJyApICkge1xyXG5cdFx0XHRcdFx0c2VsZi5jbGFzc05hbWUgPSBzZWxmLmNsYXNzTmFtZS5yZXBsYWNlKCAnIGZvY3VzJywgJycgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2VsZi5jbGFzc05hbWUgKz0gJyBmb2N1cyc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmID0gc2VsZi5wYXJlbnRFbGVtZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlcyBgZm9jdXNgIGNsYXNzIHRvIGFsbG93IHN1Ym1lbnUgYWNjZXNzIG9uIHRhYmxldHMuXHJcblx0ICovXHJcblx0KCBmdW5jdGlvbiggY29udGFpbmVyICkge1xyXG5cdFx0dmFyIHRvdWNoU3RhcnRGbiwgaSxcclxuXHRcdFx0cGFyZW50TGluayA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCAnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhLCAucGFnZV9pdGVtX2hhc19jaGlsZHJlbiA+IGEnICk7XHJcblxyXG5cdFx0aWYgKCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgKSB7XHJcblx0XHRcdHRvdWNoU3RhcnRGbiA9IGZ1bmN0aW9uKCBlICkge1xyXG5cdFx0XHRcdHZhciBtZW51SXRlbSA9IHRoaXMucGFyZW50Tm9kZSwgaTtcclxuXHJcblx0XHRcdFx0aWYgKCAhIG1lbnVJdGVtLmNsYXNzTGlzdC5jb250YWlucyggJ2ZvY3VzJyApICkge1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBtZW51SXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpICkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIG1lbnVJdGVtID09PSBtZW51SXRlbS5wYXJlbnROb2RlLmNoaWxkcmVuW2ldICkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG1lbnVJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSggJ2ZvY3VzJyApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bWVudUl0ZW0uY2xhc3NMaXN0LmFkZCggJ2ZvY3VzJyApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCAnZm9jdXMnICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBwYXJlbnRMaW5rLmxlbmd0aDsgKytpICkge1xyXG5cdFx0XHRcdHBhcmVudExpbmtbaV0uYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0Rm4sIGZhbHNlICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KCBjb250YWluZXIgKSApO1xyXG59ICkoKTtcclxuIiwiLyogc3RpY2t5IE1lbnVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcbiAgLy9pZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTkyKSB7XG5cbiAgICAvLyBpbml0IHN0aWNreSBtZW51XG4gICAgdmFyIGxhc3RTY3JvbGxQb3NpdGlvbiA9IDA7XG4gICAgY3VycmVudFNjcm9sbFBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIC8vJChcImJvZHlcIikuYWRkQ2xhc3MoXCJoYXMtc3RpY2t5LW1lbnVcIik7XG5cbiAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gMTIwKSB7XG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInN0aWNreS1tZW51XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInN0aWNreS1tZW51XCIpO1xuICAgIH1cbiAgICBsYXN0U2Nyb2xsUG9zaXRpb24gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGN1cnJlbnRTY3JvbGxQb3NpdGlvbiA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24gPiAxMjApIHtcbiAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJzdGlja3ktbWVudVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic3RpY2t5LW1lbnVcIik7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFNjcm9sbFBvc2l0aW9uID4gbGFzdFNjcm9sbFBvc2l0aW9uKSB7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzY3JvbGwtdXBcIik7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikuYWRkQ2xhc3MoXCJzY3JvbGwtZG93blwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpRdWVyeShcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzY3JvbGwtZG93blwiKTtcbiAgICAgICAgalF1ZXJ5KFwiYm9keVwiKS5hZGRDbGFzcyhcInNjcm9sbC11cFwiKTtcbiAgICAgIH1cbiAgICAgIGxhc3RTY3JvbGxQb3NpdGlvbiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbjtcbiAgICB9KTtcbiAgLy99XG4gIFxuICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqXG4gICogRXh0cmEtY29uZiBmb3Igb25lcGFnZXNcbiAgKlxuICAqICoqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiAgalF1ZXJ5KFwiLm1lbnUtaXRlbSBhXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBtZW51SXRlbSA9IGpRdWVyeSh0aGlzKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgIGpRdWVyeSgnLm1haW4tbmF2aWdhdGlvbicpLnJlbW92ZUNsYXNzKCd0b2dnbGVkJyk7XG4gICAgICBqUXVlcnkoJ2JvZHknKS5yZW1vdmVDbGFzcygnbWVudS10b2dnbGVkJyk7XG5cbiAgICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiBqUXVlcnkobWVudUl0ZW0pLm9mZnNldCgpLnRvcC0xMDBcbiAgICAgIH0sIDgwMCkuZGVsYXkoMjAwKTtcbiAgfSk7Ki9cbn0pOyIsIi8qKlxyXG4gKiBGaWxlIHNraXAtbGluay1mb2N1cy1maXguanMuXHJcbiAqXHJcbiAqIEhlbHBzIHdpdGggYWNjZXNzaWJpbGl0eSBmb3Iga2V5Ym9hcmQgb25seSB1c2Vycy5cclxuICpcclxuICogTGVhcm4gbW9yZTogaHR0cHM6Ly9naXQuaW8vdldkcjJcclxuICovXHJcbiggZnVuY3Rpb24oKSB7XHJcblx0dmFyIGlzSWUgPSAvKHRyaWRlbnR8bXNpZSkvaS50ZXN0KCBuYXZpZ2F0b3IudXNlckFnZW50ICk7XHJcblxyXG5cdGlmICggaXNJZSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaWQgPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZyggMSApLFxyXG5cdFx0XHRcdGVsZW1lbnQ7XHJcblxyXG5cdFx0XHRpZiAoICEgKCAvXltBLXowLTlfLV0rJC8udGVzdCggaWQgKSApICkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xyXG5cclxuXHRcdFx0aWYgKCBlbGVtZW50ICkge1xyXG5cdFx0XHRcdGlmICggISAoIC9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaS50ZXN0KCBlbGVtZW50LnRhZ05hbWUgKSApICkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudC50YWJJbmRleCA9IC0xO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxlbWVudC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCBmYWxzZSApO1xyXG5cdH1cclxufSApKCk7XHJcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcclxuXHJcbiBcdC8qalF1ZXJ5KFwiLnNsaWRlci1hY3Rpdml0aWVzXCIpLm93bENhcm91c2VsKHtcclxuXHRcdGxvb3A6IGZhbHNlLFxyXG5cdFx0bmF2OiB0cnVlLFxyXG5cdFx0ZG90czogZmFsc2UsXHJcblx0XHRhdXRvcGxheTogZmFsc2UsXHJcblx0XHRtb3VzZURyYWc6IHRydWUsXHJcblx0XHR0b3VjaERyYWc6IHRydWUsXHJcblx0XHRyZXNwb25zaXZlIDoge1xyXG5cdFx0ICAgIDAgOiB7XHJcblx0XHQgICAgICAgIGl0ZW1zOiAxLFxyXG5cdFx0ICAgIH0sXHJcblx0XHQgICAgNzY4IDoge1xyXG5cdFx0ICAgICAgICBpdGVtczogMixcclxuXHRcdCAgICB9LFxyXG5cdFx0ICAgIDk5MiA6IHtcclxuXHRcdCAgICAgICAgaXRlbXM6IDMsXHJcblx0XHQgICAgfSxcclxuXHRcdCAgICAgMTIwMCA6IHtcclxuXHRcdCAgICBcdGl0ZW1zOiA0LFxyXG5cdFx0ICAgIH1cclxuXHRcdH1cclxuXHR9KTsqL1xyXG5cclxuXHRpZiAobG9jYXRpb24uaGFzaCkgbG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLmhhc2g7XHJcblxyXG5cdGlmIChqUXVlcnkuY29va2llKCdoaWRlY29va2llJykgIT0gXCJoaWRkZW5cIiApIHtcclxuXHRcdCQoJyNjb29raWViYW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XHJcblx0fVxyXG5cclxuXHRpZiAoalF1ZXJ5LmNvb2tpZSgnaGlkZXBvcHVwJykgIT0gXCJoaWRkZW5cIiApIHtcclxuXHRcdCQoJyNwb3B1cCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuXHR9XHJcblx0XHJcblx0JCgnI2Nvb2tpZWJhbm5lciBidXR0b24nKS5jbGljayhmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSsoMzYwKjI0KjYwKjYwKjEwMDApKTtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gXCJoaWRlY29va2llXCIgKyBcIj1cIiArIFwiaGlkZGVuXCIgKyBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKTtcclxuXHJcbiAgICAgICQoJyNjb29raWViYW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcblx0fSk7XHJcblx0XHJcblx0Ly8galF1ZXJ5KFwiLnBvcHVwLWNsb3NlLCAucG9wdXAtYmdcIikuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcclxuICAvLyAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIC8vICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkrKDYwKjYwKjEwMDApKTtcclxuICAvLyAgICAgZG9jdW1lbnQuY29va2llID0gXCJoaWRlcG9wdXBcIiArIFwiPVwiICsgXCJoaWRkZW5cIiArIFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xyXG5cdCAgXHJcblx0Ly8gICBqUXVlcnkoJyNwb3B1cCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcclxuXHQvLyB9KTtcclxuXHJcbn0pXHJcblxyXG5qUXVlcnkoXCIucGFnZS10ZW1wbGF0ZS1ob21lcGFnZSAubWVudS1hbmNob3IgYVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbWVudUl0ZW0gPSBqUXVlcnkodGhpcykuYXR0cignaHJlZicpO1xyXG5cclxuICAgIC8vY29uc29sZS5sb2cobWVudUl0ZW0pO1xyXG5cclxuXHJcbiAgICBqUXVlcnkoJyNzaXRlLW5hdmlnYXRpb24nKS5yZW1vdmVDbGFzcygndG9nZ2xlZCcpO1xyXG4gICAgalF1ZXJ5KCdib2R5JykucmVtb3ZlQ2xhc3MoJ21lbnUtdG9nZ2xlZCcpO1xyXG5cclxuICAgIGpRdWVyeShbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSkuYW5pbWF0ZSh7XHJcbiAgICAgICBzY3JvbGxUb3A6IGpRdWVyeShtZW51SXRlbSkub2Zmc2V0KCkudG9wXHJcbiAgICB9LCA1MDApLmRlbGF5KDIwMCk7XHJcbiAgICBcclxuICAgIGpRdWVyeSgnYm9keScpLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcclxufSk7XHJcbiJdfQ==
