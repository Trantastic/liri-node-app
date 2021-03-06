var nodeArg = process.argv;
var userCommand = process.argv[2];
var keys = require("./keys.js");
var fs = require("fs");
var songTitle = "";

switch(userCommand){
	case "my-tweets":
		displayTweets();
		break;
	case "spotify-this-song":
		for(var i = 3; i < nodeArg.length; i++){
			if(i > 3 && i < nodeArg.length){
				songTitle = songTitle + " " + nodeArg[i];
			}
			else{
				songTitle += nodeArg[i];
			}
		}
		displaySong(songTitle);
		break;
	case "movie-this":
		displayMovie();
		break;
	case "do-what-it-says":
		randomCommand();
		break;
}

//my-tweets command
function displayTweets(){
	var Twitter = require("twitter");
	var tweets = new Twitter(keys.twitterKeys);
	// Search parameters
	var params = {screen_name: "Trantastic50", count: "20"};

	tweets.get("statuses/user_timeline", params, function(error, tweet, response){
		if(error){
			console.log("Error occurred: " + error);
		}
		for(var i = 0; i < tweet.length; i++){
			console.log(tweet[i].created_at);
			console.log(tweet[i].text);
		}
	});
}

// spotify-this-song command
function displaySong(songName){
	var Spotify = require("node-spotify-api");
	var spotify = new Spotify(keys.spotifyKeys);

	if(songName){
		songTitle = songName;
	}
	// If song is blank, default to this
	else{
		songTitle = "The Sign Ace of Base";
	}

	spotify.search({type: "track", query: songTitle}, function(error, data){
		if(error){
			console.log("Error occurred: " + error);
		}

		var songArtist = data.tracks.items[0].album.artists[0].name;
		var songName = data.tracks.items[0].name;
		var songPreview = data.tracks.items[0].external_urls.spotify;
		var songAlbum = data.tracks.items[0].album.name;

		console.log(
			"Artist: " + songArtist +
			"\nSong Name: " + songName +
			"\nSong Preview: " + songPreview +
			"\nAlbum: " + songAlbum
		);
	});
}

// movie-this command
function displayMovie(){
	var request = require("request");
	var movieTitle = "";

	// Piecing together movieTitle if longer than 1 word
	for(var i = 3; i < nodeArg.length; i++){
		if(i > 3 && i < nodeArg.length){
			movieTitle = movieTitle + "+" + nodeArg[i];
		}
		else{
			movieTitle += nodeArg[i];
		}
	}
	// If movie title is blank, default to this
	if(movieTitle.length === 0){
		movieTitle = "Mr. Nobody";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";

	// Makes request to OMDB API for movie
	request(queryUrl, function(error, response, body){
		if(!error && response.statusCode === 200){
			console.log(
				"Title: " + JSON.parse(body).Title +
				"\nYear: " + JSON.parse(body).Year +
				"\nIMDB Rating: " + JSON.parse(body).imdbRating +
				"\nRotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value +
				"\nCountry of Production: " + JSON.parse(body).Country +
				"\nLanguage: " + JSON.parse(body).Language +
				"\nPlot: " + JSON.parse(body).Plot +
				"\nActors: " + JSON.parse(body).Actors
			);
		}
	});
}

// do-what-it-says command
function randomCommand(){
	fs.readFile("./random.txt", "utf-8", function(error, data){
		if(error){
			console.log("Error occurred: " + error);
		}

		var dataArr = data.split(",");

		displaySong(dataArr[1]);
	});
}
