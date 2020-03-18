const express = require('express');
//const https = require('https');
const request = require('request');
const app = express();
app.use(express.static('public'));


app.get('/doAPICall', function(req, res){
    var url = "https://freesound.org/apiv2/search/text/?query=" + req.query + "&page_size=1&fields=name&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ"; 

    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if(body.count > 0){ //if at least one item in response
            console.log(body.count);
            console.log(body.results[0].name);

            var searchPage = Math.floor(Math.random() * (body.count/15)); //pick a random page using the response (data.count is total items, 15 is the page length)
            //next line constructs the main API request, it asks for name,description,title,.ogg waveform etc using same input string as above and random page calculated above
            var fetchForDataURL = "https://freesound.org/apiv2/search/text/?query=" + req.query + "&page=" + searchPage.toString() + "&page_size=15&fields=name,description,previews,duration,username,images&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ";

            request(fetchForDataURL, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                
                var rand = Math.floor(Math.random() * (body.results.length-1));
                /*var duration = data.results[rand].duration;
				var previewURL = data.results[rand].previews["preview-lq-ogg"];
				var waveformURL = data.results[rand].images.waveform_l;
				var title = data.results[rand].name;
				var description = data.results[rand].description;
                var username = data.results[rand].username;*/
                console.log(body.count);
                console.log(body.results[rand].name);
				//createAudioElement(previewURL); //could change this to append to the details div, but start downloading it first?
                //createDetailsDiv(title, username, description, duration, waveformURL);
            });
            /*var json = [];
            for (var i = 0; i < tweets.length; i++) {
            json.push({
                name: tweets[i].user.name,
                text: tweets[i].text
            });
            }*/
        }
    });



    /*https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
        res.send(data);
       
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });*/
});


app.listen(8080);
