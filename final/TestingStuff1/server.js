const express = require('express');
//const https = require('https');
const request = require('request');
const app = express();
app.use(express.static('public'));


app.get('/doAPICall', function(req, res){
    var url = "https://freesound.org/apiv2/search/text/?query=" + req.query + "&page_size=1&fields=name&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ"; 

    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
        console.log(res);
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
        /*var json = [];
        for (var i = 0; i < tweets.length; i++) {
		json.push({
			name: tweets[i].user.name,
			text: tweets[i].text
		});
        }
        ----
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });*/
});


app.listen(8080);
