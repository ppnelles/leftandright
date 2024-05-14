<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _turbo
 */

if(ICL_LANGUAGE_CODE == 'fr') {
	$gdprLink = "Mentions légales et vie privée";
	$regUrl = 8;
}
else {
	$gdprLink = "Privacy policy";
}

?>

	<?php /* </div><!-- #content --> */ ?>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="site-info">
			<div class="about">
				<span class="footer-name">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" target="_blank">
						© Left And Right
					</a>
				</span> 

				<?php if(get_field('footer_info','option')): ?> 
					<span class="footer-info">
						<?php echo ' | '; the_field( 'footer_info','option' ); ?>	
					</span> 
				<?php endif; ?> 

				<span> <i>|</i> <a href="<?php echo get_privacy_policy_url(); ?>"><?php echo $gdprLink; ?></a></span>

				<span> <i>|</i> <a href="https://getin.agency" target="_blank">Website by GET IN</a></span>
			</div>

			<div class="network">
				<?php get_template_part('template-parts/content','network'); ?>
			</div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->


<?php //get_template_part('template-parts/content','popup'); ?>

<?php get_template_part('template-parts/content','cookie'); ?>

<?php wp_footer(); ?>

</body>
</html>
