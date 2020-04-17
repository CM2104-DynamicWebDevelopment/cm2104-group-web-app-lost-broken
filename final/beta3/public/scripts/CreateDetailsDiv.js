function createDetailsDiv(title, username, description, duration, waveformURL, url, previewURL){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"></div>');
	var detailsDiv = $("#detailsDiv");
	detailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));
	createTitleElement(detailsDiv, url, title);
	createStatsElement(detailsDiv, username, duration); //comment out before submission
	createControlElement(detailsDiv, url, title, username, waveformURL, previewURL);
}

function createTitleElement(detailsDiv, url, title, username){
	var controlDiv = $('<div id="titleLinkDiv"></div>').appendTo(detailsDiv);
	var fixedURL = "'" + url + "'";
	$('<button class="controlButtons titleLnk" onclick="location.href=' + fixedURL + '" alt="Play">' + title + '</button>').appendTo(controlDiv);
}

function createStatsElement(detailsDiv, username, duration){
	var statsDiv = $('<div id="statsDiv"></div>').appendTo(detailsDiv);
	$('<p>User : ' + username + '</p><p>Length : ' + duration + '</p>').appendTo(statsDiv);
}

function createControlElement(detailsDiv, url, title, username, waveformURL, previewURL){
	var controlDiv = $('<div id="controlDiv"></div>').appendTo(detailsDiv);
	//create play stop and fav buttons and append to controlDiv
	$('<button class="controlButtons playIco" onclick="playAudio()" alt="Play"><i class="fas fa-play"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons stopIco" onclick="stopAudio()" alt="Stop"><i class="fas fa-stop"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons favIco" onclick="favAudio()" alt="Fav"><i class="fas fa-star"></i></button>').appendTo(controlDiv);
	//$('<button class="controlButtons playIco" onclick="playAudio()"><img class="img-center" src="../resources/playIcon.png" alt="Play"/></button>').appendTo(controlDiv);
	//$('<button class="controlButtons stopIco" onclick="stopAudio()"><img class="img-center" src="../resources/stopIcon.png" alt="Stop"/></button>').appendTo(controlDiv);
	//$('<button class="controlButtons favIco" onclick="favAudio()"><img class="img-center" src="../resources/favIcon.png" alt="Fav" /></button>').appendTo(controlDiv);
	//store variables in session - for use in favourite
	sessionStorage.setItem("title", title);
	sessionStorage.setItem("image", waveformURL);
	sessionStorage.setItem("sound", previewURL);
}

function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}

function showFailureMessage(){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"><h2>No Results Found</h2><p>Retry or try a different search term.</p></div>');;
}