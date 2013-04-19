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

function adjustDevices(deviceId) {
    var deviceDiv = $('.device[data-id="' + deviceId + '"]');
    var deviceType = $(deviceDiv).attr("data-type");


    $(deviceDiv).wrap('<div class="rule-device-container"/>')

    deviceDiv = $(deviceDiv).parents(".rule-device-container");

    if (deviceType == "1")
        $(".input.rule-device-list").append(deviceDiv);
    else if (deviceType == "0")
        $(".output.rule-device-list").append(deviceDiv);
//    
//    var offset = {};
//    $(".device").each(function (){
//        console.log($(this)[0]);
//        offset = $(this).parent(".rule-device-container").offset();
//        
//        $(this).css("margin-top", -offset.top);
//        
////        console.log("device #" + $(this).attr("data-id") + "'s offsettop is " + offset.top);
//    });
}


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
    //Move device to the right place    

//    $(".device .feature-list").one("click touchend", ".feature", function() {
//        
//    });

    var featureIoType = "";
    var featureId = "";

    var deviceId = "";

    //Bind click handlers for features
    $(".device .feature-list").one("click touchend", ".feature", function() {
        console.log("in bind device features");
//        console.log($(this).);

        featureIoType = $(this).attr("data-io-type");
        featureId = $(this).attr("data-id");

        deviceId = $(this).parents(".device").attr("data-id");

        console.log(deviceId);

        adjustDevices(deviceId);

    });

    $(".device .feature-list").on("click touchend", ".feature", function() {
        featureIoType = $(this).attr("data-io-type");
        featureId = $(this).attr("data-id");

        deviceId = $(this).parents(".device").attr("data-id");

        if (featureIoType == "1") {
            getInputSpec(featureId, deviceId);
                       
        }
        else if (featureIoType == "0") {
            getOutputSpec(featureId, deviceId);


        }

    });

}

function moveInputDevice(deviceId, callback) {
    var originalLeft = $('.device[data-id="' + deviceId + '"] ').css("left");
    var originalTop = $('.device[data-id="' + deviceId + '"] ').css("top");

    deviceElement = $('.device[data-id="' + deviceId + '"] ');
    $(deviceElement).children('.device-popup').animate({opacity: "0"}, 500).hide();

    $(deviceElement).delay(500).animate({left: "0", top: "0"}, 500, callback).one("click touchend", function() {
            console.log("circle clicked after moving to side");

            $(deviceElement).children('.device-popup').show().animate({opacity: "1"}, 500);
//            $(deviceElement).animate({left: originalLeft, top: originalTop}, 500);

            $(deviceElement).children('.device-circle').children('.device-circle-spec-icon').hide().remove();
        });


}

function moveOutputDevice(deviceId, callback) {
    deviceElement = $('.device[data-id="' + deviceId + '"] ');
    $(deviceElement).children('.device-popup').animate({opacity: "0"}, 500, function() {
        $(this).hide();
        
    });
    
    $(deviceElement).delay(500).animate({left: "0", top: "0"}, 500, callback).one("click touchend", function() {
        console.log("circle clicked after moving to side");

        $(deviceElement).children('.device-popup').show().animate({opacity: "1"}, 500);
//        $(deviceElement).children('.device-circle').animate({left: "-=550", top: "+=150"}, 500);

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
