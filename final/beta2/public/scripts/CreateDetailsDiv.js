function createDetailsDiv(title, username, description, duration, waveformURL){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"></div>');
	var detailsDiv = $("#detailsDiv");
	detailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));
	detailsDiv.append($('<a id="titleElement"></a>').text(title + "\r\n \r\n User : " + username +  "\r\n \r\n Duration : "  + duration + "s"));
	//detailsDiv.append($('<a id="descriptionElement"></a>').text(description));
	createControlElement(detailsDiv);
}

function createControlElement(detailsDiv){
	var controlDiv = $('<div id="controlDiv"></div>').appendTo(detailsDiv);
	//$('<button class="controlButttons" onclick="playAudio()"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/playIcon.svg)','background-size' :  '32px'});
	//$('<button class="controlButttons" onclick="stopAudio()"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/stopIcon.svg)','background-size' :  '32px'});
	//$('<button class="controlButttons" onclick="favAudio()"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/favIcon.svg)','background-size' :  '32px'});
	$('<button class="controlButttons playIco" onclick="playAudio()" alt="Play"><i class="fas fa-play"></i></button>').appendTo(controlDiv);
	$('<button class="controlButttons stopIco" onclick="stopAudio() alt="Stop"><i class="fas fa-stop"></i></button>').appendTo(controlDiv);
	$('<button class="controlButttons favIco" onclick="favAudio() alt="Fav"><i class="fas fa-star"></i></button>').appendTo(controlDiv);
}

function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}