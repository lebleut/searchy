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

		$( ".searchy-input-wraper input[type=text]" ).live("input", function( event ){ searchyHandler(event); });
		$( ".searchy-input-wraper input[type=checkbox]" ).live("change", function( event ){ searchyHandler(event); });
		$(".searchy-input-wraper .conf").live("click", function( event ){
			$(".searchy-input-wraper .params").toggle();
		});
		$(".searchy-input-wraper .remove").live("click", function( event ){
			$(".searchy-input-wraper input.searchy-input").val("");
			$(".searchy-input-wraper input.searchy-input").trigger("input");
		});
	});

	function searchyHandler( event ){
		var $searchyQuery = $(".searchy-input-wraper input.searchy-input").val();

	    clearTimeout(searchyIdleTimer);
            
        if (searchyIdleState == true) {
        	// Clear results
        	$( ".searchy-results .content" ).html( "" );

            // TODO : remove old AJAX request if exists here

        }
        
        searchyIdleState = false;
        
        if( $searchyQuery != "" ){
            searchyIdleTimer = setTimeout(
            	function(){
            		searchyQueryRequest( $searchyQuery );
            	},
            	searchyIdleWait
            );
        }else{
			$( ".searchy-input-wraper .remove" ).hide();
        }

	}
	function searchyQueryRequest( query ){
		// Idle Event : Ajax request here
		// Results title
		$( ".searchy-results .title" ).html("Results for '<b>" + query + "</b>'.");
		$( ".searchy-input-wraper .spinner" ).show();
		$( ".searchy-input-wraper .remove" ).hide();

		if(searchyXhr && searchyXhr.readystate != 4){
			// Abord previous ajax call if new input request 
		    searchyXhr.abort();
		}

		var query_post_types = [];

		$('.post_types input:checked').each(function(index){
			query_post_types.push($(this).val());
		});

		var query_search_in = [];

		$('.search_in input:checked').each(function(index){
			query_search_in.push($(this).val());
		});
		
		searchyXhr = $.post(
		    ajaxurl,
		    {
		        'action': 'searchy_search',
		        'query_text': query,
		        'query_post_types': query_post_types,
		        'query_search_in': query_search_in,
		        'query_meta_key': $('.query_meta_key').val(),
		        'query_meta_value': $('.query_meta_value').val()
		    },
		    function( response ){
		    	if( response == 0 ){
		    		response = "No result!";
		    	}
		    	// Show results
				$( ".searchy-results .content" ).html( response );
				$( ".searchy-input-wraper .spinner" ).hide();
				$( ".searchy-input-wraper .remove" ).show();
		    }
		);

		searchyIdleState = true;
	}

})( jQuery );
