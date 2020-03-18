const express = require('express');
//const https = require('https');
const request = require('request');
const app = express();
app.use(express.static('public'));


app.get('/doAPICall', function(req, res){
    var returnJSON = [];
    var url = "https://freesound.org/apiv2/search/text/?query=" + req.query + "&page_size=1&fields=name&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ"; 
    console.log(req.query);
    console.log(req.params);
    console.log(req);
    request(url, { json: true }, (err, res, init) => {
        if (err) { return console.log(err); }
        if(init.count > 0){ //if at least one item in response
            var searchPage = Math.floor(Math.random() * (init.count/15)); //pick a random page using the response (data.count is total items, 15 is the page length)
            //next line constructs the main API request, it asks for name,description,title,.ogg waveform etc using same input string as above and random page calculated above
            var fetchForDataURL = "https://freesound.org/apiv2/search/text/?query=" + req.query + "&page=" + searchPage.toString() + "&page_size=15&fields=name,description,previews,duration,username,images&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ";
            request(fetchForDataURL, { json: true }, (err, res, full) => {
                if (err) { return console.log(err); }
                var rand = Math.floor(Math.random() * (full.results.length-1));
                
                returnJSON.push({
                    title: full.results[rand].name,
                    duration: full.results[rand].duration,
                    previewURL: full.results[rand].previews["preview-lq-ogg"],
                    waveformURL: full.results[rand].images.waveform_l,
                    title: full.results[rand].name,
                    description: full.results[rand].description,
                    username: full.results[rand].username
                });
                console.log(full.count);
                console.log(full.results[rand].name);
            });
        }
    });
    res.send(returnJSON);
});

app.listen(8080);
