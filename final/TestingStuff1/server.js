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
            var searchPage = Math.floor(Math.random() * (body.count/15)); //pick a random page using the response (data.count is total items, 15 is the page length)
            //next line constructs the main API request, it asks for name,description,title,.ogg waveform etc using same input string as above and random page calculated above
            var fetchForDataURL = "https://freesound.org/apiv2/search/text/?query=" + req.query + "&page=" + searchPage.toString() + "&page_size=15&fields=name,description,previews,duration,username,images&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ";
            request(fetchForDataURL, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                var rand = Math.floor(Math.random() * (body.results.length-1));
                var json = [];
                json.push({
                    title: body.results[rand].name,
                    duration: body.results[rand].duration,
                    previewURL: body.results[rand].previews["preview-lq-ogg"],
                    waveformURL: body.results[rand].images.waveform_l,
                    title: body.results[rand].name,
                    description: body.results[rand].description,
                    username: body.results[rand].username
                });
                res.send(json);
                console.log(body.count);
                console.log(body.results[rand].name);
            });
        }
    });
});

app.listen(8080);
