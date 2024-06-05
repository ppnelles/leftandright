<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _turbo
 */

?>
<?php if(get_field('is_offline','option') == true) :
	global $current_user;
	get_currentuserinfo();

	if(!current_user_can( 'edit_posts' )) :
		die('Site en maintenace.');
	endif;
endif; ?>	
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="HandheldFriendly" content="true" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<meta name="author" content="Left And Right" />

	<?php get_template_part( 'template-parts/google', 'head' ); ?>

	<link rel="stylesheet" href="https://use.typekit.net/gfd6xnd.css">

	<?php wp_head(); ?>
	<?php get_template_part('/template-parts/content', 'favicons' ); ?>	

	<?php if(ICL_LANGUAGE_CODE == 'fr') { ?>
		<meta name="description" content="Le packraft Noguera est une nouvelle solution de kayak gonflable permetant d’avoir du plaisir sur l’eau et d’avoir des sensations de glisse."/>
		<link rel="canonical" href="https://leftandright.be/">
		<meta property="og:locale" content="fr_FR" class="yoast-seo-meta-tag"/>
		<meta property="og:type" content="website" class="yoast-seo-meta-tag"/>
		<meta property="og:title" content="Left And Right - Le packraft de Maxime Richard" class="yoast-seo-meta-tag" />
		<meta property="og:description" content="Le packraft Noguera est une nouvelle solution de kayak gonflable permetant d’avoir du plaisir sur l’eau et d’avoir des sensations de glisse." />
		<meta property="og:url" content="https://leftandright.be/" />
		<meta property="og:site_name" content="Left And Right" />
		<meta property="og:image" content="https://leftandright.be/wp-content/uploads/2024/06/og-image-fr.png" class="yoast-seo-meta-tag" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:type" content="image/png" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Left And Right - Le packraft de Maxime Richard" />
		<meta name="twitter:description" content="Le packraft Noguera est une nouvelle solution de kayak gonflable permetant d’avoir du plaisir sur l’eau et d’avoir des sensations de glisse." />
		<meta name="twitter:image" content="https://leftandright.be/wp-content/uploads/2024/06/og-image-fr.png" class="yoast-seo-meta-tag" />

	<?php } elseif(ICL_LANGUAGE_CODE == 'nl') { ?>
		<meta name="description" content="De Noguera packraft is een nieuwe opblaasbare kajakoplossing om plezier te hebben op het water en de sensatie van het glijden te voelen."/>
		<link rel="canonical" href="https://leftandright.be/">
		<meta property="og:locale" content="nl" class="yoast-seo-meta-tag"/>
		<meta property="og:type" content="website" class="yoast-seo-meta-tag"/>
		<meta property="og:title" content="Left And Right - De packraft van Maxime Richard" class="yoast-seo-meta-tag" />
		<meta property="og:description" content="De Noguera packraft is een nieuwe opblaasbare kajakoplossing om plezier te hebben op het water en de sensatie van het glijden te voelen." />
		<meta property="og:url" content="https://leftandright.be/nl" />
		<meta property="og:site_name" content="Left And Right" />
		<meta property="og:image" content="https://leftandright.be/wp-content/uploads/2024/06/og-image-nl.png" class="yoast-seo-meta-tag" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:type" content="image/png" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Left And Right - De packraft van Maxime Richard" />
		<meta name="twitter:description" content="De Noguera packraft is een nieuwe opblaasbare kajakoplossing om plezier te hebben op het water en de sensatie van het glijden te voelen." />
		<meta name="twitter:image" content="https://leftandright.be/wp-content/uploads/2024/06/og-image-nl.png" class="yoast-seo-meta-tag" />
	<?php } elseif(ICL_LANGUAGE_CODE == 'en') { ?>
		<meta name="description" content="The Noguera packraft is a new inflatable kayak solution for having fun on the water and feeling the thrill of gliding."/>
		<link rel="canonical" href="https://leftandright.be/">
		<meta property="og:locale" content="en" class="yoast-seo-meta-tag"/>
		<meta property="og:type" content="website" class="yoast-seo-meta-tag"/>
		<meta property="og:title" content="Left And Right - Maxime Richard's Packraft" class="yoast-seo-meta-tag" />
		<meta property="og:description" content="The Noguera packraft is a new inflatable kayak solution for having fun on the water and feeling the thrill of gliding." />
		<meta property="og:url" content="https://leftandright.be/en" />
		<meta property="og:site_name" content="Left And Right" />
		<meta property="og:image" content="https://leftandright.be/wp-content/uploads/2024/06/og-image-en.png" class="yoast-seo-meta-tag" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:type" content="image/png" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Left And Right - Maxime Richard's Packraft" />
		<meta name="twitter:description" content="The Noguera packraft is a new inflatable kayak solution for having fun on the water and feeling the thrill of gliding." />
		<meta name="twitter:image" content="https://leftandright.be/wp-content/uploads/2024/06/og-image-en.png" class="yoast-seo-meta-tag" />
	<?php } ?>

</head>

<body <?php body_class(); ?> role="document" itemscope="itemscope" itemtype="http://schema.org/WebPage">
<div id="page" class="site">
	<?php get_template_part( 'template-parts/google', 'body' ); ?>
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', '_turbo' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="inner">
			<div class="site-branding">
				<?php
				if ( is_page_template('template-pages/homepage.php') ) : ?>
					<h1 class="site-title" itemprop="name">
						<a href="#page" rel="home">
							<span><?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description', 'display' )  ?>
							</span>
						</a>
					</h1>
					<?php
				else :
					?>
					<p class="site-title" itemprop="name">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
							<span><?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description', 'display' )  ?></span>
						</a>
					</p>
					<?php
				endif; ?>
				</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">

				<div class="network">
					<?php get_template_part('template-parts/content','network'); ?>
				</div>

				<?php 
					$languages = icl_get_languages('skip_missing=0&orderby=code');
					foreach ($languages as $l) {

				      if (!$l['active']) {
				        echo '<a class="single-lang-switch" href="' . $l['url'] . '">';
				        echo $l['tag'];
				        echo '</a>';
				      }
				  } 
				?>

				<ul class="mobile-cart">
					<?php echo woo_cart_but(); ?>
				</ul>

				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
					<span class="burger-line"></span>
					<span class="burger-line"></span>
					<span class="burger-line"></span>
					<span class="label"><?php esc_html_e( 'Primary Menu', '_turbo' ); ?></span>
				</button>
				<div class="nav-inner">
					<div class="primary-menu">
						<?php wp_nav_menu( array( 'theme_location' => 'Primary') ); ?>
					</div>
					<div class="secondary-menu">
						<?php wp_nav_menu( array( 'theme_location' => 'Secondary') ); ?>
					</div>
				</div>
			</nav><!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->

	<?php /* <div id="content" class="site-content"> */ ?>
