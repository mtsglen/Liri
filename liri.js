//initiate .env for sensitive material
require("dotenv").config();

//initalize npm packages
var Twitter = require('twitter');
var request = require ('request');
var Spotify = require('node-spotify-api');

//initialize other pages to import
var keys = require("./keys.js");
var fs = require('fs');
// console.log(keys);

//takes arguments from terminal and assigns them to a var
var firstInput = process.argv[2];
var secondInput = process.argv[3];

//Twitter and Sp[otify key calls
var client = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
 
//Twitter return
var params = {screen_name: 'bootcampaccount'};

function twitterFeed(){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } 
        else {
            for (i = 0; i < tweets.length ; i++) {
                var feed = tweets[i].text;
                var created = tweets[i].created_at;
  
                console.log(`
                ${feed}
                ${created}`);
            } 
        }
    });
};

//Spotify return
function spotifySong(song) {
    spotify.search({ type: 'track', query: song, limit: 10 }, function(err, data) {

        var artist = data.tracks.items[0].artists[0].name;
        var song = data.tracks.items[0].name;
        var link = data.tracks.items[0].preview_url;
        var album = data.tracks.items[0].album.name;

        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            console.log(`
              ${artist}
              ${song}
              ${link}
              ${album}
              `);
        }
    });
};

//OMDB return
function movies(movie) {
    request.get('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response) {
        
        var resp = JSON.parse(response.body);
        var title = resp.Title;
        var year = resp.Year;
        var imdbRating = resp.imdbRating;
        var tomRating = resp.Ratings[1].Value;
        var lang = resp.Language;
        var plot = resp.Plot;
        var actors = resp.Actors;
            
        if (error) {
            console.log('error:', error); // Print the error if one occurred
        } else {
            console.log(`
              ${"Title: " + title}
              ${"Release Year: " + year}
              ${"IMDB Rating: " + imdbRating}
              ${"Rotten Tomatoes Rating: " + tomRating}
              ${"Language: " + lang}
              ${"Plot: " + plot}
              ${"Actors: " + actors}
              `);
        }
    })
}


//Do what it says function
function doIt(){
    fs.readFile("./random.txt", "utf8", (err, data)=> {
        if (err) {
            throw err
        }
        else if (data.includes("spotify")) {
            var content = data.split(",");
            spotifySong(content[1]);
        }
        
    })
};   

//Logic for commands
// console.log(firstInput);
// console.log(secondInput);

if (firstInput === "my-tweets") {
    twitterFeed();
} 
else if ((firstInput === "spotify-this-song") && (secondInput === undefined)) {
    spotifySong("Ace of Base: The Sign");
}
else if (firstInput === "spotify-this-song") {
    spotifySong(secondInput);
}
else if (firstInput === "movie-this" && secondInput === undefined) {
    console.log(`
        ${"If you haven't watched \"Mr. Nobody,\" then you should:"}
        ${"http://www.imdb.com/title/tt0485947/"}
        ${"It's on Netflix!"} `)
}
else if (firstInput === "movie-this") {
    movies(secondInput);
}
else if (firstInput === "do-what-it-says") {
    doIt();
}