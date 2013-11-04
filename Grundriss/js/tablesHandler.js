
function TablesHandler () {
      
  var tableCounter = 1;
  var support = new ProjectSupport();
  
  function createTable(options) {
      //erstelle table
     var el = document.createElement('div');
     el.id = "table"+ tableCounter;
     el.className = "ui-widget-content table";         
     if (options !== undefined ) {
         if(options.width !== undefined ) {
             el.style.width = options.width+"px";
         }
         if(options.height !== undefined ) {
             el.style.height = options.height+"px";
         }
        if(options.color !== undefined ) {
             el.style.backgroundColor = options.color;
         }
     }           

     $('#floor_plan').append(el);

    $('#' + el.id).css("position","absolute");
    $('#' + el.id).css("top", (($('#' + el.id).parent().height() - $('#' + el.id).outerHeight()) / 2) + $('#' + el.id).parent().scrollTop() + "px");
    $('#' + el.id).css("left", (($('#' + el.id).parent().width() - $('#' + el.id).outerWidth()) / 2) + $('#' + el.id).parent().scrollLeft() + "px");
     
     
     tableCounter++;
     //definiere Verhalten nach dem doppelten mouseclick auf table
     $('#' + el.id).dblclick(function(e) {
            e.stopPropagation();            
            behaviorOnClickOnTable(el.id);
     });
  }
  
  //Verhalten nach dem CLick auf addTable button
     $("#addTable").click(function() {
        createTable();
        refreshTableEventListener();
    });          
    
    function behaviorOnClickOnTable(tableID) {
        console.log("clicked on " + tableID);
        var currTable = $( '#' + tableID);
        bootbox.dialog({
          message: "Was willst du mit dem Tisch  " + tableID +" machen?",
          title: "Etwas mit dem Tisch machen...",
          buttons: {
            danger: {
              label: "Remove!",
              className: "btn-success",
              callback: function() {
                currTable.remove();
              }
            },
            success: {
              label: "Clone!",
              className: "btn-danger",
              callback: function() {
                  var currWidth = currTable.width();
                  var currHeight = currTable.height();
                  createTable({"width": currWidth, "height": currHeight, "color":currTable.css("background-color")}); 
                  refreshTableEventListener();
              }
            },
            main: {
              label: "Change Color!",
              className: "btn-primary",
              callback: function() {
              console.log( currTable);
              currTable.css("background-color", support.get_random_color());
              }
            }
          }
        });
    }
    
   function refreshTableEventListener() {
       console.log("refreshTableEventListener()");
          $( ".table" ).resizable({ 
              handles: 'n, e, s, w, ne, se, sw, nw ' ,
              containment: "parent",
              grid: [ 20,20 ],
              autoHide: true,
              ghost: true,
              start: function() {
                       console.log("start resize");
                       console.log($(this).attr('id')+" wil be resized");
                       console.log('width: ' + this.style.width);
                       console.log('height:  ' + this.style.height);
                },
              stop: function() {
                       console.log("stop resize");
                       var offset = $(this).offset();
                        console.log($(this).attr('id')+" resized");
                        console.log('width: ' + this.style.width);
                        console.log('height:  ' + this.style.height);
                }
              
           });
          $( '.table' ).draggable({
               /*drag: function(){
                       var offset = $(this).offset();
                       var xPos = offset.left;
                       var yPos = offset.top;
                       $('#posX').text('x: ' + xPos);
                       $('#posY').text('y: ' + yPos);
                       $('#current').text($(this).attr('name'));
               },*/
                containment: "parent" ,
                opacity: 0.35,
                grid: [ 20,20 ],
                stop: function() {
                       console.log("verschoben");
                       var offset = $(this).offset();
                       $('#current').text($(this).attr('id')+" dropped");
                       var tab = new Object;
                       tab.name = $(this).attr('id');
                       tab.x = offset.left;
                       tab.y = offset.top;
                       console.log('x: ' + tab.x);
                       console.log('y: ' + tab.y);
                }
          });
    }
    
}
