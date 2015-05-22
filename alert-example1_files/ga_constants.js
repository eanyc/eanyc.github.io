////////////////////////////
//         Audio
////////////////////////////

//---- Audio Category Values ----
var petaGA_AudioCategory_Audio = "Audio";

////////////////////////////
//         E-Cards
////////////////////////////

//---- E-Card Category Values ----
var petaGA_eCardCategory_eCard = "E-Card";

////////////////////////////
//         Forms
////////////////////////////

//---- Form Category Values ----
var petaGA_FormCategory_Activist = "Activist Form";
var petaGA_FormCategory_Comment = "Comment Form";
var petaGA_FormCategory_Contest = "Contest Form";
var petaGA_FormCategory_Donate = "Donation Form";
var petaGA_FormCategory_eCard = "E-Card Form";
var petaGA_FormCategory_eNews = "E-News Form";
var petaGA_FormCategory_Feedback = "Feedback Form";
var petaGA_FormCategory_ForwardToAFriend = "Forward to a Friend Form";
var petaGA_FormCategory_Login = "Login Form";
var petaGA_FormCategory_Mobile = "Mobile Form";
var petaGA_FormCategory_Pack = "Pack Form";
var petaGA_FormCategory_Pledge = "Pledge Form";
var petaGA_FormCategory_Poll = "Poll Form";
var petaGA_FormCategory_Purchase = "Purchase Form";
var petaGA_FormCategory_Quiz = "Quiz Form";
var petaGA_FormCategory_Registration = "Registration Form";
var petaGA_FormCategory_Submission = "Submission Form";
var petaGA_FormCategory_TakeAction = "Take Action Form";
var petaGA_FormCategory_Volunteer = "Volunteer Form";
var petaGA_FormCategory_Wishlist = "Wishlist Form";

//---- Form Action Values ----
var petaGA_FormAction_Initiated = "Form Initiated";
var petaGA_FormAction_Submitted = "Form Submitted";

////////////////////////////
//         Games
////////////////////////////

//---- Game Category Values ----
var petaGA_GameCategory_Game = "Game";

////////////////////////////
//    Generic Actions
////////////////////////////

//---- Generic Action Values ----
var petaGA_GenericAction_ClickThrough = "Click Through";
var petaGA_GenericAction_Complete = "Complete";
var petaGA_GenericAction_Download = "Download";
var petaGA_GenericAction_End = "End";
var petaGA_GenericAction_Play = "Play";
var petaGA_GenericAction_Receipt = "Receipt/Pick-Up";
var petaGA_GenericAction_Share = "Share";

//Don't use petaGA_DownloadAction_Downloaded, but leave it in this file.
var petaGA_DownloadAction_Downloaded = "Download";

////////////////////////////
//         Images
////////////////////////////

//---- Image Category Values ----
var petaGA_ImageCategory_Image = "Image";

////////////////////////////
//      Interactive
////////////////////////////

//---- Interactive Category Values ----
var petaGA_InteractiveCategory_Interactive = "Interactive";

//---- Interactive Action Values ----
var petaGA_InteractiveAction_Scrolled = "Scrolled";

////////////////////////////
//         Links
////////////////////////////

//---- Link Category Values ----
var petaGA_LinkCategory_Link = "Link";
//Don't use petaGA_LinkCategory_Subscribe, but leave it in this file.
var petaGA_LinkCategory_Subscribe = "Link";

////////////////////////////
//         PDFs
////////////////////////////

//---- PDF Category Values ----
var petaGA_PDFCategory_PDF = "PDF";
//Don't use petaGA_DownloadCategory_PDF, but leave it in this file.
var petaGA_DownloadCategory_PDF = "PDF";

////////////////////////////
//         Slideshows
////////////////////////////

//---- Slideshow Category Values ----
var petaGA_SlideshowCategory_Slideshow = "Slideshow";

//---- Slideshow Action Values ----
var petaGA_SlideshowAction_Auto = "Slideshow Auto-play";
var petaGA_SlideshowAction_Backward = "Slideshow Backward";
var petaGA_SlideshowAction_Forward = "Slideshow Forward";

////////////////////////////
//    Social Networking
////////////////////////////

/******************************************
These should only be used for 
social networking buttons that we created, 
NOT for AddThis/API buttons.
*****************************************/

//---- Social Networking Source Values ----
var petaGA_SNsource_Facebook = "Facebook";
var petaGA_SNsource_Twitter = "Twitter";
var petaGA_SNsource_Digg = "Digg";
var petaGA_SNsource_StumbleUpon = "StumbleUpon";
var petaGA_SNsource_Reddit = "Reddit";
var petaGA_SNsource_Tumblr = "Tumblr";
var petaGA_SNsource_GooglePlus = "Google+";

//---- Social Networking Action Values ----
//Use petaGA_GenericAction_Share

////////////////////////////
//  User Generated Content
////////////////////////////

//---- User Generated Content Category Values ----
var petaGA_UserGeneratedContentCategory = "User Generated Content";

//---- User Generated Content Action Values ----
//No actions yet.

////////////////////////////
//         Videos
////////////////////////////

//---- Video Category Values ----
var petaGA_VideoCategory_Video = "Video";


////////////////////////////
//  File Extensions Array
////////////////////////////

var petaGA_fileExtensions = new Array(".pdf",
									  ".doc",
									  ".docx",
									  ".png",
									  ".jpg",
									  ".jpeg");

////////////////////////////
//  Linked Domains Array
////////////////////////////			

