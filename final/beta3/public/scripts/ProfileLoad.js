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
        //alaric things will need linked to play and stop buttons here probably? im not sure how its planned but
        //this still will need to be played around with however you want do it
        var itemHTML = '<li class="list"><div id="listTitle"><h3>' + response[i].title + '</h3></div>';
        itemHTML += '<div id="listSoundPlay"><button class="controlButtons playIco" onclick="playAudio(response[i].sound)" alt="Play"><i class="fas fa-play"></i></button></div>'
        itemHTML += '<div id="listSoundStop"><button class="controlButtons stopIco" onclick="stopAudio(response[i].sound)" alt="Stop"><i class="fas fa-stop"></i></button></div'
        itemHTML += '<div id="listFav"><button class="controlButtons favIco" onclick="favAudio()" alt="Fav"><i class="fas fa-star"></i></button></div>'
        itemHTML += '<div id="listUser"><h3>' + response[i].user + '</h3></div></li>';
        $('#favs').append(itemHTML);
    }
}

