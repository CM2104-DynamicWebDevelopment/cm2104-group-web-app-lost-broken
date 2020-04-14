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

// register page
app.get('/register', function(req, res) {
    res.render('pages/register');
});

// login page
app.get('/login', function(req, res) {
    res.render('pages/login');
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
                returnJSON.success = "true";
                returnJSON.title = full.results[rand].name;
                returnJSON.duration = full.results[rand].duration;
                returnJSON.previewURL = full.results[rand].previews["preview-lq-ogg"];
                returnJSON.waveformURL = full.results[rand].images.waveform_l;
                returnJSON.description = full.results[rand].description;
                returnJSON.username = full.results[rand].username;
                returnJSON.url = full.results[rand].url;
                res.send(returnJSON);
            });
        }
        else{ //else there is no item in response so send success:"false"
            res.send(returnJSON);
        }
    });
});

app.listen(8080);