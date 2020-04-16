const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;//npm install mongodb@2.2.32
//audstrum is the database name
const url = "mongodb://localhost:27017/audstrum";

const bodyParser = require('body-parser'); //npm install body-parser
const session = require('express-session'); //npm install express-session

//moved from eof to before sessions are used
app.use(session({secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8'})); 

app.use(bodyParser.urlencoded({
    extended: true
}))

var db;

MongoClient.connect(url, function(err, database){
    if(err) throw err;
    db = database;
    //removed app.listen(8080); and moved to eof
});

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
app.get('/profile', function(req, res) {
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

//_login check_

//need to change variable names to make it look like my own code
app.post('/dologin', function(req, res) {
    console.log(JSON.stringify(req.body))

    var uname = req.body.username;
    var pword = req.body.password;
  
    db.collection('user').findOne({"username":uname}, function(err, result) {
      if (err) throw err;//if there is an error, throw the error
      //if there is no result, redirect the user back to the login system as that username must not exist
      if(!result){res.redirect('/login');
        return
      }
      //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
      if(result.password == pword){ //changed from result.login.password 
        req.session.loggedin = true; 
        res.redirect('/') 
      }
      //otherwise send them back to login
      else{res.redirect('/login')}
    });
});

app.get('/logout', function(req, res) {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});

//fav sound route
app.post('/favsound', function(req, res) {
    //check we are logged in
    if(!req.session.loggedin){res.redirect('/login');return;}

    console.log(JSON.stringify(req.body))

    var title = req.body.title;
    //var pword = req.body.password;
  
    //we create the data string from the form components that have been passed in
    //db.saveSound.insert({title:"testsound",image:"testimage.png",sound:"testsound.mp3",user:"tester"})
    var datatostore = {
    "title":title}//,
    //"image":imageURL,
    //"sound":soundURL,
   // "user":user};
  
  
  //once created we just run the data string against the database and all our new data will be saved/
    db.collection('saveSound').save(datatostore, function(err, result) {
      if (err) throw err;
      console.log('saved to database')
      //when complete redirect to the index
      res.redirect('/')
      //res.send(returnJSON); //return a bool, then check bool inf av and change icon colour
    })
  });

app.listen(8080);