$(function() { //runs ocne page is loaded
	getSounds();
});

function getSounds() {
    $.post("doUserSearch").done(function( response ) {
        console.log(response);
        console.log(response[0].title);
        console.log(response[1].title);
        console.log(response[2].sound);
        //this gets the response from the server, then you can loop through array etc and pass to 
        //buildFavList(response); however you want
      });
}

function buildFavList(response){
    var favDiv = $('#favs');
    var faveList = [];
    for (var i = 0; i < title.length; i++) {
        faveList.push({title: title[i], user: user[i]});
    }
    faveList.forEach(populateList)
    //construct html of each item and append
    function populateList(item){
    var itemHTML = '<li class="list"><div id="listTitle"><h3>' + item.title + '</h3></div>';
    itemHTML += '<div id="listUser"><h3>' + item.user + '</h3></div></li>';
    favDiv.append(itemHTML);
    }
}