const express = require('express');
const request = require('request');
const app = express();
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// profile page
app.get('/about', function(req, res) {
    res.render('pages/profile');
});

app.get('/doAPICall', function(req, res){
    var returnJSON = {success: "false",
                        title: "",
                        duration: 0,
                        previewURL: "",
                        waveformURL: "",
                        description: "",
                        username: "",
                        url: ""};
    var getLengthURL = "https://freesound.org/apiv2/search/text/?query=" + req.query.search + "&page_size=1&filter=duration:[0.2 TO 20]&fields=name&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ"; 
    request(getLengthURL, { json: true }, (err, resp, init) => {
        if (err) { return console.log(err); }
        if(init.count > 0){ //if at least one item in response
            var searchPage = Math.floor(Math.random() * (init.count/15)); //pick a random page using the response (init.count is total items, 15 is the page length)
            //next line constructs the main API request
            var getDataURL = "https://freesound.org/apiv2/search/text/?query=" + req.query.search + "&page=" + searchPage.toString() + "&page_size=15&filter=duration:[0.2 TO 20]&fields=name,description,previews,duration,username,images,url&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ";
            request(getDataURL, { json: true }, (err, resp, full) => {
                if (err) { return console.log(err); }
                var rand = Math.floor(Math.random() * (full.results.length-1));
                returnJSON["success"] = "true";
                returnJSON["title"] = full.results[rand].name;
                returnJSON["duration"] = full.results[rand].duration;
                returnJSON["previewURL"] = full.results[rand].previews["preview-lq-ogg"];
                returnJSON["waveformURL"] = full.results[rand].images.waveform_l;
                returnJSON["description"] = full.results[rand].description;
                returnJSON["username"] = full.results[rand].username;
                returnJSON["url"] = full.results[rand].url;
                /*returnJSON.push({ //fill returnJSON with just one item
                    title: full.results[rand].name,
                    duration: full.results[rand].duration,
                    previewURL: full.results[rand].previews["preview-lq-ogg"],
                    waveformURL: full.results[rand].images.waveform_l,
                    description: full.results[rand].description,
                    username: full.results[rand].username,
                    url: full.results[rand].url
                });*/
                console.log("in Func" + returnJSON);
                //res.send(returnJSON);
            });
        }
        //else{
        //    console.log(err)
        //}
    });
    console.log("out Func" + returnJSON);
    res.send(returnJSON);
});

app.listen(8080);