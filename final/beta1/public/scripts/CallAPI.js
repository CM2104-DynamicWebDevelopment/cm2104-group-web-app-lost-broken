$(function(){
    $('.searchicon').on('click', function () {
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
		createAudioElement(previewURL);
        createDetailsDiv(title, username, description, duration, waveformURL);
    })
    .fail(function(){
        console.log("Invalid API response");
    });
}