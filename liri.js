//initiate .env for sensitive material
require("dotenv").config();

//initalize npm packages
var Twitter = require('twitter');
var request = require ('request');
var Spotify = require('node-spotify-api');

//initialize other pages to import
var keys = require("./keys.js");
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
        if (!error) {
          for (i = 0; i < tweets.length ; i++) {
              var feed = tweets[i].text;
              var created = tweets[i].created_at;

              console.log(`
              ${feed}
              ${created}`);
          } 
        } 
        else {
            console.log(error);
        }
    })
}

// twitterFeed();

//Spotify return
function spotifySong(input) {
    spotify.search({ type: 'track', query: input, limit: 10 }, function(err, data) {

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
})
};
// spotifySong();


//OMDB return
function movies() {
    request.get('http://www.omdbapi.com/?apikey=trilogy&t=Zootopia', function (error, response) {
        var title = response.body.Title
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

            // console.log(response);
            // console.log(body);
            
            

    
    //     if (err) {
    //         console.log('error:', error); // Print the error if one occurred
    //     } else {
            console.log(`
              ${title}
              `);
    // }
});
}

movies();
  
  
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });