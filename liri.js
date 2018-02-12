var nodeArg = process.argv;
var keys = require("./keys.js");
var fs = require("fs");

//my-tweets command
if(nodeArg[2] === "my-tweets"){
	// JSON package
	var Twitter = require("twitter");
	var tweets = new Twitter(keys.twitterKeys);

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

	var spotify = new Spotify(keys.spotifyKeys);
	var songTitle = "";
	var songArtist;

	// Piecing together song titles longer than 1 word
	for(var i = 3; i < nodeArg.length; i++){
		if(i > 3 && i < nodeArg.length){
			songTitle = songTitle + " " + nodeArg[i];
		}
		else if(songTitle === ""){
			songTitle = "The Sign";
			songArtist = ""

		}
		else{
			songTitle += nodeArg[i];
		}
	}

	spotify.search({type: "track", query: songTitle}, function(error, data){
		if(error){
			console.log("Error occurred: " + error);
		}

	var songArtist = data.tracks.items[0].album.artists[0].name;
	var songName = data.tracks.items[0].name;
	var songPreview = data.tracks.items[0].external_urls.spotify;
	var songAlbum = data.tracks.items[0].album.name;

	console.log("Artist: " + songArtist);
	console.log("Song Name: " + songName);
	console.log("Song Preview: " + songPreview);
	console.log("Album: " + songAlbum);
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
		}
		else{
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
	fs.readFile("./random.txt", function(error, response, data){
		if(error){
			console.log("Error occurred: " + error);
		}
		// var dataArr = data.split(",");
		console.log(data);
	});
	// fs.exists("./random.txt", function(fileok){
	//   if(fileok)fs.readFile("./random.txt", function(error, data) {
	//     console.log("Contents: " + data);
	//   });
	//   else console.log("file not found");
		// });
}
