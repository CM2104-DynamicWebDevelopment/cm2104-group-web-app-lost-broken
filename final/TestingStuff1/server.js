const express = require('express');
const https = require('https');
const app = express();

app.use(express.static('public'))




app.get('/doAPICall', function(req, res){
    var url = "https://freesound.org/apiv2/search/text/?query=" + searchTerms + "&page_size=1&fields=name&token=qxCIuynZMi8Cmvw70H1aPMKofG87c6LFuZ2PvbSZ"; 
    https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
        /*var json = [];
        for (var i = 0; i < tweets.length; i++) {
		json.push({
			name: tweets[i].user.name,
			text: tweets[i].text
		});
        }
        res.send(output);*/
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
});

app.listen(8080);
