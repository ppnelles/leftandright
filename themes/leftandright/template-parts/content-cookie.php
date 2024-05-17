<?php 
	if(ICL_LANGUAGE_CODE == 'fr') {
		$intro = 'Ce site utilise des cookies.';
		$more = "Plus d'infos";
	}
	else {
		$intro = 'This website uses cookies.';
		$more = "More info";
	}
?>

<div id="cookiebanner" class="hidden">
	<div class="intro"><?php echo $intro; ?></div> 
	<div><button class="cookie-btn"><?php _e('OK','_turbo') ?></button> <a href="<?php echo get_privacy_policy_url(); ?>"><?php echo $more; ?></a></div>
</div>