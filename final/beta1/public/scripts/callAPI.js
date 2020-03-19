$(function(){
    $('.searchicon').on('click', function () {
		//var searchTerms = $('.searchtext').val();
		var params = {search: $('.searchtext').val()};
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
		createAudioElement(previewURL); //could change this to append to the details div, but start downloading it first?
        createDetailsDiv(title, username, description, duration, waveformURL);
    })
    .fail(function(){
        console.log("Invalid API response");
    });
}

function createDetailsDiv(title, username, description, duration, waveformURL){
	$("#detailsDiv").remove();//remove old detailsDiv if it exists
	$('body').append('<div id="detailsDiv"></div>');
	var detailsDiv = $("#detailsDiv");
	detailsDiv.append($('<img id="waveformElement"></img>').attr("src",waveformURL));
	detailsDiv.append($('<a id="titleElement"></a>').text(title + "\r\n \r\n User : " + username +  "\r\n \r\n Duration : "  + duration + "s"));
	detailsDiv.append($('<a id="descriptionElement"></a>').text(description));
	createControlElement(detailsDiv);
}

function createControlElement(detailsDiv){
	var controlDiv = $('<div id="controlDiv"></div>').appendTo(detailsDiv);
	$('<button class="controlicons" onclick="playAudio()"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/playIcon.svg)','background-size' :  '32px'});
	$('<button class="controlicons" onclick="stopAudio()"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/stopIcon.svg)','background-size' :  '32px'});
	$('<button class="controlicons" onclick="favAudio()"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/favIcon.svg)','background-size' :  '32px'});
	/*$('<button class="controlicons" id="play"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/playIcon.svg)','background-size' :  '32px'});
	$('<button class="controlicons" id="stop"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/stopIcon.svg)','background-size' :  '32px'});
	$('<button class="controlicons" id="fav"></button>').appendTo(controlDiv).css({'background-color' : 'transparent', 'background-image' :  'url(resources/favIcon.svg)','background-size' :  '32px'});*/
}

//dynamically create and insert audio element	
function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}