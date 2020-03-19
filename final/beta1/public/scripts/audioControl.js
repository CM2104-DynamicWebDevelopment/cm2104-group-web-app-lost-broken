$(function(){
    $('.controlicons').on('click', function () {
        if(this.id == "play")
            playAudio();
        else if (this.id == "stop")
            stopAudio();
        else if (this.id == "fav")
            favAudio();
    });
});

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