function createDetailsDiv(title, username, description, duration, waveformURL, url){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"></div>');
	var detailsDiv = $("#detailsDiv");
	detailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));

	//add title, should move to div in bottom right in same style as btn and link to url
	//detailsDiv.append($('<a id="titleElement"></a>').text(title + "\r\n \r\n User : " + username +  "\r\n \r\n Duration : "  + duration + "s"));

	createTitleElement(detailsDiv, url, title, username);

	//detailsDiv.append($('<a id="descriptionElement"></a>').text(description)); //no longer needed?
	createControlElement(detailsDiv);
}

function createTitleElement(detailsDiv, url, title, username){
	var controlDiv = $('<div id="titleLinkDiv"></div>').appendTo(detailsDiv);
	$('<button class="controlButtons titleLnk" onclick=' + url + ' alt="Play">' + title + '</button>').appendTo(controlDiv);
}

function createControlElement(detailsDiv){
	var controlDiv = $('<div id="controlDiv"></div>').appendTo(detailsDiv);
	$('<button class="controlButtons playIco" onclick="playAudio()" alt="Play"><i class="fas fa-play"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons stopIco" onclick="stopAudio()" alt="Stop"><i class="fas fa-stop"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons favIco" onclick="favAudio()" alt="Fav"><i class="fas fa-star"></i></button>').appendTo(controlDiv);
}

function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}