<?php

/**
 * the display part goes here
 *
 * @link       www.tooltipy.com
 * @since      1.0.0
 *
 * @package    Searchy
 * @subpackage Searchy/public/partials
 */

?>
<div class="searchy-input-wraper">
	<input type="text" placeholder="Searchy..." class="searchy-input">
	<div class="spinner" style="display: none;"><img src="<?php echo SEARCHY_PLUGIN_URL; ?>/assets/spinner.gif"></div>
</div>
<div class="searchy-results">
	<div class="title">Results go here..</div>
	<div class="content"></div>
</div>
<?php