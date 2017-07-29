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
<div class="searchy">
	<div class="searchy-input-wraper">
		<input type="text" placeholder="Searchy..." class="searchy-input">
		<div class="icon remove" style="display: none;"><img src="<?php echo SEARCHY_PLUGIN_URL; ?>/assets/close.png"></div>
		<div class="icon spinner" style="display: none;"><img src="<?php echo SEARCHY_PLUGIN_URL; ?>/assets/spinner.gif"></div>
		<div class="icon conf"><img src="<?php echo SEARCHY_PLUGIN_URL; ?>/assets/conf.png"></div>
		<div class="params" style="display: none;">
			<div class="post_types">
				<div class="title">Post types</div>
				<ul>
					<li>
						<label>Posts
							<input type="checkbox" value="post" checked>
						</label>
					</li>
					<li>
						<label>Pages
							<input type="checkbox" value="page">
						</label>
					</li>
				</ul>
			</div>
			<div class="search_in">
				<div class="title">Search in</div>
				<ul>
					<li>
						<label>Title
							<input type="checkbox" value="title">
						</label>
					</li>
					<li>
						<label>Content
							<input type="checkbox" value="content" checked>
						</label>
					</li>
					<li>
						<label>Excerpt
							<input type="checkbox" value="excerpt">
						</label>
					</li>
				</ul>
			</div>

			<div class="meta">
				<div class="title">Custom field</div>
				<label style="display: inline-block; width: 49%;">Key<input type="text" class="query_meta_key"></label>
				<label style="display: inline-block; width: 49%;">Value<input type="text" class="query_meta_value"></label>
			</div>
		</div>
	</div>
	<div class="searchy-results">
		<div class="title">Results go here..</div>
		<div class="content"></div>
	</div>
</div>
<?php