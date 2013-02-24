$(document).ready(function () {

    getDevices();

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
            type : "balloon"
        }]
    };
        
    var trackerJSON = {
        balloonVisibility : 1,
        description : '<div style="position: absolute; width: 100px; height: 100px; left: -50px; top: -50px"><img width="100px" height="100px" src="http://argonapps.gatech.edu/examples/FrameMarkerThin_005.png"/></div>',
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
            type : "balloon"
        }]
    };

    var placemark = new KMLPlacemark(placemarkJSON);

    $('#testPM2').on('touchend',function (event) 
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
            //alert("success");
            devicesHtml = '';
            $(devices).each(function(i) {
                device = devices[i];
                console.log(device.name);
                
                devicesHtml += '<div class="device" id="device_id_'+device.id+'" data-device-id="'+device.id+'">';
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
        //$("#devicepanel").hide();
        hideDevices();
            
        }
        
    });
}

function getInputFeatures(deviceId){
    $.ajax({
        url: "../server/feature.php",//set url for php to be called
        type:"GET",
        data:{
            "f":"getInputFeaturesByDeviceId",
            "deviceId" : deviceId
        //set parameter to be passed in
        },
        success: function (features) {//name return data as features
            //alert("success");
            var featuresHtml = '';
            $(features).each(function(i) {
                var feature = features[i];
                console.log(feature.title);
                
                featuresHtml += '<figure class="feature" id="feature_id_'+feature.id+'">';
                featuresHtml +=   '<img src="'+feature.icon_url+'">';
                featuresHtml +=   '<figcaption>'+feature.title+'</figcaption>';
                featuresHtml += '</figure> ';
                 console.log(feature);
            });
            //return data;
            console.log(featuresHtml);
            $(".input .featurepanel").html(featuresHtml);
        }
        
    });
    
}

function getOutputFeatures(deviceId){
    $.ajax({
        url: "../server/feature.php",//set url for php to be called
        type:"GET",
        data:{
            "f":"getOutputFeaturesByDeviceId",
            "deviceId" : deviceId
        //set parameter to be passed in
        },
        success: function (features) {//name return data as features
            //alert("success");
            var featuresHtml = '';
            $(features).each(function(i) {
                var feature = features[i];
                console.log(feature.title);
                
                featuresHtml += '<figure class="feature" id="feature_id_'+feature.id+'">';
                featuresHtml +=   '<img src="'+feature.icon_url+'">';
                featuresHtml +=   '<figcaption>'+feature.title+'</figcaption>';
                featuresHtml += '</figure> ';
                 console.log(feature);
            });
            //return data;
            console.log(featuresHtml);
            $(".output .featurepanel").html(featuresHtml);
        }
        
    });
    
}

function doTrackers(){
    $(".device").each(function (i){
        var placemark = KHARMA.getKMLElementById('tracker_'+i);
        var tracker = placemark.geometry[0];
        if(placemark.visibility == true) $('#device_id_' + i).show();
        else $('#device_id_' + i).hide();
        
        placemark.visibility = tracker.visible;
        placemark.render();
    });
}

function doTrackerAtIndex(i){
    //alert("index is "+i);
    var placemark = KHARMA.getKMLElementById('tracker_'+i);
    var tracker = placemark.geometry[0];
    if(placemark.visibility == true) $('#device_id_' + i).show();
    else $('#device_id_' + i).hide();
        
    placemark.visibility = tracker.visible;
    placemark.render();
    
}

function hideDevices(){
    $(".device").each(function (){
        $(this).hide();
    });
    
}
function showDevices(){
    $(".device").each(function (){
        $(this).show();
    });
    
}
function bindDevices () {
    
    $("#devicepanel .device .input.button").each(function (){
        $(this).on("touchend click", function () {
            var deviceId = $(this).parent(".device").attr("data-device-id");
            console.log(deviceId);
            getInputFeatures(deviceId);

            $('#leftpanel').animate({
                'left':'-24%'
            }, 'easein');
        })
    });
    
    $("#devicepanel .device .output.button").each(function (){
        $(this).on("touchend click", function () {
            var deviceId = $(this).parent(".device").attr("data-device-id");
            console.log(deviceId);
            getOutputFeatures(deviceId);

            $('#rightpanel').animate({
                'right':'-24%'
            }, 'easein');
        })
    });




    // $(".device ").on("click touchstart", function () {

    // 	$('#rightpanel').css('right', '-24%');
    // });




    $(".input .featurepanel").on("click touchend",".feature", function () {
        //alert("afd");
        $('#leftpanel').animate({
            'left': '0%'
        },'easein');
    });

    $(".output .featurepanel").on("click touchend",".feature", function () {

        $('#rightpanel').animate({
            'right': '0%'
        },'easein');
    });

    
}