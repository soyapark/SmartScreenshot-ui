/* Initialize Firebase. */
function initDB() {
    var config = {
	    apiKey: "AIzaSyB6sPlnpNllSVuFGk0rVYXRe3me-_8EQuY",
	    authDomain: "smartscreenshot-6d1e3.firebaseapp.com",
	    databaseURL: "https://smartscreenshot-6d1e3.firebaseio.com",
	    projectId: "smartscreenshot-6d1e3",
	    storageBucket: "smartscreenshot-6d1e3.appspot.com",
	    messagingSenderId: "870963407872"
	  };
    app = firebase.initializeApp(config);
}

/* Add the selected part as a snippet. */
function addSnippet() {
	// add canvas for preview
	
}

$(function() {
    initDB();

	var starCountRef = firebase.database().ref('posts/');
	starCountRef.on('value', function(snapshot) {
	  var val = snapshot.val();
	});

	firebase.database().ref().push({
		'x': 0,
		'y': 0,
		'width': 0,
		'height': 0
	})


});