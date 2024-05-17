<?php
/**
 * Template Name: homepage
 *
 * @package _turbo
 */

get_header();
?>

<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">

	<section id="intro">

		<?php //ACF field must be set as ID
		if(get_field('int_img')) { ?>
			<figure class="int-img">
				<img src="<?php bloginfo('template_directory'); ?>/img/left-and-right-by-max-richard-5-1.jpg" alt="">
			</figure>
		<?php } ?>

		<?php //ACF field must be set as ID
		if(get_field('int_logo')) { ?>
			<figure class="int-logo">
				<?php echo wp_get_attachment_image(get_field('int_logo'), 'full'); ?>
			</figure>
		<?php } ?>
		
	</section>

	<section id="packraft">
		<div class="inner">
			<header>
				<h2><?php the_field( 'pac_title' ); ?></h2>
				<div><?php the_field( 'pac_intro' ); ?></div>
			</header>
			
			<?php //ACF field must be set as ID
			if(get_field('pac_img')) { ?>
				<figure>
					<?php echo wp_get_attachment_image(get_field('pac_img'), 'full'); ?>
				</figure>
			<?php } ?>

			<?php if ( have_rows( 'pac_kpi' ) ) : ?>
				<ul class="kpi">
					<?php while ( have_rows( 'pac_kpi' ) ) : the_row(); ?>
						<li>
							<div class="plus">
								<img src="<?php bloginfo('template_directory'); ?>/img/plus.svg" alt="">
							</div>
							<span class="line-1"><?php the_sub_field( 'l1' ); ?></span>
							<span class="line-2"><?php the_sub_field( 'l2' ); ?></span>
							<span class="line-3"><?php the_sub_field( 'l3' ); ?></span>
						</li>
					<?php endwhile; ?>
				</ul>
			<?php endif; ?>

			<div class="description"><?php the_field( 'pac_desc' ); ?></div>
		</div>
	</section>

	<section id="shop">
		<div class="inner">
			<header>
				<h2><?php the_field( 'sho_title' ); ?></h2>
				<div><?php the_field( 'sho_intro' ); ?></div>
			</header>

			<?php if ( have_rows( 'sho_cat' ) ) : ?>
				<ul>
					<?php while ( have_rows( 'sho_cat' ) ) : the_row(); ?>
						<li>
							<h3><?php the_sub_field( 'title' ); ?></h3>
							<?php //ACF field must be set as ID
							if(get_sub_field('photo')) { ?>
								<a href="<?php the_sub_field( 'link' ); ?>">
									<figure>
										<?php echo wp_get_attachment_image(get_sub_field('photo'), 'large'); ?>
									</figure>
									<div class="content">
										<img src="<?php bloginfo('template_directory'); ?>/img/magnificient-glass.svg">
										<p class="label"><?php if(ICL_LANGUAGE_CODE == 'fr') { echo "Découvrir"; } else { echo "Discover"; } ?></p>
									</div>
								</a>
							<?php } ?>
						</li>
					<?php endwhile; ?>
				</ul>
			<?php endif; ?>
			
		</div>
	</section>

	<section id="about">
		<?php //ACF field must be set as ID
		if(get_field('abo_img')) { ?>
			<figure>
				<?php echo wp_get_attachment_image(get_field('abo_img'), 'full'); ?>
			</figure>
		<?php } ?>
		<div class="inner">
			<div class="content">
				<h2><?php the_field( 'abo_title' ); ?></h2>
				<div><?php the_field( 'abo_content' ); ?></div>
			</div>
		</div>
	</section>

	<section id="galerie">
		<header>
			<h2><?php the_field( 'gal_title' ); ?></h2>
		</header>
		<div class="the-gallery">
			<?php if ( have_rows( 'gal_galerie' ) ) : ?>
				<?php while ( have_rows( 'gal_galerie' ) ) : the_row(); ?>
					<?php //ACF field must be set as ID
					if(get_sub_field('photo')) { ?>
						<a href="<?php echo wp_get_attachment_url(get_sub_field( 'photo' )); ?>" data-lightbox="enbas" data-title="Left & Right">
							<figure>
								<?php echo wp_get_attachment_image(get_sub_field('photo'), 'galerie-home', '', array('class' => 'no-lazyload'));?>
								
							</figure>
						</a>
					<?php } ?>
				<?php endwhile; ?>
			<?php endif; ?>
			<?php for ($i=0; $i < 10; $i++) { ?>
				
			<?php } ?>
		</div>
	</section>

	<section id="contact">
		<header>
			<h2><?php the_field( 'con_title' ); ?></h2>
			<div><?php the_field('con_intro') ?></div>
			<?php echo do_shortcode(get_field('con_form')); ?>
		</header>
	</section>
</main><!-- #main -->

<?php
//get_sidebar();
get_footer();