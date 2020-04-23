$(function(){
	//should move this to css, and repalce with font awesome? moved to css but doesnt work rolling back
	$(".searchicon").hover(function(){ //get the searchicon element on mouseover, and change the icon
		$(".searchicon").css({"background": "url('resources/speakerIcon.svg')", "background-size" : "32px 32px"});
		});
	//should move this to css, and repalce with font awesome? moved to css but doesnt work rolling back
	$(".searchicon").mouseleave(function(){  //get the searchicon element on mouse leave, and change the icon
		$(".searchicon").css({"background": "url('resources/speakerIconNoAudio.svg')", "background-size" : "32px 32px"});
	});
	$(".searchicon").on("click", function () {
		try {
			var params = {search: $(".searchtext").val()};
        	getResults(params);
		}
		catch(err){
			console.log(err);
			showFailureMessage();
		}
		finally{
			return false;
		}
	});
 });

function getResults(params){
	$.getJSON("/doAPICall", params)
    .done(function(response) {
		var success = response.success;
		if (success == "true"){
			var duration = response.duration;
			var previewURL = response.previewURL;
			var waveformURL = response.waveformURL;
			var title = response.title;
			var description = response.description;
			var username = response.username;
			var url = response.url;
			createAudioElement(previewURL);
			createDetailsDiv(title, username, description, duration, waveformURL, url, previewURL);
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

function playAudio() { 
	$("#audioElement")[0].play();
}

function stopAudio() { 
	var a = document.getElementById("audioElement");
	//there is no stop function in html5? so pause it and reset time to start
	a.pause(); 
	a.currentTime = 0.0;
}

//when fav button on index page is clicked, pass parameters to addRemoveFav
function favAudio() { 
	addRemoveFav(sessionStorage.getItem("title"), sessionStorage.getItem("image"), sessionStorage.getItem("sound"), $(".favIco"), false);
}

//contacts server and awaits response, then either toggles fav button colour or deletes entry if deleteContainer is set to true
function addRemoveFav(title, image, sound, buttonPointer, deleteContainer) { 
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
			if(response.redirect == "true")
				window.location = "/login";
			if(response.save == "true")
				buttonPointer.css({"background-color": "yellow"});
			else if(!deleteContainer) //if not deleteContainer then toggle colour
				buttonPointer.css({"background-color": "transparent"});
			else //if deleteContainer then pass element to deleteEntry(elementToDelete)
				deleteEntry(buttonPointer.parent());
		}
	});
}

function deleteEntry(elementToDelete){
	elementToDelete.remove();
}

// Backup of original favAudio()
/*function favAudio() { 
	var datatosend = {
		"title":sessionStorage.getItem("title"),
		"image":sessionStorage.getItem("image"),
		"sound":sessionStorage.getItem("sound")};
	$.ajax({
		type:"POST",
		data:datatosend,
		url:"favsound",
		success: function(response)
		{
			if(response.redirect == "true")
				window.location = "/login";
			//set Button to colour state, should check if saved or not saved, rather than just redirect
			if(response.save == "true")
				$(".favIco").css({"background-color": "yellow"});
			else
				$(".favIco").css({"background-color": "transparent"});
		}
	});
}*/