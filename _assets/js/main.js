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
