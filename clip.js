shape_array = {
  "circle" : [{
      name : "Circle",
      radius : 50,
      position : [50,50],
      coords : [[100,50],[50,50]]
  }],
  "ellipse" : [{
      name : "Ellipse",
      radius : [25,40],
      position : [50,50],
      coords : [[50,50],[0,50],[0,50]]
  }],
  "polygon" : [
    {
      name : "Triangle",
      coords : [[50,0],[0,100],[100,100]]
    },
    {
      name : "Trapezoid",
      coords : [[20,0],[80,0],[100,100],[0,100]]
    },
    {
      name : "Rhombus",
      coords : [[50,0],[100,50],[50,100],[0,50]]
    },
    {
      name : "Parallelogram",
      coords : [[0,25],[100,0],[100,75],[0,100]]
    },
    {
      name : "Pentagon",
      coords : [[50,0],[100,33],[83.5,100],[16.5,100],[0,33]]
    },
    {
      name : "Hexagon",
      coords : [[50,0],[100,25],[100,75],[50,100],[0,75],[0,25]]
    },
    {
      name : "Heptagon",
      coords : [[50,0],[90,20],[100,60],[75,100],[25,100],[0,60],[10,20]]
    },
    {
      name : "Octagon",
      coords : [[30, 0],[70,0],[100,30],[100,70],[70,100],[30,100],[0,70],[0,30]]
    },
    {
      name : "Nonagon",
      coords : [[50,0],[83,12],[100,43],[94,78],[68,100],[32,100],[6,78],[0,43],[17,12]]
    },
    {
      name : "Decagon",
      coords : [[50,0],[80,10],[100,35],[100,70],[80,90],[50,100],[20,90],[0,65],[0,35],[20,10]]
    },
    {
      name : "Bevel",
      coords : [[20,0],[80,0],[100,20],[100,80],[80,100],[20,100],[0,80],[0,20]]
    },
    {
      name : "Rabbet",
      coords : [[0,15],[15,15],[15,0],[85,0],[85,15],[100,15],[100,85],[85,85],[85,100],[15,100],[15,85],[0,85]]
    },
    {
      name : "Left arrow",
      coords : [[40,0],[40,20],[100,20],[100,80],[40,80],[40,100],[0,50]]
    },
    {
      name : "Right arrow",
      coords : [[0,20],[60,20],[60,0],[100,50],[60,100],[60,80],[0,80]]
    },
    {
      name : "Left Point",
      coords : [[25,0],[100,1],[100,100],[25,100],[0,50]]
    },
    {
      name : "Right Point",
      coords : [[0,0],[75,0],[100,50],[75,100],[0,100]]
    },
    {
      name : "Left Chevron",
      coords : [[100,0],[75,50],[100,100],[25,100],[0,50],[25,0]]
    },
    {
      name : "Right Chevron",
      coords : [[75,0],[100,50],[75,100],[0,100],[25,50],[0,0]]
    },
    {
      name : "Star",
      coords : [[50,0],[82,100],[0,38],[100,38],[18,100]]
    },
    {
      name : "Cross",
      coords : [[10,25],[35,25],[35,0],[65,0],[65,25],[90,25],[90,50],[65,50],[65,100],[35,100],[35,50],[10,50]]
    }
  ],
  "inset" : [
    {
      name : "Inset",
      coords : [5,20,15,10]
    }
  ]
};


$html = $("html");
$body = $("body");
$box = $("#box");
$clipboard = $(".clipboard");
$handles = $(".handles");
$shapes = $(".shapes ul");
$functions = $(".functions");
  $clip_path = $(".clip-path");
  $unprefixed = $(".unprefixed");

$demo_width = $("#demo_width");
$demo_height = $("#demo_height");

$demo = $(".demo");

var start = shape_array.ellipse[0];
    start_type = "ellipse",
    start_coords = start.coords,
    start_name = start.name,

    width = 280,
    height = 280,
    grid = [0,0];


