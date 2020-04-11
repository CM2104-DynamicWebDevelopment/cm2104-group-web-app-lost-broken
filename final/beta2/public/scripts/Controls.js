$(function(){
	//should move this to css, and repalce with font awesome?
	$(".searchicon").hover(function(){ //get the searchicon element on mouseover, and change the icon
		$(".searchicon").css({"background": "url('resources/speakerIcon.svg')", "background-size" : "32px 32px"});
		});
	//should move this to css, and repalce with font awesome?	
	$(".searchicon").mouseleave(function(){  //get the searchicon element on mouse leave, and change the icon
		$(".searchicon").css({"background": "url('resources/speakerIconNoAudio.svg')", "background-size" : "32px 32px"});
	});
	$(".searchicon").on("click", function () {
		var params = {search: $(".searchtext").val()};
        getResults(params);
        return false;
	});
 });

function getResults(params){
	$.getJSON("/doAPICall", params)
    .done(function(response) {
		var duration = response[0].duration;
		var previewURL = response[0].previewURL;
		var waveformURL = response[0].waveformURL;
		var title = response[0].title;
		var description = response[0].description;
		var username = response[0].username;
		createAudioElement(previewURL);
        createDetailsDiv(title, username, description, duration, waveformURL);
    })
    .fail(function(){
        console.log("Invalid API response");
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
	var a = document.getElementById("audioElement");
	//$("#audioElement")[0];
	//wrap up the audio in a JSON? 
	//send it to server so it can save it under this user
	//if user is not logged in redirect to login/create account 
	//(this would mean the user could probably lose this sound, could work in a solution if needed)
}