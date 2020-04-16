function createDetailsDiv(title, username, description, duration, waveformURL, url, previewURL){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"></div>');
	var detailsDiv = $("#detailsDiv");
	detailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));
	createTitleElement(detailsDiv, url, title);
	createStatsElement(detailsDiv, username, duration);
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
	$('<button class="controlButtons playIco" onclick="playAudio()" alt="Play"><i class="fas fa-play"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons stopIco" onclick="stopAudio()" alt="Stop"><i class="fas fa-stop"></i></button>').appendTo(controlDiv);
	//$('<button class="controlButtons favIco" onclick="favAudio()" alt="Fav"><i class="fas fa-star"></i></button>').appendTo(controlDiv);
	//$('<form action="/favsound"  method="get"><input type="submit" value="enviar"><button class="controlButtons favIco" alt="Fav"><i class="fas fa-star"></i></button></input></form>').appendTo(controlDiv);
	$('<form action="/favsound" method="POST"><input type="text" name="title" value="' + title + '"><button class="controlButtons favIco" alt="Fav"><i class="fas fa-star"></i></button></input></form>').appendTo(controlDiv);
	
}

function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}

function showFailureMessage(){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"><h2>No Results Found</h2><p>Retry or try a different search term.</p></div>');
	//var detailsDiv = $("#detailsDiv");
	//detailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));
}