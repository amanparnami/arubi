$(document).ready(function () {
	alert("device ready");

	for(kmlObjId in KHARMA.dom.elements){
		var kmlObj = KHARMA.dom.elements[kmlObjId];
		
		var feature = document.getElementById(kmlObj.id);

		if(feature && kmlObj.name == "testPM2") {
			//alert('found');
			$(feature).bind('touchstart', function (event){

				event.stopPropagation();
				alert('touched');

			});			

		}

	}

	
	createPlacemark();
	//var feature = document.getElementById(kmlObj.id);


});

function createPlacemark(){
	var placemarkJSON = {
		balloonVisibility : 1,
		description : "<div id='testPM2' class='pm-container'> <div class='pm' style='text-aligh:center;'> <img src='http://placehold.it/200x200' width ='200px' style='padding:10px;'/><div style='color:white'>Some Title</div></div></div>", 
		iconVisibility: "0",
		id : 'PM2',
        labelVisibility : "0",
        name : "testPM2",
        type : "placemark",
        visibility : "1",
        styleUrl : "#undecorated_style",
        geometry : [{ 
            altitudeMode : "clampToGround",
            id : "PM1Geo",
            location : {    
                altitude : 1.0,
                id : "location_relative",
                latitude : 6.0,
                latitude_units : "meters",
                longitude_units : "meters",
                longitude : 0,
                type : "location"
            },
            orientationMode : "billboard",
            locationMode: "relative",

            // tracker: {
            // 	device: "#framesimpleid",
            // 	options: {
            // 		markerId: 0,
            // 		width: 0.21
            // 	},
            // 	locationMode: "relative",
            // 	orientationMode: "relative",
            // 	scale: {
            // 		x: 0.022,
            // 		y: 0.022,
            // 		z: 0.022
            // 	},
            // },

            type : "balloon"
        }]
	};

	var placemark = new KMLPlacemark(placemarkJSON);

	$('#testPM2').bind('touchstart',function (event) 
            {
                event.stopPropagation(); 
                alert('touched new');
            }
	);


}