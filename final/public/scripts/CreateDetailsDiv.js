//prepares creating details process for main page sound search
function createDetailsDiv(title, username, waveformURL, url, previewURL){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"></div>');
	var detailsDiv = $("#detailsDiv");
	detailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));
	createTitleElement(detailsDiv, url, title);
	createStatsElement(detailsDiv, username); //comment out before submission
	createControlElement(detailsDiv, title, waveformURL, previewURL);
}

//created title button that links to freesound.org
function createTitleElement(detailsDiv, url, title){
	var controlDiv = $('<div id="titleLinkDiv"></div>').appendTo(detailsDiv);
	var fixedURL = "'" + url + "'";
	$('<button class="controlButtons titleLnk" onclick="location.href=' + fixedURL + '" alt="Play">' + title + '</button>').appendTo(controlDiv);
}

//shows username - removed rudation now its limited
function createStatsElement(detailsDiv, username){
	var statsDiv = $('<div id="statsDiv"></div>').appendTo(detailsDiv);
	$('<p>User : ' + username + '</p>').appendTo(statsDiv);
}

//creates controls element and saves details in session storage for use in fav call
function createControlElement(detailsDiv, title, waveformURL, previewURL){
	var controlDiv = $('<div id="controlDiv"></div>').appendTo(detailsDiv);
	//create play stop and fav buttons and append to controlDiv
	$('<button class="controlButtons playIco" onclick="playAudio(0)" alt="Play"><i class="fas fa-play"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons stopIco" onclick="stopAudio(0)" alt="Stop"><i class="fas fa-stop"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons favIco" onclick="favAudio()" alt="Fav"><i class="fas fa-star"></i></button>').appendTo(controlDiv);
	//store variables in session - for use in favourite
	sessionStorage.setItem("title", title);
	sessionStorage.setItem("image", waveformURL);
	sessionStorage.setItem("sound", previewURL);
}

//creates audio element in both index and profile
//indexPage - true on main page false on profile
function createAudioElement(previewURL, indexPage) {
	if(indexPage)
		$(".audioElement").remove(); //if already exists then remove
	$('<audio class="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	if(indexPage)
		$(".audioElement")[0].play();
}

function showFailureMessage(){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"><h2>No Results Found</h2><p>Retry or try a different search term.</p></div>');;
}

function createWaitMsg(){
	$("#waitMsg").remove();//remove old waitMsg if it exists
	$('body').append('<div id="waitMsg"><h2>Please Wait...</h2></div>');
}

function clearDivs(){
	$("#waitMsg").remove();//remove old waitMsg if it exists
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
}