(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	var searchyIdleTimer = null;
	var searchyIdleState = false;

	// idle wait befaure firing the ajax query to optimize the resources
	var searchyIdleWait = 500;

	var searchyXhr;

	$( window ).load(function() {
		// Icons style depending on the main searchy input
		$(".searchy .icon").each(function(index){
			var searchyInputHeight = $(this).parents(".searchy").first().find(".searchy-input").innerHeight();

			var padding = 5*searchyInputHeight/100;

			// Width
			$(this).innerWidth( searchyInputHeight - (2 * padding) );
			$(this).find(".dashicons").css("font-size", searchyInputHeight - (2 * padding) );

			// Top position
			$(this).css("top",padding);

			// Right position
			if( $(this).hasClass("spinner") || $(this).hasClass("remove") ){
				$(this).css("right", searchyInputHeight + padding);
			}else{
				$(this).css("right",padding);
			}
		});

		// Behaviour
		$( ".searchy-input-wraper input[type=text]" ).live("input", function( event ){ searchyHandler( event, $(this) ); });
		$( ".searchy-input-wraper input[type=checkbox]" ).live("change", function( event ){ searchyHandler( event, $(this) ); });
		$(".searchy-input-wraper .conf").live("click", function( event ){
			var $searchyParent = $(this).parents(".searchy").first();

			$searchyParent.find(".searchy-input-wraper .params").toggle();
		});
		$(".searchy-input-wraper .remove").live("click", function( event ){
			var $searchyParent = $(this).parents(".searchy").first();

			$searchyParent.find(".searchy-input-wraper  input.searchy-input").val("");
			$searchyParent.find(".searchy-input-wraper  input.searchy-input").trigger("input");
		});
	});

	function searchyHandler( event, currentSearchy ){
		var $searchyParent = currentSearchy.parents(".searchy").first();
		var $searchyQuery = $searchyParent.find("input.searchy-input").val();

	    clearTimeout(searchyIdleTimer);
            
        if (searchyIdleState == true || $searchyQuery== "" ) {
        	// Clear results
        	$searchyParent.find( ".searchy-results .content" ).html( "" );

            // TODO : remove old AJAX request if exists here

        }
        
        searchyIdleState = false;
        
        if( $searchyQuery != "" ){
            searchyIdleTimer = setTimeout(
            	function(){
            		searchyQueryRequest( $searchyQuery, $searchyParent );
            	},
            	searchyIdleWait
            );
        }else{
			$searchyParent.find( ".remove" ).hide();
        }

	}
	function searchyQueryRequest( query, searchyParent ){
		// Idle Event : Ajax request here
		searchyParent.find( ".spinner" ).show();
		searchyParent.find( ".remove" ).hide();

		if(searchyXhr && searchyXhr.readystate != 4){
			// Abord previous ajax call if new input request 
		    searchyXhr.abort();
		}

		var query_post_types = [];

		searchyParent.find('.post_types input:checked').each(function(index){
			query_post_types.push($(this).val());
		});

		var query_search_in = [];

		searchyParent.find('.search_in input:checked').each(function(index){
			query_search_in.push($(this).val());
		});
		
		searchyXhr = $.post(
		    ajaxurl,
		    {
		        'action': 'searchy_search',
		        'query_text': query,
		        'query_post_types': query_post_types,
		        'query_search_in': query_search_in,
		        'query_meta_key': searchyParent.find('.query_meta_key').val(),
		        'query_meta_value': searchyParent.find('.query_meta_value').val()
		    },
		    function( response ){
		    	if( response == 0 ){
		    		response = "No result!";
		    	}
		    	// Show results
				searchyParent.find( ".searchy-results .content" ).html( response );
				searchyParent.find( ".spinner" ).hide();
				searchyParent.find( ".remove" ).show();
		    }
		);

		searchyIdleState = true;
	}

})( jQuery );
