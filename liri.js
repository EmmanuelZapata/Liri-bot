require("dotenv").config();

var keys = require("./keys.js");
// node package to read and write files
var fs = require("fs");
// node package promise based HTTP client for the browser and node.js  (Ajax calls)
var axios = require("axios");
// node package A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
var moment = require("moment");

var songs = process.argv[2];

// node package node-spotify-api A simple to use API library for the Spotify REST API.
var Spotify = require("node-spotify-api");
// spotify keys
var spotify = new Spotify(keys.keys.spotify);
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