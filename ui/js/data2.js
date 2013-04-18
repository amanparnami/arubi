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
            var devicesHtml = '';
            var deviceHtml = '';
            $(devices).each(function(i) {
                deviceHtml = "";
                device = devices[i];

                if (device) {

                    console.log(device.name);

                    deviceHtml += '<div class="device" data-id="' + device.id + '">';
                    deviceHtml += '<div class="device-popup">';
                    deviceHtml += '<div class="device-title">' + device.name + '</div>';

                    deviceHtml += '<div class="feature-list">';

                    deviceHtml += '</div>';

                    deviceHtml += '</div>';

                    deviceHtml += '<div class="device-circle state1">';
                    deviceHtml += '<div class="device-circle-background">';

                    deviceHtml += '</div>';
                    deviceHtml += '<div class="device-circle-icon on">';
                    deviceHtml += '<img src="' + device.icon_url + '" alt="">';
                    deviceHtml += '</div>';

                    deviceHtml += '</div>';

                    deviceHtml += '</div>';

                    devicesHtml += deviceHtml;

                    getFeatures(device.id);
                }

            });
            //return data;
            $(".device-container").html(devicesHtml);

                        //Bind click handlers for features
//            $(".feature");


            bindDeviceFeatures();

            //$("#devicepanel").hide();
//            hideDevices();

        }

    });
}

//Function to get information for a device


//Get all information for features

function getFeatures(deviceId) {

    $.ajax({
        url: "../server/feature.php", //set url for php to be called
        type: "GET",
        data: {
            "f": "getFeaturesByDeviceId",
            "deviceId": deviceId
                    //set parameter to be passed in
        },
        success: function(features) {
            
//            console.log(features.length);
            var featureHtml;
            $(features).each(function(i) {
                featureHtml = "";
                var feature = features[i];
                if (feature) {
//                        console.log($());
                    console.log(feature.title);

                    featureHtml += '<div class="feature" data-io-type="'+feature.io_type+'" data-id="'+feature.id+'">';

                        featureHtml += '<div class="feature-icon">';
                        featureHtml += '<img src="' + feature.icon_url + '" alt=""/>';
                        featureHtml += '</div>';
                        featureHtml += '<span class="feature-title">' + feature.title + '</span>';
                    featureHtml += '</div>';
                            
                    $('.device[data-id=' + feature.device_id + '] .feature-list').append(featureHtml);   
                }
            });
        }
    });

}

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
function getInputSpec(featureId, deviceId) {
    console.log("get input spec for device @" + deviceId);
    
    moveDeviceCircleToInput(deviceId);
    
    $.ajax({
        url: "../server/spec.php",
        type: "GET",
        data: {
            "f": "getInputSpecsByFeatureId",
            "featureId": featureId
        }, success: function(specs) {
            var specsHTML = "";
            $(specs).each(function(i) {
                var spec = specs[i];
                
                //console.log(specs);
                specsHTML += '<div class="spec" data-id="'+spec.id+'">';
                specsHTML +=     '<div class="spec-icon">';
                specsHTML +=         '<img src="'+spec.icon_url+'">';
                specsHTML +=     '</div>';
                specsHTML +=     '<div class="spec-title">'+spec.description+'</div>';
                specsHTML += '</div>';
                
            });
            
            $(".input.spec-list").html(specsHTML).show();
            
            $(".input.spec-list").on("click touchend", ".spec", function (){
                var img =  $(this).children(".spec-icon").children("img");
                var imgUrl = $(img).attr("src");
                console.log("url is:"+ imgUrl);
                
                $(this).parents(".spec-list").hide();
                
                var deviceCircleSpecIcon = "";
                deviceCircleSpecIcon += '<div class="device-circle-spec-icon input">';
                deviceCircleSpecIcon += '<img src="'+imgUrl+'">';
                deviceCircleSpecIcon += '</div>';
                
                $('.device[data-id="'+deviceId+'"] ').children('.device-circle').append(deviceCircleSpecIcon);
                               
                var specId = $(this).attr("data-id");
                console.log(specId);
                setSpecsForRule("input", specId);
            });
            

        }
    });
}

function getOutputSpec(featureId, deviceId) {
    console.log("get output spec for device @" + deviceId);
    
    moveDeviceCircleToOutput(deviceId);
    
    $.ajax({
        url: "../server/spec.php",
        type: "GET",
        data: {
            "f": "getOutputSpecsByFeatureId",
            "featureId": featureId
        }, success: function(specs) {
            var specsHTML = "";
            $(specs).each(function(i) {
                var spec = specs[i];
                
                //console.log(specs);
                specsHTML += '<div class="spec" data-id="'+spec.id+'">';
                specsHTML +=     '<div class="spec-icon">';
                specsHTML +=         '<img src="'+spec.icon_url+'">';
                specsHTML +=     '</div>';
                specsHTML +=     '<div class="spec-title">'+spec.description+'</div>';
                specsHTML += '</div>';
            });
            
            $(".output.spec-list").html(specsHTML).show()
            
            $(".output.spec-list").on("click touchend", ".spec", function (){
                
                var img =  $(this).children(".spec-icon").children("img");
                var imgUrl = $(img).attr("src");
                console.log("url is:"+ imgUrl);
                
                $(this).parents(".spec-list").hide();
                
                var deviceCircleSpecIcon = "";
                deviceCircleSpecIcon += '<div class="device-circle-spec-icon output">';
                deviceCircleSpecIcon += '<img src="'+imgUrl+'">';
                deviceCircleSpecIcon += '</div>';
                
                $('.device[data-id="'+deviceId+'"] ').children('.device-circle').append(deviceCircleSpecIcon);
                
                var specId = $(this).attr("data-id");
                console.log(specId);
                setSpecsForRule("output", specId);
                
            });;

        }
    });
}

function pinDeviceCircle(deviceId){
    deviceElement = $('.device[data-id="'+deviceId+'"] ');
//    $(deviceElement).children('.device-circle')
}

function getRules() {
    //1) Fetch rules from database based on criteria
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "getRules",
        }, success: function(rules) {
            //2) Display rules in the UI
        }
    });
}

function setRule(inputId, outputId, programmerId, userId, loc_id) {
    $("svg.rule-connection").animate({opacity: 1}, 500);
//    $("svg.rule-connection").animate({opacity: 1}, 500);
    //By default: programmer = 1, user = 1
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "setRule",
            "inputId": inputId,
            "outputId": outputId,
            "programmer": programmerId,
            "user": userId,
            "loc_id": loc_id,
        }, success: function(rules) {
            //Fetch the ruleId and set it in UI
            

        }
    });
}

function setRuleStatus(ruleId, status) {
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "setRuleStatus",
            "ruleId": ruleId,
            "status": status,
        }, success: function(rules) {
            //Hide the UI corresponding to the rule
        }
    });
}

function getRule(ruleId) {
    //1) Fetch rules from database based on criteria
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "getRule",
            "ruleId": ruleId,
        }, success: function(rule) {
            //2) Display rule in the UI
        }
    });
}
