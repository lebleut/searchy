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
		<div class="icon remove" style="display: none;">
			<span class="dashicons dashicons-dismiss"></span>
		</div>
		<div class="icon spinner" style="display: none;">
			<img src="<?php echo SEARCHY_PLUGIN_URL; ?>/assets/spinner.gif">
		</div>
		<div class="icon conf">
			<span class="dashicons dashicons-admin-generic"></span>
		</div>
		<div class="params" style="display: none;">
			<div class="post_types">
				<div class="title">Post types</div>
				<ul>
					<li>
						<label>
							<input type="checkbox" value="post" checked>
							Posts
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" value="page" checked>
							Pages
						</label>
					</li>
				</ul>
			</div>
			<div class="search_in">
				<div class="title">Search in</div>
				<ul>
					<li>
						<label>
							<input type="checkbox" value="title" checked>
							Title
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" value="content" checked>
							Content
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" value="excerpt">
							Excerpt
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
		<div class="content"></div>
	</div>
</div>
<?php