<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _turbo
 */

get_header();
?>

<?php if(get_field('header_title')): ?>
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
<?php endif; ?>


<main id="primary" class="site-main" role="main" itemprop="mainContentOfPage">
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article">
		<?php get_template_part( 'template-parts/content', 'page' ); ?>
	</article>
</main><!-- #main -->

<?php
//get_sidebar();
get_footer();