$(function(){

  sizes();
  init();

  // Reevaluates max width/height on window resize
  $(window).resize(sizes);

  // Switch grid size
  $('input[type="radio"]').change(function(){
      var grid_x = $('input[name="grid"]:checked').val()*(width/100);
      var grid_y = $('input[name="grid"]:checked').val()*(height/100);

      grid = [grid_x, grid_y];

    setupDemo(start_coords);
  });


  // Add/remove prefixes
  // Classes determine if code block is displayed
  $('input[type="checkbox"]').change(function(){
    if($("#ms").is(':checked')) {
      $(".ms").addClass("show");
    } else {
      $(".ms").removeClass("show");
    }

    if($("#webkit").is(':checked')) {
      $(".webkit").addClass("show");
    } else {
      $(".webkit").removeClass("show");
    }
  });

  // Resize width/height of the demo
  $('input[type="number"]').change(function(){

    width = $demo_width.val();
      // max width is the width of the window
      // This needs to be fixed for larger than mobile devices when making website responsive
      var max_width = $(window).width() - 20;
      var min_width = 50;

      if(width > max_width) { width = max_width; }
      if(width < min_width) { width = min_width; }

      $demo_width.val(width);

    height = $demo_height.val();
      // max height fills the page with just the header and demo
      var max_height = $(window).height() - $("header").outerHeight() - 36;
      var min_height = 50;

      if(height > max_height) { height = max_height; }
      if(height < min_height) { height = min_height; }

      $demo_height.val(height);



      sizes();

      // Scroll to the top after changing
      $(window).scrollTop(0);

      setupDemo(start_coords);
  });

  // Change clipboard background image
  $(".backgrounds img").mousedown(function(){
    var url = $(this).attr("src");

    $(this).addClass("selected");
    setTimeout(function(){
      $(".backgrounds img").removeClass("selected");
    }, 400);

    setCustomBackground(url);
  });

  // Change clipboard background to custom url
  $("#custom_url").blur(function(){
    var url = $(this).val();

    if(url !== '') { setCustomBackground(url); }
  });

});

function setCustomBackground(url) {
  var style = '.clipboard { background-image: url(' + url + '); }';

  $("#custom_background").html(style);

  // Scroll to top of page
  $(window).scrollTop(0);
}


function init() {
  console.log("init();");

  type = start_type;

  // Setup circles
  $.each(shape_array.circle, function(i, shape){
    type = "circle";

    var radius = shape.radius + "%";
    var x_pos = shape.position[0] + "%";
    var y_pos = shape.position[1] + "%";

    var clip_path = 'circle(' + radius + ' at ' + x_pos + ' ' + y_pos + ')';

    appendFigure(clip_path, shape);
  });

  // Setup ellipses
  $.each(shape_array.ellipse, function(i, shape){
    type = "ellipse";

    var radius_x = shape.radius[0] + "%";
    var radius_y = shape.radius[1] + "%";
    var x_pos = shape.position[0] + "%";
    var y_pos = shape.position[1] + "%";

    var clip_path = 'ellipse(' + radius_x + ' ' + radius_y + ' at ' + x_pos + ' ' + y_pos + ')';

    appendFigure(clip_path, shape);
  });

  // Setup polygons
  $.each(shape_array.polygon, function(i, shape){
    paths = '';

    $.each(shape.coords, function(i, coord){
      type = "polygon";

      var x = coord[0] + "%";
      var y = coord[1] + "%";

      var path = 'clip-path: polygon()';
      var coord = '';

      if(i == shape.coords.length - 1) {

        // last coordinate to add, omits a comma at the end
        paths += x + ' ' + y;

        var clip_path = 'polygon(' + paths + ')';

        appendFigure(clip_path, shape);

      } else {
        // loops through each coordinate and adds it to a list to add
        paths += x + ' ' + y + ', ';
      }
    });
  });

  // Setup insets
  $.each(shape_array.inset, function(i, shape){
    type = "inset";

    var top = shape.coords[0] + "%";
    var right = shape.coords[1] + "%";
    var bottom = shape.coords[2] + "%";
    var left = shape.coords[3] + "%";

    var clip_path = 'inset(' + top + ' ' + right + ' ' + bottom + ' ' + left + ')';

    appendFigure(clip_path, shape);
  });

  type = start_type;

  setupDemo(start_coords);
}



