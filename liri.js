require("dotenv").config();

var keys = require("./keys.js");
// node package to read and write files
var fs = require("fs");
// node package promise based HTTP client for the browser and node.js  (Ajax calls)
var axios = require("axios");
// node package A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
var moment = require("moment");
// node package node-spotify-api A simple to use API library for the Spotify REST API.
var Spotify = require("node-spotify-api");
// spotify keys
var spotify = new Spotify(keys.keys.spotify);

//store input in a variable array
var nodeArgv = process.argv;
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

//Switch case for different userinput variables.  song, movies, and artist made to command.
//var song = process.argv[2];
var command = process.argv[2];

switch(command){
  case "spotify-this-song":
  if (x){
    spotifySong(x);
  }
  else spotifySong("The Sign Ace of Base");
  break;

  case "concert-this":
  if (x){
    bandTown(x);
  }
  else console.log("Please enter an Artist or this just won't work!");
  break;

  case "movie-this":
  if (x){
    movieTime(x);
  }
  else {movieTime("Mr. Nobody");
  }
  break;

  case "do-what-it-says":
  doWhat("spotify-this-song");
}


//Spotify

function spotifySong (song) {
    spotify.search({ type: 'track', query: song}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
        console.log("----Spotify Music----");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}

//Bands in Town

function bandTown (artist) {

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      // If the axios was successful...
      // Then log the body from the site!
      //Go through the data by one.
    var concert = response.data;
    for (let i = 0; i < 1; i++) {
        console.log("\n----" + concert[i].lineup[0] + " Concert----");
        console.log("Name Of Venue: " + concert[i].venue.name);
        console.log("Name Of The City: " + concert[i].venue.city);
        console.log("Date Of Concert: " + moment(concert[i].datetime, moment.ISO_8601).format("MM/DD/YYYY"));
        console.log("--------------------");
    }
},
    function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  );
}

// OMDB 

function movieTime (movies) {
axios.get("http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=9426f43d").then(
        function(response) {
          // If the axios was successful...
          // Then log the body from the site!
          //  * Title of the movie.
          // * Year the movie came out.
          // * IMDB Rating of the movie.
          // * Rotten Tomatoes Rating of the movie.
          // * Country where the movie was produced.
          // * Language of the movie.
          // * Plot of the movie.
          // * Actors in the movie.
        if (movies === "Mr. Nobody"){      
            console.log("\n-----Here's An Idea-----");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");}
          
          else {
          console.log("\n----Movie----");
          console.log("Title Of Movie: " + response.data.Title);
          console.log("Year The Movie Came Out: " + response.data.Year);
          console.log("IMDB Rating Of Movie: " + response.data.imdbRating);
          console.log("Rotten Tomates Rating Of Movie: " + response.data.tomatoRating);
          console.log("Country Where The Movie Was Produced: " + response.data.Country);
          console.log("Language Of The Movie: " + response.data.Language);
          console.log("Plot Of The Movie: " + response.data.Plot);
          console.log("Actors In The Movie: " + response.data.Actors);
        }
      }
)};

// Do What It Says

function doWhat(){
  fs.readFile('random.txt', "utf8", function(error, data) {
var txt = data.split(',');
spotifySong(txt[1]);
});
}

