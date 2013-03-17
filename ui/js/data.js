//Functions for data access

//Get an array of all devices
function getDevicesJson(handler) {
    $.ajax({
        url: "../server/device.php", //set url for php to be called
        type: "GET",
        data: {
            "f": "getDevices" //set parameter to be passed in
        },
        success: function(devices) {
            
            ////name return data as devices
            //alert("success");
            devicesHtml = '';
            $(devices).each(function(i) {
                device = devices[i];
                console.log(device.name);

                devicesHtml += '<div class="device" id="device_id_' + device.id + '" data-device-id="' + device.id + '">';
                devicesHtml += '<p class="device-name">' + device.name + '</p>';
                devicesHtml += '<p class="device-description">' + device.description + '</p>';
                devicesHtml += '<p class="device-availability">Availability: '
                devicesHtml += device.available == 1 ? '<span class="on">On</span>' : '<span class="off">Off</span>';
                devicesHtml += '</p>';
                devicesHtml += device.type == 0 ? '' : '<a class="button input">Input</a>';
                devicesHtml += device.type == 1 ? '' : '<a class="button output">Output</a>';
                devicesHtml += '</div> ';
                
            });
            //return data;
            $("#devicepanel").html(devicesHtml);
            bindDeviceFeatures();
            //$("#devicepanel").hide();
            hideDevices();
            //Execute handler
            handler(devices);
        }
    });
}

//Get the information for all devices
function getDevices() {
    $.ajax({
        url: "../server/device.php", //set url for php to be called
        type: "GET",
        data: {
            "f": "getDevices" //set parameter to be passed in
        },
        success: function(devices) {//name return data as devices
            //alert("success");
            devicesHtml = '';
            $(devices).each(function(i) {
                device = devices[i];
                console.log(device.name);

                devicesHtml += '<div class="device" id="device_id_' + device.id + '" data-device-id="' + device.id + '">';
                devicesHtml += '<p class="device-name">' + device.name + '</p>';
                devicesHtml += '<p class="device-description">' + device.description + '</p>';
                devicesHtml += '<p class="device-availability">Availability: '
                devicesHtml += device.available == 1 ? '<span class="on">On</span>' : '<span class="off">Off</span>';
                devicesHtml += '</p>';
                devicesHtml += device.type == 0 ? '' : '<a class="button input">Input</a>';
                devicesHtml += device.type == 1 ? '' : '<a class="button output">Output</a>';
                devicesHtml += '</div> ';

            });
            //return data;
            $("#devicepanel").html(devicesHtml);
            bindDeviceFeatures();
            //$("#devicepanel").hide();
            hideDevices();

        }

    });
}

//Function to get information for a device


//Get all information for features

function getInputFeatures(deviceId) {
    $.ajax({
        url: "../server/feature.php", //set url for php to be called
        type: "GET",
        data: {
            "f": "getInputFeaturesByDeviceId",
            "deviceId": deviceId
                    //set parameter to be passed in
        },
        success: function(features) {//name return data as features
            //alert("success");
            var featuresHtml = '';
            $(features).each(function(i) {
                var feature = features[i];
                console.log(feature.title);

                featuresHtml += '<figure class="feature" id="feature_id_' + feature.id + '" data-feature-id="' + feature.id + '">';
                featuresHtml += '<img src="' + feature.icon_url + '">';
                featuresHtml += '<figcaption>' + feature.title + '</figcaption>';
                featuresHtml += '</figure> ';
                console.log(feature);
            });
            //return data;
            console.log(featuresHtml);
            $(".input .featurepanel").html(featuresHtml);
        }

    });

}

function getOutputFeatures(deviceId) {
    $.ajax({
        url: "../server/feature.php", //set url for php to be called
        type: "GET",
        data: {
            "f": "getOutputFeaturesByDeviceId",
            "deviceId": deviceId
                    //set parameter to be passed in
        },
        success: function(features) {//name return data as features
            //alert("success");
            var featuresHtml = '';
            $(features).each(function(i) {
                var feature = features[i];
                console.log(feature.title);

                featuresHtml += '<figure class="feature" id="feature_id_' + feature.id + '" data-feature-id="' + feature.id + '">';
                featuresHtml += '<img src="' + feature.icon_url + '">';
                featuresHtml += '<figcaption>' + feature.title + '</figcaption>';
                featuresHtml += '</figure> ';
                console.log(feature);
            });
            //return data;
            console.log(featuresHtml);
            $(".output .featurepanel").html(featuresHtml);
        }

    });

}

//Get all information for specs


function getInputSpec(featureId) {
    $.ajax({
        url: "../server/spec.php",
        type: "GET",
        data: {
            "f": "getInputSpecsByFeatureId",
            "featureId": featureId
        }, success: function(specs) {
            var specsHTML = "";
            $(specs).each(function(i) {
                //console.log(specs);
                var spec = specs[i];
                //console.log(spec);
                specsHTML += '<a class="spec" data-spec-id="' + spec.id + '">';
                specsHTML += spec.description;
                specsHTML += '</a>';

            });
            $(".input .specpanel").html(specsHTML);

        }
    });
}

function getOutputSpec(featureId) {
    $.ajax({
        url: "../server/spec.php",
        type: "GET",
        data: {
            "f": "getOutputSpecsByFeatureId",
            "featureId": featureId
        }, success: function(specs) {
            var specsHTML = "";
            $(specs).each(function(i) {
                //console.log(specs);
                var spec = specs[i];
                //console.log(spec);
                specsHTML += '<a class="spec" data-spec-id="' + spec.id + '">';
                specsHTML += spec.description;
                specsHTML += '</a>';

            });
            $(".output .specpanel").html(specsHTML);

        }
    });
}


//Functions for binding
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

function showDevice(deviceId){
//    console.log("showing device#"+deviceId);
    $(".device[data-device-id="+deviceId+"]").show();
}

function hideDevice(deviceId){
//    console.log("hiding device#"+deviceId);
    $(".device[data-device-id="+deviceId+"]").hide();
}

function bindDeviceFeatures () {
    
    $("#devicepanel .device .input.button").each(function (){
        $(this).on("touchend click", function () {
            var deviceId = $(this).parent(".device").attr("data-device-id");
            console.log("device #"+deviceId+": input button touched");
            getInputFeatures(deviceId);

            $('#leftpanel').animate({
                'left':'-24%'
            }, 'easein');
        })
    });
    
    $("#devicepanel .device .output.button").each(function (){
        $(this).on("touchend click", function () {
            var deviceId = $(this).parent(".device").attr("data-device-id");
            console.log("device #"+deviceId+": output button touched");
            getOutputFeatures(deviceId);

            $('#rightpanel').animate({
                'right':'-24%'
            }, 'easein');
        })
    });


    $(".input .featurepanel").on("click touchend",".feature", function () {
        getInputSpec($(this).attr('data-feature-id'));
        
        $('#leftpanel').animate({
            'left': '0%'
        },'easein');
    });

    $(".output .featurepanel").on("click touchend",".feature", function () {
        getOutputSpec($(this).attr('data-feature-id'));
        $('#rightpanel').animate({
            'right': '0%'
        },'easein');
    });

    
}
