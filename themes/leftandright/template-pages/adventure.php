<?php
/**
 * Template Name: aventure
 *
 * @package _turbo
 */

get_header();
?>

<header id="intro-header">
	<?php //ACF field must be set as ID
	if(get_field('header_image')) { ?>
		<figure>
			<?php echo wp_get_attachment_image(get_field('header_image'), 'full'); ?>
		</figure>
	<?php } ?>
	<div>
		<h1><?php the_field( 'header_title' ); ?></h1>
	</div>
</header>


<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

	<div class="content">
		<h2><?php the_title(); ?></h2>
		<div class="the-content">
			<?php the_field( 'content' ); ?>
		</div>
		<div class="contact-form">
			<?php echo do_shortcode(get_field( 'formulaire' )); ?>
		</div>
	</div>

	<?php //ACF field must be set as ID
	if(get_field('image')) { ?>
		<figure>
			<?php echo wp_get_attachment_image(get_field('image'), 'full'); ?>
		</figure>
	<?php } ?>
	
</main><!-- #main -->

<?php
//get_sidebar();
get_footer();