/*!
 * Entourage 1.1.2 - Automatic Download Tracking for Asynchronous Google Analytics
 *
 * Copyright (c) 2011 by Tian Davis (http://techoctave.com/c7)
 * Licensed under the MIT (http://en.wikipedia.org/wiki/MIT_License) license.
 *
 * Learn More: http://techoctave.com/c7/posts/58-entourage-js-automatic-download-tracking-for-asynchronous-google-analytics
 */

/*jshint strict:false */

(function() {
var entourage = new (function() {
	var version = "1.1.2";
	var whitelist = /\.pdf$|\.zip$|\.od*|\.doc*|\.xls*|\.ppt*|\.exe$|\.dmg$|\.mov$|\.avi$|\.mp3$/i;
	
	//Get true FileName from link pathname
	var getFileName = function(pathname) {
		//Remove the anchor at the end (if one exists)
		pathname = pathname.substring(0, (pathname.indexOf("#") === -1) ? pathname.length : pathname.indexOf("#"));

		//Removes the query after the file pathname (if one exists)
		pathname = pathname.substring(0, (pathname.indexOf("?") === -1) ? pathname.length : pathname.indexOf("?"));

		//Removes everything before the last slash in the path
		pathname = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);

		return pathname;
	};

	var autograph = function() {
		console.log("autograph");
		var fileName, associate;

		//Get the file name
		fileName = getFileName(this.pathname); //The link object is now available in "this"

		//Add file to the Google Analytics Queue
		associate = '/download/' + fileName;
		
		console.log("associate: " + associate);
		
		//Track download using Asynchronous Google Analytics
		_gaq.push(['_trackPageview', associate]);
    };

	var initialize = function() {
		console.log("initialize");
		var links = document.links;
		
		for (var i = 0, l = links.length; i < l; i++) {
			//Compare the fileType to the whitelist
			var match = links[i].pathname.match(whitelist);
			
			//If the link is for a file download . . .
			if (typeof match !== "undefined" && match !== null) {
				//Call Entourage whenever the link is clicked
				links[i].onclick = autograph;
			}
		}
    };

	return {
		version: version,
		initialize: initialize
	};
})(); //Entourage.js

//Add entourage to the global namespace
window.entourage = entourage;

//Execute entourage onload - ensuring links are present in the DOM
window.onload = entourage.initialize;
})();