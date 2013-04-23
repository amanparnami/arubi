//;(function() {

var jsPlumbDemoSample = {
    connectionInputId: 0,
    connectionOutputId: 0,
    ruleId: 0,
    exampleDropOptions: {
        tolerance: "touch",
        hoverClass: "dropHover",
        activeClass: "dragActive"
    },
    example3Color: "rgba(229,219,61,0.5)",
    exampleEndpoint3: {
        endpoint: ["Dot", {radius: 17}],
        anchor: "RightMiddle",
        paintStyle: {fillStyle: "#aa66cc", opacity: 0.5},
        connectorStyle: {strokeStyle: "#f1f1f1", lineWidth: 10},
        isSource: true,
        scope: 'yellow dot',
        maxConnections: 3,
//        dropOptions: {
//        tolerance: "touch",
//        hoverClass: "dropHover",
//        activeClass: "dragActive"
//        },
        // overlays:[
        // [ "Label", { 
        // location:[0.5, 1.5], 
        // label:"Drag",
        // cssClass:"endpointSourceLabel" 
        // } ]
        // ],
        beforeDetach: function(conn) {
//            return confirm("Detach connection?");
            //get rule id
            var ruleId = $("#"+conn.targetId).attr("data-rule-id");
            var confirmDetach = confirm("You will delete rule No." + ruleId);
            if (confirmDetach) {
                console.log("call function to delete a rule");
                console.log("Rule# " + ruleId + " deleted");

                //Clear input output target ids
                $("#" + conn.sourceId).attr("data-output-id", "");
                $("#" + conn.targetId).attr("data-input-id", "");
                $("#" + conn.targetId).attr("data-rule-id", "");
                $("#" + conn.targetId).attr("data-rule-id", "");                
                deleteRule(ruleId);
            }
            return confirmDetach;
        }
    },
    example4Color: "rgba(229,219,61,0.5)",
    exampleEndpoint4: {
        endpoint: ["Dot", {radius: 17}],
        anchor: "LeftMiddle",
        paintStyle: {fillStyle: "#ffbb33", opacity: 0.5},
        connectorStyle: {strokeStyle: "#ffbb33", lineWidth: 10},
        scope: 'yellow dot',
        isTarget: true,
        dropOptions: {
            tolerance: "touch",
            hoverClass: "dropHover",
            activeClass: "dragActive"
        },
        // overlays:[
        // [ "Label", { location:[0.5, -0.5], label:"Drop", cssClass:"endpointTargetLabel" } ]
        // ],
        beforeDetach: function(conn) {
        }
    },
    setData: function (ruleId){
        
    },
    addInput: function(inputSelector) {
        // add endpoint of type 3 using a selector. 
        jsPlumb.addEndpoint($(inputSelector), this.exampleEndpoint3);
    },
    addOutput: function(outputSelector) {
        //jsPlumb.draggable($(".smallWindow"));
        // add endpoint of type 3 using a selector. 
        jsPlumb.addEndpoint($(outputSelector), this.exampleEndpoint4);
    },
    init: function() {

        // setup jsPlumb defaults.
        var overlays;

        var color = "gray";
        jsPlumb.importDefaults({
            DragOptions: {cursor: 'pointer', zIndex: 2000},
            PaintStyle: {strokeStyle: color, lineWidth: 10},
            EndpointStyle: {radius: 9, fillStyle: color},
            HoverPaintStyle: {strokeStyle: "#33B5E5"},
            // EndpointHoverStyle : {fillStyle:"#ec9f2e" },
            // Endpoint : "Rectangle",
            Connector: "Straight",
            Anchors: ["TopCenter", "TopCenter"],
            ConnectionOverlays: [
                ["Label", {
                        location: 0.3,
                        id: "label",
                        cssClass: "aLabel"
                    }]
            ]
        });

        // configure some drop options for use by all endpoints.


        //
        // the third example uses a Dot of radius 17 as the endpoint marker, is both a source and target, and has scope
        // 'exampleConnection3'.  it uses a Straight connector, and the Anchor is created here (bottom left corner) and never
        // overriden, so it appears in the same place on every element.
        //
        // this example also demonstrates the beforeDetach interceptor, which allows you to intercept 
        // a connection detach and decide whether or not you wish to allow it to proceed.
        //



        init = function(connection) {
            //connection.getOverlay("label").setLabel(connection.sourceId.substring(6) + "-" + connection.targetId.substring(6));
            //TODO find the input id, output id, create a rule and display rule id

            // now you can hide this Overlay:
            //overlay.hide(); //overlay.setVisible(false);
            connection.getOverlay("label").setLabel("I: " + inputId + "<br> O: " + outputId);
            // connection.bind("touchend", function() {
            // var overlay = connection.getOverlay("label");
            // // there are also hide/show methods:

            // if(!overlay.isVisible()) {
            // overlay.show();
            // } else {
            // overlay.hide();
            // }

            // });



        };

        jsPlumb.bind("jsPlumbConnection", function(connInfo, originalEvent) {
//            init(connInfo.connection);
            var newRuleId = window.jsPlumbDemo.ruleId;

            var inputId = $("#" + connInfo.connection.sourceId).attr("data-spec-id");

            var outputId = $("#" + connInfo.connection.targetId).attr("data-spec-id");

            //Add outputid, ruleid to input 
            $("#" + connInfo.connection.sourceId).attr("data-output-id", outputId);

            //Add inputid, ruleid to output
            $("#" + connInfo.connection.targetId).attr("data-input-id", inputId);


            var overlay = connInfo.connection.getOverlay("label");



            console.log(newRuleId);

            //Create a rule
            setRule(inputId, outputId, 1, 2, 1, connInfo.connection);

        });

        // make 'window1' a connection source. notice the filter parameter: it tells jsPlumb to ignore drags
        // that started on the 'enable/disable' link on the blue window.
        // jsPlumb.makeSource("window1", {
        // //anchor:sourceAnchors,		// you could supply this if you want, but it was set in the defaults above.							
        // filter:function(evt, el) {
        // var t = evt.target || evt.srcElement;
        // return t.tagName !== "A";
        // }
        // });			

        // // get the list of ".smallWindow" elements.            
        // var smallWindows = $(".smallWindow");
        // // make them draggable
        // jsPlumb.draggable(smallWindows);
        // // configure them as targets.
        // jsPlumb.makeTarget(smallWindows, {
        // anchor:"BottomLeft",				// you could supply this if you want, but it was set in the defaults above.					
        // dropOptions:{ hoverClass:"hover" }
        // });	

        // and finally connect a couple of small windows, just so its obvious what's going on when this demo loads.           
        // jsPlumb.connect({ source:"window1", target:"window5" });
        // jsPlumb.connect({ source:"window1", target:"window2" });

        jsPlumb.bind("touchend", function(connInfo, originalEvent) {
            var overlay = connInfo.getOverlay("label");
            // there are also hide/show methods:

            if (!overlay.isVisible()) {
                overlay.show();
            } else {
                overlay.hide();
            }
        });

        // click listener for the enable/disable link.
//        $("#enableDisableSource").bind("click", function() {
//            var state = jsPlumb.toggleSourceEnabled("window1");
//            $(this).html(state ? "disable" : "enable");
//        });
    }
};


(function initLineConnection() {
    console.log("in initLineConnection function");
    window.jsPlumbDemo = jsPlumbDemoSample;
    window.jsPlumbDemo.init();
})();

function addInputForConnection(inputSelector) {
    window.jsPlumbDemo.addInput(inputSelector);
}

function addOutputForConnection(outputSelector) {
    window.jsPlumbDemo.addOutput(outputSelector);
}
//})();