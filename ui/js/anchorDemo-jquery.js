;(function() {
	
	window.jsPlumbDemo = {
			
		init : function() {			

			// setup jsPlumb defaults.
			var overlays
			
			var color = "gray";
			jsPlumb.importDefaults({
				DragOptions : { cursor: 'pointer', zIndex:2000 },
				PaintStyle : { strokeStyle:color, lineWidth:10 },
				EndpointStyle : { radius:9, fillStyle:color },
				HoverPaintStyle : {strokeStyle:"#ec9f2e" },
				// EndpointHoverStyle : {fillStyle:"#ec9f2e" },
				// Endpoint : "Rectangle",
				Connector: "Straight",
				Anchors : ["TopCenter", "TopCenter"],
				ConnectionOverlays : [
					[ "Label", { 
						location:0.3,
						id:"label",
						cssClass:"aLabel"
					}]
				]
			});	
			
			// configure some drop options for use by all endpoints.
			var exampleDropOptions = {
				tolerance:"touch",
				hoverClass:"dropHover",
				activeClass:"dragActive"
			};
			
			//
			// the third example uses a Dot of radius 17 as the endpoint marker, is both a source and target, and has scope
			// 'exampleConnection3'.  it uses a Straight connector, and the Anchor is created here (bottom left corner) and never
			// overriden, so it appears in the same place on every element.
			//
			// this example also demonstrates the beforeDetach interceptor, which allows you to intercept 
			// a connection detach and decide whether or not you wish to allow it to proceed.
			//			
			var example3Color = "rgba(229,219,61,0.5)";
			var exampleEndpoint3 = {
				endpoint:["Dot", {radius:17} ],
				anchor:"RightMiddle",
				paintStyle:{ fillStyle:example3Color, opacity:0.5 },
				connectorStyle:{ strokeStyle:example3Color, lineWidth:10 },
				isSource:true,
				scope:'yellow dot',
				maxConnections:3,
				dropOptions : exampleDropOptions,
				// overlays:[
                	// [ "Label", { 
	                	// location:[0.5, 1.5], 
	                	// label:"Drag",
	                	// cssClass:"endpointSourceLabel" 
	                // } ]
                // ],
				beforeDetach:function(conn) { 
					return confirm("Detach connection?"); 
				}
			};
			
			var example4Color = "rgba(229,219,61,0.5)";
			var exampleEndpoint4 = {
				endpoint:["Dot", {radius:17} ],
				anchor:"LeftMiddle",
				paintStyle:{ fillStyle:example4Color, opacity:0.5 },
				connectorStyle:{ strokeStyle:example4Color, lineWidth:10 },
				scope:'yellow dot',
				isTarget:true,
				dropOptions : exampleDropOptions,
				// overlays:[
                	// [ "Label", { location:[0.5, -0.5], label:"Drop", cssClass:"endpointTargetLabel" } ]
                // ],
				beforeDetach:function(conn) { 
					return confirm("Detach connection?"); 
				}
			};
            
			
			
			
			// add endpoint of type 3 using a selector. 
			jsPlumb.addEndpoint($("#window1"), exampleEndpoint3);
			
			//jsPlumb.draggable($(".smallWindow"));
			// add endpoint of type 3 using a selector. 
			jsPlumb.addEndpoint($(".smallWindow"), exampleEndpoint4);
			
			init = function(connection) {
				//connection.getOverlay("label").setLabel(connection.sourceId.substring(6) + "-" + connection.targetId.substring(6));
				//TODO find the input id, output id, create a rule and display rule id
				var inputId = $("#"+connection.sourceId).attr("data-spec-id");
				var outputId = $("#"+connection.targetId).attr("data-spec-id");
				var overlay = connection.getOverlay("label");
					// now you can hide this Overlay:
				//overlay.hide(); //overlay.setVisible(false);
				connection.getOverlay("label").setLabel( "I: " + inputId + "<br> O: " + outputId);
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
				init(connInfo.connection);
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

			jsPlumb.bind("click", function(connInfo, originalEvent) { 
				var overlay = connInfo.getOverlay("label");
					// there are also hide/show methods:
					
					if(!overlay.isVisible()) {
						overlay.show();
					} else {
						overlay.hide();
					}
			});
			// click listener for the enable/disable link.
            $("#enableDisableSource").bind("click", function() {
				var state = jsPlumb.toggleSourceEnabled("window1");
				$(this).html(state ? "disable" : "enable");
			});
		}
	};	
})();