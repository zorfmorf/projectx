/*
	this is the JS for the main jsPlumb demo.  it is shared between the YUI, jQuery and MooTools
	demo pages.
*/
;(function() {

	window.jsPlumbDemo = {
			
		init : function() {			
			
			jsPlumb.importDefaults({
				DragOptions : { cursor: "pointer", zIndex:2000 },
				HoverClass:"connector-hover"
			});
	
			var connectorStrokeColor = "rgba(50, 50, 200, 1)",
				connectorHighlightStrokeColor = "rgba(180, 180, 200, 1)",
				hoverPaintStyle = { strokeStyle:"#7ec3d9" };			// hover paint style is merged on normal style, so you 
			                                                        // don't necessarily need to specify a lineWidth			
z
            //
            //this connects window5 with window6 using a Flowchart connector that is painted green,
            //with large Dot endpoints that are placed in the center of each element.  there is a
            //label at the default location of 0.5, and the connection is marked as not being
            //detachable.
			//
	        var conn4Color = "rgba(46,164,26,0.8)";
	        var connection4 = jsPlumb.connect({  
				source:'window5', 
				target:'window6', 
				connector:[ "Flowchart", { cornerRadius:10 } ],
				anchors:["Center", "Center"],  
				paintStyle:{ 
					lineWidth:9, 
					strokeStyle:conn4Color, 
					outlineColor:"#666",
					outlineWidth:2,
					joinstyle:"round"
				},
				hoverPaintStyle:hoverPaintStyle,
				detachable:false,
				endpointsOnTop:false, 
				endpointStyle:{ radius:65, fillStyle:conn4Color },
				labelStyle : { cssClass:"component label" },
				label : "big\nendpoints"
		    });
	
	        var connection5 = jsPlumb.connect({
				source:"window4", 
				target:"window5", 
				anchors:["BottomRight", "TopLeft"], 
				paintStyle:{ 
					lineWidth:7,
					strokeStyle:"rgb(131,8,135)",
//										outlineColor:"#666",
//						 				outlineWidth:1,
					dashstyle:"4 2",
					joinstyle:"miter"
				},
				hoverPaintStyle:hoverPaintStyle, 
				endpoint:["Image", {url:"endpointTest1.png"}], 
				connector:"Straight", 
				endpointsOnTop:true,
				overlays:[ ["Label", {
								cssClass:"component label",		    			        				 
								label : "4 - 5",
								location:0.3
							}],
							"Arrow"
							
				]
			});
									
			var stateMachineConnector = {				
				connector:"StateMachine",
				paintStyle:{lineWidth:3,strokeStyle:"#056"},
				hoverPaintStyle:{strokeStyle:"#dbe300"},
				endpoint:"Blank",
				anchor:"Continuous",
				overlays:[ ["PlainArrow", {location:1, width:15, length:12} ]]
			};
			
			jsPlumb.connect({
				source:"window3",
				target:"window7"
			}, stateMachineConnector);
			
			jsPlumb.connect({
				source:"window7",
				target:"window3"
			}, stateMachineConnector);

			// jsplumb event handlers
	
			// double click on any connection 
			jsPlumb.bind("dblclick", function(connection, originalEvent) { alert("double click on connection from " + connection.sourceId + " to " + connection.targetId); });
			// single click on any endpoint
			jsPlumb.bind("endpointClick", function(endpoint, originalEvent) { alert("click on endpoint on element " + endpoint.elementId); });
			// context menu (right click) on any component.
			jsPlumb.bind("contextmenu", function(component, originalEvent) {
                alert("context menu on component " + component.id);
                originalEvent.preventDefault();
                return false;
            });
			
			// make all .window divs draggable. note that here i am just using a convenience method - getSelector -
			// that enables me to reuse this code across all three libraries. In your own usage of jsPlumb you can use
			// your library's selector method - "$" for jQuery, "$$" for MooTools, "Y.all" for YUI3.
			jsPlumb.draggable(jsPlumb.getSelector(".window"), { containment:".demo"});    

		}
	};	
})();