function appendFigure(clip_path, shape) {
  // Add all the buttons to the .shapes container
  // considering using some other element other than figure for buttons to be more semantic...

  console.log("appendFigure();");

  if(type == "circle") {
    var fig = '<figure data-name="Circle" data-type="circle" class="panel">'
              + '<div style="-ms-clip-path: ' + clip_path + '; -webkit-clip-path: ' + clip_path + '; clip-path: ' + clip_path + '" class="shape ' + shape.name + '"></div>'
              + '<figcaption>' + shape.name + '</figcaption>'
            + '</figure>';
  }

  if(type == "ellipse") {
    var fig = '<figure data-name="Ellipse" data-type="ellipse" class="panel">'
              + '<div style="-ms-clip-path: ' + clip_path + '; -webkit-clip-path: ' + clip_path + '; clip-path: ' + clip_path + '" class="shape ' + shape.name + '"></div>'
              + '<figcaption>' + shape.name + '</figcaption>'
            + '</figure>';
  }

  if(type == "polygon") {
    var fig = '<figure data-name="' + shape.name + '" data-type="polygon" class="panel" data-coords="' + shape.coords.join(" ") + '">'
              + '<div style="-ms-clip-path: ' + clip_path + '; -webkit-clip-path: ' + clip_path + '; clip-path: ' + clip_path + '" class="shape ' + shape.name + '"></div>'
              + '<figcaption>' + shape.name + '</figcaption>'
            + '</figure>';
  }

  if(type == "inset") {
    var fig = '<figure data-name="' + shape.name + '" data-type="inset" class="panel" data-coords="' + shape.coords.join(" ") + '">'
              + '<div style="-ms-clip-path: ' + clip_path + '; -webkit-clip-path: ' + clip_path + '; clip-path: ' + clip_path + '" class="shape ' + shape.name + '"></div>'
              + '<figcaption>' + shape.name + '</figcaption>'
            + '</figure>';
  }

  $shapes.append(fig);

  // listen for clicks on the figure buttons
  $("figure").unbind().click(function(){
    $("figure").removeClass("on");
    $(this).addClass("on");

    type = $(this).attr("data-type");

    if(type == "circle") {
      var shape = shape_array.circle[0];

      setupDemo(shape.coords);
    }

    if(type == "ellipse") {
      var shape = shape_array.ellipse[0];

      setupDemo(shape.coords);
    }

    if(type == "polygon") {
      new_shape = [];

      // Coords at stored with data-coords attribute and turned into array
      var coords = $(this).attr("data-coords").split(" ");

      var coords = $.each(coords, function(i, coordinate){
        var coordinate = coordinate.split(",");
        new_shape.push(coordinate);

        if(i == coords.length - 1) {
          start_coords = new_shape;
          setupDemo(start_coords);
        }
      });
    }

    if(type == "inset") {
      var shape = shape_array.inset[0];
          start_coords = shape.coords;

      setupDemo(shape.coords);
    }
  });
}


