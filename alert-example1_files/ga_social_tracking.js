var socialTarget = window.location.toString().toLowerCase();

//Facebook Listeners
function facebookLikeListener() {
	sendSocialEvent('Facebook', 'Like', socialTarget);
} 
function facebookUnlikeListener() {
	sendSocialEvent('Facebook', 'Unlike', socialTarget);
}
function facebookSendListener() {
	sendSocialEvent('Facebook', 'Send', socialTarget);
}
//Try to register Facebook listeners. 
try {
    if (FB && FB.Event && FB.Event.subscribe) {
        FB.Event.subscribe('edge.create', facebookLikeListener);
        FB.Event.subscribe('edge.remove', facebookUnlikeListener);
        FB.Event.subscribe('message.send', facebookSendListener);
    }
}
catch (e) {
}

//Twitter Listener
function twitterListener() {
	sendSocialEvent('Twitter', 'Tweet', socialTarget);
}

//Try to register Twitter listener.
try {
    if (twttr) {
	    twttr.ready(function(twttr){
		    twttr.events.bind('click', twitterListener);
	    });
    }
}
catch (e) {
}

//Services to exclude from Add This events.
var excludeFromAddThis = new Array();
excludeFromAddThis[0] = "facebook_like";
excludeFromAddThis[1] = "facebook_unlik";
excludeFromAddThis[2] = "facebook_send";   
excludeFromAddThis[3] = "tweet";

//Add This Listener
function addthisListener(event) {
	var sendEvent = true;	
	var service = event.data.service;
	
	for(var i = 0; i<excludeFromAddThis.length; i++)
	{  
	    if (service.search(excludeFromAddThis[i]) > -1)
	    {              
			return false;             
		}
	}
	
	if(sendEvent == true){
		sendSocialEvent('addthis', service, socialTarget);
	}
}

//Try to register Add This listener.
try {
    addthis.addEventListener("addthis.ready", function(event) {
        if (addthis && addthis.addEventListener) {
            addthis.addEventListener('addthis.menu.share', addthisListener);
        }
        else if (_ate && _ate.ed && _ate.ed.addEventListener) {
            _ate.ed.addEventListener('addthis.menu.share', addthisListener);
        }
    });
}
catch (e) {
}