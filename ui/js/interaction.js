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

function appendDevice(deviceId, featureId){
    
    var inputCount = $(".input.rule-device-list").attr("data-count");
    var outputCount = $(".output.rule-device-list").attr("data-count");
    
    var deviceDiv = $('.device-container .device[data-id="' + deviceId + '"]').clone();    
    
    var deviceType = $(deviceDiv).attr("data-type");
    
    if (deviceType == "1")    {
        $(deviceDiv).wrap('<div class="rule-device-container" data-seq="'+inputCount+'"/>');
        deviceDiv = $(deviceDiv).parents(".rule-device-container");
        
        $(".input.rule-device-list").append(deviceDiv);
        $(".input.rule-device-list").attr("data-count", Number(inputCount) + 1);
        
        bindSideInputFeature(featureId,'.input.rule-device-list .rule-device-container[data-seq='+inputCount+'] .device');
        
        //Get input spec
        getInputSpec(featureId, deviceId, 
        '.input.rule-device-list .rule-device-container[data-seq='+inputCount+'] .device');
    }
    else if (deviceType == "0"){
        $(deviceDiv).wrap('<div class="rule-device-container" data-seq="'+outputCount+'"/>');
        deviceDiv = $(deviceDiv).parents(".rule-device-container");
        
        $(".output.rule-device-list").append(deviceDiv);
        $(".output.rule-device-list").attr("data-count", Number(outputCount) + 1);
        
        bindSideOutputFeature(featureId,'.output.rule-device-list .rule-device-container[data-seq='+outputCount+'] .device');
        
        //Get output spec
        getOutputSpec(featureId, deviceId,
        '.output.rule-device-list .rule-device-container[data-seq='+outputCount+'] .device');
    }

        //Hide device popup
        console.log($(deviceDiv).children(".device-popup"));
        $(deviceDiv).children().children(".device-popup").hide(500);
}


function bindSideInputFeature(featureId,deviceHolder){
    //Click circle to open side feature list
    $(deviceHolder).children(".device-circle").on("click touchend", function (){
        //Hide spec list
        $(deviceHolder).children(".spec-list").hide();
        
        console.log("device circle for "+ deviceHolder + " clicked");
        
        $(deviceHolder).children(".device-popup").show();
        
    });
    
    console.log("in bind side input feature function");
    
    //Click feature to close feature list
    $(deviceHolder).children(".device-popup").children(" .feature-list").on("click touchend", ".feature", function () {
        featureId = $(this).attr("data-id");
        $(deviceHolder).children(".device-popup").hide();
        
        getInputSpec(featureId, "", deviceHolder);
    });
}

function bindSideOutputFeature(featureId, deviceHolder){
    //Click circle to open side feature list
    $(deviceHolder).children(".device-circle").on("click touchend", function (){
        //Hide spec list
        $(deviceHolder).children(".spec-list").hide();
        
        console.log("device circle for "+ deviceHolder + " clicked");
        
        $(deviceHolder).children(".device-popup").show();
        
    });
    
    console.log("in bind side output feature function");
    
    //Click feature to close feature list
    $(deviceHolder).children(".device-popup").children(".feature-list").on("click touchend", ".feature", function () {
        featureId = $(this).attr("data-id");
        
        $(deviceHolder).children(".device-popup").hide();
        
        getOutputSpec(featureId, "", deviceHolder);
    });
}
//
//function resetInputSpec(deviceHolder){
//    //Hide side spec icon
//    
//    
//}

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

    var featureIoType = "";
    var featureId = "";

    var deviceId = "";

    //Bind click handlers for features
    //Append device to input/output list
    $(".device .feature-list").on("click touchend", ".feature", function() {
        console.log("in bind device features");

        featureIoType = $(this).attr("data-io-type");
        featureId = $(this).attr("data-id");
        //get device id
        deviceId = $(this).parents(".device").attr("data-id");
        
        console.log("before appending device #" + deviceId);
        
        appendDevice(deviceId, featureId);

        //Hide current device
                
        //for testing purpose, show it after 3 seconds.
        
        var device = $(this).parents(".device");
        $(device).hide();
        
        setTimeout(function(){
            console.log("after 3 seconds");
            
            $(device).show(); 
        },3000);
        
    });
    
    
//    $(".device .feature-list").on("click touchend", ".feature", function() {
//        featureIoType = $(this).attr("data-io-type");
//        featureId = $(this).attr("data-id");
//
//        deviceId = $(this).parents(".device").attr("data-id");
//
//        if (featureIoType == "1") {
////            getInputSpec(featureId, deviceId);
//                       
//        }
//        else if (featureIoType == "0") {
////            getOutputSpec(featureId, deviceId);
//
//
//        }
//
//    });

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
