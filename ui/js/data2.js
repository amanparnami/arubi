//Functions for data access

var timestamp = "";
var lastExecutedRuleId = "";

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
function getDevices(handler) {
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
            //Define input output string
            var io = "";

            $(devices).each(function(i) {
                deviceHtml = "";
                device = devices[i];

                if (device) {

                    if (device.type == "1")
                        io = "input";
                    else if (device.type == "0")
                        io = "output";

                    deviceHtml += '<div class="device" data-id="' + device.id + '" data-type="' + device.type + '">';
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

                    deviceHtml += '<div class="device-circle-spec-icon ' + io + '" style="display: none;">';

                    deviceHtml += '</div>';

                    deviceHtml += '</div>';


                    deviceHtml += '<div class="' + io + ' spec-list">';

                    deviceHtml += '</div>';

                    deviceHtml += '</div>';

                    devicesHtml += deviceHtml;


                    //Append device to containing div based on device type
                    //If it's an input device, append it to the left side

                    getFeatures(device.id);

                }

            });
            //return data;
            $(".device-container").html(devicesHtml);

//            adjustDevices();

            bindDeviceFeatures();
            
            hideDevices();
            
            handler(devices);
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

                    featureHtml += '<div class="feature" data-io-type="' + feature.io_type + '" data-id="' + feature.id + '">';

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
function getInputSpec(featureId, deviceId, deviceHolder) {
    console.log("get input spec for device @" + deviceId);

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
                specsHTML += '<div class="spec" data-id="' + spec.id + '">';
                specsHTML += '<div class="spec-icon">';
                specsHTML += '<img src="' + spec.icon_url + '">';
                specsHTML += '</div>';
                specsHTML += '<div class="spec-title">' + spec.description + '</div>';
                specsHTML += '</div>';

            });

//            moveInputDevice(deviceId, function () {

            //Update spec-list
            $(deviceHolder).children(".input.spec-list").html(specsHTML).show(500);
//            }); 

            //Bind handlers for each .spec
            $(deviceHolder).children(".input.spec-list").on("touchend", ".spec", function() {
                
//                $(this).animate({"background-color": "rgba(255, 255, 255, 1)"});
                
                var img = $(this).children(".spec-icon").children("img");
                var imgUrl = $(img).attr("src");
                console.log("url is:" + imgUrl);

                var deviceCircleSpecIcon = "";

                deviceCircleSpecIcon += '<img src="' + imgUrl + '">';

                $(deviceHolder).children('.device-circle').children(".device-circle-spec-icon").html(deviceCircleSpecIcon);

                var specId = $(this).attr("data-id");
                console.log(specId);

                $(deviceHolder).parent(".rule-device-container").attr("data-spec-id", specId);

            });


            $(deviceHolder).children(".input.spec-list").on("touchend", ".spec", function() {
                //Hide spec list
                $(this).parents(".spec-list").hide();

                //Show side icon
                $(deviceHolder).children('.device-circle').children(".device-circle-spec-icon").show();

                var deviceContainerHolder = $(deviceHolder).parent(".rule-device-container");

                //Since input spec is updated, data-input-id should be updated at output container
                var ruleId = $(deviceContainerHolder).attr("data-rule-id");
                var inputId = $(deviceContainerHolder).attr("data-spec-id");
                $(".output.rule-device-list .rule-device-container[data-rule-id="+ruleId+"]").attr("data-input-id", inputId);

                //determine if is in a rule by checking id="jsPlumb_x_xx" or not
                if (
                        ($(deviceContainerHolder)[0].id.indexOf("jsPlumb") !== -1) &&
                        ($(deviceContainerHolder).attr("data-output-id"))
                        )
                {
                    var ruleId = $(deviceContainerHolder).attr("data-rule-id");
                    var inputId = $(deviceContainerHolder).attr("data-spec-id");
                    var outputId = $(deviceContainerHolder).attr("data-output-id");
                    updateRule(ruleId, inputId, outputId);
                }


                //Init line connection
                else
                    addInputForConnection($(deviceHolder).parent(".rule-device-container"));
            });


            //Bind side circle click handler
            $(deviceHolder).children('.device-circle').on("touchend", ".device-circle-spec-icon", function(e) {
                console.log("side icon clicked for input spec");
                //Show spec list
                $(deviceHolder).children('.input.spec-list').show();

                $(this).hide();

                e.stopPropagation();

            });
        }
    });
}

function getOutputSpec(featureId, deviceId, deviceHolder) {
    console.log("get output spec for device @" + deviceId);

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
                specsHTML += '<div class="spec" data-id="' + spec.id + '">';
                specsHTML += '<div class="spec-icon">';
                specsHTML += '<img src="' + spec.icon_url + '">';
                specsHTML += '</div>';
                specsHTML += '<div class="spec-title">' + spec.description + '</div>';
                specsHTML += '</div>';
            });

//            moveOutputDevice(deviceId, function () {
            $(deviceHolder).children(".output.spec-list").html(specsHTML).show(500);