function setupDemo(coords) {
  console.log("setupDemo();");

  clearDemo();

  // Run through each coordinate
  $.each(coords, function(i, coord){
    var x = coord[0];
    var y = coord[1];

    // Add unit to % coordinates
    var code_x = x + "%";
    var code_y = y + "%";

    // Convert % to px coordinates
    var x_px = Math.round((x/100) * width);
    var y_px = Math.round((y/100) * height);

    // Setup Circle demo
    if(type == "circle") {

      // Grab preset values
      var shape = shape_array.circle[0];
      var radius = shape.radius; // For 1:1 ratio

      // Adjust radius handle to edge of circle if ratio is not 1:1
      if(width !== height) {
        var radius_x_px = width * getRadiusModifier();
      } else {
        var radius_x_px = width;
      }

      // Setup radius handle
      if(i == 0) { $handles.append('<div class="radius handle" data-handle="' + i + '" style="top: ' + y_px + 'px; left: ' + radius_x_px + 'px;"></div>') }

      // Setup center position handle
      if(i == 1) { $handles.append('<div class="position handle" data-handle="' + i + '" style="top: ' + y_px + 'px; left: ' + x_px + 'px;"></div>') }

      var position_x = shape.position[0];
      var position_y = shape.position[1];

      // Add % units to preset values
      var radius = radius + "%";
      var position_x = position_x + "%";
      var position_y = position_y + "%";

      if(i == coords.length - 1) {

        var radius = '<code class="point radius" data-point="0">' + radius + '</code>';
        var position = '<code class="point position" data-point="1">' + position_x + ' ' + position_y + '</code>';

        var clip_path_function = 'circle(' + radius + ' at ' + position + ')';
        $functions.append(clip_path_function);

        clipIt();
        readyDrag();
      }
    }

    // Setup ellipse demo
    if(type == "ellipse") {

      // Grab preset values
      var shape = shape_array.ellipse[0];
      var position = shape.position;
        var position_x_px = (position[0]/100) * width;
        var position_y_px = (position[1]/100) * height;

      var radius = shape.radius;
        var radius_x_px = (1 - radius[0]/100) * width;
        var radius_y_px = (radius[1]/2/100) * height/2;

      // Setup ellipse radius handles
      if(i == 0) { $handles.append('<div class="radius_x handle" data-handle="' + i + '" style="top: ' + y_px + 'px; left: ' + radius_x_px + 'px;"></div>') }
      if(i == 1) { $handles.append('<div class="radius_y handle" data-handle="' + i + '" style="top: ' + radius_y_px + 'px; left: ' + position_x_px + 'px;"></div>') }

      // Setup center position handle
      if(i == 2) { $handles.append('<div class="position handle" data-handle="' + i + '" style="top: ' + position_y_px + 'px; left: ' + position_x_px + 'px;"></div>') }

      // Add % units to preset values
      var radius_x = radius[0] + "%";
      var radius_y = radius[1] + "%";
      var position_x = shape.position[0] + "%";
      var position_y = shape.position[1] + "%";

      if(i == coords.length - 1) {
        var radius_x = '<code class="point radius" data-point="0">' + radius_x + '</code>';
        var radius_y = '<code class="point radius" data-point="1">' + radius_y + '</code>';
        var position = '<code class="point position" data-point="2">' + position_x + ' ' + position_y + '</code>';

        var clip_path_function = 'ellipse(' + radius_x + ' ' + radius_y + ' at ' + position + ')';
        $functions.append(clip_path_function);

        clipIt();
        readyDrag();
      }
    }

    if(type == "polygon") {
      $handles.append('<div class="handle" data-handle="' + i + '" style="top: ' + y_px + 'px; left: ' + x_px + 'px;"></div>')

      if(i == coords.length - 1) {
        $functions.append('<code class="point" data-point="' + i + '">' + code_x + ' ' + code_y + '</code>')
        $functions.prepend("polygon(").append(")");

        clipIt();
        readyDrag();
      } else {
        $functions.append('<code class="point" data-point="' + i + '">' + code_x + ' ' + code_y + '</code>, ');
      }
    }

    if(type == "inset") {

      if(i == coords.length - 1) {

        $handles.append('<div class="handle top horizontal bar" data-handle="0"></div>');
        $handles.append('<div class="handle right vertical bar" data-handle="1"></div>');
        $handles.append('<div class="handle bottom horizontal bar" data-handle="2"></div>');
        $handles.append('<div class="handle left vertical bar" data-handle="3"></div>');

        $unprefixed.attr("data-coords", coords[0] + ' ' + coords[1] + ' ' + coords[2] + ' ' + coords[3]);

        setHandleBars();

        var top_point = '<code class="point" data-point="0">' + coords[0] + '%</code> ';
        var right_point = '<code class="point" data-point="1">' + coords[1] + '%</code> ';
        var bottom_point = '<code class="point" data-point="2">' + coords[2] + '%</code> ';
        var left_point = '<code class="point" data-point="3">' + coords[3] + '%</code>';

        var clip_path_function = 'inset(' + top_point + right_point + bottom_point + left_point + ')';
        $functions.append(clip_path_function);

        clipIt();
        readyDrag();
      }
    }
  });
}


function getRadiusModifier() {
  // For putting radius handler on edge of circle
  // Formula for percentage radius is sqrt(width^2 + height^2) / sqrt(2);
  // Returns a decimal value from 0 to 1

  var radius_modifier = (width/2 + (Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(2))/2) / width;

  return radius_modifier;
}


