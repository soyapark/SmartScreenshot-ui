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

var croppers = [];

$(function() {
    initDB();

    for (var i =0; i < $('.row.results .seg-img').length; i++) {
    	var image = $('.row.results .seg-img')[i];
    	var options = {
		    ready: function (e) {
		      this.cropper.setData({'x':0, 'y': 0, 'width': 3000, 'height': 3000});
		    }
		}
    	var cropper = new Cropper(image, options);
    	croppers.push(cropper);  	
// croppers[i].getData()

//     	croppers[i].setData({'x':0, 'y': 0, 'width': 3000, 'height': 3000});
    }


	

	var starCountRef = firebase.database().ref('result/');
	starCountRef.on('child_added', function(snapshot) {
		if(!ready) return;
	  var val = snapshot.val();
	  console.log(val);
	  var index = 0;

	  $(".results").each(function( index ) {
	    console.log( index + ": " + $( this ).text() );

	    var text_container = $( this ).find('.text');
	    var text_result = '';
	    $.each(val[index]['result'], function( index, value ) {
		  // alert( index + ": " + value );
		  if ($($(".snippet")[index]).find('input').val() == '')
		  	text_result += "Field: " + value;
		  else
		  	text_result += $($(".snippet")[index]).find('input').val() +": " + value;

		  text_result += "<br>";
		});

	    text_container.html(text_result);

	    var x1 = parseFloat(val[index]['seg'][1]), y1 = parseFloat(val[index]['seg'][0]), x2 = parseFloat(val[index]['seg'][3]), y2 = parseFloat(val[index]['seg'][2]);

		  croppers[index].setData({'x':x1, 'y': y1, 'width': x2-x1, 'height': y2-y1,"rotate":0,"scaleX":1,"scaleY":1});
		  // receive results of each picture annotation and move it to  
		  // result = cropper['getCroppedCanvas']();
		  // debugger;
		  // $( this ).find('.seg').append(result);
	  });


	  
	});
});