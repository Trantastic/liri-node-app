var nodeArg = process.argv;

//my-tweets command
if(nodeArg[2] === "my-tweets"){
	// JSON package
	var Twitter = require("twitter");
	// twitter keys & tokens
	var twitKeys = require("./keys.js");

	var tweets = new Twitter(twitKeys);
	// Search parameters
	var params = {screen_name: "Trantastic50", count: "20"};

	tweets.get("statuses/user_timeline", params, function(error, tweet, response){
		if(error){
			console.log(error);
		}
		for(var i = 0; i < tweet.length; i++){
			console.log(tweet[i].created_at);
			console.log(tweet[i].text);
		}
	});
}

// spotify-this-song command
else if(nodeArg[2] === "spotify-this-song"){
	var Spotify = require("node-spotify-api");
	// var spotKeys = require("./keys.js");
	// var song = new Spotify(spotKeys);

	var songArg = process.argv[3];

	var spotify = new Spotify({
  		id: '396f04035d2042c8b6a798d280cbd990',
  		secret: '91b4f8a7ebbb43ebb1fac5e8f12a82ad'
	});

	spotify.search({type: "track", query: songArg}, function(error, data){
		if(error){
			console.log("Error occurred: " + error);
		}

	var spotifySong = data.tracks.items[0].album;
	console.log(spotifySong);
	});
}

// movie-this command
else if(nodeArg[2] === "movie-this"){
	var request = require("request");
	var movieTitle = "";

	// Piecing together movieTitle if longer than 1 word
	for(var i = 3; i < nodeArg.length; i++){
		if(i > 3 && i < nodeArg.length){
			movieTitle = movieTitle + "+" + nodeArg[i];
		}else{
			movieTitle += nodeArg[i];
		}
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";

	// Makes request to OMDB API for movie
	request(queryUrl, function(error, response, body){

		if(!error && response.statusCode === 200){
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country of Production: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}

// do-what-it-says command
else if(nodeArg[2] === "do-what-it-says"){
	fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, response, data){
		if(error){
			console.log("Error occurred: " + error);
		}
		console.log(data);
	});
}
