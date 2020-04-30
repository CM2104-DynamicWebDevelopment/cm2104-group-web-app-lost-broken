function getResults(){
	var searchTerm = {search: $(".searchtext").val()};
	$.getJSON("/doAPICall", searchTerm)
    .done(function(response) {
		var success = response.success;
		if (success == "true"){
			var previewURL = response.previewURL;
			var waveformURL = response.waveformURL;
			var title = response.title;
			var url = response.url;
			var username = response.username;
			createAudioElement(previewURL, true);
			createDetailsDiv(title, username, waveformURL, url, previewURL);
		}
		else{
			showFailureMessage();
		}
    })
    .fail(function(){
		console.log("Invalid API response");
		showFailureMessage();
    });
}

//play audio now takes an index for use in profile
function playAudio(i) { 
	console.log("playing " + i);
	console.log($(".audioElement").length);
	$(".audioElement")[i].play();

	console.log("ended " + i);
}

//stop audio now takes an index for use in profile
function stopAudio(i) { 
	var a = $(".audioElement")[i];
	//there is no stop function in html5? so pause it and reset time to start
	a.pause(); 
	a.currentTime = 0.0;
}

//when fav button on index page is clicked, pass parameters to addRemoveFav
//testing with an index
function favAudio() { 
	addRemoveFav(sessionStorage.getItem("title"), sessionStorage.getItem("image"), sessionStorage.getItem("sound"), $(".favIco"), false);
}

//to use this to delete an entry. call addRemoveFav("title", "imageURL", "soundURL", $(".divToBeDeleted"), true);
//contacts server and awaits response, then either toggles fav button colour or deletes entry if deleteContainer is set to true
function addRemoveFav(title, image, sound, element, deleteContainer) { 
	//test no null values or invalid links (saves sending broken data to server)
	if(title == null || image == null || sound == null || !isUrl(image) || !isUrl(sound)){
		console.log("Invalid references", title, image, sound);return;
	}
	//var containing sound data
	var datatosend = {
		"title":title,
		"image":image,
		"sound":sound};
	//AJAX POST to favsound route
	$.ajax({
		type:"POST",
		data:datatosend,
		url:"favsound",
		success: function(response)
		{
			if(response.redirect == "true") //redirect if not logged in
				window.location = "/login";
			if (deleteContainer) 			//if deleteContainer then remove() elementToDelete
				try{
					$(element).css('display','none'); //set to display none instead, not enough time to do profile code properly and this saves a lot of work
				}
				catch(err){console.log("Unable to hide element : " + err);}
			else if(response.save == "true") //if it was saved set colour to yellow
				element.css({"background-color": "yellow"});
			else  							//if it was removed set colour to transparent
				element.css({"background-color": "transparent"});
		}
	});
}
//test if URL is valid, extra check before sending to DB
function isUrl(url) {
	try {new URL(url);}catch{return false;}
	return true;
}