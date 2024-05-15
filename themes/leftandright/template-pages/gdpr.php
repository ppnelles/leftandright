<?php
/**
 * Template Name: gdrp
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
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> role="article">
        <?php the_content(); ?>
    </article>
</main><!-- #main -->

<?php
//get_sidebar();
get_footer();