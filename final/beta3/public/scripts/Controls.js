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
			//add message to tell user it failed...
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
		//add message to tell user it failed? maybe should have a timeout
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

function favAudio() { 
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
			$(".favIco").css({"background-color": "yellow"});
		}
	});
}