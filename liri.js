require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2]==="my-tweets"){
    client.get('statuses/home_timeline', 'count 2 include_entities false', function(error, tweets, response) {
        for (i = 0; i < tweets.length; i++) { 
            console.log(tweets[i].text);
        }
     });
    
}
if (process.argv[2]==="spotify-this-song"){
    spotify.search({type: "track", query: process.argv[3] }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[1].artists[0].name);
        console.log(data.tracks.items[1].name);
        console.log(data.tracks.items[1].preview_url);
        console.log(data.tracks.items[1].album.name);
    });
}
if (process.argv[2]==="movie-is-this"){
    var queryUrl = "http://www.omdbapi.com/?t=" +process.argv[3]+ "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(JSON.parse(body).Title,JSON.parse(body).Year,JSON.parse(body).imdbRating,
          JSON.parse(body).Country,JSON.parse(body).Language,JSON.parse(body).Plot,JSON.parse(body).Actors,);
        }
      });
}
if (process.argv[2]==="do-what-it-says"){

}