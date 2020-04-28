$(function() { //runs ocne page is loaded
	getSounds();
});

function getSounds() {
    $.post("doUserSearch", function(err, response){
        console.log("here5");
        console.log(JSON.stringify(response));
        //hopefully this gets the response from the server, then you can pass all the varables through and make 
        //buildFavList(title etc etc); however you want
    }, "json");
    
    /*$.getJSON("/doUserSearch")
    .done(function(response) {
        console.log(JSON.stringify(response));
        //hopefully this gets the response from the server, then you can pass all the varables through and make 
        //buildFavList(title etc etc); however you want
    });*/
}

function buildFavList(title){
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