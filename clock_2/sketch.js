let elems = []
let x, y
let jump
let rate
let size
let lastMovedMinute

function setup() {
	createCanvas($(document).width(), $(document).height())
	x = width / 2
	y = height / 2
	size = height / 5
	jump = size / 2
	lastMovedMinute = (new Date()).getMinutes() - 1

	noStroke()
	textAlign(CENTER)  
	textSize(size)
	textStyle(BOLD)
	textFont("Courier New")	
	frameRate(30)
	
	elems.push(new Element("h1", x, -size*1.75, y))
	elems.push(new Element("h2", x, -size*1.25, y))
	elems.push(new Element("d1", x, -size*0.75, y))
	elems.push(new Element("m1", x, -size*0.25, y))
	elems.push(new Element("m2", x, size*0.25, y))
	elems.push(new Element("d2", x, size*0.75, y))
	elems.push(new Element("s1", x, size*1.25, y))
	elems.push(new Element("s2", x, size*1.75, y))
}

function draw() {
	background(0)
	fill(200)
	
	// get current date object
	let d = getDate()
	
	// move whole clock each minute, but dont render on min 59
	if (d.sec == 59) {		
		if (lastMovedMinute == d.min) return
		lastMovedMinute = d.min
		// calc new position, so clock is completely in canvas
		let newX = random(size*2, width -size*2)
		let newY = random(size, height - size)
		for (e of elems) {
			e.move(newX, newY)
		}		
		// flash screen green one frame
		background(100, 255, 100, 100)
		return
	}	

	// calc flimmering rate base on second, so it gets stronger to the end of one minute
	rate = (parseInt(d.sec) + 1) / 1000	
	// apply random offset to each element of clock
	for (e of elems) {
		if (random(1) < rate) {
			fill(100, 255, 100, 100)
			e.applyOffset(random(-jump, jump), random(-jump, jump))
		} else {
			fill(200, 200, 200)
		}
		e.setText(d[e.id])
		e.render()			
	}
	
}

function getDate() {
	let d = new Date()  
	let obj = {}
	obj.hour = d.getHours()
	obj.min = d.getMinutes()
	obj.sec = d.getSeconds()
	obj.day = d.getDate()
	obj.month = d.getMonth() + 1
	obj.year = d.getFullYear()

	if(obj.hour < 10)
		obj.hour = "0" + obj.hour
	if(obj.min < 10)
		obj.min = "0" + obj.min
	if(obj.sec < 10)
		obj.sec = "0" + obj.sec
	if(obj.day < 10)
		obj.day = "0" + obj.day
	if(obj.month < 10)
		obj.month = "0" + obj.month

	obj.time = obj.hour + ":" + obj.min
	obj.date = obj.day + "." + obj.month + "." + obj.year
	
	obj.h1 = obj.hour.toString()[0]
	obj.h2 = obj.hour.toString()[1]
	obj.m1 = obj.min.toString()[0]
	obj.m2 = obj.min.toString()[1]
	obj.s1 = obj.sec.toString()[0]
	obj.s2 = obj.sec.toString()[1]
	obj.d1 = ":"
	obj.d2 = ":"
	
	return obj
}

class Element {
	constructor(id, x, xScale, y) {
		this.id = id
		this.x = x
		this.xScale = xScale
		this.y = y		
		this.xOffset = 0
		this.yOffset = 0
		this.txt = ""
	}
	
	render() {
		text(this.txt, this.x + this.xScale + this.xOffset, this.y + this.xOffset)
		// render it once & reset offset
		this.resetOffset()
	}
	
	resetOffset() {
		this.xOffset = 0
		this.yOffset = 0
	}
	
	applyOffset(xOff, yOff) {
		this.xOffset = xOff
		this.yOffset = yOff
	}
	
	setText(txt) {
		this.txt = txt
	}
	
	move(x, y) {
		this.x = x
		this.y = y
	}
}