/****************************************************** 
-Submit events to GA based on the page we're on.         
-ALL PAGE NAMES IN THIS SECTION NEED TO BE lowercase. 
-Category and Action should be variable names from http://www.mediapeta.com/scripts/googleAnalytics/global/ga_constants.js. 
-Label should be what requestor provided (in single quotes).
_gaq.push(['_trackEvent', Category, Action, 'Label']); 
******************************************************/ 
var currentPage = window.location.toString().toLowerCase();

if (currentPage.indexOf('prime.peta.org/index.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_eNews, petaGA_FormAction_Initiated, 'PETA Prime Header E-News Form']);
}
else if (currentPage.indexOf('prime.peta.org/signup.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_eNews, petaGA_FormAction_Submitted, 'PETA Prime Header E-News Form']);
	_gaq.push(['_trackEvent', petaGA_FormCategory_eNews, petaGA_FormAction_Initiated, 'PETA Prime Header E-News More Information']);
}
else if (currentPage.indexOf('prime.peta.org/signup_thanks.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_eNews, petaGA_FormAction_Submitted, 'PETA Prime Header E-News More Information']);
}
else if (currentPage.indexOf('prime.peta.org/share.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_ForwardToAFriend, petaGA_FormAction_Initiated, 'PETA Prime Share Page']);
}
else if (currentPage.indexOf('prime.peta.org/sharety.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_ForwardToAFriend, petaGA_FormAction_Submitted, 'PETA Prime Share Page']);
}
else if (currentPage.indexOf('prime.peta.org/signup2.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_eNews, petaGA_FormAction_Initiated, 'PETA Prime E-News']);
}
else if (currentPage.indexOf('prime.peta.org/signup_thanks2.php') > 0) {
	_gaq.push(['_trackEvent', petaGA_FormCategory_eNews, petaGA_FormAction_Submitted, 'PETA Prime E-News']);
}