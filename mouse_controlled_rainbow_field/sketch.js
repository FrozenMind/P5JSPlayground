var points = []
const point_gap = 10
const point_size = 10
const total_colors = 768 // 256 * 3
const mouse_radius = 80
const fade_out_speed = 20
const fade_in_speed = 2
const fade_out_color_step = 10
var point_count
var mouse = {x: -100, y: -100}


function setup() {
  createCanvas(600, 600)

  var color = {r: 255, g: 0, b: 0, mode: 1}
  r_up = true
  g_up = false
  b_up = false
  // create points
  point_count = (width / point_gap) * (height / point_gap)
  var color_step = total_colors / point_count
  for (var x = 0; x <= width; x += point_gap){
    for (var y = 0; y <= height; y += point_gap){
      color = stepColor(color, color_step)
      points.push({base_x: x, base_y: y, x: x, y: y, color: JSON.parse(JSON.stringify(color))})
    }
  }  
}

function draw() {  
  background(0)
  strokeWeight(point_size)
  for (var i = 0; i < points.length; i++) {
    var p = points[i]
    if (mouse.x <= width && mouse.y <= height && pointDistance(p, mouse) < mouse_radius) {
      // fade out
      if (p.x > mouse.x) {
        p.x += fade_out_speed
      } else {
        p.x -= fade_out_speed
      }
      if (p.y > mouse.y) {
        p.y += fade_out_speed
      } else {
        p.y -= fade_out_speed
      }
      p.color = JSON.parse(JSON.stringify(stepColor(p.color, fade_out_color_step)))
    } else {      
      // fade back in
      // remove flimmering
      if (Math.abs(p.x - p.base_x) < 1) p.x = p.base_x
      if (Math.abs(p.y - p.base_y) < 1) p.y = p.base_y
      // calc x & y distance, for smoother fade
      var dx = Math.abs(p.x - p.base_x)
      var dy = Math.abs(p.y - p.base_y)
      var dt = dx + dy
      if(p.base_x != p.x) {        
        if (p.x > p.base_x) {
          p.x -= fade_in_speed * (dx / dt)
        } else {
          p.x += fade_in_speed * (dx / dt)
        }    
      }
      if(p.base_y != p.y){
        if (p.y > p.base_y) {
          p.y -= fade_in_speed * (dy / dt)
        } else {
          p.y += fade_in_speed * (dy / dt)
        }    
      }
    }
    stroke(p.color.r, p.color.g, p.color.b)
    rect(p.x, p.y, point_size, point_size)
  }    
}

function mouseMoved() {
  // only if mouse is inside of canvas
  mouse.x = mouseX
  mouse.y = mouseY
}

function stepColor(color, step) {  
  // switch mode
  if (color.r < 0 && color.mode != 2){
    color.r = 0
    color.mode = 2
  } else if (color.g < 0 && color.mode != 3){
    color.g = 0
    color.mode = 3
  } else if (color.b < 0 && color.mode != 1){
    color.b = 0
    color.mode = 1
  }
  switch (color.mode){    
    case 1: // red -> green
      color.r -= step
      color.g += step
      break
    case 2: // green -> blue
      color.g -= step
      color.b += step
      break
    case 3: // blue -> red
      color.b -= step
      color.r += step
      break
  }  
  return color
}

function pointDistance(a, b){
  var x = a.x - b.x
  var y = a.y - b.y
  return Math.sqrt(x * x + y * y)
}
