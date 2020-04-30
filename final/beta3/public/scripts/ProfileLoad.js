$(function() { //runs once page is loaded
	getSounds();
});

//gets the response from the server and passed to buildFavList() to construct list
function getSounds() {
    $.post("doUserSearch").done(function(response){buildFavList(response)});
}

//constructs list from response variables
//valid response[i] vars are .title .sound .image (if we need more can expand DB if needed)
function buildFavList(response){
	//arrays for session storage (used to unfav sound)
	/*var titles = [];
	var waveforms = [];
	var previews = [];*/
    for (var i = 0; i < response.length; i++) {
		//append arrays
		//titles.append = response[i].title;
		//waveforms.append = response[i].waveformURL;
		//previews.append = response[i].previewURL;
		//need to add audio elements before you can reference them
		//i think reusing my old code will work here after i changed it so lets try
		createAudioElement(response[i].sound, false); //passes sound to make an audio element
        var itemHTML = '<li class="list"><div id="listTitle"><h3>' + response[i].title + '</h3></div>';
        itemHTML += '<button class="controlButtonsP playIco" onclick="playAudio(' + i + ')" alt="Play"><i class="fas fa-play"></i></button></div>'
        itemHTML += '<button class="controlButtonsP stopIco" onclick="stopAudio(' + i + ')" alt="Stop"><i class="fas fa-stop"></i></button></div>'
        itemHTML += '<button class="controlButtonsP favIco" onclick="unfavAudio(' + i + ')" alt="Fav"><i class="fas fa-star"></i></button></div>'
        itemHTML += '<div id="listUser"><h3>' + response[i].user + '</h3></div></li>';
		$(itemHTML).appendTo('#favs');
	}
	//save arrays for use in favAudio
	/*sessionStorage.setItem("title", titles);
	sessionStorage.setItem("image", waveforms);
	sessionStorage.setItem("sound", previews);*/
}

//unfaves the audio, passes elementToDelete
function unfavAudio(i){
	var title = $("#favs .list")[i].find("#listTitle").text();
	console.log(title);
	addRemoveFav(sessionStorage.getItem("title")[i], sessionStorage.getItem("image")[i], sessionStorage.getItem("sound")[i], $("#favs .list")[i], true);
	//deleteIndex(i);
}

/*function deleteIndex(i){
	var titles = sessionStorage.getItem("title");
	var waveforms = sessionStorage.getItem("image");
	var previews = sessionStorage.getItem("sound");
	for (var c = 0; c < titles.length; c++) {
		if (i >= c){
			titles[c] = titles[c+1];
			waveforms[c] = waveforms[c+1];
			previews[c] = previews[c+1];
		}
	}
	titles.pop();
	waveforms.pop();
	previews.pop();
	sessionStorage.setItem("title", titles);
	sessionStorage.setItem("image", waveforms);
	sessionStorage.setItem("sound", previews);
}*/