// Set side handles for inset shape
function setHandleBars(bar) {
  var coords = $unprefixed.attr("data-coords").split(" ");

  var top = coords[0];
  var right = coords[1];
  var bottom = coords[2];
  var left = coords[3];

  var top_px = Math.round((top/100) * height);
  var right_px = Math.round((1 - (right/100)) * width);
  var bottom_px = Math.round((1 - (bottom/100)) * height);
  var left_px = Math.round((left/100) * width);

  var padding = 20;

  var bar_width = right_px - left_px - padding * 2;
  var bar_height = bottom_px - top_px - padding * 2;

  var x_center = (right_px + left_px)/2;
  var y_center = (top_px + bottom_px)/2;

  if(bar !== "top") {
    $(".top.bar").css("top", top_px).css("left", x_center);
  }
  if(bar !== "right") {
    $(".right.bar").css("top", y_center).css("left", right_px);
  }
  if(bar !== "bottom") {
    $(".bottom.bar").css("top", bottom_px).css("left", x_center);
  }
  if(bar !== "left") {
    $(".left.bar").css("top", y_center).css("left", left_px);
  }
}



function readyDrag() {
  // Utilizes the awesome draggabilly.js by Dave Desandro
  // Works real well on touch devices

  console.log("readyDrag();");

  var box = document.querySelector("#box");
  var handles = box.querySelectorAll(".handle");
  var $functions = $(".functions");

  // If we have a circle, ellipse, or polygon setup draggibilly normally
  if(type == "circle" || type == "polygon") {

    // We have already appended handles, now we will attach draggabilly to each of them
    for ( var i = 0, len = handles.length; i < len; i++ ) {
      var handle = handles[i];

      new Draggabilly(handle, {
        containment: true,
        grid: grid
      }).on("dragStart", function(instance, e, pointer) {

        i = instance.element.dataset.handle;

        // .changing triggers the bubble burst animation
        $point = $('[data-point="' + i + '"]');
        $point.addClass("changing");

        // If we are changing a circle we are working differently than with polygon
        if(type == "circle") {

          special = instance.element.classList[0];
          modifier = getRadiusModifier();

          $position = $(".position.handle");
            position_pos_x = $position.position().left;
            position_pos_y = $position.position().top;

          $radius = $(".radius.handle");
            radius_pos_x = $radius.position().left;
            radius_pos_y = $radius.position().top;

            var max = Math.max(width, height);
            var min = Math.min(width, height);
                max = Math.max(width, height);

            startRadius = getRadius(radius_pos_x, position_pos_x, radius_pos_y, position_pos_y) /100;
        }

      }).on("dragMove", function(instance, e, pointer) {

        // Returns current position of the dragging handle
        var x = instance.position.x;
        var y = instance.position.y;

        if(type == "circle") {

          // Dragging the center position handle
          if(special == "position") {

            // calculate distance from center center of demo

            var x_delta = width/2 - x;
            var y_delta = height/2 - y;

            var max = Math.max(width, height);

            // Calculate the bestest position on the edge of the circle for the radius handle
            // I don't know how the heck this works but it does,
            // Should've spent more time studying in high school...
            var angle = Math.atan2(y_delta, x_delta);

            var handle_x = (Math.cos(angle) * startRadius * max) + x;
              if(handle_x < 0) { var handle_x = 0; }
              if(handle_x > width) { var handle_x = width; }

            var handle_y = (Math.sin(angle) * startRadius * max) + y;
              if(handle_y < 0) { var handle_y = 0; }
              if(handle_y > height) { var handle_y = height; }

            var radius_position = 'left:' + handle_x + 'px; top:' + handle_y + 'px';

            $radius.attr("style", radius_position);

            setPoint(x, y);
          }

          // Dragging the radius handle on the edge of the circle
          if(special == "radius") {

            // Calculate the new radius
            var radius = getRadius(x, position_pos_x, y, position_pos_y);

            //
            //
            // BUGGY!
            //
            // This is messed up if ratio is not 1:1
            var radius = radius + '%';

            $point.text(radius);
          }
        }

        // Dragging a polygon handle, easy...
        if(type == "polygon") {
          setPoint(x, y);
        }

        clipIt();

      }).on("dragEnd", function(instance) {

        // Remove all the bubble animations
        $(".point").removeClass("changing");

      });

    }
  }

  // Drag ellipse radius handles in only x or y direction
  if(type == "ellipse") {

    // We have already appended handles, now we will attach draggabilly to each of them
    for ( var i = 0, len = handles.length; i < len; i++ ) {
      var handle = handles[i];

      // Restrict dragging if necessary
      // bar == "radius_x", "radius_y", "position"
      var bar = handle.classList[0];
      if(bar == "radius_x") { var axis = "x"; }
      if(bar == "radius_y") { var axis = "y"; }
      if(bar == "position") { var axis = ""; }

      var draggie = new Draggabilly(handle, {

        containment: true,
        grid: grid,
        axis: axis

      }).on("dragStart", function(instance, e, pointer) {

        i = instance.element.dataset.handle;
        bar = instance.element.classList[0];

        // .changing triggers the bubble burst animation
        $point = $('[data-point="' + i + '"]');
        $point.addClass("changing");

        $position = $(".position");
        $radius_x = $(".radius_x");
        $radius_y = $(".radius_y");

        start_x_px = instance.position.x;
        start_y_px = instance.position.y;

        start_pos_x = $position.position().left;
        start_pos_y = $position.position().top;

        if(bar == "position") {
          start_radius_x_px = [$radius_x.position().left, $radius_x.position().top];
          start_radius_y_px = [$radius_y.position().left, $radius_y.position().top];

        }


      }).on("dragMove", function(instance, e, pointer) {

        // Handle position
        var x = instance.position.x;
        var y = instance.position.y;

        // snap to edges
        var snap = 1;

        if(bar == "radius_x") {
          // Set % from center center position as absolute number
          var x_pct = Math.floor(Math.abs(start_pos_x - x) / width*100) + "%";

          $point.text(x_pct);
        }
        if(bar == "radius_y") {
          // Set % from center center position as absolute number
          var y_pct = Math.floor(Math.abs(start_pos_y - y) / height*100) + "%";

          $point.text(y_pct );
        }

        if(bar == "position") {
          var move_x = start_x_px - x;
          var move_y = start_y_px - y;

          // Set new positions of radius handles
          var move_radius_x_x_px = (start_radius_x_px[0] - move_x);
          var move_radius_x_y_px = (start_radius_x_px[1] - move_y);
          var move_radius_y_x_px = (start_radius_y_px[0] - move_x);
          var move_radius_y_y_px = (start_radius_y_px[1] - move_y);

          // Prevent handle overflow
          if(move_radius_x_x_px < 0) { var move_radius_x_x_px = 0; }
          if(move_radius_x_x_px > width) { var move_radius_x_x_px = width; }

          if(move_radius_y_y_px < 0) { var move_radius_y_y_px = 0; }
          if(move_radius_y_y_px > height) { var move_radius_y_y_px = height; }


          // Move the handles
          $radius_x.css({
            "left" : move_radius_x_x_px + "px",
            "top" : move_radius_x_y_px + "px"
          });
          $radius_y.css({
            "left" : move_radius_y_x_px + "px",
            "top" : move_radius_y_y_px + "px"
          });

          // Set position of position handle
          var x_pct = Math.floor(x / width*100) + "%";
          var y_pct = Math.floor(y / height*100) + "%";

          $point.text(x_pct + ' ' + y_pct);
        }

        clipIt();

      }).on("dragEnd", function(instance, e, pointer) {

        // Remove all the bubble animations
        $(".point").removeClass("changing");

      });
    }
  }

  // We need to use a different draggabilly setup to drag size elements in only x or only y direction
  if(type == "inset") {

    // We have already appended handles, now we will attach draggabilly to each of them
    for ( var i = 0, len = handles.length; i < len; i++ ) {
      var handle = handles[i];

      // bar == "top", "right", "bottom", or "left"
      var bar = handle.classList[1];

      if(bar == "left" || bar == "right") { axis = "x"; }
      if(bar == "top" || bar == "bottom") { axis = "y"; }

      var draggie = new Draggabilly(handle, {
        containment: true,
        grid: grid,
        axis: axis
      }).on("dragStart", function(instance, e, pointer) {

        i = instance.element.dataset.handle;
        bar = instance.element.classList[1];

        // We have to do this again for some reason, look to remove in the future
        if(bar == "left" || bar == "right") { axis = "x"; }
        if(bar == "top" || bar == "bottom") { axis = "y"; }

        // .changing triggers the bubble burst animation
        $point = $('[data-point="' + i + '"]');
        $point.addClass("changing");

      }).on("dragMove", function(instance, e, pointer) {

        // Handle position
        var x = instance.position.x;
        var y = instance.position.y;

        // snap to edges
        var snap = 1;

        var x = (x/width * 100).toFixed(0);
          if(x < snap) { var x = 0; }
          if(x > (100 - snap)) { var x = 100; }
        var y = (y/height * 100).toFixed(0);
          if(y < snap) { var y = 0; }
          if(y > (100 - snap)) { var y = 100; }

        // inset() uses absolute numbers from edges
        if(bar == "right") { var x = Math.abs(100 - x); }
        if(bar == "bottom") { var y = Math.abs(100 - y); }

        // Hacky way to get and store the current coordinates displayed in CSS
        var coords = $unprefixed.text().match(/inset(.*?)\)/g).toString();
        var coords = coords.replace("inset(", "").replace(")","").replace(/%/g, "");
        $unprefixed.attr("data-coords", coords);

        /*
        // Use only two or one shape argument if possible
        var coords = coords.split(" ");
        if(coords[0] == coords[2] && coords[1] == coords[3]) {
          $clip_path.addClass("two-match");
        } else {
          $clip_path.removeClass("two-match");
        }
        if(coords[0] == coords[1] == coords[2] == coords[3]) {
          $clip_path.addClass("four-match");
        } else {
          $clip_path.removeClass("four-match");
        }
        */

        // Add % if number is not zero
        if(x !== 0) { var x = x + "%"; }
        if(y !== 0) { var y = y + "%"; }

        if(axis == "x") { $point.text(x); }
        if(axis == "y") { $point.text(y); }

        setHandleBars(bar);

        clipIt();

      }).on("dragEnd", function(instance, e, pointer) {

        // Remove all the bubble animations
        $(".point").removeClass("changing");

      });
    }
  }
}


