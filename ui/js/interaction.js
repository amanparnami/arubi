/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
    //Bind buttons
//    $
    $("create-rule").on("click touchend", function() {


    });

});

function setSpecsForRule(type, specId) {
    var ruleHolder = $("#rule-holder");

    console.log("input: " + $(ruleHolder).attr("data-input"));

    console.log("output: " + $(ruleHolder).attr("data-output"));



    if (type === "input") {
        $(ruleHolder).attr("data-input", specId);
    }
    if (type === "output")
    {
        $(ruleHolder).attr("data-output", specId);
    }

    console.log("input: " + $(ruleHolder).attr("data-input"));

    console.log("output: " + $(ruleHolder).attr("data-output"));

    var input = $(ruleHolder).attr("data-input");
    var output = $(ruleHolder).attr("data-output");
    
    if (
            ("" != $(ruleHolder).attr("data-input"))
            &&
            ("" != $(ruleHolder).attr("data-output"))
            )
    {
        console.log("ready to set rule");
            setRule(input, output, 1, 2, 1);
    }

}


function bindDeviceFeatures() {

    //Bind click handlers for features
    $(".device .feature-list").on("click touchend", ".feature", function() {
//        console.log($(this).);
        var featureIoType = $(this).attr("data-io-type");
        var featureId = $(this).attr("data-id");

        var deviceId = $(this).parents(".device").attr("data-id");
        console.log(deviceId);

        if (featureIoType == "1")
            getInputSpec(featureId, deviceId);
        else if (featureIoType == "0")
            getOutputSpec(featureId, deviceId);

    });

}

function moveDeviceCircleToInput(deviceId) {
    deviceElement = $('.device[data-id="' + deviceId + '"] ');
    $(deviceElement).children('.device-popup').animate({opacity: "0"}, 500).hide();
    $(deviceElement).children('.device-circle').animate({left: "-=300", top: "-=150"}, 500).one("click touchend", function() {
        console.log("circle clicked after moving to side");

        $(deviceElement).children('.device-popup').show().animate({opacity: "1"}, 500);
        $(deviceElement).children('.device-circle').animate({left: "+=300", top: "+=150"}, 500);

        $(deviceElement).children('.device-circle').children('.device-circle-spec-icon').hide().remove();
    });

}

function moveDeviceCircleToOutput(deviceId) {
    deviceElement = $('.device[data-id="' + deviceId + '"] ');
    $(deviceElement).children('.device-popup').animate({opacity: "0"}, 500, function() {
        $(this).hide();
    });
    $(deviceElement).children('.device-circle').animate({left: "+=550", top: "-=150"}, 500).one("click touchend", function() {
        console.log("circle clicked after moving to side");

        $(deviceElement).children('.device-popup').show().animate({opacity: "1"}, 500);
        $(deviceElement).children('.device-circle').animate({left: "-=550", top: "+=150"}, 500);

        $(deviceElement).children('.device-circle').children('.device-circle-spec-icon').hide().remove();
    });
}

//Functions for binding
function hideDevices() {
    $(".device").each(function() {
        $(this).hide();
    });

}
function showDevices() {
    $(".device").each(function() {
        $(this).show();
    });

}

function showDevice(deviceId) {
//    console.log("showing device#"+deviceId);
    $(".device[data-device-id=" + deviceId + "]").show();
}

function hideDevice(deviceId) {
//    console.log("hiding device#"+deviceId);
    $(".device[data-device-id=" + deviceId + "]").hide();
}
