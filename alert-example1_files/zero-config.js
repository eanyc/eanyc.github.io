jQuery(document).ready(function($){

		
	function detectflash(){
		if (navigator.plugins != null && navigator.plugins.length > 0){
			return navigator.plugins["Shockwave Flash"] && true;
		}
		if(~navigator.userAgent.toLowerCase().indexOf("webtv")){
			return true;
		}
		if(~navigator.appVersion.indexOf("MSIE") && !~navigator.userAgent.indexOf("Opera")){
			try{
				return new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && true;
			} catch(e){}
		}
		return false;
	}
	if( detectflash() ) {
		$('html').addClass('flash');
		
		var clip = new ZeroClipboard( jQuery(".clippy"), {
		  moviePath: "/wp-content/themes/peta/js/ZeroClipboard.swf"
		} );
		
		clip.on( "load", function(client) {
		  // alert( "movie is loaded" );
		
		  client.on( "complete", function(client, args) {
		    alert("Copied to clipboard." );
		  } );
		} );
		
	} else {
		$('html').addClass('no-flash');
	}

	
});