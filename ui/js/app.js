$(document).ready(function () {
    //alert("device ready");

    //	for(kmlObjId in KHARMA.dom.elements){
    //		var kmlObj = KHARMA.dom.elements[kmlObjId];
    //		
    //		var feature = document.getElementById(kmlObj.id);
    //
    //		if(feature && kmlObj.name == "testPM2") {
    //			//alert('found');
    //			$(feature).bind('touchstart', function (event){
    //
    //				event.stopPropagation();
    //				alert('touched');
    //
    //			});			
    //
    //		}
    //
    //	}
    //
    //	
    //	createPlacemark();
    //var feature = document.getElementById(kmlObj.id);
    getDevices();
    createPlacemark();
    });

function createPlacemark(){
    var placemarkJSON = [{
        balloonVisibility : 1,
        description : "<div id='testPM2' class='pm-container'> <div class='pm' style='text-align:center;'> <img src='img/200x200.gif' width ='200px' style='padding:10px;'/><div style='color:white'>Kinect1</div></div></div>", 
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
    }];

    var placemark = new KMLPlacemark(placemarkJSON);

    $('#testPM2').bind('touchstart',function (event) 
    {
        event.stopPropagation(); 
        alert('touched new');
    }
    );


}

function createTracker(){
    var placemarkJSON = [{
        balloonVisibility : 1,
        description : "<script language='text/javascript'>"
                        +"function handleVisibleChange() {"
                            +"var placemark = KHARMA.getKMLElementById('tracker_kinect_one');"
                            +"var tracker = placemark.geometry[0];"
                            +"placemark.visibility = tracker.visible;"
                            +"placemark.render();"
                        +"}"
                        +"function tracker_kinect_one_init() {"
                            +"window.setInterval(handleVisibleChange, 3000);"
                        +"}"
                        +"</script>"
                                                +"<div id='kinectMarker1' class='pm-container'> "
                                                        +"<div class='pm' style='text-align:center;'> "
                                                                +"<img src='img/1000x1000.gif' width ='100px' style='padding:10px;'/>"
                                                                +"<div class='text' style='color:white'>Kinect1</div>"
                                                        +"</div>"
                                                +"</div>", 
        iconVisibility: "0",
        id : 'PM2',
        labelVisibility : "0",
        name : "testTracker",
        type : "placemark",
        visibility : "1",
        styleUrl : "#undecorated_style",
       

         Tracker: [{
            device: "#framesimpleid",
            options: {
                    markerId: 0,
                    width: 0.21
            },
            locationMode: "relative",
            orientationMode: "relative",
            scale: [{
                    x: 0.022,
                    y: 0.022,
                    z: 0.022
            }],
         }],
    }];

    var placemark = new KMLPlacemark(placemarkJSON);

    alert("placemark created");
}


//Functions for data access

//Get the information for all devices
function getDevices(){
    $.ajax({
        url: "../server/device.php",//set url for php to be called
        type:"GET",
        data:{
            "f":"getDevices" //set parameter to be passed in
        },
        success: function (devices) {//name return data as devices
            devicesHtml = '';
            $(devices).each(function(i) {
                device = devices[i];
                console.log(device.name);
                
                devicesHtml += '<div class="device" id="device_id_'+device.id+'">';
                devicesHtml +=   '<p class="device-name">'+device.name+'</p>';
                devicesHtml +=   '<p class="device-description">'+device.description+'</p>';
                devicesHtml +=   '<p class="device-availability">Availability: '
                devicesHtml +=   device.available == 1? '<span class="on">On</span>' : '<span class="off">Off</span>';
                devicesHtml +=   '</p>';
                devicesHtml +=   device.type == 0? '':'<a class="button input">Input</a>';
                devicesHtml +=   device.type == 1? '':'<a class="button output">Output</a>';
                devicesHtml += '</div> ';
                
            });
            //return data;
            $("#devicepanel").html(devicesHtml);
            bindDevices();
        }
        
    });
    return -1;
}

function bindDevices () {
    $(".device a.button.input").on("click touchstart", function () {
        alert("test ");

        $('#leftpanel').animate({
            'left':'-24%'
        }, 'easein');
    });



    // $(".device ").on("click touchstart", function () {

    // 	$('#rightpanel').css('right', '-24%');
    // });

    $("#device_id_2 a.button.output").on("click touchstart", function () {

        $('#rightpanel').animate({
            'right':'-24%'
        }, 'easein');
        $('#feature_id_3').show();
        $('#feature_id_4').hide();
    });

    $("#device_id_4 a.button.output").on("click touchstart", function () {

        $('#rightpanel').animate({
            'right': '-24%'
        }, 'easein');
        $('#feature_id_4').show();
        $('#feature_id_3').hide();
    });

    $(".input .feature").on("click touchstart", function () {

        $('#leftpanel').animate({
            'left': '0%'
        },'easein');
    });

    $(".output .feature").on("click touchstart", function () {

        $('#rightpanel').animate({
            'right': '0%'
        },'easein');
    });

    
}