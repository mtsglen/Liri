//initiate .env for sensitive material
require("dotenv").config();

//initalize npm packages
var Twitter = require('twitter');
var Request = require ('request');
var Spotify = require('node-spotify-api');

//initialize other pages to import
var keys = require("./keys.js") 

var firstInput = process.argv[2];
var secondInput = process.argv[3];

var spotify = new Spotify({
    id: keys.spotify.SPOTIFY_ID,
    secret: keys.spotify.SPOTIFY_SECRET
  });

var client = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});
 
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

twitterFeed();
 
function spotifySong() {
    spotify.search({ type: 'track', query: 'All the Small Things', limit: 10 }, function(err, data) {
        var artist = data.track.artists;
        var song = data.track.name;
        var link = data.track.link;
        var album = data.track.album;

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
spotifySong();