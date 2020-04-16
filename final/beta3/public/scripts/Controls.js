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
	//var form = document.getElementById("favForm");
	//document.getElementById("favForm").submit(); //form submission

	var datatosend = {
		"title":sessionStorage.getItem("title"),
		"image":sessionStorage.getItem("image"),
		"sound":sessionStorage.getItem("sound")};

		console.log(sessionStorage.getItem("title"));

	$.ajax({
		type:"POST",
		data:datatosend,
		url:"~/favsound",
		contentType: "application/json",
		success: function(response)
		{
			console.log(response);
			alert("success");
		}
	});

	//$.get("favsound", {title:sessionStorage.getItem("title"), image:sessionStorage.getItem("image"),  sound:sessionStorage.getItem("sound")}, function(response){ 
	//	console.log(response);
	//	alert("success");
	//});


	/*$('#favForm').ajaxForm({
        url : '/favsound',
        dataType : 'json',
        success : function (response) {
            alert("The server says: " + response);
        }
    });*/
}