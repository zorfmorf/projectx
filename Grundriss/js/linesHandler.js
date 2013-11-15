
function LinesHandler () {
      
  var pointsCounter = 1;
  var polygons = [];
  //besteht aus connections
  var currPolygon = [];
  var support = new ProjectSupport();
  
//Erstelle punkt
  this.createPoint =  function (options) {
     var el = document.createElement('div');
     el.id = "point"+ pointsCounter;
     el.className = "component window";            
     pointsCounter++;       
     $('#floor_plan').append(el);
     $('#' + el.id).css("position","absolute");
     $('#' + el.id).css("top", options.top+"px");
     $('#' + el.id).css("left", options.left+"px");
     return el;
  }
  
   //erstelle linie
  this.createLine =  function (startPoint, endPoint) {
    jsPlumb.ready(function() {
          jsPlumb.importDefaults({
                 DragOptions : { cursor: "pointer", zIndex:2000 },
                 HoverClass:"connector-hover"
          });
            
           var connectorStrokeColor = "rgba(50, 50, 200, 1)",
           connectorHighlightStrokeColor = "rgba(180, 180, 200, 1)",
           hoverPaintStyle = { strokeStyle:"#7ec3d9" };            // hover paint style is merged on normal style, so you 

            var connection = jsPlumb.connect({
                source: startPoint.id, 
                target: endPoint.id, 
//              anchors:["BottomRight", "TopLeft"], 
                paintStyle:{ 
                    lineWidth:7,
                    strokeStyle:"rgb(131,8,135)",
//                                      outlineColor:"#666",
//                                      outlineWidth:1,
//                  dashstyle:"4 2",
                    joinstyle:"miter"
                },
                hoverPaintStyle:hoverPaintStyle, 
                endpoint:["Image", {url:"endpointTest1.png"}], 
                connector:"Straight", 
                endpointsOnTop:true,
                // overlays:[ ["Label", {
                                // cssClass:"component label",                                               
                                // label : "4 - 5",
                                // location:0.3
                            // }],
                            // "Arrow"
//                          
                // ]
            });
            
           currPolygon.push(connection);
            
           function behaviorOnClickOnConnections(makeRandomColorForPolygon) {
                bootbox.dialog({
                  message: "Was willst du mit diesem Polygon machen?",
                  title: "Etwas mit dem Polygon machen...",
                  buttons: {                    
                    main: {
                      label: "Change Color!",
                      className: "btn-primary",
                      callback: function() {
                      var color =  support.get_random_color();
                      console.log(color);
                      makeRandomColorForPolygon(color);
                      }
                    }
                  }
                });
                return
         }
                                
            // double click on any connection 
            jsPlumb.unbind("dblclick");
            jsPlumb.bind("dblclick", function(connection, originalEvent) { 
                    dblClickEventFired = true;
                      originalEvent.stopPropagation();       
                      console.log("double click on connection from " + connection.sourceId + " to " + connection.targetId); 
                      var randomColor; 
                      behaviorOnClickOnConnections(
                          function makeRandomColorForPolygon(randomColor){ 
                              var i,j,k;
                              for (i = 0; i < polygons.length; i++) {
                                  for (j = 0; j < polygons[i].length; j++) {
                                     var currConnection =polygons[i][j]; 
                                     if (currConnection.sourceId == connection.sourceId ) {
                                         for(k=0; k <polygons[i].length; k++) {
                                              polygons[i][k]._jsPlumb.paintStyle.strokeStyle = randomColor;
                                              polygons[i][k].repaint();
                                         }                           
                                     }                         
                                  }
                              }
                          });    
            });
            jsPlumb.draggable(jsPlumb.getSelector(".window"), { containment:"parent"});    
            }); 

  }
  
  this.polygonIsFinished = function () {
     polygons.push(currPolygon);
     currPolygon = [];
  };
 
   
    
}