//            
//
//            });

            //Bind spec selection 
            $(deviceHolder).children(".output.spec-list").on("touchend", ".spec", function() {

                var img = $(this).children(".spec-icon").children("img");
                var imgUrl = $(img).attr("src");
                console.log("url is:" + imgUrl);

                var deviceCircleSpecIcon = "";

                deviceCircleSpecIcon += '<img src="' + imgUrl + '">';

                $(deviceHolder).children('.device-circle').children(".device-circle-spec-icon").html(deviceCircleSpecIcon);

                var specId = $(this).attr("data-id");
                console.log(specId);

                $(deviceHolder).parent(".rule-device-container").attr("data-spec-id", specId);
//                    setSpecsForRule("output", specId);
            });

            $(deviceHolder).children(".output.spec-list").on("touchend", ".spec", function() {
                //Hide spec list
                $(this).parents(".spec-list").hide();

                //Show side icon
                $(deviceHolder).children('.device-circle').children(".device-circle-spec-icon").show();

                
                var deviceContainerHolder = $(deviceHolder).parent(".rule-device-container");
                
                //Since output spec is updated, data-output-id should be updated at input container
                var ruleId = $(deviceContainerHolder).attr("data-rule-id");
                var outputId = $(deviceContainerHolder).attr("data-spec-id");
                $(".input.rule-device-list .rule-device-container[data-rule-id="+ruleId+"]").attr("data-output-id", outputId);
                
                //determine if is in a rule by checking id="jsPlumb_x_xx" or not
                if (
                        ($(deviceContainerHolder)[0].id.indexOf("jsPlumb") !== -1) &&
                        ($(deviceContainerHolder).attr("data-input-id"))
                        )
                {

                    var inputId = $(deviceContainerHolder).attr("data-input-id");

                    updateRule(ruleId, inputId, outputId);
                }

                //Init line connection
                else
                addOutputForConnection($(deviceHolder).parent(".rule-device-container"));
            });

            //Bind side circle 

            $(deviceHolder).children('.device-circle').on("touchend", ".device-circle-spec-icon", function(e) {
                console.log("side icon clicked for output spec");
                //Show spec list
                $(deviceHolder).children('.output.spec-list').show();

                $(this).hide();

                e.stopPropagation();
            });
        }
    });
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

function setRule(inputId, outputId, programmerId, userId, loc_id, connection) {
//    $("svg.rule-connection").animate({opacity: 1}, 500);

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
        }, success: function(data) {
//            window.jsPlumbDemo.ruleId = data.ruleId;
            $( "#" + connection.sourceId).attr("data-rule-id", data.ruleId);
            $( "#" + connection.targetId).attr("data-rule-id", data.ruleId);

            //Set label
            connection.getOverlay("label").setLabel("<span class='rule-info'><span class='rule-id'>Rule: "+data.ruleId+"</span> \n\
                                                     <span class='rule-input-id'> I: " + inputId + "</span> \n\
                                                     <span class='rule-output-id'> O: " + outputId + "</span></span>\n\
                                                     <span class='rule-executed'>executed: <span class='rule-executed-num'>0</span> times</span>");

//            console.log("new rule id is " + newRuleId);
//            console.log(data.ruleId);
            //Fetch the ruleId and set it in UI
            console.log("rule created");
            
            window.notification.log("Rule #"+data.ruleId + " is created.");
        }
    });
}

function updateRule(ruleId, inputId, outputId) {
    console.log("rule: "+ruleId + "input "+inputId + "outputId" + outputId);
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "updateRule",
            "ruleId": ruleId,
            "inputId": inputId,
            "outputId": outputId,
        }, success: function(data) {
//            window.jsPlumbDemo.ruleId = data.ruleId;
//            console.log("new rule id is " + newRuleId);
//            console.log(data.ruleId);
            //Fetch the ruleId and set it in UI
            console.log("rule updated");
            
            //Update label
            $("div.aLabel:contains('Rule: "+ruleId+"')").html("<span class='rule-info'><span class='rule-id'>Rule: "+data.ruleId+"</span> \n\
                                                     <span class='rule-input-id'> I: " + inputId + "</span> \n\
                                                     <span class='rule-output-id'> O: " + outputId + "</span></span>\n\
                                                     <span class='rule-executed'>executed: <span class='rule-executed-num'>0</span> times</span>");
            
            window.notification.log("Rule #"+ruleId + " is updated.");
        }
    });
}

function deleteRule(ruleId) {
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "deleteRule",
            "ruleId": ruleId,
        }, success: function(result) {
            //Hide the UI corresponding to the rule
            console.log("Delete rule result: "+result);
            window.notification.log("Rule #"+ruleId + " is deleted.");
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

function getLastExecutedRule(){
//    console.log("getLastExecutedRule is running, before AJAX call");
    $.ajax({
        url: "../server/rule.php",
        type: "GET",
        data: {
            "f": "getLastExecutedRule"
        }, 
        success: function (data) {
//            console.log("last activited rule is rule #"+data.ruleId + "at time: "+data.timestamp);
            if(timestamp !== data.timestamp){
                timestamp = data.timestamp;
                console.log("change ui");
                
                var connection = 
                $("div.aLabel:contains('Rule: "+data.ruleId+"')").prev("svg");
        
                $(connection).animate({opacity: 0}, 250).animate({opacity: 1}, 250).animate({opacity: 0}, 250).animate({opacity: 1}, 250).animate({opacity: 0}, 250).animate({opacity: 1}, 250).animate({opacity: 0}, 250).animate({opacity: 1}, 250);

                var num = $("div.aLabel:contains('Rule: "+data.ruleId+"')").children("span.rule-executed-num").html();
                num = Number(num);
                num ++;
                $("div.aLabel:contains('Rule: "+data.ruleId+"')").children("span.rule-executed-num").html(num);
                
                
//                        .html("Rule: "+ruleId+"<br> I: " + inputId + "<br> O: " + outputId + "<br> executed: <span class='rule-executed-num'>0</span>");
            
//                        .addClass("flash");
//                window.setTimeout(function () {
//                    $(connection).removeClass("flash")
//                }, 1000);
//                        .attr("stroke", "#99cc00").delay(100).attr("stroke", "#f1f1f1").delay(100).attr("stroke", "#99cc00").delay(100).attr("stroke", "#f1f1f1")
//                        .html("Rule: "+ruleId+"<br> I: " + inputId + "<br> O: " + outputId);
            }
        }
    });


}
