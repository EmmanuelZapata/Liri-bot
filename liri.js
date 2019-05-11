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

var songs = process.argv[2];

    spotify.search({ type: 'track', query: songs }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
        console.log("----Spotify Music----");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Track: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
    });

//Bands in Town

// var artist = process.argv[2];

// axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
//     function(response) {
//       // If the axios was successful...
//       // Then log the body from the site!
//       console.log(response.data);
//     },
  
//     function(error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     }
//   );

// var movies = process.argv[2];
// axios.get("http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=9426f43d").then(
//         function(response) {
//           // If the axios was successful...
//           // Then log the body from the site!
//           console.log(response.data);
//         },
      
//         function(error) {
//           if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//           } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//             console.log(error.request);
//           } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log("Error", error.message);
//           }
//           console.log(error.config);
//         }
//       );