var petaGA_linkedDomains = new Array("81fur.com",
									 "allaboutanimals.org.uk",
									 "animalrahat.com",
									 "avianflu.cn",
									 "avianflu.hk",
									 "avianflu.in.th",
									 "bloodyburberry.com",
									 "bwvaktboom.com",
									 "canadasshame.com",
									 "chuaychangthai.com",
									 "columbiacruelty.com",
									 "compassionatecitizen.org",
									 "consumerdeception.com",
									 "covancecruelty.com",
									 "dkbunnybutcher.com",
									 "doanglershavesmallrods.com",
									 "helpthaielephants.com",
									 "iamscruelty.com",
									 "ingridnewkirk.com",
									 "islamicconcerns.com",
									 "jesusveg.com",
									 "kentuckyfriedcruelty.com",
									 "lettuceladies.com",
									 "marscandykills.com",
									 "mccruelty.com",
									 "meat.org",
									 "milkgonewild.com",
									 "namethatdriver.com",
									 "nesteacrueltea.com",
									 "nofur.hk",
									 "peta.nl",
									 "peta.org",
									 "peta.org.au",
									 "peta.org.uk",
									 "peta.xxx",
									 "peta2.com",
									 "petaasiapacific.com",
									 "petacatalog.com",
									 "petaf.org.uk",
									 "petafoundation.org",
									 "petafrance.com",
									 "petaindia.com",
									 "petakids.com",
									 "petalatino.com",
									 "petamall.com",
									 "petatv.com",
									 "petavanguardsociety.com",
									 "petsmartcruelty.com",
									 "ringlingbeatsanimals.com",
									 "runningofthenudes.com",
									 "sharetheworld.org.uk",
									 "teachkind.org",
									 "unbearablecruelty.com",
									 "vegadvantage.com",
									 "wickedwildlifefund.com");

function lookForFileExtension(url) {
    var currentFileExtension;
    for (var i = 0; i < petaGA_fileExtensions.length; i++) {
        currentFileExtension = petaGA_fileExtensions[i];

        if (url.indexOf(currentFileExtension) > 0) {
            return true;
        }
    }
    return false;
}

function lookForLinkedDomain(url) {
    var currentLinkedDomain;
    for (var i = 0; i < petaGA_linkedDomains.length; i++) {
        currentLinkedDomain = petaGA_linkedDomains[i];

        //URL matches linked domain list and is not on the current domain
        if (url.indexOf(currentLinkedDomain) > 0 && url.indexOf(window.location.host) <= 0) {
            return true;
        }
    }
    return false;
}

function gaLinkListener() {
    var currentURL = this.href.toLowerCase();

    //Fire GA events for file download
    if (lookForFileExtension(currentURL)) {
        if (currentURL.indexOf(".pdf") > 0) {
            _gaq.push(['_trackEvent', petaGA_PDFCategory_PDF, petaGA_GenericAction_Download, currentURL]);
        }
        else if (currentURL.indexOf(".png") > 0 || currentURL.indexOf(".jpg") > 0 || currentURL.indexOf(".jpeg") > 0) {
            _gaq.push(['_trackEvent', petaGA_ImageCategory_Image, petaGA_GenericAction_Download, currentURL]);
        }
        else if (currentURL.indexOf(".doc") > 0 || currentURL.indexOf(".docx") > 0) {
            _gaq.push(['_trackEvent', "Word Document", petaGA_GenericAction_Download, currentURL]);
        }
    }
    //Link URL for cross domain tracking
    else if (lookForLinkedDomain(currentURL)) {
        //Timeout is needed for the cross domain linking to work.
        //setTimeout(function() {_gaq.push(['_link', currentURL]);}, 500);
        var pageTracker = _gat._getTrackerByName();
        this.href = pageTracker._getLinkerUrl(this.href);
    }

    return false;
}

function addLinkEventListeners() {
    var allLinks = document.links;
    var currentURL;
    var fileExtensionFound = false;
    var linkedDomainFound = false;
    var linkAddListener;
    var originalOnclick;

    for (var i = 0; i < allLinks.length; i++) {
        currentURL = allLinks[i].href.toString().toLowerCase();
        fileExtensionFound = lookForFileExtension(currentURL);
        linkedDomainFound = lookForLinkedDomain(currentURL);

        //Link has a file extension to be tracked or needs cross domain tracking
        if (fileExtensionFound == true || linkedDomainFound == true) {
            linkAddListener = allLinks[i];

            if (linkAddListener.onclick) {
                //Store any existing onclick event
                originalOnclick = linkAddListener.onclick;
                //Add listener
                linkAddListener.addEventListener("click", gaLinkListener, false);
                if (linkAddListener.addEventListener) {
                    linkAddListener.addEventListener("click", originalOnclick, false);
                }
                else if (linkAddListener.attachEvent) {
                    linkAddListener.attachEvent("click", originalOnclick, false);
                }
            }
            else {
                linkAddListener.addEventListener("click", gaLinkListener, false);
            }
        }
    }
}

function isUniversalAnalytics() {
    if (window.ga && ga.create) {
        return true;
    }
    else {
        return false;
    }
}

function sendSocialEvent(socialNetwork, socialAction, socialTarget) {
    if (isUniversalAnalytics()) {
        ga('send', 'social', socialNetwork, socialAction, socialTarget);
    }
    else {
        _gaq.push(['_trackSocial', socialNetwork, socialAction]);
    }
}

function sendEvent(category, action, label) {
    if (isUniversalAnalytics()) {
        ga('send', 'event', category, action, label);
    }
    else {
        _gaq.push(['_trackEvent', category, action, label]);
    }
}