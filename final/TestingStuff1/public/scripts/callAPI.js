$(function(){
    $('.searchicon').on('click', function () {
		//var searchTerms = $('.searchtext').val();
		var params = {searchTerms: $('.searchtext').val()};
        getResults(params);
        return false;
    });
});

function getResults(params){
    $.getJSON("/doAPICall", params, function(response) {
        console.log(response);
           /* var searchPage = Math.floor(Math.random() * (init.count/15)); //pick a random page using the response (data.count is total items, 15 is the page length)
			//next line constructs the main API request, it asks for name,description,title,.ogg waveform etc using same input string as above and random page calculated above
			var fetchForDataURL = "https://freesound.org/apiv2/search/text/?query=" + searchTerms + "&page=" + searchPage.toString() + "&page_size=15&fields=name,description,previews,duration,username,images&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ";
            $.getJSON(fetchForDataURL, function(data) {
                //console.log(data);
                var rand = Math.floor(Math.random() * (data.results.length-1));
				var duration = data.results[rand].duration;
				var previewURL = data.results[rand].previews["preview-lq-ogg"];
				var waveformURL = data.results[rand].images.waveform_l;
				var title = data.results[rand].name;
				var description = data.results[rand].description;
				var username = data.results[rand].username;
				createAudioElement(previewURL); //could change this to append to the details div, but start downloading it first?
                createDetailsDiv(title, username, description, duration, waveformURL);
            });*/
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
}

//dynamically create and insert audio element	
function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}