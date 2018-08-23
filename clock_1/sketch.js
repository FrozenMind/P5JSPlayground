var w, h
var date
var hour_radius, min_radius,sec_radius
var date_format = "iso"
var stroke_weight

function setup() {
  w = $(document).width()
  h = $(document).height()  
  console.log({w, h})
  createCanvas(w, h)
  // translate clock size to window
  var smaller_size
  w < h ? smaller_size = w : smaller_size = h
  hour_radius = smaller_size * 0.22
  min_radius = smaller_size * 0.30
  sec_radius =  smaller_size * 0.38
  stroke_weight = smaller_size * 0.05
  background(255)
  textSize(smaller_size * 0.05)
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
}

function draw() {
  translate(width / 2, height / 2);
  background(255)
  frameRate(1)  
  date = getDate()  
  noFill()
  strokeWeight(stroke_weight)
  // arc moves from 0 to 360, thanks to rad() function
  // hour
  stroke("#ff0000")
  arc(0, 0, hour_radius*2, hour_radius*2, numToRad(0), numToRad(date.hour_per))
  // minute
  stroke("#00ff00")
  arc(0, 0, min_radius*2, min_radius*2, numToRad(0), numToRad(date.min_per))
  // second
  stroke("#0000ff")
  arc(0, 0, sec_radius*2, sec_radius*2, numToRad(0), numToRad(date.sec_per))
  // date  
  noStroke()
  fill(0)
  text(date[date_format], 0, 0)
  // time (each time val is a text & an ellipse with a bit brighter color than the time circle)
  // hour
  var h_x = Math.cos(2 * PI * date.hour_per - HALF_PI) * hour_radius
  var h_y = Math.sin(2 * PI * date.hour_per - HALF_PI) * hour_radius
  fill("#ff6666")
  ellipse(h_x, h_y, stroke_weight * 1.5, stroke_weight * 1.5)
  fill(0)
  text(date.hour, h_x, h_y)
  // min
  var m_x = Math.cos(2 * PI * date.min_per - HALF_PI) * min_radius
  var m_y = Math.sin(2 * PI * date.min_per - HALF_PI) * min_radius
  fill("#66ff66")
  ellipse(m_x, m_y, stroke_weight * 1.5, stroke_weight * 1.5)
  fill(0)
  text(date.min, m_x, m_y)
  // sec
  var s_x = Math.cos(2 * PI * date.sec_per - HALF_PI) * sec_radius
  var s_y = Math.sin(2 * PI * date.sec_per - HALF_PI) * sec_radius
  fill("#6666ff")
  ellipse(s_x, s_y, stroke_weight * 1.5, stroke_weight * 1.5)
  fill(0)
  text(date.sec, s_x, s_y)
}


function getDate() {
  var d = new Date()
  var obj = {}  
  // time
  obj.hour = d.getHours()
  obj.min = d.getMinutes()
  obj.sec = d.getSeconds()
  // per elements, are the percentage values
  obj.hour_per = d.getHours() / 24
  obj.min_per = d.getMinutes() / 60
  obj.sec_per = d.getSeconds() / 60
  // date
  obj.day = d.getDate()  
  if (obj.day < 10) obj.day = "0" + obj.day
  obj.month = d.getMonth() + 1
  if (obj.month < 10) obj.month = "0" + obj.month
  obj.year = d.getFullYear()
  obj.de = obj.day + "." + obj.month + "." + obj.year
  obj.iso = obj.year + "-"  + obj.month + "-" + obj.day

  return obj
}


// convert number (0 - 1) to degree
function numToRad(dec) {
  var deg = 360 * dec
  // -90, so the translation for arc is better
  return (deg - 90) * (PI / 180)
}

// degrees to radiant
function degToRad(deg) {
  return deg * (PI / 180)
}

function mousePressed(){
  if (date_format == "iso")
    date_format = "de"
  else
    date_format = "iso"
}
