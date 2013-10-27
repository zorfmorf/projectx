
function TableHandler () {
      
  var tableCounter = 1;
  
  
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
     tableCounter++;
     //definiere Verhalten nach dem doppelten mouseclick auf table
     $('#' + el.id).dblclick(function(e) {            
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
              currTable.css("background-color", get_random_color());
              }
            }
          }
        });
    }
    
  function get_random_color() {
      function c() {
        return Math.floor(Math.random()*256).toString(16)
      }
  return "#"+c()+c()+c();
  }
    
   function refreshTableEventListener() {
       console.log("refreshTableEventListener()");
          $( ".table" ).resizable({ 
              handles: 'n, e, s, w, ne, se, sw, nw ' ,
              grid: [ 20,20 ],
              autoHide: true,
              ghost: true,
                            start: function() {
                      var offset = $(this).offset();
                       $('#current').text($(this).attr('id')+" wil be resized");
                       $('#posX').text('width: ' + this.style.width);
                       $('#posY').text('hight:  ' + this.style.height);
                },
              stop: function() {
                       var offset = $(this).offset();
                       $('#current').text($(this).attr('id')+" resized");
                       $('#posX').text('width: ' + this.style.width);
                       $('#posY').text('hight:  ' + this.style.height);
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
                grid: [ 20,20 ],
                stop: function() {
                       var offset = $(this).offset();
                       $('#current').text($(this).attr('id')+" dropped");
                       var tab = new Object;
                       tab.name = $(this).attr('id');
                       tab.x = offset.left;
                       tab.y = offset.top;
                       $('#posX').text('x: ' + tab.x);
                       $('#posY').text('y: ' + tab.y);
                }
          });
    }
    
}