function getRadius(x2, x, y2, y) {
  // More fun geometry from high school

  var distance = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
  var radius = ((distance/width) * 100).toFixed(1);

  return radius;
}


function setPoint(x, y) {
  // Changes the coordinates of a single point in the code block

  // Snap to the edges of demo
  // Consider using something like this instead of draggabilly's built-in grid[]
  var snap = 1;

  var x = (x/width * 100).toFixed(0);
    if(x < snap) { var x = 0; }
    if(x > (100 - snap)) { var x = 100; }
  var y = (y/height * 100).toFixed(0);
    if(y < snap) { var y = 0; }
    if(y > (100 - snap)) { var y = 100; }

  // Add % if number is not zero
  if(x !== 0) { var x = x + "%"; }
  if(y !== 0) { var y = y + "%"; }

  /*
  //Use keywords if possible
  if(type == "circle") {
    if(y == 0) { var y = "top"; }
    if(y == "50%") { var y = "center"; }
    if(y == "100%") { var y = "bottom"; }

    if(x == 0) { var x = "left"; }
    if(x == "50%") { var x = "center"; }
    if(x == "100%") { var x = "right"; }
  }
  */

  $point.text(x + ' ' + y);
}

// Reset the demo
function clearDemo() {
  console.log("clearDemo();");

  $handles.empty();
  $functions.empty();
}


// Get the code in the code blocks and set the style inline on the clipboard
function clipIt() {
  var clip_path = $clip_path.text();

  $clipboard.attr('style', clip_path);
}

// Resize the demo box
function sizes() {
  console.log("sizes();");

  // Adjust for 10px padding on each side because of the handles
  var adjusted_width = parseInt(width) + 20;
  var adjusted_height = parseInt(height) + 20;

  $demo_width.val(width);
  $demo_height.val(height);

  $box.css({
    "width" : adjusted_width,
    "height" : adjusted_height
  });
}