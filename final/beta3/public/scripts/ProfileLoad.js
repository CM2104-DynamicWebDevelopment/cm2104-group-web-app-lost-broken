$(function() { //runs once page is loaded
	getSounds();
});

function getSounds() {
    $.post("doUserSearch").done(function(response) {
        console.log(response);
        console.log(response[0].title);
        console.log(response[1].title);
        console.log(response[1].image);
        console.log(response[2].sound);
        //this gets the response from the server, then you can loop through array etc and pass to 
        buildFavList(response);
      });
}

function buildFavList(response){
    var faveList = [];
    for (var i = 0; i < response.length; i++) {
        faveList.push({title: response[i].title, sound: response[i].sound});
    }
    faveList.forEach(populateList)
    //construct html of each item and append
    function populateList(item){
        var itemHTML = '<li class="list"><div id="listTitle"><h3>' + item.title + '</h3></div>';
        itemHTML += '<div id="listUser"><h3>' + item.sound + '</h3></div></li>';
        $('#favs').append(itemHTML);
    }
}