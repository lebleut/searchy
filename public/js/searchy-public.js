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

		$( "input.searchy-input" ).live("input", function( event ){
			var $searchyQuery = $(this).val();

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
            }

		});

	});

	function searchyQueryRequest( query ){
		// Idle Event : Ajax request here
		// Results title
		$( ".searchy-results .title" ).html("Results for '<b>" + query + "</b>'.");
		$( ".searchy-input-wraper .spinner" ).show();

		if(searchyXhr && searchyXhr.readystate != 4){
			// Abord previous ajax call if new input request 
		    searchyXhr.abort();
		}

		searchyXhr = $.post(
		    ajaxurl,
		    {
		        'action': 'searchy_search',
		        'query_text': query
		    },
		    function( response ){
		    	if( response == 0 ){
		    		response = "No result!";
		    	}
		    	// Show results
				$( ".searchy-results .content" ).html( response );
				$( ".searchy-input-wraper .spinner" ).hide();
		    }
		);

		searchyIdleState = true;
	}

})( jQuery );
