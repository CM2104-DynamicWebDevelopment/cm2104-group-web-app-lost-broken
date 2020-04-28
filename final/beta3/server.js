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
app.use(session({
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  saveUninitialized: false,
  resave: false
})); 

//nav test stuff
app.use(function(req, res, next) {
  //gets data from session and adjusts it to a 'response' 
  //so it can be passed to other pages for use.
  res.locals.username = req.session.username;
  res.locals.loggedin = req.session.loggedin;
  next();
});

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
    res.render('pages/index',
    {logged : res.locals.loggedin,//session data being brought into page to use.
    name : res.locals.username});
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about',
  {logged : res.locals.loggedin,
  name : res.locals.username});
});

// register page
app.get('/register', function(req, res) {
    res.render('pages/register',
    {logged : res.locals.loggedin,
    name : res.locals.username});
});

// login page
app.get('/login', function(req, res) {
    res.render('pages/login',
    {logged : res.locals.loggedin,
    name : res.locals.username});
});

// profile page
app.get('/profile', function(req, res) {
    res.render('pages/profile',
    {logged : res.locals.loggedin,
    name : res.locals.username});
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

app.post('/dologin', function(req, res) {

    console.log(JSON.stringify(req.body))
    //assigns inputted data to variables to authenticate.
    var usern = req.body.username;
    var passw = req.body.password;
    //checks to see if the entered username matches any in the collection. If none match then page is reset.
    db.collection('user').findOne({"username":usern}, function(err, result) {

      if (err) throw err;
      if(!result){
        res.redirect('/login');
        console.log("username not found"); 
        return
      }
      //if the user does exist - check the corrosponding password within the collection 
      //with the entered one. if a match then begin session.
      if(result.password == passw){

        req.session.loggedin = true; 
        req.session.username = usern;
        res.redirect('/') 
      }
      //if password doesn't match then page is reset.
      else{
        res.redirect('/login');
        console.log("password not correct"); 
      }
    });
});
//simple logout function that ends the session when the user wishes to.
app.get('/logout', function(req, res) {
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect('/');
});

app.post('/doUserSearch', function(req, res){
  db.collection('saveSound').find({user : req.session.username}).toArray().then(
      result => {
        console.log("Users sounds : ", result);
        res.send(result);
      }
    ).catch(err => console.error(`Failed to find document: ${err}`));
});

//fav sound route
app.post('/favsound', function(req, res) {
    var response = {redirect: "true",
                    save: "false"}; //should check if saved or not saved, rather than just redirect
    //check we are logged in
    if(!req.session.loggedin){res.send(response);return;} //have to send redirect as a response coz POST cant redirect :sss only took 4 hours to realize
    //we create the data string from the form components that have been passed in
    var datatostore = {
    "title":req.body.title,
    "image":req.body.image,
    "sound":req.body.sound,
    "user":req.session.username};

    response.redirect = "false";

    db.collection('saveSound').findOneAndDelete({
        $and: [
               { title : datatostore.title },
               { image: datatostore.image },
               { sound: datatostore.sound },
               { user: datatostore.user }
             ]
      }, function(err, result){
        if (err) throw err; 
        if(result.value == null) {
          console.log("No document matches the provided query.");
          db.collection('saveSound').save(datatostore, function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(datatostore) + ' --- saved to database')
            response.save = "true";
            res.send(response);
          })
        }
        else {
          console.log(`Successfully found and deleted document: ${JSON.stringify(result)}.`);
          response.save = "false";
          res.send(response);
        }
    });
});
/*
    ).then(result => {
        if(result.value != null) {
          console.log(`Successfully found and deleted document: ${JSON.stringify(result)}.`);
          response.save = "false";
          res.send(response);
        } else {
          console.log("No document matches the provided query.");
          db.collection('saveSound').save(datatostore, function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(datatostore) + ' --- saved to database')
            response.save = "true";
            res.send(response);
          })
        }
      })
      .catch(err => console.error(`Failed to find document: ${err}`));    
  });*/

//Registration
app.post('/sign_up', function(req, res){ 
  var usern = req.body.username;
  var passw = req.body.password;
  var passw_c = req.body.pass;
  //validates that entered data is correct
  //checks if confirm password has been filled in
  if (!passw_c){
    res.redirect('/register');
    console.log("password not confirmed");
  }
  //checks if both passwords match
  if (passw !== passw_c){
    res.redirect('/register');
    console.log("passwords do not match");
  }
  //checks if username already exists - if so then try again
  db.collection('user').findOne({"username":usern}, function(err, result) {
    if (result) {
      res.redirect('/register');
      console.log('user already exists');
      return
    }
  });

  //if data is valid it is put into the database
  var data = { 
    "username": usern,
    "password": passw
  }
  db.collection('user').insertOne(data, function(err){ 
    if (err) throw err; 
    console.log("Record inserted Successfully");          
  }); 

  return res.redirect('/'); 
}) 

app.listen(8080);
