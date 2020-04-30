$(function() { //runs once page is loaded
	getSounds();
});

//gets the response from the server and passed to buildFavList() to construct list
function getSounds() {
    $.post("doUserSearch").done(function(response){buildFavList(response)});
}

//constructs list from response variables
//valid response[i] vars are .title .sound .image (if we need more can expand DB if needed)
function buildFavList(response){
    for (var i = 0; i < response.length; i++) {
		//need to add audio elements before you can reference them
		//i think reusing my old code will work here after i changed it so lets try
		createAudioElement(response[i].sound, false); //passes sound to make an audio element
        //alaric things will need linked to play and stop buttons here probably? im not sure how its planned but
        //this still will need to be played around with however you want do it
        var itemHTML = '<li class="list"><div id="listTitle"><h3>' + response[i].title + '</h3></div>';
        itemHTML += '<button class="controlButtonsP playIco" onclick="playAudio(' + i + ')" alt="Play"><i class="fas fa-play"></i></button></div>'
        itemHTML += '<button class="controlButtonsP stopIco" onclick="stopAudio(' + i + ')" alt="Stop"><i class="fas fa-stop"></i></button></div>'
        itemHTML += '<button class="controlButtonsP favIco" onclick="favAudio(' + i + ' , true)" alt="Fav"><i class="fas fa-star"></i></button></div>'
        itemHTML += '<div id="listUser"><h3>' + response[i].user + '</h3></div></li>';
        $('#favs').append(itemHTML);
    }
}