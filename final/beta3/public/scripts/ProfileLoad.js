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
        var itemHTML = '<button class="list" id="Trigger" onclick="openSound()"><div id="listTitle"><h3>' + response[i].title + '</h3></div>';
        itemHTML += '<div id="listUser"><h3>' + response[i].user + '</h3></div></button>';
        $('#favs').append(itemHTML);
    }
}

//so i think the important part will be keeping track and grouping the elements
//like audio elements need to know which one to play or stop when you click a button. unfav needs to pass the right info etc
//theres a few ways you could do this. creating a class that holds all attributes as well as pointers to audio Element etc. 
//then you could create an array of that class and process each one in turn
//
//theres probably a way to do it with jQuery searches too and passing an index 
// is it possible to do
//$('<button class="controlButtons playIco" onclick="playAudio(2)"   <--- passing index 2 to playAudio so it knows which audio element to play etc.
// that might work for some of it but  maybe not everything.

//creating a class is probably the easiest way i think
// have you created classes before in other coding you've done or would this be new?

//or instead of creating a class you could just use 5 or 6 arrays and store everything across each index 
//and then store them in sessionStorage
//thats maybe the simpelest effective way if you havent done much classes 

function openSound(title, image, sound){
    $('body').append('<div id="savedDetailsDiv"></div>');
	var savedDetailsDiv = $("#savedDetailsDiv");
	savedDetailsDiv.append($('<img id="waveformElement" alt="Waveform Image"></img>').attr("src",waveformURL));
	createTitleElement(savedDetailsDiv, title);
	createControlElement(savedDetailsDiv, title, waveformURL, previewURL);
}

function createTitleElement(savedDetailsDiv, title){
	var controlDiv = $('<div id="titleLinkDiv"></div>').appendTo(savedDetailsDiv);
	$('<button class="controlButtons titleLnk" onclick="location.href=' + fixedURL + '" alt="Play">' + title + '</button>').appendTo(controlDiv);
}

function createControlElement(savedDetailsDiv, title, waveformURL, previewURL){
	var controlDiv = $('<div id="controlDiv"></div>').appendTo(savedDetailsDiv);
	//create play stop and fav buttons and append to controlDiv
	$('<button class="controlButtons playIco" onclick="playAudio()" alt="Play"><i class="fas fa-play"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons stopIco" onclick="stopAudio()" alt="Stop"><i class="fas fa-stop"></i></button>').appendTo(controlDiv);
	$('<button class="controlButtons favIco" onclick="favAudio()" alt="Fav"><i class="fas fa-star"></i></button>').appendTo(controlDiv);
	//store variables in session - for use in favourite
	sessionStorage.setItem(title, title);
	sessionStorage.setItem(image, waveformURL);
	sessionStorage.setItem(sound, previewURL);
}

function createAudioElement(previewURL) {
	$("#audioElement").remove(); //if already exists then remove
	$('<audio id="audioElement"></audio>').appendTo('body').attr("src", previewURL);
	$("#audioElement")[0].play();
}

$("#Trigger").click(function () {
    $("#favs").toggleClass("slidedown slideup");
    if ($("#favs").hasClass("slideup")){$("#Slider").removeClass("slideup").addClass("slidedown")}
    else{$("#favs").removeClass("slidedown").addClass("slideup")}
  });