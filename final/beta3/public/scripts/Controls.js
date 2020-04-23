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

//to use this to delete an entry. call addRemoveFav("title", "imageURL", "soundURL", $(".divToBeDeleted"), true);
//contacts server and awaits response, then either toggles fav button colour or deletes entry if deleteContainer is set to true
function addRemoveFav(title, image, sound, element, deleteContainer) { 
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
			if (deleteContainer) 			//if deleteContainer then pass element to deleteEntry(elementToDelete)
				deleteEntry(element);
			else if(response.save == "true") //if it was saved set colour to yellow
				element.css({"background-color": "yellow"});
			else  							//if it was removed set colour to transparent
				element.css({"background-color": "transparent"});
		}
	});
}

function deleteEntry(elementToDelete){
	elementToDelete.remove();
}