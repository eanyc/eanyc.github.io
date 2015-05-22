	var petaBcHtml5Player = {};

	petaBcHtml5Player.showVideoDetails = function(title, description, learnMoreLink) {
		var t = document.createElement('span');
		var b = document.createElement('br');
		var d = document.createElement('div');
		var a = document.createElement('a');

		t.id = "petaBcHtml5PlayerTitle";
		t.className = "multiPlayerTitle";
		t.textContent = title;

		d.id = "petaBcHtml5PlayerDesc";
		d.className = "multiPlayerDescription";
		d.style.width = '100%';
		d.textContent = description;
		
		a.id = "petaBcHtml5PlayerLearnMore";

		if (learnMoreLink == null) {
			a.href = "http://www.peta.org/";
		} else {
			a.href = learnMoreLink;
		}

		a.href = learnMoreLink;
		a.className = "multiPlayerLink";
		a.textContent = " LEARN MORE >";

		document.getElementById("petaBcHtml5PlayerOutput").appendChild(t);
		document.getElementById("petaBcHtml5PlayerOutput").appendChild(b);
		document.getElementById("petaBcHtml5PlayerOutput").appendChild(d);
		document.getElementById("petaBcHtml5PlayerDesc").appendChild(a);
	}
	
	petaBcHtml5Player.updateVideoDetails = function(title, description, learnMoreLink) {
		document.getElementById("petaBcHtml5PlayerTitle").innerHTML = title;
		document.getElementById("petaBcHtml5PlayerDesc").innerHTML = description;

		var a = document.createElement('a');

		a.id = "petaBcHtml5PlayerLearnMore";

		if (learnMoreLink == null) {
			a.href = "http://www.peta.org/";
		} else {
			a.href = learnMoreLink;
		}

		a.href = learnMoreLink;
		a.className = "multiPlayerLink";
		a.textContent = " LEARN MORE >";

		document.getElementById("petaBcHtml5PlayerDesc").appendChild(a);
	}
	
	function petaBcHtml5PlayerOnTemplateLoaded(id) {
		petaBcHtml5Player.playerId = id;
		petaBcHtml5Player.player = brightcove.api.getExperience(id);
		petaBcHtml5Player.APIModules = brightcove.api.modules.APIModules;
	}

	function petaBcHtml5PlayerOnTemplateReady(evt) {
		if (petaBcHtml5Player.player.type == 'html') {
			petaBcHtml5Player.videoPlayer = petaBcHtml5Player.player.getModule(petaBcHtml5Player.APIModules.VIDEO_PLAYER);

			petaBcHtml5Player.videoPlayer.getCurrentRendition( function (renditionDTO) {
				petaBcHtml5Player.videoWidth = renditionDTO.frameWidth;
			});

			petaBcHtml5Player.videoPlayer.getCurrentVideo(function (videoDTO) {
				petaBcHtml5Player.showVideoDetails(videoDTO.displayName, videoDTO.shortDescription, videoDTO.linkURL);
			});

			petaBcHtml5Player.videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE, petaBcHtml5PlayerOnMediaEventFired);
		}
	}
	
	function petaBcHtml5PlayerOnMediaEventFired(evt) {
        if (evt.type === brightcove.api.events.MediaEvent.CHANGE) {
			petaBcHtml5Player.videoPlayer.getCurrentRendition(currentVideoRenditionCallback);
			petaBcHtml5Player.videoPlayer.getCurrentVideo(currentVideoCallback);
        }
    }

	function currentVideoRenditionCallback(renditionDTO) {
		petaBcHtml5Player.videoWidth = renditionDTO.frameWidth;
	}

	function currentVideoCallback(videoDTO) {
		petaBcHtml5Player.updateVideoDetails(videoDTO.displayName, videoDTO.shortDescription, videoDTO.linkURL);
	}